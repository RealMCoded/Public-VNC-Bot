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
    
    //Replace null, undefined, or "" strings with "*N/A*""
	for (let key in json) {
		if (json[key] == "" || json[key] == null || json[key] == undefined) {
			json[key] = "*N/A*";
		}
	}

	let createdat = json.scanned_on.toString()

	const embed = new EmbedBuilder()
		.setTitle(`VNC Server - ${json.id}`)
		.setURL(`https://computernewb.com/vncresolver/embed?id=${json.id}`)
		.setImage(`https://computernewb.com/vncresolver/api/v1/screenshot/${json.id}`)
		.addFields({ name: 'IP', value: `\`${json.ip_address}:${json.port}\``, inline: true })
		.addFields({ name: 'Client Name', value: json.desktop_name, inline: true })
		.addFields({ name: 'ASN (Org)', value: json.asn, inline: true })
		.addFields({ name: 'Location', value: `${json.geo_city}, ${json.geo_state}, ${json.geo_country} :flag_${json.geo_country.toLowerCase()}:`, inline: true })
		.addFields({ name: 'Hostname', value: json.rdns_hostname, inline: true })
		.addFields({ name: 'Screen Resolution', value: `${json.width}x${json.height}`, inline: true })
        .addFields({ name: 'Password', value: json.password == "*N/A*" ? "(none)" : `||${json.password}||`, inline: true })
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
    const res = await fetch("https://computernewb.com/vncresolver/api/v1/stats")
    const json = await res.json()

    return json.num_vncs
}

/**
 * Fetches a random VNC server.
 * @returns {JSON} 
 */
async function random_vnc() 
{
    const res = await fetch("https://computernewb.com/vncresolver/api/v1/random")
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
    const res = await fetch(`https://computernewb.com/vncresolver/api/v1/id/${id}`)
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
    const res = await fetch(`https://computernewb.com/vncresolver/api/v1/search?desktop_name=${name}&full=true`)
    const json = await res.json()
    let length = json.results.length

    if (length == 0)
        return {error: `No results for search query ${name}`}

    //Because of an API change it pulls multiple at a time, so to add the randomness back we just pick from one of the provided results
    return json.results[Math.floor(Math.random() * length)]
}

/**
 * Returns a random VNC server based off of it's country.
 * @param {String} country 
 * @returns {JSON}
 */
async function vnc_country(country) 
{
    country = country.toUpperCase();
    
    //check to see if its a valid ISO code before executing anything
    if (!iso.includes(country))
        return {error: `${country} is not a valid ISO 3166-1 alpha-2 code.\n\n[Click here to view a list of all codes](https://localizely.com/iso-3166-1-alpha-2-list/)`}

    const res = await fetch(`https://computernewb.com/vncresolver/api/v1/search?country=${country}&full=true`)
    const json = await res.json()
    let length = json.results.length

    if (length == 0)
        return {error: `No results for search query ${name}`}

    //Because of an API change it pulls multiple at a time, so to add the randomness back we just pick from one of the provided results
    return json.results[Math.floor(Math.random() * length)]
}

/**
 * Returns a random VNC server based off of it's ASN code.
 * @param {String} asn 
 * @returns {JSON}
 */
async function vnc_asn(asn) 
{
    const res = await fetch(`https://computernewb.com/vncresolver/api/v1/search?asn=${asn}&full=true`)
    const json = await res.json()
    let length = json.results.length

    if (length == 0)
        return {error: `No results for search query ${asn}`}

    //Because of an API change it pulls multiple at a time, so to add the randomness back we just pick from one of the provided results
    return json.results[Math.floor(Math.random() * length)]
}

module.exports = { vnc_count, random_vnc, vnc_id, build_embed, vnc_name, vnc_country, vnc_asn }