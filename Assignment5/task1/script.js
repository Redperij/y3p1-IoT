'use strict';

const svgThermometer = document.querySelector('#thermometer');
const submitButton = document.querySelector('#submit');
const tempValue = document.querySelector('#temperature');

let timer = 10;
let fauto = true;

const colorLerp = (color1, color2, percentage) => {
	const [rStart, gStart, bStart] = [color1 & 0xff0000, color1 & 0xff00, color1 & 0xff];
	const [rDiff, gDiff, bDiff] = [
		(color2 & 0xff0000) - rStart,
		(color2 & 0xff00) - gStart,
		(color2 & 0xff) - bStart];

    return '#' + (Math.floor(rStart + rDiff * percentage) & 0xff0000
			| Math.floor(gStart + gDiff * percentage) & 0xff00
			| Math.floor(bStart + bDiff * percentage) & 0xff).toString(16).padStart(6, '0');
}

function applySVG(temp) {
    const svgDoc = svgThermometer.contentDocument;
    const step = 500 / 30;
    let valid_temp = 0;
    let len = 675;

    //Get valid temperature
    if(temp < -30) valid_temp = -30;
    else if(temp > 30) valid_temp = 30;
    else valid_temp = temp;
    
    //Get thermometer length
    if (valid_temp <= 0 ) len = 675;
    else if (valid_temp <= 30) len = Math.floor(675 - (step * valid_temp));

    console.log('TEMPERATURE: ' + valid_temp);

    //Get percentage for colour change
    let percent = (valid_temp + 30) / 60;
    console.log('Percent: ' + percent);
    let colour = colorLerp(0x0000ff, 0xff0000, percent);
    console.log('Colour: ' + colour);

    svgDoc.getElementById('bulb').setAttributeNS(null, 'fill', colour);
    svgDoc.getElementById('gauge').setAttributeNS(null, 'stroke', colour);
    svgDoc.getElementById('gauge').setAttributeNS(null, 'd', 'M500,750L500,' + len);
}

function setSVG() {
    let temp = Number(document.querySelector('#temperature').value);
    timer = 0;
    fauto = false;
    applySVG(temp);
}

setInterval(()=> {
    timer++;
    console.log('Timer: ' + timer);
    if(fauto || timer === 10) {
        if(!fauto) document.querySelector('#temperature').value = 0;
        fauto = true;
        applySVG(Math.floor(Math.random() * 60 - 30));
    }
}, 1000);

submitButton.addEventListener('click', setSVG);
