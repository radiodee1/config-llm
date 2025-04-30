#!/bin/bash 

cd ../env 

LOCAL_IP=$(hostname -I | awk '{ print $1 }')
LOCAL_PORT=8001

#LOCAL_IP=server
#!/bin/bash

if [ $# -ne '1' ]; then
    echo ""
    echo "Enter a LOCAL_IP or leave blank for this host."
    echo "Enter empty double quotation marks for 'none'."
else
    LOCAL_IP=$1 
fi 

echo $LOCAL_IP
echo $LOCAL_PORT

echo "# env" > client.env
echo "VITE_REMOTE_PORT=${LOCAL_PORT}" >> client.env
echo "VITE_REMOTE=${LOCAL_IP}" >> client.env

cp client.env ../client/.env
