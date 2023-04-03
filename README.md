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

<img src="fib-app.gif#center" alt="Fibonacci site" height=50% width=50%>

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
## Exercise instructions
The exercise consists of three parts:
### Part 1 - Docker Compose
Using Docker Compose, create a local development environment for the website. The environment should include the necessary databases and services for the website to run. Provide the necessary steps to run the website locally using Docker Compose.
### Part 2 - Deploying manually to k8s
Manually deploy the website to an EKS cluster. This includes creating the necessary resources (such as pods, deployments, and services) for the website to run on EKS. Provide the necessary steps to deploy the website manually to EKS.
### Part 3 - CI/CD
Create a CI/CD pipeline for the website using a tool of your choosing. The pipeline should build and push the Docker images to ECR and deploy the website to an EKS cluster automatically. Provide the necessary instructions for running the pipeline.
### Bonuses
For bonus points, you can:

- Configure monitoring for the website using a tool of your choosing (e.g. Prometheus, Grafana)
- Implement rolling updates for the website
- Implement blue/green deployment for the website

## What you are graded on
We will evaluate your submission based on the following criteria:

1. **Functionality**: Your solution should work as intended, deploying the website to the cluster.
2. **Clarity**: You should be able to explain your implementation to someone else who has a basic understanding of DevOps principles and k8s.
3. **Best practices**: Your implementation should follow industry best practices for DevOps, i.e. scalability, and maintainability.
4. **Readability and cleanliness**: Your code should be well-organized, well-documented, and easy to read.

### What stages would you have added given enough time?

Please include your answer to this question in your submission. We are interested in learning more about your thought process and the depth of your understanding of the DevOps process.

## Contacts
