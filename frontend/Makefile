build:
	-@docker build -t mhtfrontimg .

run:
	-@docker run -d -p 8080:8080 --name mhtfront mhtfrontimg

exec:
	-@docker exec -it mhtfront bash

kill:
	-@docker kill mhtfront && docker rm mhtfront