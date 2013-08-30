# DOCKER-VERSION 0.4.0

FROM	ubuntu:12.04
MAINTAINER Mike Li

RUN apt-get install -y python-software-properties python
RUN add-apt-repository ppa:chris-lea/node.js
RUN echo "deb http://us.archive.ubuntu.com/ubuntu/ precise universe" >> /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y nodejs
#RUN apt-get install -y nodejs=0.6.12~dfsg1-1ubuntu1
RUN mkdir /var/www

ADD app.js /var/www/app.js

EXPOSE	:8080

CMD ["/usr/bin/node", "/var/www/app.js"]

# vim:ts=8:noet:
