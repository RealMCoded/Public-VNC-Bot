const { Events, ActivityType } = require('discord.js');
const { vnc_count } = require("../vnc.js")

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
        const num_vnc = await vnc_count()

		client.user.setActivity(`${num_vnc} VNC Servers`, { type: ActivityType.Watching });

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};