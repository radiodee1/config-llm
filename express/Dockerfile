FROM node:23-alpine3.20 

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 8001

#CMD ["/bin/sh", "-i"]
CMD ["npm", "start"]
