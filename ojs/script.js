let rulesCount = 0;

function addNewRule() {
    rulesCount++;
    const ruleContainer = document.getElementById('RuleContainer');
    const noRulesMessage = document.getElementById('noRulesMessage');

    if (noRulesMessage) {
        noRulesMessage.style.display = "none";
    }

    const ruleDiv = document.createElement('div');
    ruleDiv.classList.add('rule');

    const ruleNameInput = document.createElement('input');
    ruleNameInput.type = "text";
    ruleNameInput.value = `Rule ${rulesCount}`;
    ruleDiv.appendChild(ruleNameInput);

    const eventSelect = document.createElement('select');
    const eventOptions = ["ONGOING - GLOBAL", "ONGOING - PLAYERS", "Subroutine"];
    eventOptions.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.text = optionText;
        eventSelect.appendChild(option);
    });
    ruleDiv.appendChild(eventSelect);

    const playerSubContainer = document.createElement('div');
    ruleDiv.appendChild(playerSubContainer);
    updatePlayerSubVisibility(eventSelect, playerSubContainer);

    eventSelect.addEventListener('change', () => {
        updatePlayerSubVisibility(eventSelect, playerSubContainer);
    });

    const conditionsActionsDiv = document.createElement('div');
    conditionsActionsDiv.classList.add('conditions-actions');

    const conditionsDiv = document.createElement('div');
    conditionsDiv.classList.add('conditions');
    conditionsDiv.innerHTML = "Conditions (0)"; // Placeholder - You'll need to make this dynamic
    conditionsActionsDiv.appendChild(conditionsDiv);

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('actions');
    actionsDiv.innerHTML = "Actions (0)"; // Placeholder - You'll need to make this dynamic
    conditionsActionsDiv.appendChild(actionsDiv);

    ruleDiv.appendChild(conditionsActionsDiv);
    ruleContainer.appendChild(ruleDiv);
}

function updatePlayerSubVisibility(eventSelect, container) {
    const selectedEvent = eventSelect.value;
    container.innerHTML = "";

    if (selectedEvent === "ONGOING - PLAYERS") {
        const playerInput = document.createElement('input');
        playerInput.type = "text";
        playerInput.placeholder = "Enter Player(s)";
        container.appendChild(playerInput);
    } else if (selectedEvent === "Subroutine") {
        const subroutineInput = document.createElement('input');
        subroutineInput.type = "text";
        subroutineInput.placeholder = "Enter Subroutine Name";
        container.appendChild(subroutineInput);
    }
}

function newSubroutine() {
    alert("New Subroutine clicked!"); // Placeholder
}

function saveFile() {
    alert("Save file clicked!"); // Placeholder
}

function openFile() {
    alert("Open file clicked!"); // Placeholder
}

function copyWorkshop() {
    alert("Copy Workshop clicked!"); // Placeholder
}

function selectAll() {
    alert("Select All clicked!"); // Placeholder - Implement actual selection logic
}


// Function to create the buttons in the button bar
function createButtonBar() {
    const buttonBar = document.querySelector('.button-bar');

    const buttons = [
        { text: "Save", className: "save-button", onclick: "saveFile()" },
        { text: "Open", onclick: "openFile()" },
        { text: "Copy Workshop", onclick: "copyWorkshop()" },
        { type: "divider" },
        { text: "Select All", onclick: "selectAll()" },
        { type: "divider" },
        { text: "New Rule", className: "add-rule-button", onclick: "addNewRule()" },
        { text: "New Subroutine", onclick: "newSubroutine()" }
    ];

    buttons.forEach(buttonData => {
        if (buttonData.type === "divider") {
            const divider = document.createElement('div');
            divider.classList.add('vertical-divider');
            buttonBar.appendChild(divider);
        } else {
            const button = document.createElement('button');
            button.textContent = buttonData.text;
            if (buttonData.className) {
                button.classList.add(buttonData.className);
            }
            button.onclick = new Function(buttonData.onclick); // Safer way to set onclick
            buttonBar.appendChild(button);
        }
    });
}

window.onload = function () {
    createButtonBar();
};
