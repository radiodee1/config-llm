#FROM ubuntu:24.04
FROM python:3.12-alpine3.20
# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app
COPY ./src/app.py /app/src/
# Install any needed dependencies specified in requirements.txt
#RUN apt-get install -y  python3-all # libssl
RUN apk add --no-cache  openssl

RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout key.pem -out cert.pem -config csr.conf 

# Make port available to the world outside this container
EXPOSE 8008

VOLUME [ "/home" ]

# Run app.py when the container launches
CMD [ "/app/src/app.py"]
