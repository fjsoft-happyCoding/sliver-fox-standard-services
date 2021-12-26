# small size 
FROM alpine:3.14 AS base

# initial environment tools 
RUN apk add --no-cache --update nodejs=16.13.1 yarn=1.22.4

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

