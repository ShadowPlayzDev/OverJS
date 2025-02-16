// script.js
const terminal = document.getElementById('terminal');
const prompt = document.getElementById('prompt');
const commandInput = document.getElementById('command-input');

let rules = {};
let ruleCount = 0;

commandInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();

        const command = commandInput.value;
        displayOutput(`&gt; ${command}`);

        const output = processCommand(command);
        displayOutput(output);

        commandInput.value = '';
        terminal.scrollTop = terminal.scrollHeight;
    }
});

function displayOutput(text, isError = false) {
    const outputDiv = document.createElement('div');
    outputDiv.classList.add('output');
    if (isError) {
        outputDiv.classList.add('error');
    }
    outputDiv.textContent = text;
    terminal.insertBefore(outputDiv, terminal.lastChild);
}

function processCommand(command) {
    const parts = command.split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);

    switch (cmd) {
        case '@list':
            let output = `Rules (${ruleCount}):\n`;
            for (const ruleName in rules) {
                output += `- ${ruleName} (count: ${rules[ruleName].count})\n`;
            }
            return output;

        case '@import':
            if (args.length === 1) {
                const filename = args[0];
                if (filename.endsWith(".rule")) {
                    const ruleName = filename.slice(0, -5);
                    if (!rules[ruleName]) {
                        rules[ruleName] = { code: "", count: 0 };
                        ruleCount++;
                        return `Rule "${ruleName}" created.`;
                    } else {
                        return `Rule "${ruleName}" already exists.`;
                    }
                } else {
                    return "Invalid file name.  Must end in .rule";
                }
            } else {
                return "Usage: @import <filename.rule>";
            }
            break;

        case '@inject':
            if (args.length >= 2) {
                const ruleName = args[0].replace(/"/g, '');
                const code = args.slice(1).join(" ");
                if (rules[ruleName]) {
                    rules[ruleName].code += code;
                    return `Code injected into "${ruleName}".`;
                } else {
                    return `Rule "${ruleName}" not found.`;
                }
            } else {
                return "Usage: @inject \"Rule Name\" <code>";
            }
            break;

        case '@delete':
            if (args.length === 1) {
                const ruleName = args[0].replace(/"/g, '');
                if (rules[ruleName]) {
                    const confirmDelete = confirm(`Are you sure you want to delete "${ruleName}"?`);
                    if (confirmDelete) {
                        delete rules[ruleName];
                        ruleCount--;
                        return `Rule "${ruleName}" deleted.`;
                    } else {
                        return `Deletion cancelled.`;
                    }
                } else {
                    return `Rule "${ruleName}" not found.`;
                }
            } else {
                return "Usage: @delete \"Rule Name\"";
            }
            break;

        case '@help':
            if (args.length === 0) {
                return "Available commands: @list, @import <filename.rule>, @inject \"Rule Name\" <code>, @delete \"Rule Name\", @help, @help contact";
            } else if (args[0] === 'contact') {
                return "Contact us at: overjs.devs@example.com (placeholder)";
            } else {
                return "Usage: @help or @help contact";
            }
            break;

        default:
            return `Unknown command: ${cmd}`;
    }
}
