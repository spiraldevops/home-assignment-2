[//]: <> (home-assignment)

# **Home assignment for DevOps position**

Welcome to Spiral Solutions recruitment process.

<details>
<summary>Diversity disclaimer</summary>

    We value diversity and inclusivity in our recruitment process and do not discriminate on the basis of race, color, religion, gender, gender identity or expression, sexual orientation, national origin, genetics, disability, age, or veteran status.

    If you have any questions or concerns regarding the assignment or the recruitment process, please do not hesitate to contact us. We want to create an equal and fair opportunity for all applicants.
</details>

<br>
You are at the home assignment stage, which should result in a deployment of this beautiful website:

<p align="center"   >
    <img src="fib-app.gif" alt="Fibonacci site" height=50% width=50%>
</p>

<br>

## Why does this exist?

A DevOps person must be capable of automating development and deployment processes for a company.
This exercise is designed to showcase your abilities in building and deploying a CICD pipeline from scratch for a multi-service application on a Kubernetes cluster.

We welcome all applicants to this home assignment, regardless of their previous experience with specific tools or techniques. Our goal is to assess your understanding of relevant concepts, showcasing your knowledge and thought process.

## What's in the repository

The website is composed out of 3 services:

- `client` (frontend): the UI where a user submits input and the results are displayed.
- `server` (api): allows for read-write connection to the database.
- `worker` (backend logic): subcribes to new input and performs the actual calculation.

Each folder contains the code for the corresponding service, as well as the Dockerfile for building the image.

Additionally, the website requires databases to work:

- `redis`: for cache.
- `mysql`: for long-term storage.

## Setup and authentication

### Tools to install

You will need the following tools for this assignment:

- git
- [docker](https://docs.docker.com/engine/)
- [docker compose](https://docs.docker.com/compose/install/linux/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/) or equivalent
- [aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

### Authenticating with aws

Once you have aws-cli installed, run the following command:

```sh
aws configure --profile spiral
```

You will be prompted for AWS Access Key ID and AWS Secret Key. Enter the credentials you recieved with the assignment.
For the region enter *eu-central-1*.

After that, you should be able to get a response to the following command:

```sh
aws eks list-clusters --profile spiral
```

### Login to ECR docker registry

After you have [authenticated with aws](#authenticating-with-aws), find the account id by running:

```sh
aws sts get-caller-identity --profile spiral
```

Then perform login using the following command:

```sh
aws ecr get-login-password | docker login --username AWS --password-stdin <account id>.dkr.ecr.eu-central-1.amazonaws.com
```

### Connecting to the EKS cluster

After you have [authenticated with aws](#authenticating-with-aws), run the following command to add the cluster authentication to your KUBECONFIG file:

```sh
aws eks update-kubeconfig --profile spiral --name spiral-home-assignment --alias <give the context a name>
```

You should see the new context in the `kubectl config get-contexts` list.

Run `kubectl config use-context <the name you gave>`. Now you should be able to see and edit the resources within the cluster.

## Exercise instructions

<div class="warning">

**Warning:**

Please do **not** push any code to the public repository.

Instead, please fork the repository and submit your solution as a pull request from your fork. This will ensure that your code is not visible to other candidates and that your work remains private.

</div>

<style>
.warning {
  background-color: FireBrick;
  border: 1px solid #ffb3b3;
  padding: 10px;
  margin-bottom: 20px;
}
.warning p {
  margin: 0;
}
</style>

The exercise consists of three parts:

### Part 1 - Docker Compose

Use Docker Compose to build and run the entire application stack (services and databases).

1. The order in which the services should come up is:
    1. `mysql` <br>
        **Healthcheck command: `msqladmin ping -h localhost`**
    2. `redis` <br>
        **Healthcheck command: `redis-cli --raw incr ping`**
    3. `server`
    4. `worker`
    5. `client`
2. Use the following ports for each service:
   - client: 3000
   - server: 5000
   - mysql: 3306
   - redis: 6379
3. Verify that the application works as expected by navigating to <http://localhost:3000> in your web browser.
4. Make sure that data from databases is available after restart (persistent).

### Part 2 - Deploying manually to k8s

<div class=warning>

**Important**

Please create a **new namespace** with your name and use it for all deployments.
Otherwise we will not be able to deferentiate your work from others.

</div>

Create k8s manifests in order to deploy the website to the EKS cluster provided.
This includes creating the necessary resources (such as pods, deployments, and services) for the website to run on EKS. Provide the necessary steps to deploy the website manually.

Make sure to use the correct resource type for each service, and use persistent volumes for the databases. You can use any way to create the manifests:

- regular kubernetes yamls/json
- helm
- kustomize
- eksctl
- etc.

For your convenience, *ingress-nginx-controller* has been installed on the cluster. You are welcome to use *spdevqa.com* domain for exposing the website to the world.
Otherwise, use port-forwarding to connect to the website through your browser.

### Part 3 - CI/CD

Create a CI/CD pipeline for the website using a tool of your choosing. The pipeline should:

1. Build and push the Docker images to ECR. **Versioning is highly recommended.**
    > Login into registry using [previous instructions](#login-to-ecr-docker-registry)
2. Deploy the website to your namespace in the EKS cluster automatically. **Make sure that the image version is passed as an argument.**
    > Connect the cluster to your CD tool with the AWS Access Key ID and AWS Secret Key provided. See [previous instructions](#connecting-to-the-eks-cluster)
3. Provide documentation for running the pipeline, if necessary.

### Bonuses

For bonus points, you can (in no particular order):

- Rewrite the Dockerfiles for server and worker services to be more secure.
- Configure monitoring for the website using a tool of your choosing (e.g. Prometheus, Grafana)
- Implement GitOps for the website instead of a CD pipeline.
- Create versioning and deployment to different namespaces based on a branching strategy.

## What you are graded on

We will evaluate your submission based on the following criteria:

1. **Functionality**: Your solution should work as intended, deploying the website to the cluster.
2. **Understanding**: You should be able to explain your implementation to someone else who has a basic knowledge of DevOps principles and k8s.
3. **Best practices**: Your implementation should follow industry best practices for DevOps, i.e. scalability, and maintainability.
4. **Readability and cleanliness**: Your code should be well-organized, well-documented, and easy to read.

### What stages would you have added given enough time?

Please include your answer to this question in your submission. We are interested in learning more about your thought process and the depth of your understanding of the DevOps process.

## Contacts

If you have any questions or concerns about this project, please feel free to reach out to us at the following email address:

- Email: [spiraldevops@spiralsolutions.com](mailto:spiraldevops@spiralsolutions.com)

We will do our best to respond to your inquiries as soon as possible. Thank you.
