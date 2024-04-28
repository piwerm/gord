document.querySelector(".form button").addEventListener("click", () => {
    localStorage.setItem("word", document.querySelector(".form input").value);

    window.location.href = "/hangman.html";
});