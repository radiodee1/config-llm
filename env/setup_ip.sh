#!/bin/bash 

LOCAL_IP=$(hostname -I | awk '{ print $1 }')
LOCAL_PORT=8008

echo $LOCAL_IP
echo $LOCAL_PORT

echo "# env" > client.env
echo "VITE_REMOTE_PORT=${LOCAL_PORT}" >> client.env
echo "VITE_REMOTE=${LOCAL_IP}" >> client.env
