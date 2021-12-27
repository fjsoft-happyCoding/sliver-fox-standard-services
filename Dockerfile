# small size 
FROM mhart/alpine-node:16.4.2

# RUN echo  http://mirrors.aliyun.com/alpine/v3.14/main/ > /etc/apk/repositories

# RUN apk add --no-cache --update nodejs=14.18.1-r0

# try to install yarn by npm global
# RUN npm install --global yarn

# set init environment 
ENV NODE_ENV=production \ 
    APP_ROOT_DIR=/usr/src/feijiuapp/sliver-fox-standard-services

# change current work directory
RUN mkdir -p $APP_ROOT_DIR

# set config register
RUN yarn config set registry http://registry.npm.taobao.org

# change cwd
WORKDIR $APP_ROOT_DIR

# use cache
COPY package.json .
COPY yarn.lock .

# install
RUN yarn
RUN yarn global add pm2

# Bundle source
COPY . .

# build tsc
RUN yarn tsc

EXPOSE 3000

CMD ["pm2-runtime", "ecosystem.config.js"]

