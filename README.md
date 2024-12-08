# config-llm

Project to implement a config editing program for pi-llm.

## Command Line Notes:

```
npm install --save [packagename]@[version]

npm run build
npm run dev 

sudo docker ps
sudo docker kill ff

docker image prune -a

docker image rmi --force $(docker images -a -q)

sudo docker build -t config-llm .

sudo docker run -it config-llm bash
sudo docker run -p 5173:5173 config-llm

docker run -p 8008:8008 --mount type=bind,source=/home,destination=/home server-llm

curl -X PUT http://localhost:8008/home/dave/.llm.env -k -d something 

curl -X PUT http://localhost:8008/config --data '{"body":"here...", "path":"/home/dave/test.txt"}' -H "Content-Type: Application/json"

chromium --ignore-certificate-errors --disable-web-security --user-data-dir=./dummy_data
```
