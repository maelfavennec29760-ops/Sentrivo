//Modal management
console.log("v3")
import { resetLoginForm } from "./login.js";
const modalOpenBtn = document.querySelectorAll(".modalOpen");
const modals = document.querySelectorAll(".modal")
const exitModal = document.querySelectorAll(".exit-cross")
//Open modal from trigger button

for(const modalOpen of modalOpenBtn) {
    modalOpen.addEventListener("click", () => {
        const dataModal = modalOpen.dataset.modal;
        const modal = document.getElementById(dataModal)
        modal.classList.add("active")
    })
}

//Close modal with close button

for(const exitCross of exitModal) {
    exitCross.addEventListener("click", (event) => {
    const exit = event.target.closest(".modal")
    if(exit) {
        exit.classList.remove("active")
        resetLoginForm()
    }
})
}

//Close modal by clicking outside the content

for(const modal of modals) {
    modal.addEventListener("click", (event) => {
        if(event.target === modal) {
            modal.classList.remove("active")
            resetLoginForm()
        }
    })
}

//Close modal by clicking escape key

for(const modal of modals){
    document.addEventListener("keydown", (event) => {
        if(event.key === "Escape") {
            modal.classList.remove("active")
            resetLoginForm()
        }
    })
}