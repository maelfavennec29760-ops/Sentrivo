console.log("v4")
const formLogin = document.getElementById("loginSentrivo");
console.log(formLogin);
const messageErrorAuth = document.querySelector(".container-errorAuth")
console.log(messageErrorAuth);

formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Submit intercepted");

    const emailLogin = document.getElementById("email");
    const passwordLogin = document.getElementById("password");
    
    const email = emailLogin.value;
    const password = passwordLogin.value
    try {
        console.log("Sending login request...");
const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email,
        password
    })
});

console.log("Status :", response.status);

const data = await response.json();
console.log("Data :", data);

if (response.ok) {
    console.log(data);
    localStorage.setItem("accessToken", data.token);
    window.location.href = "/dashboard.html"
} else {
    console.log(data);
    messageErrorAuth.classList.add("active");
}
    } catch {
        //A faire message error server
    }

})

export function resetLoginForm() {
    messageErrorAuth.classList.remove("active");
}