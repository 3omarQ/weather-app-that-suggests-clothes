FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install -g live-server
EXPOSE 5500
CMD ["npx", "live-server", "--port=5500", "--watch=."]
