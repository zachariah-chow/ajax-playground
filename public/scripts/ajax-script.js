const sendHttpRequest = (method, url) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url);

        xhr.responseType = 'json';

        xhr.addEventListener('load', () => {

            //This is necessary because 'bad' status codes ('404' etc) are not http error events
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(new Error('Something fucked up'));
            }
        });

        //This will only log network errors and the like.
        xhr.addEventListener('error', () => {
            reject(new Error('Request failed due to some shit'));
        })

        xhr.send();
    });

    return promise;
}

//Ex. AJAX GET request to '/get'

const fetchData = async () => {
    const data = await sendHttpRequest('GET', '/get')

    for (const dataProp in data) {
        dataEl = document.createElement('p');
        dataEl.innerText = data[dataProp]
        document.querySelector('main').appendChild(dataEl);
    }
}

document.querySelector('button').addEventListener('click', fetchData);