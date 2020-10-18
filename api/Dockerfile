FROM node:12.18.4

RUN useradd -ms /bin/bash happy

RUN mkdir -p /home/happy/api/node_modules && chown -R happy:happy /home/happy/api

RUN mkdir -p /home/happy/api/uploads && chmod 775 /home/happy/api/uploads

WORKDIR /home/happy/api

COPY api/package.json api/yarn.* ./

USER happy

RUN yarn

COPY --chown=happy:happy ./api .

CMD ["yarn", "dev"]

EXPOSE 3000
