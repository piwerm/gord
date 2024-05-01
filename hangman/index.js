const form_template = document.querySelector("template#form").content.cloneNode(true);
const game_template = document.querySelector("template#game").content.cloneNode(true);
const win_template = document.querySelector("template#win").content.cloneNode(true);
const lose_template = document.querySelector("template#lose").content.cloneNode(true);
const keyboard_letter_template = document.querySelector("template#keyboard-letter").content.cloneNode(true);

const container = document.querySelector(".container");

function form_state() {
    if (localStorage.getItem("test_word")) {
        return game_state(localStorage.getItem("test_word"));
    }

    container.innerHTML = "";
    container.appendChild(form_template);

    document.querySelector(".form .begin-button").addEventListener("click", () => {
        game_state(document.querySelector(".form .word-input").value);
    });
}

function game_state(word) {
    container.innerHTML = "";
    container.appendChild(game_template);

    var attempts_letters = [];
    var attempts = {failed: 0, successed: 0};
    word = word.replace(/(\W|\d|_)/g, "")

    function reload_word() {
        document.querySelector(".control .word").innerHTML = "";

        word.split("").forEach((e) => {
            var word_letter = document.querySelector("template#word-letter").content.cloneNode(true);

            if (attempts_letters.includes(e.toLowerCase())) word_letter.querySelector(".word-letter").innerHTML = e;
            else word_letter.querySelector(".word-letter").innerHTML = "ㅤ";

            document.querySelector(".control .word").appendChild(word_letter);
        });
    }

    function reload_keyboard() {
        document.querySelector(".control .keyboard").innerHTML = "";

        "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜẞ".split("").forEach((e) => {
            var keyboard_letter = document.querySelector("template#keyboard-letter").content.cloneNode(true);
            keyboard_letter.querySelector(".keyboard-letter").innerHTML = e;

            if (attempts_letters.includes(e.toLowerCase())) {
                if (word.toLowerCase().split("").includes(e.toLowerCase())) {
                    keyboard_letter.querySelector(".keyboard-letter").classList.add("attempted-green");
                } else {
                    keyboard_letter.querySelector(".keyboard-letter").classList.add("attempted-red");
                }
            }

            keyboard_letter.querySelector(".keyboard-letter").addEventListener("click", () => {add_letter(e.toLowerCase())});

            document.querySelector(".control .keyboard").appendChild(keyboard_letter);
        });
    }

    function reload_hangman() {
        document.querySelector(".hangman").setAttribute("src", `./images/${attempts.failed}.png`);
    }

    function add_letter(letter) {
        if (!attempts_letters.includes(letter)) {
            attempts_letters.push(letter);

            if (word.toLowerCase().split("").includes(letter)) {
                attempts.successed += 1;
                new Audio("./sounds/success.mp3").play();
            } else {
                attempts.failed += 1;
                new Audio("./sounds/fail.mp3").play();
            }
            if (attempts.failed >= 10) {
                new Audio("./sounds/lose.mp3").play();
                lose_state();
            }
            if (attempts.successed >= word.length) {
                new Audio("./sounds/win.mp3").play();
                win_state();
            }
        }
        
        reload_word();
        reload_keyboard();
        reload_hangman();
    }

    reload_word(defining=true);
    reload_keyboard(defining=true);
    reload_hangman(defining=true);
}

function win_state() {
    container.innerHTML = "";
    container.appendChild(win_template);
}

function lose_state() {
    container.innerHTML = "";
    container.appendChild(lose_template);
}

form_state();