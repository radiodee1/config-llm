
#RUN npm run dev 

FROM nginx:1.27.3-alpine

EXPOSE 80 
EXPOSE 8008
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

#COPY --from=builder /app/dist /usr/share/nginx/html

