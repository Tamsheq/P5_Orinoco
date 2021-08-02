function getUrl() {
    return "http://localhost:3000/api/cameras";
}

const bag = JSON.parse(localStorage.getItem("cameras")) || [];

async function loadConfig() {
    let result = await fetch("../../config.json");
    return result.json();
}