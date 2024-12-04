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

curl -X PUT http://localhost:8000/home/dave/.llm.env -d something

```
