/*
* Function parses string with unusual date format
* and return proper date object
*
* @param {string}
* */
export const parseDate = (str) => {
    let monthsMap = {
        januar: 0, februar: 1, march: 2, april: 3, mai: 4,
        jun: 5, july: 6, august: 7, september: 8, oktober: 9,
        november: 10, desember: 11
    }
    let dayMonthYear = str.split('.');
    let day = parseInt(dayMonthYear[0], 10);
    let monthYear = dayMonthYear[1].trim().split(' ');
    return new Date(monthYear[1], monthsMap[monthYear[0]], day);
}


/**
 * Asynchronous function which executes single GET request to the server by URL
 * @param url
 * @returns {Promise<any>}
 */
const executeUrl = (url) => {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function () {
            let json = JSON.parse(xhr.response);
            if(xhr.status === 200 || xhr.status === 404) {
                resolve(json);
            } else {
                reject(json);
            }
        }
        xhr.onerror = function (error) {
            reject(error);
        }
        xhr.send();
    })
}

/**
 * Asynchronous function which execute a bunch of GET requests then
 * merges data from the server
 * @param sources {Array}
 * @returns {Promise<any>}
 */
export const getData = (sources) => {
    let arrayOfPromises = [];
    sources.forEach((source) => {
        arrayOfPromises.push(executeUrl('http://localhost:6010' + source));
    })
    let articles = [];
    return Promise.all(arrayOfPromises)
        .then((art) => {
            art.forEach((bunch) => {
                articles = [ ...articles, ...bunch.articles ]
            })
            return articles;
        })
        .catch((err) => {
            return err;
        });
}