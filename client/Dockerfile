# Build stage
FROM node:18 as build

WORKDIR /app
RUN rm -rf node_modules

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80
# run the app
CMD ["nginx", "-g", "daemon off;"]
