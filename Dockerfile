FROM mhart/alpine-node:10

WORKDIR /usr/src
COPY . .
RUN npm i

CMD ["npm", "run", "start"]
