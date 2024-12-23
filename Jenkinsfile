pipeline {
    agent any
    tools {
        nodejs 'Node Js'
    }
    environment {
        BOT_TOKEN = credentials('BotToken')
        VERCEL_ORG_ID = credentials('ORG_ID_VERCEL')
        VERCEL_PROJECT_ID = credentials('PROJECT_ID_VERCEL')
        VERCEL_TOKEN = credentials('TOKEN_VERCEL')
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

        stage('Executant linter') {
            steps {
                //Instal·lant dependències
                sh 'npm install'

                //Executant linter
                script {
                    env.result = sh(script: 'npm run lint', returnStatus: true)
                    sh "node ./jenkinsScripts/indexLinter.js '${env.result}'"
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    env.result_tests = sh(script: 'npm run test', returnStatus: true)
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
                sh "node ./jenkinsScripts/indexUpdateReadme.js '${env.result_tests}'"
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

        stage('Deploy to Vercel'){
            when{
                expression {
                    expression { currentBuild.result == 'SUCCESS' || currentBuild.result == null }
                }
            }
            steps {
                script {
                    sh "node ./jenkinsScripts/indexDeployVercel.js"
                }
            }
        }
    }
}
