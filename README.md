# hue-sun-simulator
Simulates sunrise & sunset with Philips Hue lights. Wake up to sunshine every day.
## Run with docker
Before building the docker you need 4 things:

1. `hub_ip` = local ip address of the hue lights hub
2. `api_token` = generated api token for controlling the hue lights. If you don't know how to create this token check the official tutorials
3. `light_id` = the id of the hue light you want to use as a wake up light
4. `cron_schedule` = cron jobs scheduler for when to run the job e.g. `30 7 * * 1-5` to start the wake up light at 7.30 AM Monday - Friday

1. Build `docker build --build-arg hub_ip=192.168.1.1 --build-arg api_token=XYZ --build-arg light_id=1 --build-arg cron_schedule="30 7 * * 1-5" -t hue .`
2. Create docker container `docker create --name hue-simulator hue`
3. Run it `docker start hue-simulator`
