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
  - name: helm
    image: docker.io/alpine/helm:3.11.3
    command:
    - cat
    tty: true
  serviceAccountName: jenkins-admin
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
  parameters {
    string(name: 'Version', defaultValue: '0.0.0', description: 'Version for all images')
    string(name: 'ImageRegistry', defaultValue: '289512055556.dkr.ecr.eu-central-1.amazonaws.com', description: 'Registry to push images to')
    booleanParam(name: 'PushToRegistry', defaultValue: true, description: 'If ture, will push images to registry')
    booleanParam(name: 'Deploy', defaultValue: true, description: 'If ture, will deploy fib-calculator')
  }
  stages {
    stage('Build Server') {
      steps {
        container('buildah') {
          sh 'buildah build -t $ImageRegistry/nitaykd-assignment/server:$Version ./server'
        }
      }
    }
    stage('Build Client') {
      steps {
        container('buildah') {
          sh 'buildah build -t $ImageRegistry/nitaykd-assignment/client:$Version ./client'
        }
      }
    }
    stage('Build Worker') {
      steps {
        container('buildah') {
          sh 'buildah build -t $ImageRegistry/nitaykd-assignment/worker:$Version ./worker'
        }
      }
    }
    stage('Login to ECR') {
      when {
        expression { return params.PushToRegistry }
      }
      steps {
        container('buildah') {
          sh 'echo $ECR_CREDS_PSW | buildah login -u $ECR_CREDS_USR --password-stdin $ImageRegistry'
        }
      }
    }
    stage('Push images') {
      when {
        expression { return params.PushToRegistry }
      }
      steps {
        container('buildah') {
          sh 'buildah push $ImageRegistry/nitaykd-assignment/server:$Version'
          sh 'buildah push $ImageRegistry/nitaykd-assignment/client:$Version'
          sh 'buildah push $ImageRegistry/nitaykd-assignment/worker:$Version'
        }
      }
    }
    stage('Deploy fib-calculator') {
        when {
        expression { return params.PushToRegistry }
        expression { return params.Deploy }
      }
      steps {
        container('helm') {
          sh '''
          helm repo add bitnami https://charts.bitnami.com/bitnami
          helm dependency build ./fib-calculator/
          helm upgrade --install fib-calculator ./fib-calculator/ \
          --wait --timeout 5m0s -n nitaykd --set \
          server.image.tag=$Version,client.image.tag=$Version,worker.image.tag=$Version
          '''
        }
      }
    }
  }
  post {
    always {
      container('buildah') {
        sh "buildah logout $ImageRegistry || true"
      }
    }
  }
}