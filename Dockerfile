# Base image
FROM node:8.9

# Install packages
RUN npm install -g http-server

# Create workspace directory
RUN mkdir /app
COPY dist /app/
WORKDIR /app

# Open port
EXPOSE 80
CMD ["http-server", "-p", "80"]