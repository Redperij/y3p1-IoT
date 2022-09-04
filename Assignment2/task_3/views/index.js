'use strict';

async function clear_events() {
    await fetch('/clear', {method: 'post'});
    window.location.assign('/');
}


const clear = document.getElementById('clear');

clear.onclick = async () => {
    clear_events();
}

setInterval(()=>{
    const events = document.getElementById('index_js').getAttribute('data-events');
    console.log('Got events:');
    console.log(events);
    for (const event of events) {
        let counter = new Date(event.date).valueOf() - Date.now();
        if(counter < 0) {
            document.getElementById(event.name).textContent = 'Past already';
        } else {
            document.getElementById(event.name).textContent = Math.floor(counter/1000);
        }
    }
}, 1000)