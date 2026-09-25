FROM node:26 AS builder

RUN npm install -g pnpm

COPY package.json ./package.json
COPY pnpm-lock.yaml ./pnpm-lock.yaml
COPY pnpm-workspace.yaml ./pnpm-workspace.yaml

RUN pnpm i --frozen-lockfile

RUN pnpm build

FROM node:26 AS runner

RUN npm i -g pnpm

COPY package.json ./package.json
COPY pnpm-lock.yaml ./pnpm-lock.yaml
COPY pnpm-workspace.yaml ./pnpm-workspace.yaml

RUN pnpm i --prod --frozen-lockfile

COPY --from=builder dist ./dist

CMD [ "pnpm", "start" ]
