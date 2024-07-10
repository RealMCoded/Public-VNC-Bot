const { EmbedBuilder } = require('discord.js');

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
		.setFooter({text:'For educational purposes only. Please do not attempt to connect to these VNCs.'})
    return embed
}

async function vnc_count() 
{
    const res = await fetch("https://computernewb.com/vncresolver/api/scans/vnc/stats")

    const json = await res.json()

    return json.num_vncs
}

async function random_vnc() 
{
    const res = await fetch("https://computernewb.com/vncresolver/api/scans/vnc/random")

    const json = await res.json()

    return json
}

async function vnc_id(id) 
{
    const res = await fetch(`https://computernewb.com/vncresolver/api/scans/vnc/id/${id}`)

    const json = await res.json()

    return json
}

async function vnc_name(name) 
{
    const res = await fetch(`https://computernewb.com/vncresolver/api/scans/vnc/search?clientname=${name}`)

    let json = await res.json()

    if (json.count == 0)
    {
        return {error: `No results for search query ${name}`}
    }

    //Because of an API change it pulls multiple at a time, so to add the randomness back we just pick from one of the provided results
	let rnd_vnc = json.result[Math.floor(Math.random() * json.count)]
	json = await vnc_id(rnd_vnc)

    return json
}

async function vnc_country(country) 
{
    const res = await fetch(`https://computernewb.com/vncresolver/api/scans/vnc/search?country=${country}`)

    let json = await res.json()

    if (json.count == 0)
        {
            return {error: `No results for search query ${country}`}
        }

    //Because of an API change it pulls multiple at a time, so to add the randomness back we just pick from one of the provided results
	let rnd_vnc = json.result[Math.floor(Math.random() * json.count)]
	json = await vnc_id(rnd_vnc)

    return json
}

async function vnc_asn(asn) 
{
    const res = await fetch(`https://computernewb.com/vncresolver/api/scans/vnc/search?asn=${asn}`)

    let json = await res.json()

    if (json.count == 0)
    {
        return {error: `No results for search query ${asn}`}
    }

    //Because of an API change it pulls multiple at a time, so to add the randomness back we just pick from one of the provided results
	let rnd_vnc = json.result[Math.floor(Math.random() * json.count)]
	json = await vnc_id(rnd_vnc)

    return json
}

module.exports = { vnc_count, random_vnc, vnc_id, build_embed, vnc_name, vnc_country, vnc_asn }