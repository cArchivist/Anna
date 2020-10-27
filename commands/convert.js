exports.run = (client, message, args) => {
    var inVal = args.join(" ");
    const pattern = /(-*\d+(\.\d+)*)\s*([a-zA-Z])/;
    var matchArray = str.match(pattern);
    var num_ = parseFloat(matchArray[1])
    var unit = matchArray[2].toUpperCase()

    switch(unit) {
        case "F":
            var out = convertTemp(num_, "F")
            message.channel.send(`That's ${out} C!`)
        case "C":
            var out = convertTemp(num_, "C")
            message.channel.send(`That's ${out} F!`)
    }
}

function convertTemp(val, unit) {
    if (unit == "F") {
        return (val - 32.0) * 5.0 / 9.0
    } else if (unit == "C") {
        return val * 9.0 / 5.0 + 32.0
    }
}