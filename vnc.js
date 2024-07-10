const { EmbedBuilder } = require('discord.js');
const iso = require("./iso3311a2.json")

/**
 * Creates an embed based off of the provided JSON data for VNC information.
 * @param {JSON} json 
 * @returns Discord.JS Embed
 */
async function build_embed(json)
{
    if (json.error)
    {
        const embed = new EmbedBuilder()
            .setTitle(`Error!`)
            .setDescription(`Server returned error: \"${json.error}\"`)
        return embed
    }
    //Remove all empty strings with *N/A*
	for (let key in json) {
		if (json[key] == "" || json[key] == null) {
			json[key] = "*N/A*";
		}
	}

	let createdat = json.createdat.slice(0, -5)

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
		.addFields({ name: 'OS Name', value: json.osname, inline: true})
		.addFields({ name: 'Open Ports', value: json.openports, inline: true })
		.addFields({ name: 'Username', value: json.username, inline: true })
		.addFields({ name: 'Password', value: json.password, inline: true })
		.addFields({ name: 'Index Date', value: `<t:${createdat}:f>`, inline: true })
		.setFooter({text:'For research and entertainment purposes only. Do not attempt to connect to these VNCs.'})
    return embed
}

/**
 * Returns the total number of VNC servers.
 * @returns {int} VNC Count
 */
async function vnc_count() 
{
    const res = await fetch("https://computernewb.com/vncresolver/api/scans/vnc/stats")

    const json = await res.json()

    return json.num_vncs
}

/**
 * Fetches a random VNC server.
 * @returns {JSON} 
 */
async function random_vnc() 
{
    const res = await fetch("https://computernewb.com/vncresolver/api/scans/vnc/random")

    const json = await res.json()

    return json
}

/**
 * Fetches a VNC server from it's ID.
 * @param {String} id 
 * @returns {JSON}
 */
async function vnc_id(id) 
{
    const res = await fetch(`https://computernewb.com/vncresolver/api/scans/vnc/id/${id}`)

    const json = await res.json()

    return json
}

/**
 * Returns a random VNC server based off of it's client name.
 * @param {String} name 
 * @returns {JSON} 
 */
async function vnc_name(name) 
{
    const res = await fetch(`https://computernewb.com/vncresolver/api/scans/vnc/search?clientname=${name}&full=true`)

    const json = await res.json()

    if (json.count == 0)
    {
        return {error: `No results for search query ${name}`}
    }

    //Because of an API change it pulls multiple at a time, so to add the randomness back we just pick from one of the provided results
    return json.result[Math.floor(Math.random() * json.count)]
}

/**
 * Returns a random VNC server based off of it's country.
 * @param {String} country 
 * @returns {JSON}
 */
async function vnc_country(country) 
{
    //check to see if its a valid ISO code before executing anything
    if (!iso.includes(country))
    {
        return {error: `${country} is not a valid ISO 3166-1 alpha-2 code.`}
    }

    const res = await fetch(`https://computernewb.com/vncresolver/api/scans/vnc/search?country=${country}&full=true`)

    const json = await res.json()

    if (json.count == 0)
        {
            return {error: `No results for search query ${country}`}
        }

   //Because of an API change it pulls multiple at a time, so to add the randomness back we just pick from one of the provided results
   return json.result[Math.floor(Math.random() * json.count)]
}

/**
 * Returns a random VNC server based off of it's ASN code.
 * @param {String} asn 
 * @returns {JSON}
 */
async function vnc_asn(asn) 
{
    const res = await fetch(`https://computernewb.com/vncresolver/api/scans/vnc/search?asn=${asn}&full=true`)

    const json = await res.json()

    if (json.count == 0)
    {
        return {error: `No results for search query ${asn}`}
    }

    //Because of an API change it pulls multiple at a time, so to add the randomness back we just pick from one of the provided results
    return json.result[Math.floor(Math.random() * json.count)]
}

module.exports = { vnc_count, random_vnc, vnc_id, build_embed, vnc_name, vnc_country, vnc_asn }