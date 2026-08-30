//Login modal open/close
const loginBtn = document.querySelector(".login");
const loginModal = document.getElementById("login")
const exitLoginModal = document.querySelector(".exit-cross")

loginBtn.addEventListener("click", () => {
    loginModal.classList.add("active")
})

exitLoginModal.addEventListener("click", () => {
    loginModal.classList.remove("active")
})

loginModal.addEventListener("click", (event) => {
    if(event.target === loginModal) {
        loginModal.classList.remove("active")
    }    
})

document.addEventListener("keydown", (event) => {
    if(event.key === "Escape" ) {
        loginModal.classList.remove("active")
    }
})