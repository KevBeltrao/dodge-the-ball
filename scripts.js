let horizontal = 60; //posiçãoX
let vertical = 60; //posiçãoY
let i;
let j;
let limX = 500; //ignora esses valores, setei porque só recebo os valores reais quando a função roda uma vez
let limY = 500;
let charX = 800;
let charY = 500;
let speed = 4;
let speedVal = 0;

let screenWidth = document.body.clientWidth;
let screenHeight = document.body.clientHeight;

const biggerRadius = 60;
const smallerRadius = 30;

let command = '';

let seconds = 0;
let milliseconds = 0;

const getDistance = (x1, y1, x2, y2) => Math.sqrt(Math.pow((x2-x1), 2) + Math.pow((y2-y1), 2));

const resetInfo = () => {
    horizontal = 60;
    vertical = 60;
    charX = 800;
    charY = 500;
    speed = 4;
    command = '';
    
    document.getElementById('character').style.left = charX + 'px';
    document.getElementById('character').style.bottom = charY + 'px';

    document.querySelector('button').style.display = 'none';
    document.querySelector('h1').style.display = 'none';
    document.getElementById('bouncingBall').style.display = 'block';
    document.querySelector('#character').style.display = 'flex';
    document.getElementById('counter').style.display = 'block';

    document.getElementById('counter').innerText = '0 second';

    document.getElementById('character').style.display = 'flex';
    document.getElementsByClassName('eyes')[0].style.backgroundColor = 'black';
    document.getElementsByClassName('eyes')[0].innerText = '';
    document.getElementsByClassName('eyes')[1].style.backgroundColor = 'black';
    document.getElementsByClassName('eyes')[1].innerText = '';
}

const endGame = () =>{
    document.getElementsByClassName('eyes')[0].style.backgroundColor = 'white';
    document.getElementsByClassName('eyes')[0].innerText = 'x';
    document.getElementsByClassName('eyes')[1].style.backgroundColor = 'white';
    document.getElementsByClassName('eyes')[1].innerText = 'x';
    setTimeout(() => {
        document.getElementById('bouncingBall').style.display = 'none';
        document.querySelector('#character').style.display = 'none';
        alert('Game Over');
        document.querySelector('h1').innerHTML = "Game Over";
        document.querySelector('button').innerHTML = "Play again";
        document.querySelector('button').style.display = 'block';
        document.querySelector('h1').style.display = 'block';

    }, 100);
}
const movesLikeJagger = () => {
    
    resetInfo();
    
    const start = Date.now();

    const timeStart = setInterval(function() {
        var delta = Date.now() - start; // milliseconds elapsed since start
        delta = Math.floor(delta / 1000); // in seconds
        if(delta > 1){
            document.getElementById('counter').innerText = delta + ' seconds';
            if(delta%5 === 0){
                speed++;
            }
        }
        else
            document.getElementById('counter').innerText = delta + ' second';
    }, 1000);// update about every second
    
    const a = setInterval(() => {
        i = horizontal>limX ? -1 : 1; //i e j indicam o sentido da bolinha
        j = vertical>limY ? -1 : 1;
        limX = i===1 ? screenWidth-biggerRadius : 0+biggerRadius; //indica até onde vai a bolinha
        limY = j===1 ? screenHeight-biggerRadius : 0+biggerRadius;
        
        if(limX === screenWidth-biggerRadius && limY === screenHeight-biggerRadius){
            document.getElementById('bouncingBall').style.backgroundColor = 'red';
        }
        else if(limX === screenWidth-biggerRadius && limY === 0+biggerRadius){
            document.getElementById('bouncingBall').style.backgroundColor = 'blue';
        }
        else if(limX === 0+biggerRadius && limY === 0+biggerRadius){
            document.getElementById('bouncingBall').style.backgroundColor = 'yellow';
        }
        else if(limX === 0+biggerRadius && limY === screenHeight-biggerRadius){
            document.getElementById('bouncingBall').style.backgroundColor = 'green';
        }
        
        horizontal += speed * i; //movimentação
        vertical += speed * j;
        document.getElementById('bouncingBall').style.left = horizontal + 'px';
        document.getElementById('bouncingBall').style.bottom = vertical + 'px';
        
        document.onkeypress = e => command = e.key;
        
        if(command === 'w'){
            charY += speed;
            document.getElementById('character').style.bottom = charY + 'px';
            document.querySelector('#mouth').style.marginLeft = 0;
            document.querySelector('#mouth').style.marginRight = 0;
            document.querySelector('#eyesContainer').style.marginTop = 5;
            
        }
        else if(command === 's'){
            charY += -speed;
            document.getElementById('character').style.bottom = charY + 'px';
            document.querySelector('#mouth').style.marginLeft = 0;
            document.querySelector('#mouth').style.marginRight = 0;
            document.querySelector('#eyesContainer').style.marginTop = 20;
            
        }
        else if(command === 'a'){
            charX += -speed;
            document.getElementById('character').style.left = charX + 'px';
            document.querySelector('#mouth').style.marginRight = 10;
            document.querySelector('#mouth').style.marginLeft = 0;
            document.querySelector('#eyesContainer').style.marginTop = 10;
        }
        else if(command === 'd'){
            charX += speed;
            document.getElementById('character').style.left = charX + 'px';
            document.querySelector('#mouth').style.marginLeft = 10;
            document.querySelector('#mouth').style.marginRight = 0;
            document.querySelector('#eyesContainer').style.marginTop = 10;
        }

        if(getDistance(horizontal, vertical, charX, charY) <= smallerRadius + biggerRadius){
            clearInterval(a);
            clearInterval(timeStart);
            endGame();
        }

        if(charX <= 0 + smallerRadius || charX >= screenWidth - smallerRadius || charY <= 0 + smallerRadius || charY >= screenHeight - smallerRadius){
            clearInterval(a);
            clearInterval(timeStart);
            endGame();
        }

    }, 10);
}