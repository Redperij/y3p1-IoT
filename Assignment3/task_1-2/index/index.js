'use strict';

(() => {
    const cardiv = document.getElementById('cars');
    fetch('/cars').then(res => res.json()).then(cars => {
        console.log(cars);
        for(const car of cars) {
            const rawCarJson = document.createElement('div');
            const carText = document.createElement('p');
            carText.innerText = JSON.stringify(car);
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.id = car.id;
            rawCarJson.appendChild(carText);
            rawCarJson.appendChild(deleteButton);

            deleteButton.addEventListener('click', event => {
                event.preventDefault();

                fetch('/' + car.id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res=> {
                    if (res.status === 200) {
                        rawCarJson.parentNode.removeChild(rawCarJson);
                    } else {
                        return Promise.reject(res.text());
                    }
                }).catch(error => console.error(error));
            });
            cardiv.appendChild(rawCarJson);
        }
    });
}).call({});