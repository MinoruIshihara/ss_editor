FROM node:22-bullseye

WORKDIR /app/ss_editor

COPY app/ss_editor/package.json /app/ss_editor/

RUN npm install

EXPOSE 3000