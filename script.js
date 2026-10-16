const images = [
    "invest.jpg",
    "time.jpg",
    "market.jpg",
    "home.jpg",
    "bg.jpg"
];

const intro = document.getElementById("intro");
const introGrid = document.querySelector(".intro-overlay-grid");
const mainSite = document.getElementById("main-site");
const centerText = document.querySelector(".intro-center-text");

function buildIntroCollage() {
    if (!introGrid) return;

    const columns = 5;
    const tilesPerColumn = 5;
    const lineDelays = [0, 0.5, 0.9, 0.7, 0.3];
    const lineOrigins = ["100vh", "-100vh", "-100vh", "100vh", "-100vh"];
    const lineScales = [1.45, 1.6, 1.85, 1.6, 1.45];

    for (let col = 0; col < columns; col++) {
        const column = document.createElement("div");
        column.className = "poster-column" + (col % 2 === 0 ? "" : " alt");
        column.style.setProperty("--line-delay", `${lineDelays[col]}s`);
        column.style.setProperty("--from-y", lineOrigins[col]);
        column.style.setProperty("--from-scale", lineScales[col]);

        for (let index = 0; index < tilesPerColumn; index++) {
            const filename = images[(col * tilesPerColumn + index) % images.length];
            const tile = document.createElement("div");
            tile.className = "image-tile";
            tile.style.setProperty("--delay", `${index * 0.035}s`);

            const img = document.createElement("img");
            img.src = "./images/" + filename;
            img.alt = "Prometheus";
            img.onerror = function () {
                console.error("IMAGE NOT FOUND:", "./images/" + filename);
            };

            tile.appendChild(img);
            column.appendChild(tile);
        }

        introGrid.appendChild(column);
    }
}

function startAnimation() {
    if (!intro) return;

    if (sessionStorage.getItem("prometheus-intro-seen") === "true") {
        intro.classList.add("finished");
        mainSite?.classList.add("show");
        return;
    }

    sessionStorage.setItem("prometheus-intro-seen", "true");

    buildIntroCollage();

    setTimeout(() => {
        intro.classList.add("show");
    }, 100);

    setTimeout(() => {
        centerText?.classList.add("show");
    }, 1500);

    setTimeout(() => {
        intro.classList.add("opening");
        centerText?.classList.remove("show");
    }, 4200);

    setTimeout(() => {
        mainSite?.classList.add("show");
    }, 4900);

    setTimeout(() => {
        intro.classList.add("finished");
    }, 6000);
}

window.addEventListener("load", startAnimation);