FROM node:16.13

WORKDIR /usr/src/app

RUN apt-get update && apt-get install nginx -y

COPY default.conf /etc/nginx/conf.d/default.conf

COPY ./ /usr/src/app/

RUN npm install

RUN npm run build:ssr

RUN npm run prerender

ADD . /code

CMD ["sh", "supervisor.sh"]

EXPOSE 4000
