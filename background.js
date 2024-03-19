let downloadType = [false, false, true];

// chrome.runtime.onMessage.addListener((message, sender) => {
//     if (sender.tab) {
//         let { allSvgs } = message;
//         allSvgs.forEach((svg, index) => {
//             chrome.downloads.download({
//                 url: `data:image/svg+xml,${encodeURIComponent(svg)}`,
//                 filename: `svg-${index}-${Date.now()}.png`,
//                 saveAs: true,
//             });
//         });
//     }
//     else {
//         console.log(message);
//         downloadType = message.switchState;
//     }
// });

chrome.runtime.onMessage.addListener((message, sender) => {
    if (sender.tab) {
        console.log("message received");
        const { url } = message;
        const zipFileName = "all-svgs.zip";
        chrome.downloads.download({
            url,
            filename: zipFileName,
            saveAs: true,
        });
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
              tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, { url });
              });
            } else {
              console.error("No active tab found");
            }
        });
    } else {
        console.log(message);
        downloadType = message.switchState;
    }
});
  
