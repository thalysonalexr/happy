FROM node:12.18.4

RUN useradd -ms /bin/bash happy

RUN mkdir -p /home/happy/web/node_modules && chown -R happy:happy /home/happy/web

WORKDIR /home/happy/web

ENV PATH /home/happy/web/node_modules/.bin:$PATH

COPY web/package.json web/yarn.* ./

USER happy

RUN yarn

COPY --chown=happy:happy ./web .

CMD ["yarn", "start"]

EXPOSE 3000