import { renderDashboard } from "./views/dashboardView.js";
import { renderWebsite } from "./views/websiteView.js";
const websitesLink = document.getElementById("websites-link")

export function router() {
    const path = window.location.pathname
    console.log("PATH :", path);
    if(path ===  '/dashboard') {
        console.log("Dashboard détecté");
        renderDashboard()
    }
    if(path === '/websites') {
        console.log("Websites détecté");
        renderWebsite()
    }
}

// <= / => page
window.addEventListener("popstate", router);

websitesLink.addEventListener("click", (event) => {
    event.preventDefault();
    history.pushState(null, "", "/websites")
    document.title = "Sentrivo | Websites"
    router()
})

router()