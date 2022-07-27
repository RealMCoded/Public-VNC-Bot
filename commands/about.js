const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('byeah')
		.addSubcommand(subcommand =>
			subcommand
			.setName("bot")
			.setDescription("Learn more about the bot"))
		.addSubcommand(subcommand =>
			subcommand
			.setName("vnc")
			.setDescription("Learn more about what VNCs are"))
		.addSubcommand(subcommand =>
			subcommand
			.setName("github")
			.setDescription("Get a link to the bot's Github!")),
	async execute(interaction) {
        const cmd = interaction.options.getSubcommand()

        if(cmd == "bot"){
            const embed = new EmbedBuilder()
                .setTitle("About Public VNC Resolver")
                .setDescription("Public VNC Resolver is a bot dedicated to showcasing all the insecure VNCs across the world for entertainment reasons.\n\n**NOTE: This bot is for research and entertainment purposes only! I am not responsible if anything bad happens!**")
                .setThumbnail("https://cdn.discordapp.com/avatars/740290115972235364/88ac1f814a3011a2d56076948cffd9e7.png")
            await interaction.reply({embeds: [embed]})
        } else if (cmd == "vnc"){
            const embed = new EmbedBuilder()
                .setTitle("What is a VNC")
                .setDescription("*From [Wikipedia, the free encyclopedia](https://en.wikipedia.org/wiki/Virtual_Network_Computing)*\n\n> In computing, Virtual Network Computing is a graphical desktop-sharing system that uses the Remote Frame Buffer protocol to remotely control another computer. It transmits the keyboard and mouse input from one computer to another, relaying the graphical-screen updates, over a network.")
            await interaction.reply({embeds: [embed]})
        } else if (cmd == "github"){
            await interaction.reply("https://github.com/RealMCoded/Public-VNC-Bot")
    }}}