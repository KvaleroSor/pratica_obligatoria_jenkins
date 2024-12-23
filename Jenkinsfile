pipeline {
    agent any
    tools {
        nodejs 'Node Js'
    }
    environment {
        BOT_TOKEN = credentials('BotToken')
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
    }
}
