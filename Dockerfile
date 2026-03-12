# Dev image for Next.js with hot reload
FROM node:20-alpine

WORKDIR /app

# Install deps first (better caching)
COPY package*.json ./

RUN npm ci

# Copy project
COPY . .

# Next.js dev server port
EXPOSE 3000

CMD ["npm", "run", "dev"]
