#!/bin/bash 

cd ../env 

HOST_CLIENT='client.env'
HOST_SERVER='server.env'

LOCAL_IP=$(hostname -I | awk '{ print $1 }')
LOCAL_PORT=8001


if [ $# -ne '1' ]; then
    echo ""
    echo "Enter a LOCAL_IP or leave blank for this host."
    echo "Enter empty double quotation marks for 'none'."
else
    LOCAL_IP=$1 
fi 

echo $LOCAL_IP
echo $LOCAL_PORT

echo "# env" > $HOST_CLIENT
echo "VITE_REMOTE_PORT=${LOCAL_PORT}" >> $HOST_CLIENT
echo "VITE_REMOTE=${LOCAL_IP}" >> $HOST_CLIENT

echo "# env" > $HOST_SERVER
echo "PORT=8001" >> $HOST_SERVER
echo "HOST=localhost" >> $HOST_SERVER

echo $HOST_SERVER
echo $HOST_CLIENT

cp $HOST_CLIENT ../client/.env
