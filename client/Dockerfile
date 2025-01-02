FROM node:23-alpine3.20 as builder 

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install -g npm@latest
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173

#RUN npm run dev 

FROM nginx:1.27.3-alpine

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./nginx/index.html /usr/share/nginx/html/index.html

COPY --from=builder /app/dist /usr/share/nginx/html

#CMD ["/bin/sh", "-i"]
#CMD ["npm", "run", "dev"]

#STOPSIGNAL SIGTERM
#CMD ["nginx", "-g", "daemon off;"]
