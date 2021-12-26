FROM node:16.13.1

ENV YARN_VERSION 1.22.4
ENV APP_ROOT_DIR /usr/src/feijiuapp/sliver-fox-standard-services

RUN mkdir -p $APP_ROOT_DIR

# install yarn
RUN curl -fSLO --compressed "https://yarnpkg.com/downloads/${YARN_VERSION}/yarn-v${YARN_VERSION}.tar.gz" \
    && tar -xzf yarn-v${YARN_VERSION}.tar.gz -C /opt/ \
    && ln -snf /opt/yarn-v${YARN_VERSION}/bin/yarn /usr/local/bin/yarn \
    && ln -snf /opt/yarn-v${YARN_VERSION}/bin/yarnpkg /usr/local/bin/yarnpkg \
    && rm yarn-v${YARN_VERSION}.tar.gz

# install pm2
RUN yarn global add pm2

# change cwd
WORKDIR $APP_ROOT_DIR

# install
COPY package.json ./
COPY yarn.lock ./
RUN yarn --production

# Bundle source
COPY . .

# build tsc
RUN yarn tsc

EXPOSE 3000

CMD ["pm2-runtime", "process.yml"]

