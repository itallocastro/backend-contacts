FROM node
WORKDIR /app
COPY . /var/www
WORKDIR /var/www
RUN npm install
EXPOSE 3600
CMD ["node", "index.js"]
