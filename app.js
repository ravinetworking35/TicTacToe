let boxes = document.querySelectorAll(".box");  // for all the box to get it tracked in JS
let resetBtn = document.querySelector("#reset-btn"); // to get the reset button.
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true; //playerX, playerO
let count = 0;  // to check the draw

const winPatters = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]
const resetGame = () =>{
    turnO =true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");

};
boxes.forEach((box) =>{             // we are adding eventlistner to perform some acction on each box(button)
    box.addEventListener("click", () =>{  // we are adding eventlistner to perform some acction on each box(button)
        
        if(turnO === true)
        {
            //PlayerO turn  once it is printed O
           box.innerText = "O";
            turnO = false; // we will set this to false to next turn will occur for X.
        } else
        {
            //PlayerX  turn to print X
            box.innerText= "X";
            turnO = true;  // setting this true to next turn go to O.
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if(count === 9 && !isWinner ){
            gameDraw();
            }      
    });
});

const gameDraw = () =>{
    msg.innerText='Game was a Draw';
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled =true;
    }
};
const enableBoxes = () =>{
    for(let box of boxes){  
        box.disabled=false;
        box.innerText="";
    }
};

const showWinner = (winner) =>{
    msg.innerText=`Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(let patterns of winPatters)
        {   
        let pos1Val =boxes[patterns[0]].innerText;
        let pos2Val =boxes[patterns[1]].innerText;
        let pos3Val =boxes[patterns[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val !=""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
               showWinner(pos1Val);
            }
        }
    }
};
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);