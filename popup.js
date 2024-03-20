document.addEventListener("DOMContentLoaded", () => {
    let active = true;
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, { active });
        });
    });
});

const toogleSwitch = (thisSwitch, index, switchOn) => {
    thisSwitch.style.transform = `translateX(${switchOn[index] ? 30 : 0}px)`;
}

let buttons = document.querySelectorAll(".toggle");
let switchs = document.querySelectorAll(".switch");

const toggleState = (button, index, clicked) => {
    const switchOn = localStorage.getItem("switchState") ? JSON.parse(localStorage.getItem("switchState")) : [false, true];
    if (clicked) {
        switchOn[index] = !switchOn[index];
    }
    toogleSwitch(switchs[index], index, switchOn);
    if (switchOn[index]) {
        button.style.backgroundColor = "#d6ceff";
    }
    else {
        button.style.backgroundColor = "#343a40";
    }
    if (clicked) {
        localStorage.setItem("switchState", JSON.stringify(switchOn));
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, {switchState: switchOn});
            });
        });
    }
}

buttons.forEach((button, index) => {
    toggleState(button, index, false);
    button.addEventListener("click", () => toggleState(button, index, true));
});

let downloadAll = document.querySelector("#downloadAll");

downloadAll.addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, {downloadAll: true});
        });
    });
});