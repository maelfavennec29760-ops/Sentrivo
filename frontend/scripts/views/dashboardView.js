
import { getWebsites, displayWebsite } from '../dashboard.js' 

export async function renderDashboard() {
    const app = document.getElementById("app");
    app.innerHTML = `
        <section id="stats-section">
            <article class="stats-card">
                <div class="stats-icon">
                    <i class="fa-solid fa-heart-pulse"></i>
                </div>
                <div class="stats-content">
                    <p class="stats-title">Online websites</p>
                    <h2 class="stats-value">4 / 5</h2>
                    <div class="stats-change">
                        <span class="positive">↑ +0%</span>
                        <span>vs. last week</span>
                    </div>
                </div>
            </article>

            <article class="stats-card">
                <div class="stats-icon">
                    <i class="fa-regular fa-clock"></i>
                </div>
                <div class="stats-content">
                    <p class="stats-title">Average response time</p>
                    <h2 class="stats-value">342 ms</h2>
                    <div class="stats-change">
                        <span class="positive">↓ -12%</span>
                        <span>vs. last week</span>
                    </div>
                </div>
            </article>

            <article class="stats-card">
                <div class="stats-icon">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div class="stats-content">
                    <p class="stats-title">Incidents</p>
                    <h2 class="stats-value">2</h2>
                    <div class="stats-change">
                        <span class="positive">↑ +100%</span>
                        <span>vs. last week</span>
                    </div>
                </div>
            </article>

            <article class="stats-card">
                <div class="stats-icon">
                    <i class="fa-solid fa-users"></i>
                </div>
                <div class="stats-content">
                    <p class="stats-title">Global uptime</p>
                    <h2 class="stats-value">99.83%</h2>
                    <div class="stats-change">
                        <span class="positive">↑ +0.2%</span>
                        <span>vs. last week</span>
                    </div>
                </div>
            </article>
        </section>

        <section class="global-info">
            <article class="global-card">
                <div class="global-card-text">
                    <h2>Your websites</h2>
                </div>
                <div class="global-card-graph">
                    <div id="websites-list"></div>
                </div>
            </article>

            <article class="global-card">
                <div class="global-card-text">
                    <h2>Latest Incidents</h2>
                    <select name="response-select" id="incident-select" class="website-select">
                        <option value="">All website</option>
                        <option value="">*******</option>
                        <option value="">*******</option>
                        <option value="">*******</option>
                    </select>
                </div>
                <div class="global-card-graph">
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident temporibus aliquid quis minima dolorem obcaecati, quia fuga doloribus iste libero nemo atque officiis sit in eos quidem quam autem quasi.</p>
                </div>
            </article>
        </section>

        <section class="global-info">
            <article class="global-card">
                <div class="global-card-text">
                    <h2>Response time</h2>
                    <select name="website-select" id="website-select" class="website-select">
                        <option value="">All website</option>
                        <option value="">*******</option>
                        <option value="">*******</option>
                        <option value="">*******</option>
                    </select>
                </div>
                <div class="global-card-graph">
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident temporibus aliquid quis minima dolorem obcaecati, quia fuga doloribus iste libero nemo atque officiis sit in eos quidem quam autem quasi.</p>
                </div>
            </article>

            <article class="global-card">
                <div class="global-card-text">
                    <h2>Uptime</h2>
                    <select name="uptime-select" id="uptime-select" class="website-select">
                        <option value="">All website</option>
                        <option value="">*******</option>
                        <option value="">*******</option>
                        <option value="">*******</option>
                    </select>
                </div>
                <div class="global-card-graph">
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident temporibus aliquid quis minima dolorem obcaecati, quia fuga doloribus iste libero nemo atque officiis sit in eos quidem quam autem quasi.</p>
                </div>
            </article>
        </section>
    `;
    const websites = await getWebsites();
    websites.forEach((website) => {
        displayWebsite(website);
    });
}

