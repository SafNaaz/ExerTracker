# react
MERN Stack App - Simple exercise tracker connected to mongo atlas running on docker

$docker-compose up --build

------------------------------

if server separate

cd into server then $docker-compose up --build

--------------------------------------

if client separate

docker build -t exertracker-client:latest .

docker run --name exertracker-client -p 3000:3000 -d exertracker-client

----------------------------------------------------------

connect to mongdb using shell

docker exec -it mongo bash