// Promise one
function bestRockBand(band) {
    return new Promise((resolve, reject) => {
        if (band == "Metallica") {
            resolve({
                success: true,
                bandName: band,
                msg: `${band} is the best rock band ever!`
            });
        } else {
            reject({
                success: false,
                msg: 'I\'m not so sure!'
            });
        }
    });
}

// Promise two
function bestRockSong(response) {
    return new Promise((resolve, reject) => {
        if (response.success) {
            resolve(`Enter Sandman by ${response.bandName}`);
        } else {
            reject(`Do you now Metallica?`);
        }
    });
}

// Call
bestRockBand('Metallica')
    .then(response => {
        console.log('Checking the answer...');
        return bestRockSong(response)
    })
    .then(response => {
        console.log('Finding the best song...');
        console.log(response);
    })
    .catch(err => {
        console.log(err.msg);
    })