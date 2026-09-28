const modalContainer = document.querySelector(".modal-container");
const modalAddContainer = document.querySelector(".modal-add-content");
const exitCrossModal = document.querySelector(".exit-cross")
const formAddWebsite = document.querySelector(".form-add-website")
const modalAddBtn = document.querySelector(".addWebsite-btn")

const inputLogo = document.getElementById("add-logo")
const inputName = document.getElementById("add-name")
const inputUrl = document.getElementById("add-url")

const dashboardList = document.getElementById("websites-list");
const allWebsitesList = document.getElementById("all-websites-list");

import { displayWebsite, getWebsites } from "./dashboard.js";
import { displayWebsiteRow } from "./views/websiteView.js";
import { updateWebsiteCounters } from "./views/websiteView.js";

//Open | Close modal add website


exitCrossModal.addEventListener("click", () => {
    modalContainer.classList.add("hidden")
})


modalAddBtn.addEventListener("click", () => {
    modalContainer.classList.remove("hidden")
})

document.addEventListener("keydown", (event) => {
    if(event.key === "Escape") {
        modalContainer.classList.add("hidden")
    }
})

//Form modal add

formAddWebsite.addEventListener("submit", async (event) => {
    event.preventDefault();

    const logo = inputLogo.files[0];
    const name = inputName.value;
    let url = inputUrl.value.trim();

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = `https://${url}`;
    }

    const formData = new FormData();

    if (logo) {
        formData.append("logo", logo);
    }

    formData.append("name", name);
    formData.append("url", url);

    const token = localStorage.getItem("token");
    try {
        const response = await fetch("/api/websites", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });
        const data = await response.json();

        console.log("Status :", response.status);
        console.log("Réponse :", data);

        if (response.ok) {
            console.log("Website created");
            if(dashboardList) {
                displayWebsite(data)
            }
            else if(allWebsitesList) {
                const websites = await getWebsites();
                console.log("WEBSITES AFTER ADD:", websites);
                const newWebsite = websites.find((website) => {
                    return website.id === data.id
                })
                displayWebsiteRow(newWebsite);
                console.log("UPDATE COUNTERS");
                updateWebsiteCounters(websites)
            }
        }
    } catch (error) {
        console.error("Erreur fetch :", error);
    }
});