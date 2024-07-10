(async ()=>{
    const {vnc_count} = require("./vnc.js")

    console.log(await vnc_count())
})()