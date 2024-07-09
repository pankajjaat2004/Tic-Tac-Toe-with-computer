window.addEventListener('load',events); 
 
var gameover = new Audio('gameover.mp3'); 
var clicking = new Audio('tap.mp3'); 
var clickingComputer = new Audio('click.mp3'); 
var btns =document.getElementsByTagName('button'); 
 
function events(){ 
    for(var i=0;i<btns.length;i++){ 
        var currentbutton = btns[i]; 
        currentbutton.addEventListener('click',show); 
    } 
} 
 
var  winCondition =[ 
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6] 
]; 
 
var countdown =5; 
var interval; 
 
function countdowntime(){ 
     
    interval=setInterval(function(){ 
        countdown--; 
        if(winner=='0'){ 
            document.body.innerHTML=`<h1> Computer win.<br> New Game Start in ${countdown} seconds.</h1>`; 
        } 
        else if(winner=='X'){ 
            document.body.innerHTML=`<h1> Player win.<br> New Game Start in ${countdown} seconds.</h1>`; 
        } 
        else{ 
            document.body.innerHTML=`<h1> Match Draw.<br> New Game Start in ${countdown} seconds.</h1>`; 
        } 
    },1000) 
} 
 
function settime(){ 
    countdowntime(); 
    setTimeout( 
        function(){ 
            reset(); 
        }, 5000); 
} 
 
function reset(){   
    clearInterval(interval); 
    countdown=5; 
    location.reload(); 
} 
var winner; 
 
function isgameover(){ 
    for(var j=0;j<winCondition.length;j++){ 
        if(btns[winCondition[j][0]].innerText.trim()!=''){ 
            if(btns[winCondition[j][0]].innerText.trim()==btns[winCondition[j][1]].innerText.trim() && btns[winCondition[j][0]].innerText.trim()==btns[winCondition[j][2]].innerText.trim()){ 
                winner=btns[winCondition[j][0]].innerText.trim(); 
                if(winner=='0'){ 
                    document.body.innerHTML=`<h1> Computer win.<br> New Game Start in ${countdown} seconds.</h1>`; 
                    gameover.play(); 
                    settime(); 
                } 
                if(winner=='X'){ 
                    document.body.innerHTML=`<h1> Player win.<br> New Game Start in ${countdown} seconds.</h1>`; 
                    gameover.play(); 
                    settime(); 
                } 
            } 
        } 
    } 
    let EmptyBoxes=0; 
    for(let i=0;i<btns.length;i++){ 
        if(btns[i].innerText.trim().length==0){ 
            EmptyBoxes+=1; 
        } 
    } 
    if(EmptyBoxes==0){ 
        document.body.innerHTML="<h1> Match Draw.</h1>"; 
        winner='no'; 
        settime(); 
    } 
} 
 
var count = 0; 
var flag=true; 
 
function show(){ 
    if(this.innerText.trim().length==0){ 
        clicking.play(); 
        turn=0; 
        var btnvalue = flag?'X':''; 
        if(btnvalue=='X'){ 
            this.innerText =btnvalue; 
            flag=!flag; 
            count++; 
            isgameover(); 
            setTimeout(function(){Computer();},1000); 
        } 
    } 
    else{ 
        console.log('Wrong tap'); 
    } 
} 
 
function randomIntFromInterval(min, max) {  
    return Math.floor(Math.random() * (max - min + 1) + min); 
}   
var turn; 
function Computer(){ 
    if(count==1){ 
        RandomTurn(); 
    } 
    if(count==2){ 
        if(turn==0){ 
        Is_X_Winning(); 
        } 
        if(turn==0){ 
            RandomTurn(); 
        } 
    } 
    if(count==3||count==4){ 
        if(turn==0){ 
            Is_0_Winning(); 
        } 
        if(turn==0){ 
            Is_X_Winning(); 
        } 
        if(turn==0){ 
            RandomTurn(); 
        } 
        isgameover();  
    } 
    if(count>4){ 
        if(turn==0){ 
            Is_0_Winning(); 
        } 
        if(turn==0){ 
            Is_X_Winning(); 
        } 
        isgameover();  
    } 
    clickingComputer.play(); 
} 
 
function RandomTurn(){ 
    let num =randomIntFromInterval(0, 8); 
         
        while(btns[num].innerText.trim().length!=0){ 
            num=randomIntFromInterval(0, 8); 
        } 
        btns[num].innerText='0'; 
        flag=!flag; 
} 
 
function Is_X_Winning(){ 
    let thinking = 0; 
    for(var j=0;j<winCondition.length;j++){ 
        if(thinking==0){ 
        if(btns[winCondition[j][0]].innerText=='X'||btns[winCondition[j][1]].innerText=='X'||btns[winCondition[j][2]].innerText=='X'){ 
            if(btns[winCondition[j][0]].innerText == btns[winCondition[j][1]].innerText && btns[winCondition[j][2]].innerText=='' || btns[winCondition[j][0]].innerText=='' && btns[winCondition[j][1]].innerText==btns[winCondition[j][2]].innerText ||btns[winCondition[j][1]].innerText=='' && btns[winCondition[j][0]].innerText==btns[winCondition[j][2]].innerText){ 
                for(let i=0;i<3;i++){ 
                    if(btns[winCondition[j][i]].innerText.trim()==''){ 
                        btns[winCondition[j][i]].innerText='0'; 
                        flag=!flag; 
                        turn=1; 
                        thinking=1; 
                    } 
                } 
            } 
        } 
        } 
    } 
} 
 
function Is_0_Winning(){ 
    let thinking=0; 
    for(var j=0;j<winCondition.length;j++){ 
        if(thinking==0){ 
        if(btns[winCondition[j][0]].innerText=='0'||btns[winCondition[j][1]].innerText=='0'||btns[winCondition[j][2]].innerText=='0'){ 
            if(btns[winCondition[j][0]].innerText == btns[winCondition[j][1]].innerText && btns[winCondition[j][2]].innerText=='' || btns[winCondition[j][0]].innerText=='' && btns[winCondition[j][1]].innerText==btns[winCondition[j][2]].innerText ||btns[winCondition[j][1]].innerText=='' && btns[winCondition[j][0]].innerText==btns[winCondition[j][2]].innerText){ 
                for(let i=0;i<3;i++){ 
                    if(btns[winCondition[j][i]].innerText.trim()==''){ 
                        btns[winCondition[j][i]].innerText='0'; 
                        flag=!flag; 
                        turn=1; 
                        thinking=1; 
                    } 
                } 
            } 
        } 
        } 
    } 
}