const num1 = Math.random();
const num2 = Math.random();

let batFirst = true;
let gameOver = false;

const headButton = document.querySelector('.head');
const tailButton = document.querySelector('.tail');
const toss = document.querySelector('.toss');
let tossResult = document.createElement('p');
tossResult.style.margin = '-10px';
const run = document.querySelectorAll('.run');

let bat = document.createElement('button');
let field = document.createElement('button');

function batFieldButtonCreate() {
    bat.textContent = 'BAT';
    bat.style.backgroundColor = 'orange';
    bat.style.border = 'none';
    bat.style.fontWeight = 'bold';
    bat.style.borderRadius = '20px';
    bat.style.marginRight = '10px';
    bat.style.width = '50px';
    bat.style.padding = '5px';
    bat.style.cursor = 'pointer';

    field.textContent = 'FIELD';
    field.style.backgroundColor = 'orange';
    field.style.border = 'none';
    field.style.fontWeight = 'bold';
    field.style.borderRadius = '20px';
    field.style.marginRight = '10px';
    field.style.width = '50px';
    field.style.padding = '5px';
    field.style.cursor = 'pointer';

    toss.append(bat);
    toss.append(field);
}

function performToss(button) {
    headButton.disabled = true;
    tailButton.disabled = true;

    if (num1 < 0.5) {
        tossResult.textContent = `You chose ${button.textContent}. You won the toss.`;
    } else {
        if (num2 < 0.5) {
            tossResult.textContent = `You chose ${button.textContent}. You lost the toss. Computer chose to bat first.`;
            batFirst = false;
        } else {
            tossResult.textContent = `You chose ${button.textContent}. You lost the toss. Computer chose to field first.`;
            batFirst = true;
        }
        
    }

    toss.append(tossResult);
}

function enableRun() {
    for (const item of run) {
        item.disabled = false;
    }
}

let decision = document.createElement('p');
decision.style.marginTop = '-10px';
decision.style.marginBottom = '-10px';

function batClick() {
    bat.disabled = true;
    field.disabled = true;
    decision.textContent = 'You chose to bat first.';
    toss.append(decision);
    batFirst = true;
    enableRun();
}

function fieldClick() {
    bat.disabled = true;
    field.disabled = true;
    decision.textContent = 'You chose to field first.';
    toss.append(decision);
    batFirst = false;
    enableRun();
}

headButton.addEventListener('click', () => {
    performToss(headButton);

    if (num1 < 0.5) {
        batFieldButtonCreate();
    
        bat.addEventListener('click', () => {
            batClick();
        });

        field.addEventListener('click', () => {
            fieldClick();
        });
    } else {
        enableRun();
    }
});

tailButton.addEventListener('click', () => {
    performToss(tailButton);

    if (num1 < 0.5) {
        batFieldButtonCreate();
    
        bat.addEventListener('click', () => {
            batClick();
        });

        field.addEventListener('click', () => {
            fieldClick();
        });
    } else {
        enableRun();
    }
});

let total = 0;
let target = 0;
let innings = 1;

let score = document.querySelector('.score');
let current = document.createElement('p');
let chosen = document.createElement('p');

let newGame = document.createElement('button');

for (const item of run) {
    item.addEventListener('click', () => {
        let compRun = (Math.floor(Math.random() * 6) + 1);

        if (Number(item.textContent) === compRun) {
            let out = document.createElement('p');
            chosen.textContent = `You chose ${item.textContent}. Computer chose ${compRun}.`;
            current.textContent = `Total Score : ${total}`;

            score.append(chosen);
            score.append(current);

            if (innings === 1) {
                let dash = document.createElement('p');
                let secondInnings = document.createElement('p');
                dash.textContent = '-----';
                innings = 2;
                secondInnings.style.fontStyle = 'italic';
                secondInnings.style.fontWeight = 'bold';

                if (batFirst === true) {
                    out.textContent = `You are out! Your score is ${total}. Computer needs ${total+1} runs to win!`;
                    secondInnings.textContent = 'Computer is now batting...';
                } else {
                    out.textContent = `Computer is out! Computer's score is ${total}. You need ${total+1} runs to win!`;
                    secondInnings.textContent = 'Your are now batting...';
                }

                target = total + 1;
                total = 0;

                score.append(out);
                score.append(dash);
                score.append(secondInnings);
            } else {
                let result = document.querySelector('.res');
                if (batFirst === true) {
                    if (total < target - 1) {
                        out.textContent = 'Computer is out! You WON the match!';
                        result.textContent = 'RESULT : YOU WON!!!'
                    } else if (total === target - 1) {
                        out.textContent = 'Computer is out! The match is a TIE!';
                        result.textContent = 'RESULT : TIE MATCH!!!'
                    }
                } else {
                    if (total < target - 1) {
                        out.textContent = 'You are out! You LOST the match!';
                        result.textContent = 'RESULT : YOU LOST!!!'
                    } else if (total === target - 1) {
                        out.textContent = 'You are out! The match is a TIE!';
                        result.textContent = 'RESULT : TIE MATCH!!!'
                    }
                }

                score.append(out);
                gameOver = true;
            }
        } else {
            if (innings === 1) {
                if (batFirst === true) {
                    total += Number(item.textContent);
                } else {
                    total += compRun;
                }
            } else {
                if (batFirst === true) {
                    total += compRun;
                } else {
                    total += Number(item.textContent);
                }
            }

            chosen.textContent = `You chose ${item.textContent}. Computer chose ${compRun}.`;
            current.textContent = `Total Score : ${total}`;

            if ((innings === 2) && (total >= target)) {
                let result = document.querySelector('.res');
                let win = document.createElement('p');
                if (batFirst === true) {
                    win.textContent = 'Computer chased the target. You LOST!';
                    result.textContent = 'RESULT : YOU LOST!!!'
                } else {
                    win.textContent = 'You chased the target. You WON!';
                    result.textContent = 'RESULT : YOU WON!!!'
                }
                gameOver = true;
                score.append(chosen);
                score.append(current);
                score.append(win);
            } else {
                score.append(chosen);
                score.append(current);
            }
        }

        if (gameOver === true) {
            for (const x of run) {
                x.disabled = true;
            }
            newGame.textContent = 'START NEW GAME';
            newGame.style.textAlign = 'center';
            newGame.style.paddingTop = '5px';
            newGame.style.paddingBottom = '5px';
            newGame.style.paddingLeft = '10px';
            newGame.style.paddingRight = '10px';
            newGame.style.borderRadius = '50px';
            newGame.style.backgroundColor = 'grey';
            newGame.style.border = 'none';
            newGame.style.fontSize = '15px';
            newGame.style.marginBottom = '10px';
            newGame.style.fontWeight = 'bold';
            newGame.style.cursor = 'pointer';
            let result = document.querySelector('.result');
            result.append(newGame);
            gameOver = false;
        }
    });
}

newGame.addEventListener('click', () => {
    window.location.reload();
});