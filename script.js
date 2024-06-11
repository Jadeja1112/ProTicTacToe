var player1;
var player2;
var isNameSet = false;
let count = 0;
let turn="circle"
let info = document.querySelector(".info");

enter.addEventListener("click", () => {
    if (p1.value.length < 3 || p2.value.length < 3) {
        alert("Name should be of three characters at least...!");
    } else {
        player1 = p1.value;
        player2 = p2.value;
        isNameSet = true;
    }
    if (isNameSet) {
        info.classList.remove("info")
        info.classList.add("info2")
        info.innerHTML = `<div class="p1point">
           <h3>Player one: ${player1}</h3>
           <img src="assets/circle.svg" width="100%">
       </div>
       <div class="p2point">
           <h3>Player Two: ${player2}</h3>
           <img src="assets/cross.svg" width="100%">
       </div>`;
    }
});

class Boxobj {
    constructor(index) {
        this.dom = document.querySelectorAll(".box")[index];
        this.index = index;
        this.contains = null;
        this.path = null;
    }
}

let allbox = [];
let eventHandlers = [];

for (let i = 0; i < 9; i++) {
    let boxitm = new Boxobj(i);
    allbox.push(boxitm);
    eventHandlers.push((event) => handleClick(event, i));
}

function checker() {
    if (
        ((allbox[0].contains == "circle") && (allbox[0].contains == allbox[1].contains) && (allbox[1].contains == allbox[2].contains)) ||
        ((allbox[3].contains == "circle") && (allbox[3].contains == allbox[4].contains) && (allbox[4].contains == allbox[5].contains)) ||
        ((allbox[6].contains == "circle") && (allbox[6].contains == allbox[7].contains) && (allbox[7].contains == allbox[8].contains)) ||
        ((allbox[0].contains == "circle") && (allbox[0].contains == allbox[3].contains) && (allbox[3].contains == allbox[6].contains)) ||
        ((allbox[1].contains == "circle") && (allbox[1].contains == allbox[4].contains) && (allbox[4].contains == allbox[7].contains)) ||
        ((allbox[2].contains == "circle") && (allbox[2].contains == allbox[5].contains) && (allbox[5].contains == allbox[8].contains)) ||
        ((allbox[0].contains == "circle") && (allbox[0].contains == allbox[4].contains) && (allbox[4].contains == allbox[8].contains)) ||
        ((allbox[2].contains == "circle") && (allbox[2].contains == allbox[4].contains) && (allbox[4].contains == allbox[6].contains))
    ) {
        setTimeout(() => { alert("Congrats " + player1 + " won..!");
            location.reload()
         }, 100);
    }
    if (
        ((allbox[0].contains == "cross") && (allbox[0].contains == allbox[1].contains) && (allbox[1].contains == allbox[2].contains)) ||
        ((allbox[3].contains == "cross") && (allbox[3].contains == allbox[4].contains) && (allbox[4].contains == allbox[5].contains)) ||
        ((allbox[6].contains == "cross") && (allbox[6].contains == allbox[7].contains) && (allbox[7].contains == allbox[8].contains)) ||
        ((allbox[0].contains == "cross") && (allbox[0].contains == allbox[3].contains) && (allbox[3].contains == allbox[6].contains)) ||
        ((allbox[1].contains == "cross") && (allbox[1].contains == allbox[4].contains) && (allbox[4].contains == allbox[7].contains)) ||
        ((allbox[2].contains == "cross") && (allbox[2].contains == allbox[5].contains) && (allbox[5].contains == allbox[8].contains)) ||
        ((allbox[0].contains == "cross") && (allbox[0].contains == allbox[4].contains) && (allbox[4].contains == allbox[8].contains)) ||
        ((allbox[2].contains == "cross") && (allbox[2].contains == allbox[4].contains) && (allbox[4].contains == allbox[6].contains))
    ) {
        setTimeout(() => { alert("Congrats " + player2 + " won..!");
            location.reload()
         }, 100);
    }
}

