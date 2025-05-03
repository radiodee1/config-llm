#!/bin/bash 

cd ../env 

HOST_FILE='user_dir.env'

USER_DIR=''


if [ $# -ne '1' ]; then
    echo ""
    echo "Enter a USER_DIR or leave blank for this user."
    echo "Enter empty double quotation marks for 'none'."
else
    USER_DIR=$1 
fi 


echo "# env" > $HOST_FILE
echo "VITE_USER_DIR=${USER_DIR}" >> $HOST_FILE
echo "USER_DIR=${USER_DIR}" >> $HOST_FILE
echo "# empty will be replaced later!!" >> $HOST_FILE

