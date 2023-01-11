FROM ubuntu:20.04

RUN apt-get update && \
    apt-get install -y \
        curl

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get -y install nodejs

# Clean apt cache
RUN rm -rf /var/lib/apt/lists/*

# Install dependencies
WORKDIR /app
COPY package.json package.json
RUN npm install --global yarn
RUN yarn install

# Install playwright
RUN npx playwright install --with-deps

COPY . .

CMD ./start.sh
