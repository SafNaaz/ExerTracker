# MERN Stack App - Simple exercise tracker - dockerized and running on k8s

# Dockerization

server
--------------

    Mongo running as a service

        docker run -d -p 27017-27019:27017-27019 --name mongodb-service mongo
	
        docker build -t mern-server . 
	 
    created a network     
        
        docker network create mern-network
	 
        docker network connect mern-network mongodb-service
	 
        docker run -d -p 8000:8000 --name server --network mern-network mern-server

client with nginx
--------------
	 
    add nginx.conf and nginx related entries in docker file
	 
    docker build -t mern-client .
	 
-----------------------------------------------------------

# k8s steps
	 
server
--------------
push images to docker hub (can use local images as well -little tricky)
	 
	docker tag exer-server safnas/mern-server:v1
	docker push safnas/exer-server:v1
	 
	create yml files
	 
	kubectl create -f mongodb-pod.yml
	kubectl create -f mongodb-service.yml
	kubectl create -f cloudl-server-service.yml
	kubectl create -f cloudl-server-deployment.yml
	
	kubectl logs <pod_name>   - to see logs
	
client
--------------------
	
	docker tag mern-client safnas/exer-client:v1
	
	docker push safnas/exer-client:v1

	kubectl create -f mern-client-service.yml
	kubectl create -f mern-client-deployment.yml
	
	minikube service mern-client-service --url
	

extra things can be done in cloud
---------------------------------
	 - CI CD
	 - Health check - liveness, readyness
	 - auto scaling
	 - persistent storage for mongodb