const { Events, Collection, PermissionsBitField } = require('discord.js');
const fs = require('node:fs');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		//check perms before running commands
		if (interaction.guild == null)
		{
			//running as a user command
			const bitPermissions = new PermissionsBitField(interaction.member.permissions);
	
			if (!bitPermissions.has(PermissionsBitField.Flags.EmbedLinks)) {
				return interaction.reply({content: "You don't have permission to Embed Links in this channel.", ephemeral: true})
			}
		}
		else
		{
			//running in server
			if (!interaction.channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.EmbedLinks)) {
				return interaction.reply({content: "The bot doesn't have permission to Embed Links in this channel.", ephemeral: true})
			}
		}

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		//cooldown
		const { cooldowns } = interaction.client;
		if (!cooldowns.has(command.data.name)) {
			cooldowns.set(command.data.name, new Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.data.name);
		const defaultCooldownDuration = 3;
		const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1_000;

		if (timestamps.has(interaction.user.id)) {
			const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

			if (now < expirationTime) {
				const expiredTimestamp = Math.round(expirationTime / 1_000);
				return interaction.reply({ content: `⏳ **Please wait, you are on a cooldown for \`${command.data.name}\`.** You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
			}
		}

		timestamps.set(interaction.user.id, now);
		setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

		try {
			await command.execute(interaction);

			let users = JSON.parse(fs.readFileSync("./warnings-shown.json"))
			
			if (!users.includes(interaction.user.id))
			{
				let message = fs.readFileSync("./welcome.txt", 'utf-8')
				interaction.followUp({ content: message, ephemeral: true })

				users.push(interaction.user.id)
				fs.writeFileSync("./warnings-shown.json", JSON.stringify(users))
			}
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	},
};