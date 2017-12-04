FROM node:6-alpine
ARG git_commit
RUN apk add --no-cache --update ca-certificates

# Add package.json and then install dependncies
# so that `npm install` is only run if package.json changes
COPY package.json .

# Install app dependencies
RUN npm install --production

# Bundle app files
COPY index.js .

ENV PORT 3000
ENV GIT_COMMIT $git_commit

EXPOSE 3000

USER guest
CMD [ "npm", "start" ]
