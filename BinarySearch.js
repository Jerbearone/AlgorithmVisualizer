import anime from './node_modules/animejs/lib/anime.es.js';

//myAnimation = document.getElementById("algorithmAnimation");
let itemNumber = 80;

//the y value that will control downward movement in the animation
let yTralsationValue = 0
// the shape in the html file
let rootShape = document.querySelector('.shape');

//TODO get an array of all the shape id's, so we can itterate through 

let animator = anime.timeline({
    duration: 300
});

let setupAnimation = function() {
    animator.add({
        targets: '.shape',
        translateX: 10,
        duration: 1200,
    });
    console.log(animator);
}

let moveDown = function() {
    addMoveDownValue();
    animator.add({
        targets: '.shape',
        translateY: yTralsationValue,
        duration: 1200,
    })
}



let getMiddleId = function() {
    let shapeSize = document.getElementsByClassName('shape').length;
    //get the middle item in the array
    let middleIndex = null;
    if (shapeSize % 2 == 0) {
        middleIndex = shapeSize/2;
    } else {
        middleIndex = (shapeSize +1)/2;
    }
    console.log(document.getElementsByClassName('shape')[middleIndex].id);

    return document.getElementsByClassName('shape')[middleIndex].id;
    
}

let moveSingleShapeDown = function(IdOfElement) {
    console.log(IdOfElement);
    addMoveDownValue();
    animator.add({
        targets: (document.getElementById(IdOfElement)),
        translateY: yTralsationValue,
        duration: 400
    })
}


let compareSingleShape = function(IdOfElement) {
    console.log(IdOfElement);

    animator.add({
        targets: (document.getElementById(IdOfElement)),
        translateY: yTralsationValue,
        duration: 400
    })
}

let addMoveDownValue = function() {
    yTralsationValue+=12
}

let getRandomNumber = function(min, max) {
    return Math.floor(Math.random()*(max - min) + min);
}

let binarySearch = function() {
    //get the array
    let shapeArray = document.getElementsByClassName('shape');
    //get a random element to search for
    let arrayLength = shapeArray.length;
    console.log(arrayLength);
    let randomNumber = getRandomNumber(0, itemNumber);

    //TODO add code to show the random ID
    let randomId = shapeArray[randomNumber].id;
    console.log("random Id: " + shapeArray[randomNumber].id)
    document.getElementById("randomValue").innerHTML = randomId;


    //get the middle of the array and check for the match.
    let middleId = null
    let matchFound = false;
    let lowIndex = 0;
    let highIndex = itemNumber;
    let middleIndex = null;
    if (arrayLength % 2 == 0) {
        middleIndex = arrayLength/2;
    } else {
        middleIndex = (arrayLength +1) / 2;
    }
    moveSingleShapeDown(shapeArray[middleIndex].id)
    addMoveDownValue();
    while (matchFound == false) {
        if (randomNumber == middleIndex) {
            middleId = shapeArray[middleIndex].id
            console.log(middleId);
            //yTralsationValue +=20
            compareSingleShape;
            //moveSingleShapeDown(middleId);
            matchFound = true;
            console.log("found the correct index")
        }else if (randomNumber > middleIndex) {
            lowIndex = middleIndex ;
            console.log("low " +lowIndex )
            
            if (lowIndex % 2 == 1) {
                lowIndex += 1;
            }
            if (highIndex %2 == 1) {
                highIndex -=1;
            }
            middleIndex = ((lowIndex + highIndex) / 2) ;
            //compareSingleShape(shapeArray[lowIndex].id);
            compareSingleShape(shapeArray[middleIndex].id);
            addMoveDownValue();
            console.log("random number greater than middle index: " + lowIndex + " " + middleIndex + " " + highIndex);
        }else if (randomNumber < middleIndex) {
            highIndex = middleIndex;
            console.log("high: " + highIndex);
            if (lowIndex % 2 == 1) {
                lowIndex += 1;
            }
            if (highIndex %2 == 1) {
                highIndex -=1;
            }
            middleIndex = ((lowIndex + highIndex) /2) ;
            //compareSingleShape(shapeArray[highIndex].id);
            compareSingleShape(shapeArray[middleIndex].id);
            //make y value go down so you can visually see steps
            addMoveDownValue();
            console.log(" random number less than mid index: " + lowIndex + " " + middleIndex + " " + highIndex);
        }
 
    }
}


window.onload = function() {
    //create loop for user to see the algorithm work.
    for (let x = 0; x < itemNumber; x++) {

        //create a ton of shapes for the user
        let shape = rootShape.cloneNode(true);
        shape.classList.add('.shape');
        shape.id="shape" + x;
        let hoverId = shape.id;

        //add listeners to each shape to show their id's on hover
        shape.addEventListener('mouseover', function() {
            document.getElementById("elementIdHover").innerHTML = hoverId;
        })
        animationSection.appendChild(shape);
     
    }

    //Removes the original ("root") node. Now all nodes have functionality.
    document.getElementsByClassName('shape')[0].remove();
    setupAnimation()
    binarySearch();
}











