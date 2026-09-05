const formRegistration = document.getElementById("form-register");
const usernameInput = document.getElementById("rusername");
const emailInput = document.getElementById("remail");
const passwordInput = document.getElementById("rpassword");

formRegistration.addEventListener("submit", async (event) => {
    event.preventDefault();

    const user = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: user,
            email: email,
            password: password
        })
    })
    if(response.ok) {
       const regData = await response.json();
        
    }

})