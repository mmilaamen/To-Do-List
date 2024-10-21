const readline = require('readline');

let toDosStore = ["Shopping", "Home work", "Go to the gym"];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function insertTodo(todo) {
    toDosStore.push(todo);
    console.log(`Added: "${todo}"`);
}

function insertTodosArr(todos) {
    toDosStore.push(...todos);
    console.log(`Added multiple tasks: ${todos.join(", ")}`);
}

function removeTodo(itemNumber) {
    const index = itemNumber - 1;
    if (index >= 0 && index < toDosStore.length) {
        const removedItem = toDosStore.splice(index, 1);
        console.log(`Removed: "${removedItem}"`);
    } else {
        console.log("Invalid task number.");
    }
}

function editTodo(itemNumber, newValue) {
    const index = itemNumber - 1;
    if (index >= 0 && index < toDosStore.length) {
        toDosStore[index] = newValue;
        console.log(`Updated task ${itemNumber} to "${newValue}"`);
    } else {
        console.log("Invalid task number.");
    }
}

function updateTodos(orderNumbers, newValues) {
    for (let i = 0; i < orderNumbers.length; i++) {
        const index = orderNumbers[i] - 1;
        if (index >= 0 && index < toDosStore.length) {
            toDosStore[index] = newValues[i];
            console.log(`Updated task ${orderNumbers[i]} to "${newValues[i]}"`);
        } else {
            console.log(`Invalid task number: ${orderNumbers[i]}`);
        }
    }
}

function RenderToDosListTemplate() {
    if (toDosStore.length === 0) {
        console.log("To do list store is empty");
        return;
    }

    console.log("ToDo List:");
    toDosStore.forEach((item, index) => {
        console.log(`${index + 1}- ${item}`);
    });
}


function showCommands() {
    console.log("\nCommands:");
    console.log("1. List all tasks: list");
    console.log("2. Add a task: add <task>");
    console.log("3. Remove a task by number: remove <number>");
    console.log("4. Edit a task by number: edit <number> <new value>");
    console.log("5. Add multiple tasks: addmany <task1,task2,...>");
    console.log("6. Update multiple tasks: update <number1,number2,...> <new value1,new value2,...>");
    console.log("7. Quit: quit");
}


rl.on('line', (input) => {
    const [command, ...args] = input.trim().split(' ');

    switch (command) {
        case 'list':
            RenderToDosListTemplate();
            break;

        case 'add':
            const task = args.join(' ');
            insertTodo(task);
            break;

        case 'remove':
            const removeIndex = parseInt(args[0]);
            if (!isNaN(removeIndex)) {
                removeTodo(removeIndex);
            } else {
                console.log("Invalid input.");
            }
            break;

        case 'edit':
            const editIndex = parseInt(args[0]);
            const newTask = args.slice(1).join(' ');
            if (!isNaN(editIndex)) {
                editTodo(editIndex, newTask);
            } else {
                console.log("Invalid input.");
            }
            break;

        case 'addmany':
            const tasks = args.join(' ').split(',');
            insertTodosArr(tasks);
            break;

        case 'update':
            const [numbersPart, valuesPart] = args.join(' ').split(' ');
            const numbers = numbersPart.split(',').map(Number);
            const values = valuesPart.split(',');
            updateTodos(numbers, values);
            break;

        case 'quit':
            rl.close();
            break;

        default:
            console.log("Unknown command.");
            showCommands();
            break;
    }
    showCommands();
});

console.log("Welcome to the To-Do List App (Terminal Version)");
showCommands();
