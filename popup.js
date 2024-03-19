let switchOn = [false, false, true]

const toogleSwitch = (thisSwitch, index) => {
    thisSwitch.style.transform = `translateX(${switchOn[index] ? 0 : 30}px)`;
}

let buttons = document.querySelectorAll(".toggle");
let switchs = document.querySelectorAll(".switch");

buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
        toogleSwitch(switchs[index], index);
        switchOn[index] = !switchOn[index];
        if (switchOn[index]) {
            button.style.backgroundColor = "#d6ceff";
        }
        else {
            button.style.backgroundColor = "#343a40";
        }
        chrome.runtime.sendMessage({switchState: switchOn});
    });
});