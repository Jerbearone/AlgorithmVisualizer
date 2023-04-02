import anime from '/node_modules/animejs/lib/anime.es.js';

//myAnimation = document.getElementById("algorithmAnimation");
let itemNumber = 50;
//create a shape to clone
let cloneShape = document.createDocumentFragment();
// the shape in the html file
let rootShape = document.querySelector('.shape');

let animationSection = document.getElementById('animationSection');

//TODO get an array of all the shape id's, so we can itterate through 

let animator = anime.timeline({
    duration: 500
});

let setupAnimation = function() {
    animator.add({
        targets: '.shape',
        translateX: 25,
        duration: 1200,
    });
    console.log(animator);


}

let moveDown = function() {
    animator.add({
        targets: '.shape',
        translateY: 50,
        duration: 1200,
    })
}

let moveSingleShapeDown = function() {

    animator.add({
        targets: (document.getElementById('shape20')),
        translateY: 77,
        duration: 1200
    })
}



//create loop for user to see the algorithm work.
window.onload = function() {
    for (let x = 0; x < itemNumber; x++) {
        //create a ton of shapes for the user
        let shape = rootShape.cloneNode(true);
        shape.classList.add('.shape');
        shape.id="shape" + x;

        cloneShape.appendChild(shape);
        animationSection.appendChild(cloneShape);

        //load the intro animation
     
    }
    setupAnimation()
    moveDown();
    moveSingleShapeDown();
}











