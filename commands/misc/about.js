const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	/*data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('about the bot and other things')
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
			.setDescription("Get a link to the bot's Github (sent ephemerally)")),*/
	data: {
		options: [
		  {
			type: 1,
			name: 'bot',
			name_localizations: undefined,
			description: 'Learn more about the bot',
			description_localizations: undefined,
			options: []
		  },
		  {
			type: 1,
			name: 'vnc',
			name_localizations: undefined,
			description: 'Learn more about what VNCs are',
			description_localizations: undefined,
			options: []
		  },
		  {
			type: 1,
			name: 'github',
			name_localizations: undefined,
			description: "Get a link to the bot's Github (sent ephemerally)",
			description_localizations: undefined,
			options: []
		  }
		],
		name: 'about',
		name_localizations: undefined,
		description: 'about the bot and other things',
		description_localizations: undefined,
		default_permission: undefined,
		default_member_permissions: undefined,
		dm_permission: undefined,
		nsfw: undefined,
		integration_types: [0, 1], //0=server installable, 1=user installable
        contexts: [0, 1, 2], //0=GUILD, 1=BOT_DM, 2=PRIVATE_CHANNEL. You should be able to leave this as default.
	  },
	cooldown: 0,
	async execute(interaction) {
        const cmd = interaction.options.getSubcommand()

        if(cmd == "bot"){
            const embed = new EmbedBuilder()
                .setTitle("About Public VNC Resolver")
                .setDescription(`Public VNC Resolver is a Discord bot dedicated to showcasing all the insecure VNCs across the world, using [ComputerNewb's VNC Resolver](https://computernewb.com/vncresolver/) API.
				
				**Note:** This bot is for research and entertainment purposes only. Please do not attempt to connect to these VNCs, as you could connect to a [Honeypot](https://en.wikipedia.org/wiki/Honeypot_(computing)). I am not responsible if anything bad happens.
				
				[Terms of Service](https://github.com/RealMCoded/Public-VNC-Bot/blob/master/TERMS-OF-SERVICE.md) - [Privacy Policy](https://github.com/RealMCoded/Public-VNC-Bot/blob/master/PRIVACY-POLICY.md)`)
                .setThumbnail("https://cdn.discordapp.com/avatars/740290115972235364/88ac1f814a3011a2d56076948cffd9e7.png")
            await interaction.reply({embeds: [embed]})
        } else if (cmd == "vnc"){
            const embed = new EmbedBuilder()
                .setTitle("What is a VNC?")
                .setDescription("> In computing, Virtual Network Computing is a graphical desktop-sharing system that uses the Remote Frame Buffer protocol to remotely control another computer. It transmits the keyboard and mouse input from one computer to another, relaying the graphical-screen updates, over a network.\n\n*source: [Virtual Network Computing - Wikipedia](https://en.wikipedia.org/wiki/Virtual_Network_Computing)*")
            await interaction.reply({embeds: [embed]})
        } else if (cmd == "github"){
            await interaction.reply({content: "https://github.com/RealMCoded/Public-VNC-Bot", ephemeral: true})
    }}}