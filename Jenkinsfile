pipeline {
    agent any

    tools {
        nodejs 'nodejs_20.10.0' // Ensure Node.js is installed and configured in Jenkins
    }

    environment {
        SONAR_SCANNER_PATH = 'C:\\Program Files\\sonar-scanner-6.2.1.4610-windows-x64\\bin'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm  
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                npm install
                '''
            }
        }

        /*
stage('Lint') {
    steps {
        bat '''
        npm run lint -- --fix
        '''
    }
}
*/


        stage('Build') {
            steps {
                bat '''
                npm run build
                '''
            }
        }

        stage('SonarQube Analysis') {
            environment {
                SONAR_TOKEN = credentials('sonar-token') // Retrieve SonarQube token from Jenkins credentials
            }
            steps {
                bat '''
                set PATH=%SONAR_SCANNER_PATH%;%PATH%
                where sonar-scanner || echo "SonarQube scanner not found. Please install it."
                sonar-scanner -Dsonar.projectKey=registerbackend ^
                              -Dsonar.sources=. ^
                              -Dsonar.host.url=http://localhost:9000 ^
                              -Dsonar.token=%SONAR_TOKEN%
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully'
        }
        failure {
            echo 'Pipeline failed'
        }
        always {
            echo 'This runs regardless of the result.'
        }
    }
}
