```shell
ssh-keygen -t rsa -b 4096 -f gitlab_ci_key

ssh -i gitlab_ci_key deployer@103.159.51.112

export IMAGE_TAG=1c8543f1 && export NODE_ENV=production && docker-compose down
export IMAGE_TAG=1c8543f1 && export NODE_ENV=production && docker-compose up -d

docker images --format "{{.Repository}}:{{.Tag}}" | grep "ontoolaz/" | xargs -r docker rmi
```
