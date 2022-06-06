FROM node:16-alpine
WORKDIR /home/ci/www/Nextjs-Groot
COPY package*.json ./
RUN npm i
COPY . .
ENV NODE_ENV production
RUN npm run build
EXPOSE 3000
RUN npm cache clean --force
CMD ["npm","start"]