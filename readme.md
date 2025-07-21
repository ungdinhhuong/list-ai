```shell
ssh-keygen -t rsa -b 4096 -f gitlab_ci_key

ssh -i gitlab_ci_key deployer@103.159.51.112
```