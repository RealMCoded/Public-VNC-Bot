# Public VNC Resolver Discord Bot

Public VNC Resolver is a Discord bot dedicated to showcasing all the insecure VNCs across the world, using [ComputerNewb's VNC Resolver](https://computernewb.com/vncresolver/) API.

> [!IMPORTANT]  
> This bot is for research and entertainment purposes only! Proceed with caution when connecting, as you could connect to a Honeypot. I am not responsible if anything bad happens!

## Usage

You can invite the bot to a server or add it to your Discord account by clicking on [this link](https://discord.com/oauth2/authorize?client_id=740290115972235364)!

Then, you can run any of the commands to get a VNC instantly.

- `/vnc random`

- `/vnc id`

- `/vnc name`

- `/vnc country`

- `/vnc asn`

## Running

The bot is made with [Node.js](https://nodejs.org/en/), so you need to have that installed to start with.

You also need to make a file called `.env` and put the following information in it
```
CLIENT_ID = "YOUR-CLIENT-ID-HERE"
CLIENT_TOKEN = "YOUR-CLIENT-TOKEN-HERE"
```

It should look something like this when finished
```
CLIENT_ID = "740290115972235364"
CLIENT_TOKEN = "CvwkuJOkvquIZBxLISZaSlt-kHDtmLRMpzB0KWBzyloDQKMTuPzrpBEwZejB1UWO1sYt"
```

Next, Install all dependencies with `npm i`, deploy commands with `node deply.js` and then launch it with `node .` !

## Frequently Asked Questions

### What even is a VNC?

A VNC (Virtual Network Computing) is a graphical desktop-sharing system that uses the Remote Frame Buffer protocol to remotely control another computer. It transmits the keyboard and mouse input from one computer to another, relaying the graphical-screen updates, over a network.

### Can i get in trouble for using this?

It's fine to view them, but if you connect to them you could get in trouble if you do anything bad.

### How does this bot even work?

[ComputerNewb](https://computernewb.com/) has an amazing API that allows me to get information about these VNCs. It can be found [here](https://computernewb.com/vncresolver/api/docs)!