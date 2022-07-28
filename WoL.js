const dgram = require('dgram');
const { Buffer } = require('buffer');


const MacRegex = /([0-9a-f]{2}:){5}[0-9a-f]{2}/i

const getMagicPacket = (mac) => {
    if (!mac.match(MacRegex)) {
        throw new Error('Mac Address Incorrect');
    }

    /*
    The magic packet is a frame that is most often sent as a broadcast and that contains anywhere
    within its payload 6 bytes of all 255 (FF FF FF FF FF FF in hexadecimal), followed by
    sixteen repetitions of the target computer's 48-bit MAC address, for a total of 102 bytes. 
    */
    const macAddress = mac.replace(/([^A-F^a-f^0-9])/g, '');
    const buf = Buffer.allocUnsafe(102);
    buf.write('ffffffffffff', 'hex');
    for (let i = 1; i < 17; i++) {
        buf.write(macAddress, i * 6, 'hex');
    }

    return buf;
};

const send = (macAddress, callback) =>{
    const destination = '255.255.255.255';
    let payload = getMagicPacket(macAddress);
    let socket = dgram.createSocket('udp4');
    let timer;

    socket.on('error', (err) => {
        socket.close();
        callback(err);
    });
    socket.once('listening', () => {
        socket.setBroadcast(true);
    });


    socket.send(payload, 0, payload.length, 9, destination, (err) => {
        if (err) {
            socket.close();
            callback(err);
        } else {
            callback();
        }
    });
}

module.exports = {send};