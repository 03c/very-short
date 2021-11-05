FROM node:14

# ARG REMIX_TOKEN

WORKDIR /app

# COPY package*.json .npmrc ./
# COPY .npmrc ./
# COPY prisma ./prisma

# RUN npm install

# COPY ./ ./

# RUN npm run postinstall

EXPOSE 3000
EXPOSE 8002

CMD npm install && npm run postinstall && npm run dev
