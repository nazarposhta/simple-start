
function articlesCreator(data) {
    let oneArticle = document.createElement('div');
    oneArticle.className = 'one-article';

    let img = document.createElement('img');
    img.src = data.image;

    let title = document.createElement('p');
    title.innerText = data.title;

    let preamble = document.createElement('p');
    preamble.innerText = data.preamble;

    oneArticle.appendChild(img);
    oneArticle.appendChild(title);
    oneArticle.appendChild(preamble);
    return oneArticle;
}

function getData(url) {
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

let articles = getData('http://localhost:6010/articles/sports');
articles
    .then((art) => {
        console.log(art)
        let mainContainer = document.getElementById('main-container');
        if(art.articles){
            art.articles.forEach((oneSet) => {
                let oneArt = articlesCreator(oneSet);
                mainContainer.appendChild(oneArt);
            })
        } else {
            let message = document.createElement('p');
            message.innerText = art.message;
            mainContainer.appendChild(message);
        }

    })
    .catch((err) => {
        let message = document.createElement('p');
        message.innerText = 'Unexpected error, please refresh the page';
        mainContainer.appendChild(message);
    });

let mainContainer = document.createElement('div');
mainContainer.id = 'main-container';
document.body.appendChild(mainContainer);