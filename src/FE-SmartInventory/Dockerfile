# Use the official Node.js 18 image as a base
FROM node:20-alpine as base

EXPOSE 80

RUN npm install -g serve


FROM node:20 as build

# Create and set the working directory for the app
WORKDIR /app


COPY package*.json ./

RUN yarn install

COPY . .

ARG BUILD_COMMAND=build

ENV PORT=80

RUN yarn ${BUILD_COMMAND}

FROM base as final

WORKDIR /publish/dist

COPY --from=build /app/dist .

WORKDIR /publish

CMD ["sh", "-c", "serve -s dist"]
