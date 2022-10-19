# FROM node:16.16 as build

# WORKDIR /app
# COPY package*.json .
# RUN yarn install
# COPY . .
# RUN yarn run build

# FROM node:16.16
# WORKDIR /app
# COPY package.json .
# RUN yarn install --only=production
# COPY --from=build /app/dist ./dist
# CMD yarn run start:prod

FROM node:lts

WORKDIR /app/nestjs

EXPOSE 3000
COPY . /app/nestjs

RUN npm install
RUN npm run build

USER 1000

CMD ["yarn", "run", "start:prod"]