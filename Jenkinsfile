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
        RESULT_LINTER = '';
        RESULT_TEST_JEST = '';
        RESULT_UPDATE_README = '';
        RESULT_DEPLOY = '';
    }
    parameters {
        string(name: 'executor', defaultValue: 'Kike Valero', description: 'Executor de la tasca')
        string(name: 'motiu', defaultValue: 'missatge', description: 'Motíu per el qual estem executant la pipeline')
        string(name: 'chatId', defaultValue: 'num_chatId', description: 'Número del chat de telegram')
        // string(name: 'result_linter', defaultValue: 'succes', description: 'Resultat execució linter')
        // string(name: 'result_test_stage', defaultValue: 'succes', description: 'Resultat execució test jest')
        // string(name: 'result_update_readme', defaultValue: 'succes', description: 'Resultat execució update_readme')
        // string(name: 'result_deploy', defaultValue: 'succes', description: 'Resultat execució deploy')
        
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
                    env.RESULT_LINTER = sh(script: 'npm run lint', returnStatus: true)
                    sh "node ./jenkinsScripts/indexLinter.js '${env.result_linter}'"
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    env.RESULT_TEST_JEST = sh(script: 'npm run test', returnStatus: true)
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
                env.RESULT_UPDATE_README = sh(script: "node ./jenkinsScripts/indexUpdateReadme.js", returnStatus: true) 
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
                    env.RESULT_DEPLOY = sh(script: "node ./jenkinsScripts/indexDeployVercel.js", returnStatus: true) 
                }
            }
        }
    }
    post{
        always{
            script{
                sh 'npm install node-telegram-bot-api'
                sh "node ./jenkinsScripts/indexNotificationTelegram.js '${env.resutat_msg}' '${env.chatId}'"
            }
        }   
    }
}
