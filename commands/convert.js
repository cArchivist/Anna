exports.run = (client, message, args) => {
    var inVal = args.join(" ");
    const pattern = /(-*\d+(\.\d+)*)\s*([a-zA-Z])/;
    var matchArray = inVal.match(pattern);
    console.log(matchArray)
    var num_ = parseFloat(matchArray[1])
    var unit = matchArray[3].toUpperCase()

    switch(unit) {
        case "F":
            var out = convertTemp(num_, "F")
            message.channel.send(`That's ${out} C!`)
            break;
        case "C":
            var out = convertTemp(num_, "C")
            message.channel.send(`That's ${out} F!`)
            break;
        default:
            message.channel.send(`I didn't understand what you meant by ${inVal}.`)
    }
}

function convertTemp(val, unit) {
    if (unit == "F") {
        return ((val - 32.0) * 5.0 / 9.0).toFixed(2)
    } else if (unit == "C") {
        return (val * 9.0 / 5.0 + 32.0).toFixed(2)
    }
}