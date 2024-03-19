let display = document.createElement("div");
display.id = "display";
display.style.position = "fixed";
display.style.top = "0";
display.style.left = "0";
display.style.maxWidth = "500px";
display.style.display = "none";
display.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
display.style.color = "white";
display.style.padding = "10px";
display.style.zIndex = "9999";
display.style.fontSize = "14px";
display.style.borderRadius = "5px";

document.body.appendChild(display);

document.addEventListener("mousemove", (event) => {
    display.style.display = "block";
    display.style.left = `${event.x}px`;
    display.style.top = `${event.y}px`;
})

let isClicked = false;

let allSvgs = [];

document.addEventListener("mouseover", (event) => {
    let element = event.target;
    allSvgs = Array.from(element.querySelectorAll("svg"));
    allSvgs = allSvgs.map(svg => svg.outerHTML);
    if (allSvgs.length > 0) {
        display.style.display = "block";
        let svgs = allSvgs;
        display.innerText = `Found ${svgs.length} SVG`;
        element.addEventListener("click", async (event) => {
            event.preventDefault();
            if (isClicked) {
                return;
            }
            isClicked = true;
            const blobs = [];
            allSvgs.forEach((svg, index) => {
                const svgData = `data:image/svg+xml,${encodeURIComponent(svg)}`;
                const svgName = `svg-${index}-${Date.now()}.svg`;
                const svgBlob = new Blob([svgData], { type: "text/plain" });
                blobs.push({ name: svgName, blob: svgBlob });
            });
            console.log("Blobs", blobs);
            const zipBlob = new Blob(blobs, { type: "application/zip" });
            console.log("zipBlob",zipBlob);
            const url = window.URL.createObjectURL(zipBlob);
            console.log("url",url);
            chrome.runtime.sendMessage({url});
            setTimeout(() => {
                isClicked = false;
            }, 1000);
        });
    }
});

chrome.runtime.onMessage.addListener(message => {
    const { url } = message;
    window.URL.revokeObjectURL(url);
});