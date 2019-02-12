FROM dev-registry.zhonganonline.com:5000/tac/node:8.10.0-alpine
MAINTAINER zhaishuang <zhaishuang@zhongan.com>

WORKDIR /root/app
RUN mkdir -p /alidata1/admin/tac-agile-web/logs/
ENV SASS_BINARY_SITE http://npm.zhonganonline.com/node-mirrors/node-sass/
ENV NPM_CONFIG_REGISTRY http://npm.zhonganonline.com

RUN mkdir -p /alidata1/admin/tac-agile-web/logs/
COPY package.json /root/app/
RUN npm install --production

COPY ./ /root/app

RUN npm run build
EXPOSE 8080
CMD npm start
