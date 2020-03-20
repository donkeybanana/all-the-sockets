FROM node:alpine
LABEL maintainer="Alan Burgoyne <alan@srcur.com>"

EXPOSE 8081

WORKDIR /app
ADD . .
RUN npm i

CMD ["node", "index.js"]
