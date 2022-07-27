# Public VNC Resolver Discord Bot

*this is not my best work, there are a lot of optimizations that can be done.*

Public VNC Resolver is a bot dedicated to showcasing all the insecure VNCs across the world. For research and entertainment purposes only!

If you wish, you can invite the public version of the bot by [clicking on this cool blue text](https://discord.com/api/oauth2/authorize?client_id=740290115972235364&permissions=18432&scope=applications.commands%20bot).

## Building

The bot is made with [Node.js](https://nodejs.org/en/), so you need to have that installed to start with.

You also need to make a file called `config.json` and put the following information in it
```json
{
    "clientId":"YOUR-BOTS-CLIENT-ID-HERE",
    "token":"YOUR-BOTS-TOKEN-HERE"
}
```

It should look something like this when finished
```json
{
    "clientId":"740290115972235364",
    "token":"CvwkuJOkvquIZBxLISZaSlt-kHDtmLRMpzB0KWBzyloDQKMTuPzrpBEwZejB1UWO1sYt"
}
```

Next, Install all dependencies with `npm i`, and then launch it with `node index.js` !

## Frequently Asked Questions

### **What even is a VNC?**

A VNC (Virtual Network Computing) is a graphical desktop-sharing system that uses the Remote Frame Buffer protocol to remotely control another computer. It transmits the keyboard and mouse input from one computer to another, relaying the graphical-screen updates, over a network.

### **Why did you make this?**

I made this bot to get used to Discord.js v14's new changes and also because it's funny to laugh at people who do not know what security is. 

### **Can i get in trouble for using this?**

It's fine to view them, but if you connect to them you could get in trouble if you do anything bad.

### **How does this bot even work?**

ComputerNewb has an amazing API that allows me to get information about these VNCs. It can be found here https://computernewb.com/vncresolver/dark/api/docs.html