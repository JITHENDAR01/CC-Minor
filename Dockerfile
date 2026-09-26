FROM node:18-bookworm-slim

ENV NODE_ENV=production
ENV PORT=5000

WORKDIR /app

COPY Backend/package.json Backend/package-lock.json ./
RUN npm ci --omit=dev

COPY Backend/ ./

EXPOSE 5000

CMD ["npm", "start"]