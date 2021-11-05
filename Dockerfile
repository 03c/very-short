FROM node:14

WORKDIR /app

EXPOSE 3000
EXPOSE 8002

CMD npm install && npm run postinstall && npm run dev
