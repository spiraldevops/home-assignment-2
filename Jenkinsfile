pipeline {
  agent {
    kubernetes {
      yaml '''
apiVersion: v1
kind: Pod
metadata:
  name: buildah
spec:
  containers:
  - name: buildah
    image: quay.io/buildah/stable:v1.23.1
    command:
    - cat
    tty: true
    securityContext:
      privileged: true
    volumeMounts:
      - name: varlibcontainers
        mountPath: /var/lib/containers
  volumes:
    - name: varlibcontainers
'''   
    }
  }
  options {
    buildDiscarder(logRotator(numToKeepStr: '10'))
    durabilityHint('PERFORMANCE_OPTIMIZED')
    disableConcurrentBuilds()
  }
  environment {
    ECR_CREDS=credentials('ecr-creds')
  }
  stages {
    stage('Build Server') {
      steps {
        container('buildah') {
          sh 'buildah build -t 289512055556.dkr.ecr.eu-central-1.amazonaws.com/nitaykd-assignment/server:0.0.2 ./server'
        }
      }
    }
    stage('Build Client') {
      steps {
        container('buildah') {
          sh 'buildah build -t 289512055556.dkr.ecr.eu-central-1.amazonaws.com/nitaykd-assignment/client:0.0.2 ./client'
        }
      }
    }
    stage('Build Worker') {
      steps {
        container('buildah') {
          sh 'buildah build -t 289512055556.dkr.ecr.eu-central-1.amazonaws.com/nitaykd-assignment/worker:0.0.2 ./worker'
        }
      }
    }
    stage('Login to ECR') {
      steps {
        container('buildah') {
          sh 'echo $ECR_CREDS_PSW | buildah login -u $ECR_CREDS_USR --password-stdin 289512055556.dkr.ecr.eu-central-1.amazonaws.com'
        }
      }
    }
    stage('Push images') {
      steps {
        container('buildah') {
          sh 'buildah push 289512055556.dkr.ecr.eu-central-1.amazonaws.com/nitaykd-assignment/server:0.0.2'
          sh 'buildah push 289512055556.dkr.ecr.eu-central-1.amazonaws.com/nitaykd-assignment/client:0.0.2'
          sh 'buildah push 289512055556.dkr.ecr.eu-central-1.amazonaws.com/nitaykd-assignment/worker:0.0.2'
        }
      }
    }
  }
  post {
    always {
      container('buildah') {
        sh 'buildah logout 289512055556.dkr.ecr.eu-central-1.amazonaws.com'
      }
    }
  }
}