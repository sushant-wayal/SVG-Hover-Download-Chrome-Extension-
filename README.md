# SVG Hover Download Chrome Extension

This Chrome extension allows you to easily download SVG images encountered while browsing the web. Simply hover over an element containing SVGs, and the extension will display a preview of the SVGs. Click on a preview to download the SVG as either an SVG file or a PNG image.  A "Download All" button in the popup allows you to download all SVGs on the current page.

## Features

* Hover to preview SVGs within elements on a webpage.
* Click to download individual SVGs as SVG or PNG.
* Toggle between SVG and PNG download formats in the extension popup.
* "Download All" button in the popup downloads all SVGs on the current page.
* Persistent toggle settings (remembers your SVG/PNG download preferences).

## Files

* **`background.js`**: Handles the download requests from `content.js`.
* **`content.js`**: Injects the hover preview and download functionality into web pages.
* **`popup.js`**: Controls the popup UI for toggling download options and the "Download All" functionality.
* **`manifest.json`**:  (Not provided, but required) Declares the extension's permissions, background script, content script, popup, and other metadata.

## Installation

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked".
5. Select the directory containing the extension files.

## Usage

1. Click the extension icon in your browser toolbar to open the popup.
2. Toggle the "SVG" and "PNG" buttons to choose your desired download formats.
3. Browse any webpage. When you hover over an element containing SVGs, a preview will appear.
4. Click a preview to download the individual SVG.
5. Alternatively, click the "Download All" button in the extension popup to download all SVGs on the current page.


## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.
