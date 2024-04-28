const word = localStorage.getItem("word");
var current_letters = [];

function success_attempts() {
    let count = 0;

    current_letters.forEach((e) => {
        if (word.toLowerCase().split("").includes(e)) count += 1;
    });
    
    return count;
}

function failed_attempts() {
    let count = current_letters.length;

    current_letters.forEach((e) => {
        if (word.toLowerCase().split("").includes(e)) count -= 1;
    });

    return count;
}

function add_letter(letter) {
    if (!current_letters.includes(letter)) { 
        let before = failed_attempts();       
        current_letters.push(letter);
        let after = failed_attempts();       

        if (after == before) new Audio("https://piwerm.github.io/gord/hangman/sounds/success.mp3").play();
        else new Audio("https://piwerm.github.io/gord/hangman/sounds/fail.mp3").play();
    }
}

function reload_word() {
    document.querySelector(".word").innerHTML = "";

    word.split("").forEach((e) => {
        let child = document.createElement("div");
        child.classList.add("word-letter");

        if (current_letters.includes(e.toLowerCase())) {
            child.innerText = e;
        } else {
            child.innerText = "ㅤ";
        }

        document.querySelector(".word").appendChild(child);
    });
}

function reload_keyboard() {
    document.querySelectorAll(".keyboard-letter").forEach((e) => {
        if (current_letters.includes(e.innerText.toLowerCase())) {
            e.classList.add("keyboard-attempt");
        } else {
            e.classList.remove("keyboard-attempt");
        }
    });
}

function reload_hangman() {
    document.querySelector(".hangman").setAttribute("src", `https://piwerm.github.io/gord/hangman/hangman/${failed_attempts()}.png`);
}

function end_game(message) {
    document.querySelector(".control").remove();
    clearInterval(reload_id);

    let message_element = document.createElement("h1");
    message_element.classList.add("message");
    message_element.innerText = message;

    let message_back_element = document.createElement("a");
    message_back_element.classList.add("message-back");
    message_back_element.innerText = "Züruck";
    message_back_element.setAttribute("href", "https://piwerm.github.io/gord/hangman-form.html");

    document.body.append(message_element);
    document.body.append(message_back_element);

    localStorage.removeItem("word");
}

function lose_check() {
    if (failed_attempts() >= 10) {
        document.querySelector(".hangman").setAttribute("src", `https://piwerm.github.io/gord/hangman/hangman/lose.png`);
        new Audio("https://piwerm.github.io/gord/hangman/sounds/lose.mp3").play();
        end_game("Lose...");
    }
}

function win_check() {
    if (success_attempts() >= word.length) {
        document.querySelector(".hangman").setAttribute("src", `https://piwerm.github.io/gord/hangman/hangman/win.png`);
        new Audio("https://piwerm.github.io/gord/hangman/sounds/win.mp3").play();
        end_game("Win!");
    }
}

document.querySelectorAll(".keyboard-letter").forEach((e) => {
    e.addEventListener("click", () => add_letter(e.innerText.toLowerCase()));
});

var reload_id = setInterval(() => {
    win_check(); lose_check();
    reload_word(); reload_keyboard(); reload_hangman();
}, 250);