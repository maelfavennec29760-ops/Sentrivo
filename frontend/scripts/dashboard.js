const logout = document.getElementById("logout")

logout.addEventListener("click", (event) => {
    event.preventDefault()
    localStorage.removeItem("accessToken")
    window.location.href = "index.html"
})