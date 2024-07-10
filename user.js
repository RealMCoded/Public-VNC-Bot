module.exports = {
    data: {
        name: "userappcommand",
        description: "User install command test",
        integration_types: [1],
        contexts: [0, 1, 2],
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
        await interaction.reply("hey!")
    }
}