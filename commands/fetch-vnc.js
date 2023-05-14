/*
TODO: Move the EmbedBuilder outside of each if statement.
*/

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fetch-vnc')
		.setDescription('byeah')
		.addSubcommand(subcommand =>
			subcommand
			.setName("random")
			.setDescription("Get a random VNC server"))
		.addSubcommand(subcommand =>
			subcommand
			.setName("id")
			.setDescription("Get a VNC server from it's ID")
			.addStringOption(string =>
				string.setName("id")
					.setRequired(true)
					.setDescription("the ID of the VNC server")))
		.addSubcommand(subcommand =>
			subcommand
			.setName("country")
			.setDescription("Get a VNC server from a country using an ISO 3166-1 alpha-2 code")
			.addStringOption(string =>
				string.setName("iso-3166")
					.setRequired(true)
					.setDescription("the ISO 3166-1 alpha-2 code for the country"))),
	async execute(interaction) {
		const cmd = interaction.options.getSubcommand()
		await interaction.deferReply()
		if(cmd == "random"){
			const response = await fetch("https://computernewb.com/vncresolver/api/scans/vnc/random");
			const json = await response.json();

			const embed = new EmbedBuilder()
				.setTitle(`VNC Server - ${json.id}`)
				.setURL(`http://computernewb.com/vncresolver/dark/browse/?id=${json.id}`)
				.setImage(`http://computernewb.com/vncresolver/screenshots/${json.ip}_${json.port}.jpg`)
				.setDescription(`**IP:** \`${json.ip}:${json.port}\`\n\n**Client Name:** ${json.clientname}\n\n**ASN (Org):** ${json.asn}\n\n**Location:** ${json.city}, ${json.state}, ${json.country} :flag_${json.country.toLowerCase()}:\n\n**Hostname:** \`${json.hostname}\`\n\n**ISO 3166:** ${json.country}\n\n**Screen Resolution:** ${json.screenres}\n\n**ID**: \`${json.id}\`\n\n***To learn more about VNCs, run </about vnc:1001927609455738911>.***`)
			interaction.editReply({ embeds: [embed] });
		} else if(cmd == "id"){
			const id = interaction.options.getString("id");
			const response = await fetch(`https://computernewb.com/vncresolver/api/scans/vnc/id/${id}`);
			const json = await response.json();

			//check if JSON has error
			if(json.error){
				interaction.editReply(`❌ **This ID does not exist!**`);
				return;
			}

			const embed = new EmbedBuilder()
				.setTitle(`VNC Server - ${json.id}`)
				.setURL(`http://computernewb.com/vncresolver/dark/browse/?id=${json.id}`)
				.setImage(`http://computernewb.com/vncresolver/screenshots/${json.ip}_${json.port}.jpg`)
				.setDescription(`**IP:** \`${json.ip}:${json.port}\`\n\n**Client Name:** ${json.clientname}\n\n**ASN (Org):** ${json.asn}\n\n**Location:** ${json.city}, ${json.state}, ${json.country} :flag_${json.country.toLowerCase()}:\n\n**Hostname:** \`${json.hostname}\`\n\n**ISO 3166:** ${json.country}\n\n**Screen Resolution:** ${json.screenres}\n\n**ID**: \`${json.id}\`\n\n***To learn more about VNCs, run </about vnc:1001927609455738911>.***`)
			interaction.editReply({ embeds: [embed] });
		} else if(cmd == "country"){
			const id = interaction.options.getString("iso-3166").toUpperCase();
			const response = await fetch(`https://computernewb.com/vncresolver/api/scans/vnc/search?country=${id}`);
			const json = await response.json();

			//check if JSON has error
			if(json.error){
				interaction.editReply(`❌ **Country name must be an [ISO 3166-1 alpha-2](<https://www.iban.com/country-codes>) code (i.e. \`GB\` for England, \`US\` for United States)**`);
				return;
			}

			const embed = new EmbedBuilder()
				.setTitle(`VNC Server - ${json.id}`)
				.setURL(`http://computernewb.com/vncresolver/dark/browse/?id=${json.id}`)
				.setImage(`http://computernewb.com/vncresolver/screenshots/${json.ip}_${json.port}.jpg`)
				.setDescription(`**IP:** \`${json.ip}:${json.port}\`\n\n**Client Name:** ${json.clientname}\n\n**ASN (Org):** ${json.asn}\n\n**Location:** ${json.city}, ${json.state}, ${json.country} :flag_${json.country.toLowerCase()}:\n\n**Hostname:** \`${json.hostname}\`\n\n**ISO 3166:** ${json.country}\n\n**Screen Resolution:** ${json.screenres}\n\n**ID**: \`${json.id}\`\n\n***To learn more about VNCs, run </about vnc:1001927609455738911>.***`)
			interaction.editReply({ embeds: [embed] });
		}
	},
};