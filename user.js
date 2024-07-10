/*
    User installable command example
    You cannot use SlashCommandBuilder here, you have to type manual JSON data.
    To help with this, I show the data for each command in the console when you push it.
    You should be able to take that data and add the following to it at the very end to make it user installable:
    
    integration_types: [0, 1], //0=server installable, 1=user installable
    contexts: [0, 1, 2], //0=GUILD, 1=BOT_DM, 2=PRIVATE_CHANNEL. You should be able to leave this as default.
*/
module.exports = {
    data: {
        name: "userappcommand",
        description: "User install command test",
        integration_types: [0, 1], //0=server installable, 1=user installable
        contexts: [0, 1, 2], //0=GUILD, 1=BOT_DM, 2=PRIVATE_CHANNEL. You should be able to leave this as default.
        "options": [
            {
                "name": "animal",
                "description": "The type of animal",
                "type": 3,
                "required": true
            },
            {
                "name": "only_smol",
                "description": "Whether to show only baby animals",
                "type": 5,
                "required": false
            }
        ]
    },
    async execute(interaction){
        await interaction.reply("This is a user app command!")
    }
}