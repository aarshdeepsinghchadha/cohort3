const axios = require('axios');

function fetchDataUsingFetch() {
    fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(data => {
            console.log('Data from fetch:', data);
        })
        .catch(error => {
            console.error('Error with fetch:', error);
        });
}

function postDataUsingFetch() {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data from fetch POST:', data);
    })
    .catch(error => {
        console.error('Error with fetch POST:', error);
    });
}







function fetchDataUsingAxios() {
    axios.get('https://randomuser.me/api/')
        .then(response => {
            console.log('Data from axios:', response.data);
        })
        .catch(error => {
            console.error('Error with axios:', error);
        });
}

function postDataUsingAxios() {
    axios.post('https://jsonplaceholder.typicode.com/posts', {
        title: 'foo',
        body: 'bar',
        userId: 1
    })
    .then(response => {
        console.log('Data from axios POST:', response.data);
    })
    .catch(error => {
        console.error('Error with axios POST:', error);
    });
}



function main() {
    fetchDataUsingFetch();
    fetchDataUsingAxios();

    postDataUsingFetch();   // POST using fetch
    postDataUsingAxios();   // POST using axios
}

main();
