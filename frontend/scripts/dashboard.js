const logout = document.getElementById("logout")

logout.addEventListener("click", (event) => {
    event.preventDefault()
    localStorage.removeItem("Token")
    window.location.href = "index.html"
})