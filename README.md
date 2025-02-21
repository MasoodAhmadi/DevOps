# COMP.SE.140 – Docker-compose hands on

<h3 align="left">How to run:</h3>

```
- git clone -b project https://github.com/MasoodAhmadi/DevOps
- docker-compose build --no-cache
- docker-compose up -d
  … wait for 10s
- curl localhost:8197/state -X PUT -d "PAUSED" -H "Content-Type: text/plain
- curl localhost:8197/run-log
- docker-compose down
```
