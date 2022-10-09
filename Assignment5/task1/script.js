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
    if (temp === 0) {
        //svgThermometer.getElementById('bulb').setAttribute('fill', 'rgb(0,0,0)');
        //svgThermometer.setAttributeNS(null, bulb, rgb(0,0,0));
        //svgThermometer.style.fill = '#000';
        //document.getElementById('bulb').setAttributeNS(null, fill, rgb(0,0,0));
        svgDoc.getElementById('bulb').setAttributeNS(null, 'fill', '#000');
        svgDoc.getElementById('gauge').setAttributeNS(null, 'stroke', '#000');
    }
    else {
        //svgThermometer.getElementById('bulb').setAttribute('fill', 'rgb(255,255,0)');
        //svgThermometer.setAttributeNS(null, bulb, rgb(255,255,0));
        //svgThermometer.style.fill = '#ff0';
        //document.getElementById('bulb').setAttributeNS(null, fill, rgb(0,0,0));
        svgDoc.getElementById('bulb').setAttributeNS(null, 'fill', '#ff0');
        svgDoc.getElementById('gauge').setAttributeNS(null, 'stroke', '#ff0');
    }
}

function setSVG(temp) {
    console.log('TEMPERATURE: ' + temp);
    timer = 0;
    fauto = false;
    applySVG(temp);
}

setInterval(()=> {
    timer++;
    console.log('Timer: ' + timer);
    if(timer >= 10) {
        fauto = true;
        document.querySelector('#temperature').value = 0;
        applySVG(30);
    }
}, 1000);

submitButton.addEventListener('click', setSVG(Number(document.querySelector('#temperature').value)));