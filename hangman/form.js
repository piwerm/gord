document.querySelector(".form button").addEventListener("click", () => {
    localStorage.setItem("word", document.querySelector(".form input").value);

    window.location.href = "https://piwerm.github.io/gord/hangman.html";
});