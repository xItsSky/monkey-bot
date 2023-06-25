# monkey-bot

<div style="display: flex; flex-direction: row">
<img src="https://badgen.net/badge/license/MIT/green"  alt="license badge" style="display: inline-block; margin: 5px;"/>
<img src="https://badgen.net/badge/discordjs/14.11.0/purple"  alt="license badge" style="display: inline-block; margin: 5px;"/>
<img src="https://badgen.net/badge/version/1.0.0/cyan"  alt="license badge" style="display: inline-block; margin: 5px;"/>
</div>

## Description

This is a small discord bot which sent monkey GIF at specific period based on a CRON environment variable
To do so, it is plugged to GIPHY to found appropriate GIF.

In order to invite the Monkey bot on your own discord server, <a href="https://discord.com/api/oauth2/authorize?client_id=850273970116231188&permissions=277025401872&scope=bot">click here</a>

## How to use it locally

- Copy the `.env.sample` file into a `.env` file and feed the `TOKEN`, `CLIENT_ID` ... variables by using your own bot information from the Discord development portal.
- Install FFMPEG on your compute, so that your bot will be able to use the vocal feature.
- Then run `npm run dev`

## How to deploy it

- Install FFMPEG on you deployment environment
- run `docker build -t francoisdamiens .`
- run `docker run -d --name francoisdamiens francoisdamiens`


## Author

- xItsSky
- F0Y3D

## License

Please find the MIT LICENSE here: <a href="/LICENSE">MIT LICENSE</a>
