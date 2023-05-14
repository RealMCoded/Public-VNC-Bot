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
		try {
		let response, json;
		const cmd = interaction.options.getSubcommand()
		await interaction.deferReply()

		if(cmd == "random"){
			response = await fetch("https://computernewb.com/vncresolver/api/scans/vnc/random");
			json = await response.json();
		} else if(cmd == "id"){
			const id = interaction.options.getString("id");
			response = await fetch(`https://computernewb.com/vncresolver/api/scans/vnc/id/${id}`);
			json = await response.json();

			if(json.error){
				interaction.editReply(`❌ **This ID does not exist!**`);
				return;
			}
		} else if(cmd == "country"){
			const id = interaction.options.getString("iso-3166").toUpperCase();
			response = await fetch(`https://computernewb.com/vncresolver/api/scans/vnc/search?country=${id}`);
			json = await response.json();

			//check if JSON has error
			if(json.error){
				interaction.editReply(`❌ **Country name must be an [ISO 3166-1 alpha-2](<https://www.iban.com/country-codes>) code (i.e. \`GB\` for England, \`US\` for United States)**`);
				return;
			}

			//Because of an API change it pulls multiple at a time, so to add the randomness back we just pick from one of the provided results
			let rndid = json.result[Math.floor(Math.random() * json.count)]
			response = await fetch(`https://computernewb.com/vncresolver/api/scans/vnc/id/${id}`);
			json = await response.json();
		}

		//Remove all empty strings with *N/A*
		for (var key in json) {
			if (json[key] == "") {
				json[key] = "*N/A*";
			}
		}

		var createdat = json.createdat.slice(0, -5)

		const embed = new EmbedBuilder()
				.setTitle(`VNC Server - ${json.id}`)
				.setURL(`https://computernewb.com/vncresolver/browse/#id/${json.id}`)
				.setImage(`https://computernewb.com/vncresolver/api/scans/vnc/screenshot/${json.id}`)
				.addFields({ name: 'IP', value: `\`${json.ip}:${json.port}\``, inline: true })
				.addFields({ name: 'Client Name', value: json.clientname, inline: true })
				.addFields({ name: 'ASN (Org)', value: json.asn, inline: true })
				.addFields({ name: 'Location', value: `${json.city}, ${json.state}, ${json.country} :flag_${json.country.toLowerCase()}:`, inline: true })
				.addFields({ name: 'Hostname', value: json.hostname, inline: true })
				.addFields({ name: 'Screen Resolution', value: json.screenres, inline: true })
				.addFields({ name: 'Client Name', value: json.clientname, inline: true })
				.addFields({ name: 'OS Name', value: json.osname, inline: true})
				.addFields({ name: 'Open Ports', value: json.openports, inline: true })
				.addFields({ name: 'Username', value: json.username, inline: true })
				.addFields({ name: 'Password', value: json.password, inline: true })
				.addFields({ name: 'Index Date', value: `<t:${createdat}:f>`, inline: true })
				.setFooter({text:'All information is shown at time of indexing and may be inaccurate.'})
			interaction.editReply({ embeds: [embed] });
		} catch (e) {
			console.log(e)
		}
	},
};