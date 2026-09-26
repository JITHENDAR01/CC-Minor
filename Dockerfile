FROM node:18-bookworm-slim AS frontend-build

WORKDIR /frontend

COPY Frontend/campusconnect/package.json Frontend/campusconnect/package-lock.json ./
RUN npm ci

COPY Frontend/campusconnect/ ./
RUN npm run build

FROM node:18-bookworm-slim

ENV NODE_ENV=production
ENV PORT=80

WORKDIR /app

COPY Backend/package.json Backend/package-lock.json ./
RUN npm ci --omit=dev

COPY Backend/ ./
COPY --from=frontend-build /frontend/dist ./public

EXPOSE 80

CMD ["npm", "start"]