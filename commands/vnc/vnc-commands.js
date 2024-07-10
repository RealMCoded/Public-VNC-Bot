const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { vnc_count, random_vnc, vnc_id, build_embed, vnc_name, vnc_country, vnc_asn } = require("../../vnc.js")
const iso = require("../../iso3311a2.json")

module.exports = {
	data: new SlashCommandBuilder()
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
					.setDescription("The ISO 3166-1 alpha-2 code for the country"))),
	async execute(interaction) {
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
					json = await vnc_country(interaction.options.getString("country"));
					break;
			}

			const embed = await build_embed(json)

			interaction.editReply({embeds: [embed]})
        }
    },
};