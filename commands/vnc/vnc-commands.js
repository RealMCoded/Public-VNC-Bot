const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits  } = require('discord.js');
const { vnc_count, random_vnc, vnc_id, build_embed, vnc_name, vnc_country, vnc_asn } = require("../../vnc.js")

module.exports = {
	/*data: new SlashCommandBuilder()
		.setName('vnc')
		.setDescription('VNC Commands')
        .addSubcommand(subcommand =>
			subcommand
			.setName("count")
			.setDescription("Get a count of all indexed VNC servers"))
		.addSubcommand(subcommand =>
			subcommand
			.setName("random")
			.setDescription("Get a random VNC server"))
		.addSubcommand(subcommand =>
			subcommand
			.setName("id")
			.setDescription("Get a VNC server from its ID")
			.addStringOption(string =>
				string.setName("id")
					.setRequired(true)
					.setDescription("The ID of the VNC server")))
        .addSubcommand(subcommand =>
			subcommand
			.setName("name")
			.setDescription("Get a random VNC server with a client name")
			.addStringOption(string =>
				string.setName("name")
					.setRequired(true)
					.setDescription("The name to search for")))
		.addSubcommand(subcommand =>
			subcommand
			.setName("asn")
			.setDescription("Get a random VNC server with an ASN number")
			.addStringOption(string =>
				string.setName("asn")
					.setRequired(true)
					.setDescription("The ASN to search for")))
		.addSubcommand(subcommand =>
			subcommand
			.setName("country")
			.setDescription("Get a random VNC server from a country using an ISO 3166-1 alpha-2 code")
			.addStringOption(string =>
				string.setName("iso-3166")
					.setRequired(true)
					.setDescription("The ISO 3166-1 alpha-2 code for the country"))),*/
	data: {
		options: [
		  {
			type: 1,
			name: 'count',
			name_localizations: undefined,
			description: 'Get a count of all indexed VNC servers',
			description_localizations: undefined,
			options: []
		  },
		  {
			type: 1,
			name: 'random',
			name_localizations: undefined,
			description: 'Get a random VNC server',
			description_localizations: undefined,
			options: []
		  },
		  {
			type: 1,
			name: 'id',
			name_localizations: undefined,
			description: 'Get a VNC server from its ID',
			description_localizations: undefined,
			options: [
			  {
				autocomplete: undefined,
				type: 3,
				choices: undefined,
				name: 'id',
				name_localizations: undefined,
				description: 'The ID of the VNC server',
				description_localizations: undefined,
				required: true,
				max_length: undefined,
				min_length: undefined
			  }
			]
		  },
		  {
			type: 1,
			name: 'name',
			name_localizations: undefined,
			description: 'Get a random VNC server with a client name',
			description_localizations: undefined,
			options: [
			  {
				autocomplete: undefined,
				type: 3,
				choices: undefined,
				name: 'name',
				name_localizations: undefined,
				description: 'The name to search for',
				description_localizations: undefined,
				required: true,
				max_length: undefined,
				min_length: undefined
			  }
			]
		  },
		  {
			type: 1,
			name: 'asn',
			name_localizations: undefined,
			description: 'Get a random VNC server with an ASN number',
			description_localizations: undefined,
			options: [
			  {
				autocomplete: undefined,
				type: 3,
				choices: undefined,
				name: 'asn',
				name_localizations: undefined,
				description: 'The ASN to search for',
				description_localizations: undefined,
				required: true,
				max_length: undefined,
				min_length: undefined
			  }
			]
		  },
		  {
			type: 1,
			name: 'country',
			name_localizations: undefined,
			description: 'Get a random VNC server from a country using an ISO 3166-1 alpha-2 code',
			description_localizations: undefined,
			options: [
			  {
				autocomplete: undefined,
				type: 3,
				choices: undefined,
				name: 'iso-3166',
				name_localizations: undefined,
				description: 'The ISO 3166-1 alpha-2 code for the country',
				description_localizations: undefined,
				required: true,
				max_length: undefined,
				min_length: undefined
			  }
			]
		  }
		],
		name: 'vnc',
		description: 'VNC Commands',
		integration_types: [0, 1], //0=server installable, 1=user installable
        contexts: [0, 1, 2], //0=GUILD, 1=BOT_DM, 2=PRIVATE_CHANNEL. You should be able to leave this as default.
	  },
	cooldown: 3,
	async execute(interaction) {
		//check perms before running
		if (!interaction.channel.permissionsFor(interaction.guild.members.me).has(PermissionFlagsBits.EmbedLinks)) {
			return interaction.reply({content: 'The bot (or you, if this is a user command) doesnt have permission to Embed Links in this channel.', ephemeral: true})
		}

        let json;
		const cmd = interaction.options.getSubcommand()
		await interaction.deferReply()

        if (cmd == "count")
        {
            const num_vnc = await vnc_count()

            const embed = new EmbedBuilder()
                .setTitle(`🔢 There are \`${num_vnc}\` VNC servers indexed.`)

            return interaction.editReply({ embeds: [embed] })
        }
        else
        {
			switch (cmd)
			{
				case "random": 
					json = await random_vnc();
					break;

				case "id": 
					json = await vnc_id(interaction.options.getString("id"));
					break;

				case "name": 
					json = await vnc_name(interaction.options.getString("name"));
					break;

				case "asn": 
					json = await vnc_asn(interaction.options.getString("asn"));
					break;

				case "country": 
					json = await vnc_country(interaction.options.getString("iso-3166"));
					break;
			}

			const embed = await build_embed(json)

			await interaction.editReply({embeds: [embed]})
        }
    },
};