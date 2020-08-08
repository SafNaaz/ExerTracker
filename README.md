# react
MERN Stack App - Simple exercise tracker - dockerized and running on k8s

server
-------------------

# Mongo running as a service

docker run -d -p 27017-27019:27017-27019 --name mongodb-service mongo
	
docker build -t mern-server . 
	 
# created a network     
docker network create mern-network
	 
docker network connect mern-network mongodb-service
	 
docker run -d -p 8000:8000 --name server --network mern-network mern-server
------------------------------------------------------------------------------------------------

client
-------------------------