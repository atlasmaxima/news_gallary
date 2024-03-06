# syntax=docker/dockerfile:1

# base image
FROM node:16-alpine

# create & set working directory
RUN mkdir -p /app
WORKDIR /app

# copy source files
COPY . /app
COPY package*.json ./
COPY prisma ./prisma/

# install dependencies
RUN npm install
RUN npm install @prisma/client

COPY . .

# generate prisma schema
RUN npx prisma generate --schema ./prisma/schema.prisma

# start app
RUN npm run build
EXPOSE 3000
CMD npm run dev

