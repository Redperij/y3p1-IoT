//<script defer src="../die.js"></script>

//Not used

/**********************/
/* Main Functionality */
/**********************/

function RollDie() {
    let result = Math.floor(Math.random() * 6 + 1);
	console.log('IT WORKS! ' + result);
	//document.querySelector('#die_button').textContent = 'Hey' + result;
    if ('URLSearchParams' in window) {
        var searchParams = new URLSearchParams(window.location.search)
        searchParams.set("roll", result);
        var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
        history.pushState(null, '', newRelativePathQuery);
    }
}
/*
function UpdatePicture(result) {
    document.querySelector('.die').src = '/image/' + result + '.png';
}
*/
/********************/
/* Button Listeners */
/********************/

const RollDieButton = document.querySelector('#die_button');
RollDieButton.addEventListener('click', RollDie);