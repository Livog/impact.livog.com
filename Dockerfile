FROM node:22-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

COPY . .

ENV NODE_ENV=production

RUN corepack enable pnpm && pnpm run build

EXPOSE 3000
CMD ["pnpm", "exec", "next", "start"]