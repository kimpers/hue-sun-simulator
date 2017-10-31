FROM mhart/alpine-node:latest

# Required arguments
ARG hub_ip
ARG api_token
ARG light_id
ARG cron_schedule

COPY . /root

WORKDIR /root

# Install dependencies
RUN npm install

# Setup crontab
RUN echo "$cron_schedule node /root/bin/index.js sunrise $hub_ip $api_token $light_id >> /var/log/cron.log" > /etc/crontabs/root

# Run the command on container startup
CMD crond -l 2 -f
