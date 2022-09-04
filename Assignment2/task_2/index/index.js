'use strict';

const butB = document.getElementById("b");
const butKB = document.getElementById("kb");
const butMB = document.getElementById("mb");
const butGB = document.getElementById("gb");

const aram_elem = document.getElementById("aram_elem");
const rram_elem = document.getElementById("rram_elem");

let ABSOLUTE_RAM = 0;
let RAM_MODE = 'b';

async function updateRamView (aram, mode) {
    RAM_MODE = mode;
    console.log(aram);
    console.log('Mode = ' + mode);
    switch (mode) {
        case 'b':
            aram_elem.textContent = aram + ' B';
            break;
        case 'kb':
            aram_elem.textContent = Math.floor(aram / 1024) + ' KB';
            break;
        case 'mb':
            aram_elem.textContent = Math.floor(aram / 1048576) + ' MB';
            break;
        case 'gb':
            aram_elem.textContent = Math.floor(aram / 1073741824) + ' GB';
            break;
        default:
            console.log('Must not be executed.');
            break;
    }
}

function setColor (rram) {
    if(rram < 60) {
        aram_elem.style.color = 'green';
        rram_elem.style.color = 'green';
    } else if(rram < 80) {
        aram_elem.style.color = 'black';
        rram_elem.style.color = 'black';
    } else if(rram < 90) {
        aram_elem.style.color = 'orange';
        rram_elem.style.color = 'orange';
    } else {
        aram_elem.style.color = 'red';
        rram_elem.style.color = 'red';
    }
}

function updateRam(aram, rram) {
    ABSOLUTE_RAM = aram;
    updateRamView(aram, RAM_MODE);
    rram_elem.textContent = rram + "%";
    setColor(rram);
}

butB.onclick = () => {
    updateRamView(ABSOLUTE_RAM, 'b')
}

butKB.onclick = () => {
    updateRamView(ABSOLUTE_RAM, 'kb')
}

butMB.onclick = () => {
    updateRamView(ABSOLUTE_RAM, 'mb')
}

butGB.onclick = () => {
    updateRamView(ABSOLUTE_RAM, 'gb')
}

setInterval(async () => {
    fetch('/ram').then(res => res.json()).then(raw_ram => {
        updateRam(raw_ram.aram, raw_ram.rram);
    });
}, 1000);
