/*
Author: [Lieu Minh Phu]
CWEB 601 Midterm
*/
let count = 1;




/**
 * Name.		getRandPokemon
 * Summary.		This function creates HTML image string information for random Pokemon. The random 
 * 				images are created by sending a random number to a pokemon image repository that 
 * 				references Pokemon by their pokedex number.
 * @returns 	{string}		imageElement 	A string with the text necessary to create an HTML image 
 * 												element.
 */
function getRandPokemon(){
    let randNum = Math.floor(Math.random()*300 + 1);
    let htmlScript = `
        <div>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randNum}.png" alt="Pokemon Image" id="${count}" class="index${randNum}"/>
        </div>
    `;
    count++;
    return htmlScript;
}


/**
 * Name.		buildBoard
 * Summary.		Uses the getRandomPokemon function to generate an array of random pokemon. There are 8 unique 
 * 				pokemon entered twice for a total of 16 pokemon in the array. The function then randomizes the 
 * 				order of the pokemon in the array and displays them on the site.
 */
function buildBoard() {
    const pokemonImg = [];
    for ( let i = 0 ; i < 8; i++){
        let elementString = getRandPokemon();
        pokemonImg.push(elementString,elementString);
    }
    while(pokemonImg.length > 0){
        let randNum = Math.ceil(Math.random()*(pokemonImg.length-1));
        const returnArr = pokemonImg.splice(randNum,1);
        document.querySelector("main").innerHTML += returnArr;
    }
}
buildBoard();



/**
 * Name.		addListenersToEl
 * Summary.		Adds event listeners to an array of elements passed through
 * @param 		{Array} 		el 				An array of HTML element references	
 */
function addListenersToEl(el) {
    for (let i = 0 ; i < el.length ; i++ ) {
        el[i].addEventListener("click",showImages);
    }  
}



/**
 * Name.		hideImages
 * Summary.		Changes the opacity of images in an array to zero.
 * @param 		{Array} 	arrOfImgesToHide 	An array of HTML image references
 */
function hideImages(arrOfImgesToHide) {
    for (let i = 0 ; i < arrOfImgesToHide.length; i++){
        arrOfImgesToHide[i].style.opacity = 0;
    }
}

const images = document.querySelectorAll("img");
setTimeout(() =>{
    hideImages(images);
} ,5000)

addListenersToEl(images)
/**
 * Name.		showImages
 * Summary.		Changes the opacity of an image. It also limits the player to selecting two images
 * 				at a time and adds the selected images to the guesses array. Once two guesses are made,
 * 				it calls the checkMatch function.
 */
let numberOfImagesGuessed = 0;
const guesses = [];
function showImages() {
    numberOfImagesGuessed++;
    if (numberOfImagesGuessed == 1) {
        this.style.opacity = 1;
        guesses[0] = this;
    }
    else if (numberOfImagesGuessed ==2) {
        this.style.opacity = 1;
        guesses[1] = this;
        checkMatch();
    }
    
}



/**
 * Name.		checkMatch
 * Summary.		Checks if the two selected cards stored in the guesses array match and resets the 
 * 				number of images counter to 0.
 */
function checkMatch(){
    if(guesses[0].className == guesses[1].className){
        numberOfImagesGuessed =0;
    }else {
        setTimeout(()=> {
            hideImages(guesses);
        },1000)
        numberOfImagesGuessed = 0;
    }
}




