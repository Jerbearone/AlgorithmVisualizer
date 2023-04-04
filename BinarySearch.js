import anime from './node_modules/animejs/lib/anime.es.js';

//myAnimation = document.getElementById("algorithmAnimation");
let itemNumber = 100;

//form for user to change amount of nodes for the algorithm
let nodeInput = document.getElementById("numOfElementsForm");
//the y value that will control downward movement in the animation
let yTralsationValue = 0
// the shape in the html file
let rootShape = document.querySelector('.shape');

//TODO get an array of all the shape id's, so we can itterate through 

let animator = null;

let startAnimator =  async function(){
    animator = anime.timeline({
        duration: 300
    })
}

let setupAnimation = async function() {
    animator.add({
        targets: '.shape',
        translateX: 10,
        duration: 400,
    });
    console.log(animator);
}

let moveAllDown = function() {
    addMoveDownValue();
    animator.add({
        targets: '.shape',
        translateY: yTralsationValue,
        duration: 1200,
    })
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


let bringShapeToCurrentYValue = function(IdOfElement) {
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

let binarySearch = async function() {
    //get the array
    let shapeArray = document.getElementsByClassName('shape');
    //get a random element to search for
    let arrayLength = shapeArray.length;
    console.log(arrayLength);
    let randomNumber = getRandomNumber(0, itemNumber);

    //TODO add code to show the random ID
    console.log("random Id: " + shapeArray[randomNumber].id)

    let randomId = shapeArray[randomNumber].id;
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
            bringShapeToCurrentYValue;
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
            bringShapeToCurrentYValue(shapeArray[middleIndex].id);
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
            //bringShapeToCurrentYValue(shapeArray[highIndex].id);
            bringShapeToCurrentYValue(shapeArray[middleIndex].id);
            //make y value go down so you can visually see steps
            addMoveDownValue();
            console.log(" random number less than mid index: " + lowIndex + " " + middleIndex + " " + highIndex);
        }
    }
}

let setupShapes = function() {
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
}

let changeShapeAmount = async function() {
    let removableShape = document.getElementsByClassName('shape');
    while(removableShape[0]) {
        removableShape[0].parentNode.removeChild(removableShape[0]);
    }
}

async function updateNodes() {
    await changeShapeAmount();
    setupShapes();
    await startAnimator();
    await setupAnimation();
    await binarySearch();
}
window.onload = function() {
    setupShapes();
    //Removes the original ("root") node. Now all nodes have functionality.
    document.getElementsByClassName('shape')[0].remove();

    //add event listener to accept the users amount of nodes
    nodeInput.addEventListener('submit', function() {
        itemNumber =  parseInt(document.getElementById('numOfElementsForm')[0].value);
        console.log(itemNumber);
        yTralsationValue = 0;
        if (itemNumber < 2) {
            alert("please use more than one node");
        }else if (itemNumber > 300 && itemNumber < 1000) {
            alert("Please zoom out on your device to see the nodes moving");
            updateNodes();

        }else if (itemNumber > 1000) {
            alert("to avoid performance issues, please don't create too many nodes.");

        } else {
            updateNodes();
        }
        
    })
    startAnimator();
    setupAnimation()
    binarySearch();
}











