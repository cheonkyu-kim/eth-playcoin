# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY ./vapp/package*.json ./
RUN yarn global add @vue/cli
RUN yarn install
COPY ./vapp .
RUN yarn build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]