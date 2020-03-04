exports.handler = async (event) => {

    if (event.length != 32)
    {
        return "Incorrect Input!";
    }
    
    // default sign to positive
    let sign = 1;
    
    // create total, set equal to 0
    let total = 0;
    
    // extract sign
    let sign_bit = event[0];
    
    // check for negative
    if (sign_bit == "1")
    {
        sign = -1;
    }
    
    // strings to get respective bit sections
    let exponent_bits = "";
    let fraction_bits = "";
    
    // get exponent bits
    for (let i = 1; i < 9; i++ )
    {
        exponent_bits += event[i];
    }
    
    // get exponent in decimal, exponent - the bias, which is 127 in MIPS.
    let real_exponent = parseInt(exponent_bits, 2) - 127;
    let two_raised = Math.pow(2, real_exponent);
    
    // get fraction bits
    for (let i = 9; i < 32; i++)
    {
        fraction_bits += event[i];
    }
    
    // convert fractional binary number to decimal
    let base = 2;
    let fraction_decimal = 0;
    
    for (let i = 0; i < 23; i++)
    {
        fraction_decimal += (parseInt(fraction_bits[i]) / base);
        base *= 2;
    }
    
    // convert
    total = sign * (1 + fraction_decimal) * two_raised;
    
    // json object to return
    let data = 
    {
        "754Binary": event,
        "DecimalConversion": JSON.stringify(total)
    };
    
    return data;
};
