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
    websites.forEach((website) => {
        displayWebsiteRow(website)
    });
    const websitesCount = document.querySelector(".websites-count");
    websitesCount.textContent = websites.length;
}


function displayWebsiteRow(website) {
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
                Online
        </span>
        <span class="website-date">
                ${formattedDate}
        </span>
        <div class="website-actions">
            <a class="website-action" href="${website.url}" target="_blank">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
            <button class="website-action website-delete">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>      
        `;
    allWebsitesList.appendChild(websiteRow)
    console.log(website.created_at);
}