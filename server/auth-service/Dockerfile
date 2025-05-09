FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
COPY .env .env
# Generate Prisma client if needed
RUN npx prisma generate

# Cloud Run expects app to listen on port 8080
ENV PORT=8080
EXPOSE 8080

RUN node -v
RUN npm install dotenv



# Use JSON array form for CMD
CMD ["sh", "-c", "node src/server.js"]



