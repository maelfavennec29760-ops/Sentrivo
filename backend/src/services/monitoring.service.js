export async function checkWebsite(url) {
    try {
        const response = await fetch(url)
        if(response.ok) {
            return "online"
        } else {
            return "offline"
        }
    } catch (error) {
        console.error("Error while checking website:", error)
        return "offline"
    }
}
