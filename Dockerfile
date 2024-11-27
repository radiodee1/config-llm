#FROM node:21-alpine3.20 AS builder
FROM ubuntu:24.04 AS builder


RUN apt-get update && apt-get install -y locales  \
	&& localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
ENV LANG=en_US.utf8

RUN apt-get upgrade -y 

RUN apt-get install -y npm nodejs

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173

#CMD ["/bin/sh", "-i"]
CMD ["npm", "run", "dev"]
