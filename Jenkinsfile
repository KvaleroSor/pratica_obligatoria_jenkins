pipeline {
    agent any
    tools {
        nodejs 'Node Js'
    }
    //Si declarem les variables en l´apartat de environment, maxaca el valor de retorn i els dona el valor null
    environment {
        BOT_TOKEN = credentials('BotToken')
        VERCEL_ORG_ID = credentials('ORG_ID_VERCEL')
        VERCEL_PROJECT_ID = credentials('PROJECT_ID_VERCEL')
        VERCEL_TOKEN = credentials('TOKEN_VERCEL')
        // RESULT_LINTER = ''
        // LINT_STATUS = ''
        // RESULT_TEST_JEST = ''
        // RESULT_UPDATE_README = ''
        // RESULT_DEPLOY = ''
    }
    parameters {
        string(name: 'executor', defaultValue: 'Kike Valero', description: 'Executor de la tasca')
        string(name: 'motiu', defaultValue: 'missatge', description: 'Motíu per el qual estem executant la pipeline')
        string(name: 'chatId', defaultValue: 'num_chatId', description: 'Número del chat de telegram')
    }

    stages {
        stage('Petició de dades') {
            steps {
                script {
                    env.executor = params.executor
                    env.motiu = params.motiu
                    env.chatId = params.chatId
                    sh "echo 'Executor --> ${env.executor}'"
                    sh "echo 'Motiu --> ${env.motiu}'"
                    sh "echo 'ChatId --> ${env.chatId}'"
                }
            }
        }

        // stage('Executant linter') {
        //     steps {
        //         //Instal·lant dependències
        //         sh 'npm install'

        //         //Executant linter
        //         script {
        //             RESULT_LINTER = sh(script: 'npm run lint', returnStdout: true)
        //             echo "Resultat linter -> '${RESULT_LINTER}'"                    
        //             sh "node ./jenkinsScripts/indexLinter.js '${RESULT_LINTER}'" 
        //         }
        //     }
        // }

        stage('Executant linter') {
            steps {
                // Instal·lant dependències
                sh 'npm install'

                // Executant linter
                script {
                    def lintOutput = sh(script: 'npm run lint', returnStdout: true).trim()
                    def lintStatus = sh(script: 'npm run lint', returnStatus: true)
                    env.RESULT_LINTER = lintOutput
                    env.LINT_STATUS = lintStatus.toString()
                    echo "Resultat linter -> '${env.RESULT_LINTER}'"
                    echo "Lint status -> '${env.LINT_STATUS}'"
                    sh "node ./jenkinsScripts/indexLinter.js '${env.LINT_STATUS}' '${env.RESULT_LINTER}'"
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    env.RESULT_TEST_JEST = sh(script: 'npm run test', returnStdout: true)
                }
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Update Readme') {
            steps {
                script {
                    env.RESULT_UPDATE_README = sh(script: "node ./jenkinsScripts/indexUpdateReadme.js '${env.RESULT_UPDATE_README}'", returnStdout: true)
                }
            }
        }

        stage('Push Changes') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'Id_github', usernameVariable: 'GITHUB_USERNAME', passwordVariable: 'GITHUB_PASSWORD')]) {
                    script {
                        sh "node ./jenkinsScripts/indexPushChanges.js '${params.executor}' '${params.motiu}'"
                    }
                }
            }
        }

        stage('Deploy to Vercel') {
            when {
                expression {
                    expression { currentBuild.result == 'SUCCESS' || currentBuild.result == null }
                }
            }
            steps {
                script {
                    env.RESULT_DEPLOY = sh(script: 'node ./jenkinsScripts/indexDeployVercel.js', returnStdout: true)
                }
            }
        }
    }
    post {
        always {
            script {
                sh 'npm install node-telegram-bot-api'
                sh "node ./jenkinsScripts/indexNotificationTelegram.js '${env.chatId}' '${env.LINT_STATUS}' '${env.RESULT_TEST_JEST}' '${env.RESULT_UPDATE_README}' '${env.RESULT_DEPLOY}'"
            }
        }
    }
}
