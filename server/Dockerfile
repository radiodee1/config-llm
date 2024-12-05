
FROM python:3.12-alpine3.20
# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app
COPY ./src/app.py /app/src/
# Install any needed dependencies specified in requirements.txt
# RUN pip install --no-cache-dir -r requirements.txt

# Make port available to the world outside this container
EXPOSE 8000

VOLUME [ "/home" ]
# Run app.py when the container launches
CMD [ "/app/src/app.py"]
