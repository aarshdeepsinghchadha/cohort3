const axios = require('axios');

const url = 'https://httpdump.app/dumps/75f22121-0e52-4e5e-b061-630d7d761679';
const username = 'aarshdeep';  
const password = 'IamPlaying'; 


function createHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64') // Base64 encode username:password
    };
}

function postDataUsingAxios() {
    axios.post(url, {
        message: 'This is a POST request',
        data: 'Some random data'
    }, {
        headers: createHeaders()
    })
    .then(response => {
        console.log('Data from POST:', response.data);
    })
    .catch(error => {
        console.error('Error with POST request:', error);
    });
}

function putDataUsingAxios() {
    axios.put(url, {
        message: 'This is a PUT request',
        data: 'Updated random data'
    }, {
        headers: createHeaders()
    })
    .then(response => {
        console.log('Data from PUT:', response.data);
    })
    .catch(error => {
        console.error('Error with PUT request:', error);
    });
}


function deleteDataUsingAxios() {
    axios.delete(url, {
        headers: createHeaders()
    })
    .then(response => {
        console.log('DELETE request successful:', response.status);
    })
    .catch(error => {
        console.error('Error with DELETE request:', error);
    });
}


function main() {
    postDataUsingAxios(); 
    putDataUsingAxios();
    deleteDataUsingAxios();
}

main();