function move() {
    let selected = null;
    for (let i = 0; i < 9; i++) {
        allbox[i].dom.removeEventListener("click", eventHandlers[i]);

        allbox[i].dom.addEventListener("click", (event) => {
            // Reset the background color of the previously selected box
            if (selected !== null && selected !== i) {
                allbox[selected].dom.style.backgroundColor = "bisque";
            }

            if (count % 2 == 0) {
                if (allbox[i].contains == "circle") {
                    allbox[i].dom.style.backgroundColor = "rgb(198, 253, 253)";
                    selected = i;
                }
            }

            if (count % 2 != 0) {
                if (allbox[i].contains == "cross") {
                    allbox[i].dom.style.backgroundColor = "rgb(198, 253, 253)";
                    selected = i;
                }
            }

            if (allbox[i].contains == null) {
                if (selected != null && ((i == selected + 1 && i % 3 > selected % 3) || (i == selected - 1 && i % 3 < selected % 3) || (i == selected + 3 && selected < 6) || (i == selected - 3 && selected > 2))) {
                    if (count % 2 == 0) {
                        allbox[selected].dom.style.backgroundColor = "bisque";
                        allbox[selected].contains = null;
                        allbox[selected].path = null;
                        allbox[selected].dom.innerHTML = "";
                        allbox[i].contains = "circle";
                        allbox[i].path = "assets/circle.svg";
                        allbox[i].dom.innerHTML = `<img src=${allbox[i].path}>`;
                        document.querySelector(".p1point").style.backgroundColor = "black";
                        document.querySelector(".p2point").style.backgroundColor = "rgb(98, 98, 98)";
                    }
                    if (count % 2 != 0) {
                        allbox[selected].dom.style.backgroundColor = "bisque";
                        allbox[selected].contains = null;
                        allbox[selected].path = null;
                        allbox[selected].dom.innerHTML = "";
                        allbox[i].contains = "cross";
                        allbox[i].path = "assets/cross.svg";
                        allbox[i].dom.innerHTML = `<img src=${allbox[i].path}>`;
                        document.querySelector(".p1point").style.backgroundColor = "rgb(98, 98, 98)";
                        document.querySelector(".p2point").style.backgroundColor = "black";
                    }
                    count++;
                    selected = null;
                    checker();
                }
            }
        });
    }
}


function handleClick(event, i) {
    if (isNameSet) {
        if (allbox[i].contains == null) {
            count++;

            if (count % 2 == 0) {
                turn="circle"
                document.querySelector(".p1point").style.backgroundColor = "rgb(98, 98, 98)";
                document.querySelector(".p2point").style.backgroundColor = "black";
                allbox[i].contains = "cross";
                allbox[i].path = "assets/cross.svg";
                allbox[i].dom.innerHTML = `<img src=${allbox[i].path}>`;
                allbox[i].dom.firstElementChild.style.opacity = "0";
                setTimeout(() => { allbox[i].dom.firstElementChild.style.opacity = "100"; }, 10);
            } else {
                turn="cross"
                document.querySelector(".p1point").style.backgroundColor = "black";
                document.querySelector(".p2point").style.backgroundColor = "rgb(98, 98, 98)";
                allbox[i].contains = "circle";
                allbox[i].path = "assets/circle.svg";
                allbox[i].dom.innerHTML = `<img src=${allbox[i].path}>`;
                allbox[i].dom.firstElementChild.style.opacity = "0";
                setTimeout(() => { allbox[i].dom.firstElementChild.style.opacity = "100"; }, 10);
            }
            console.log(count);
          
            checker();
            if (count == 6) {
                setTimeout(() => { alert("Now you can start moving your element..!"); }, 100);
                move();
            }
        }
    }
}

function addEventListeners() {
    for (let i = 0; i < 9; i++) {
        allbox[i].dom.addEventListener("click", eventHandlers[i]);
    }
}

// Add event listeners initially
addEventListeners();
