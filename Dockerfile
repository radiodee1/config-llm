FROM node:21-alpine3.20 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
#RUN npm run dev

#FROM busybox:1.30 AS runner
#WORKDIR /app
#COPY --from=builder /app/dist .
CMD ["npm", "run", "dev"]
