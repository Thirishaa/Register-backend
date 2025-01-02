pipeline {
    agent any

    tools {
        nodejs 'nodejs_20.10.0' // Ensure Node.js is installed and configured in Jenkins
    }

    environment {
        NODEJS_HOME = 'C:/Program Files/nodejs'
        SONAR_SCANNER_PATH = 'C:/Program Files/sonar-scanner-6.2.1.4610-windows-x64/bin'
        SONAR_TOKEN = credentials('sonar-token') // Access SonarQube token stored in Jenkins credentials
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from the SCM (e.g., GitHub)
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                bat """
                set PATH=%NODEJS_HOME%;%PATH%
                npm install
                """
            }
        }

        stage('Lint') {
            steps {
                // Run linting using npx to ensure the locally installed eslint is used
                bat """
                set PATH=%NODEJS_HOME%;%PATH%
                npx eslint .
                """
            }
        }

        stage('Build') {
            steps {
                // Build the application
                bat """
                set PATH=%NODEJS_HOME%;%PATH%
                npm run build
                """
            }
        }

        stage('SonarQube Analysis') {
            steps {
                // Run SonarQube analysis
                bat """
                set PATH=%SONAR_SCANNER_PATH%;%PATH%
                where sonar-scanner || echo "SonarQube scanner not found. Please install it."
                sonar-scanner -Dsonar.projectKey=registerbackend -Dsonar.login=%SONAR_TOKEN%
                """
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
