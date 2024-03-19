chrome.runtime.onMessage.addListener((message, sender) => {
    if (sender.tab) {
        let { url, filename } = message;
        chrome.downloads.download({
			url,
			filename,
			saveAs: true,
        });
    }
});