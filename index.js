import inquirer from "inquirer";
let todoList = [];

async function addItem() {


    todoList.push({ title, dueDate, status: 'pending', id: Date.now() });
    console.log(`\Tarefa "${title}" adicionado!\n`);
}

async function listarTarefa() {
    todoList.forEach(function(tarefa) {
        console.log(`Titulo: ${tarefa.title} - Data: ${tarefa.dueDate} - Status: ${tarefa.status}`)
    });
}

async function completarTarefa () {
    if(!todoList.length) {
        console.log(`\nNenhuma tarefa encontrada\n`)
        return;
    }

    const { id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Qual tarefa você quer marcar como concluida?',
            choices: todoList.map((tarefa) => ({ name: tarefa.title, value: tarefa.id  })),
        }
    ]);

    const tarefa = todoList.find((tarefa) => tarefa.id === id);
    tarefa.status = 'done';
    console.log(`\nTarefa "${tarefa.title}" marcado como concluido.\n`)
}

async function editarTarefa() {
    if(!todoList.length) {
        console.log(`\nNenhuma tarefa encontrada\n`)
        return;
    }

    const { id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Qual tarefa você quer editar?',
            choices: todoList.map((tarefa) => ({ name: tarefa.title, value: tarefa.id  })),
        }
    ]);

    const tarefa = todoList.find((tarefa) => tarefa.id === id);

    const { title, dueDate } = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Digite um novo titulo',
            default: tarefa.title,
        },
        {
            type: 'input',
            name: 'dueDate',
            message: 'Digite uma nova data da tarefa',
            default: tarefa.dueDate,
        },
    ]);

    tarefa.title = title;
    tarefa.dueDate = dueDate;
    console.log(`\nTarefa "${title}" editada com sucesso.\n`)
}

async function deletarTarefa () {
    if(!todoList.length) {
        console.log(`\nNenhuma tarefa encontrada\n`)
        return;
    }

    const { id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Qual tarefa você quer deletar?',
            choices: todoList.map((tarefa) => ({ name: tarefa.title, value: tarefa.id  })),
        }
    ]);

    todoList = todoList.filter((tarefa) => tarefa.id !== id);
    console.log(`\nTarefa deletada com sucesso.\n`)
}

async function main() {
    do {
        const option = await inquirer.prompt([
            {
                type: 'list',
                name: 'option',
                message: 'Escolha uma opção',
                choices: [
                    'Adicionar tarefa',
                    'Listar tarefas',
                    'Marcar tarefa como concluido',
                    'Editar tarefa',
                    'Deletar tarefa',
                    "Sair"
                ]
            }
        ])

        switch (option) {
            case 'Adicionar tarefa':
                await addItem();
                break;
            case 'Listar tarefas':
                await listarTarefa();
                break;
            case 'Marcar tarefa como concluido':
                await completarTarefa();
                break;
            case 'Editar tarefa':
                await editarTarefa();
                break;
            case 'Deletar tarefa':
                await deletarTarefa();
                break;
            case 'Sair':
                return;
        }
    } while (true);
}

main();