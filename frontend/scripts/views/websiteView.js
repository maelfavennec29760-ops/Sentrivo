import { getWebsites } from '../dashboard.js' 


export async function renderWebsite() {
    const app = document.getElementById("app");
    app.innerHTML= `
        <section class="websites-page">

            <div class="websites-page-header">
                <div>
                    <h2>Your Websites</h2>
                    <p>Manage and monitor all your websites.</p>
                </div>
            </div>

            <div class="websites-overview">
                <div>
                    <span class="websites-count">0</span>
                    <p>Websites</p>
                </div>

                <div>
                    <span class="websites-online">0</span>
                    <p>Online</p>
                </div>

                <div>
                    <span class="websites-offline">0</span>
                    <p>Offline</p>
                </div>
            </div>

            <div class="websites-container">

                <div class="websites-list-header">
                    <span>Website</span>
                    <span>Status</span>
                    <span>Added</span>
                    <span>Actions</span>
                </div>

                <div id="all-websites-list"></div>

            </div>

        </section>
    `
    const websites = await getWebsites();
    console.log("WEBSITES :", websites);
    websites.forEach((website) => {
        displayWebsiteRow(website)
    });
    updateWebsiteCounters(websites)
}


export function displayWebsiteRow(website) {
    const allWebsitesList = document.getElementById("all-websites-list");
    const websiteRow = document.createElement("div");
    const date = new Date(website.created_at);
    const formattedDate = date.toLocaleDateString("fr-FR")
    websiteRow.classList.add("website-row");
    websiteRow.innerHTML = `
        <div class="website-info">
            <div class="website-logo">
                ${
                website.logo
                    ? `<img src="${website.logo}" alt="Logo ${website.name}">`
                    : `<i class="fa-solid fa-globe"></i>`
                }
            </div>

            <div class="website-details">
                <h3>${website.name}</h3>
                <p>${website.url}</p>
            </div>
        </div>
        <span class="website-status">
                ${website.status}
        </span>
        <span class="website-date">
                ${formattedDate}
        </span>
        <div class="website-actions">
            <a class="website-action" href="${website.url}" target="_blank">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
            <button class="website-action website-delete" data-id="${website.id}">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>      
        `;
    allWebsitesList.appendChild(websiteRow)
    const deleteButton = websiteRow.querySelector(".website-delete")
    const token = localStorage.getItem("token")
    deleteButton.addEventListener("click", async () => {
        const websiteId = deleteButton.dataset.id
        const response = await fetch(`/api/websites/${websiteId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(response.ok) {
            websiteRow.remove()
            const websites = await getWebsites()
            updateWebsiteCounters(websites)
        }
    })
}

export function updateWebsiteCounters(websites) {
    const websitesCount = document.querySelector(".websites-count");
    websitesCount.textContent = websites.length;
    const websitesOnline = document.querySelector(".websites-online");
    const onlineWebsites = websites.filter((website) => {
        return website.status === "online"
    })
    websitesOnline.textContent = onlineWebsites.length
    const websitesOffline = document.querySelector(".websites-offline")
    const offlineWebsites = websites.filter((website) => {
        return website.status === "offline"
    })
    websitesOffline.textContent = offlineWebsites.length
     console.log(
        "ELEMENTS:",
        websitesCount,
        websitesOnline,
        websitesOffline);
}