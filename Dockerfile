FROM node:20-alpine
WORKDIR /app
COPY . .
ENV PORT=8080
EXPOSE 8080
# The app needs only the node binary at runtime. Remove the bundled npm
# (and its vulnerable transitive packages) from the image.
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx /opt/yarn* 2>/dev/null; true
USER node
CMD ["node", "server.js"]
