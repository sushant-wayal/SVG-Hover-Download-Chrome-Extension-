let active = false;

let downloadType = JSON.parse(localStorage.getItem("switchState")) ? JSON.parse(localStorage.getItem("switchState")) : [false, true];

let mouseFollower = document.createElement("div");
mouseFollower.style.position = "fixed";
mouseFollower.style.top = "0";
mouseFollower.style.left = "0";
mouseFollower.style.display = "none";
mouseFollower.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
mouseFollower.style.color = "white";
mouseFollower.style.padding = "10px";
mouseFollower.style.zIndex = "9999";
mouseFollower.style.fontSize = "14px";
mouseFollower.style.borderRadius = "5px";

document.body.appendChild(mouseFollower);

let display = document.createElement("div");

display.style.position = "fixed";
display.style.top = "0";
display.style.right = "0";
display.style.maxWidth = "200px";
display.style.maxHeight = "100vh";
display.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
display.style.padding = "10px";
display.style.zIndex = "9999";
display.style.fontSize = "14px";
display.style.borderRadius = "5px";
display.style.display = "none";
display.style.flexDirection = "row";
display.style.justifyContent = "start";
display.style.alignItems = "center";
display.style.gap = "6px";
display.style.flexWrap = "wrap";
display.style.overflowY = "scroll";

document.body.appendChild(display);

let exit = document.createElement("button");
exit.innerHTML = "Exit Hover SVG Downloader";
exit.style.display = "none";
exit.style.position = "fixed";
exit.style.bottom = "0";
exit.style.left = "0";
exit.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
exit.style.color = "white";
exit.style.padding = "10px";
exit.style.zIndex = "9999";
exit.style.fontSize = "14px";
exit.style.borderRadius = "5px";
exit.style.border = "none";
exit.style.cursor = "pointer";

document.addEventListener("mousemove", (event) => {
    if (!active) {
        mouseFollower.style.display = "none";
        display.style.display = "none";
        exit.style.display = "none";
    } else {
        mouseFollower.style.display = "block";
        display.style.display = "flex";
        exit.style.display = "block";
    }
    mouseFollower.style.left = `${event.x}px`;
    mouseFollower.style.top = `${event.y}px`;
})

exit.addEventListener("click", () => {
    mouseFollower.style.display = "none";
    display.style.display = "none";
    exit.style.display = "none";
    active = false;
});

document.body.appendChild(exit);

let isClicked = false;

const displaySvgs = (allSvgs) => {
    if (isClicked) {
        return;
    }
    isClicked = true;
    while (display.firstChild) {
        display.removeChild(display.firstChild);
    }
    allSvgs.forEach(svg => {
        let thisSvg = document.createElement("div");
        thisSvg.style.border = "1px solid white";
        thisSvg.style.padding = "10px";
        thisSvg.style.borderRadius = "5px";
        thisSvg.style.cursor = "pointer";
        thisSvg.innerHTML = svg;
        display.appendChild(thisSvg);
        thisSvg.addEventListener("mouseover", () => {
            thisSvg.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        });
        thisSvg.addEventListener("mouseout", () => {
            thisSvg.style.backgroundColor = "transparent";
        });
        thisSvg.addEventListener("click", () => {
            console.log("clicked");
            if (downloadType[0]) {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                let img = new Image();
                img.src = `data:image/svg+xml,${encodeURIComponent(svg)}`;
                img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    chrome.runtime.sendMessage({ url: canvas.toDataURL(), filename: `svg-${Date.now()}.png` });
                }
            }
            if (downloadType[1]) {
                chrome.runtime.sendMessage({ url: `data:image/svg+xml,${encodeURIComponent(svg)}`, filename: `svg-${Date.now()}.svg` });
            }
        });
    });
    setTimeout(() => {
        isClicked = false;
    }, 1000);
}

document.addEventListener("mouseover", (event) => {
    let element = event.target;
    let allSvgs = [...new Set(Array.from(element.querySelectorAll("svg")).map(svg => svg.outerHTML))];
    if (allSvgs.length > 0) {
        mouseFollower.style.display = active ? "block" : "none";
        mouseFollower.innerHTML = `<p>Found ${allSvgs.length} SVG</p>`;
        element.addEventListener("click", () => displaySvgs(allSvgs));
    }
});

chrome.runtime.onMessage.addListener(message => {
    downloadType = message.switchState ? message.switchState : downloadType;
    localStorage.setItem("switchState", JSON.stringify(downloadType));
    if (message.active) {
        active = message.active;
    }
    if (message.downloadAll) {
        let allSvgs = [...new Set(Array.from(document.querySelectorAll("svg")).map(svg => svg.outerHTML))];
        displaySvgs(allSvgs);
    }
});