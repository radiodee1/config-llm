#!/bin/bash 

USER_DIR=''


if [ $# -ne '1' ]; then
    echo ""
    echo "Enter a USER_DIR or leave blank for this user."
    echo "Enter empty double quotation marks for 'none'."
else
    USER_DIR=$1 
fi 



cd env 

./setup_user_dir.sh $USER_DIR 
./setup_ip.sh 

cd ..

sudo docker compose up 
