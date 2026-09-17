const logout = document.getElementById("logout")

logout.addEventListener("click", (event) => {
    event.preventDefault()
    localStorage.removeItem("token")
    window.location.href = "index.html"
})

//Display websites

export async function getWebsites() {
    const token = localStorage.getItem("token");

    const response = await fetch("/api/websites", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const websites = await response.json();
    return websites
}

//Display real time

export function displayWebsite(website) {
    const websitesList = document.getElementById("websites-list");
    const websiteElement = document.createElement("div");
    websiteElement.classList.add("website-item");
    websiteElement.innerHTML = `
        <div class="website-logo">
            ${
                website.logo 
                ? `<img src="${website.logo}" alt="Logo ${website.name}">`
                : `<i class="fa-solid fa-globe"></i>`
            }
        </div>    
        <p class="website-name">${website.name}</p>
        <p class="website-url">${website.url}</p>
        <span class="website-status">
             Online
        </span>
    `;
    websitesList.appendChild(websiteElement);
}
