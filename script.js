let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGmeBtn = document.querySelector("#new-btn");
let msgConatiner = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let mainContainer = document.querySelector(".main");

let turnO = true; //  playerO, playerX

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetgame = () => {
    turnO = true;
    enableBoxes();
    msgConatiner.classList.add("hide");
    mainContainer.classList.remove("hide"); 
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box clicked");
        if (turnO) { // playerO
            box.innerText = "0";
            box.style.color = "blue";
            turnO = false;
        } else { // playerX
            box.innerHTML = "<div>&#10008;</div>"
            box.style.color = "red";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msg.style.color = "yellow";
    msgConatiner.classList.remove("hide");
    disableBoxes();
    mainContainer.classList.add("hide"); 
}

const checkWinner = () => {
    let draw = true;

    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner", pos1Val);
                showWinner(pos1Val);
                return;
            }
        }
    }

    for (let box of boxes) {
        if (box.innerText === "") {
            draw = false;
            break;
        }
    }

    if (draw) {
        console.log("It's a draw");
        showDraw();
    }
};

const showDraw = () => {
    msg.innerText = "It's a draw!";
    msg.style.color = "yellow";
    msgConatiner.classList.remove("hide");
    disableBoxes();
    mainContainer.classList.add("hide");
};

newGmeBtn.addEventListener("click", resetgame);
resetBtn.addEventListener("click", resetgame);
