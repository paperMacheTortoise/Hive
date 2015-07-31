#creates image from ubunto
FROM 	ubuntu:14.04
MAINTAINER Liam Gallivan <gallivanster@gmail.com>
RUN 	apt-get update
RUN     apt-get install -y npm git nodejs git-core
RUN		ln -s /usr/bin/nodejs /usr/bin/node
RUN		npm install -g bower
RUN		ls; git clone https://github.com/paperMacheTortoise/bizGram.git;
ENV		node=nodejs
RUN 	cd /bizGram; ls; npm install --production; bower install --allow-root;
EXPOSE 	3000
CMD node bizGram/server/server.js
