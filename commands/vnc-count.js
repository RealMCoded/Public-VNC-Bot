const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vnc-count')
		.setDescription('Get the current number of VNCs in the database.'),
	async execute(interaction) {
		await interaction.deferReply()
        const response = await fetch("https://computernewb.com/vncresolver/api/scans/vnc/stats");
		const json = await response.json();
        interaction.editReply(`🔢 **There are currently \`${json.num_vncs}\` VNCs in the database.**`);
	},
};