# Preparing Stage
FROM node:alpine as base
LABEL author="Accalina"

# Builder Stage
FROM base as builder
WORKDIR /cloudwolf
RUN apk update && apk add --update git curl
RUN git clone --branch feat/backend_core --single-branch https://github.com/accalina/ms-craft.git
# WORKDIR /cloudwolf/ms-craft
# RUN npm i 
WORKDIR /cloudwolf/ms-craft/frontend_mscraft
RUN npm i 
RUN npm run build

# Runtime Stage
FROM base as runtime 
RUN yarn global add serve
WORKDIR /cloudwolf
COPY --from=builder /cloudwolf/ms-craft/frontend_mscraft/build .