let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#reset");
let newGame=document.querySelector("#new");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let  turnX=true;
let count=0;
const winPatterns=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnX){
            box.innerText="X";
            turnX=false;
        }else{
            box.innerText="O";
            turnX=true;
        }
        box.disabled=true;
        count++;
        let winnerFound=checkWinner();
        if(!winnerFound && count==9){
            msg.innerText = "It's a Draw!";
            msgContainer.classList.remove("hide");
            newGame.style.display = "inline-block";
            disableBox();
        }
    })
});
const disableBox=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};
const showWinner=(winner)=>{ 
    msg.innerText=`Player ${winner} Wins!!!`; 
    msgContainer.classList.remove("hide"); 
    disableBox();
    newGame.style.display = "inline-block";
};
const enableBox=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
        box.classList.remove("winner");
        newGame.style.display = "none";
    }
};
const checkWinner=()=>{
    for(let pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;
        if(pos1Val!="" && pos2Val!="" && pos3Val!="" ){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                boxes[pattern[0]].classList.add("winner");
                boxes[pattern[1]].classList.add("winner");
                boxes[pattern[2]].classList.add("winner");
                return true;
            }
        }
    }
    return false;
};
const resetGame=()=>{
    turnX=true;
    count=0;
    enableBox();
    msgContainer.classList.add("hide");
};
reset.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);