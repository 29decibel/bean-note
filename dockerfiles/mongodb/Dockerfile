# DOCKER-VERSION 0.4.0

FROM	ubuntu:12.04
RUN	echo 'deb http://us.archive.ubuntu.com/ubuntu/ precise universe' >> /etc/apt/sources.list
RUN	echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' >> /etc/apt/sources.list
RUN	apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
RUN	apt-get -y update
RUN	apt-get -y install mongodb-10gen supervisor

# Add config
ADD	./supervisord.conf /etc/supervisor/conf.d/supervisord.conf
ADD	./init-replicaset.conf /etc/supervisor/conf.d/init-replicaset.conf
ADD	./mongodb.conf /etc/mongodb.conf
ADD	./start /src/start

# Mongo port
EXPOSE	:27017
# NB: if run with the environment variable REPLSETMEMBERS, this container will
# start multiple instances of mongod on ports 27017, 27018, 27019, etc. You will
# need to manually open the ports with "docker run -p 27017 -p 27018 ...".

CMD	["sh", "/src/start"]

# vim:ts=8:noet:
