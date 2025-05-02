#!/bin/bash

sudo docker image rmi --force $(sudo docker images -a -q)

