//Importar Menu
import Paciente from './Layout/menu.js'

//Módulos PromptSync
import PromptSync from 'prompt-sync';

import readline from 'readline';

const prompt = require('prompt-sync')({ sigint: true }); // Permite terminar o programa com CTRL-C
//let nome = prompt('Digite seu nome'); 

class Menu {
  constructor() {
    this.agenda = new Agenda();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  exibir() {
    console.log('Menu Principal');
    console.log('1 - Cadastro de Pacientes');
    console.log('2 - Agenda');
    console.log('3 - Fim');

    this.rl.question('Digite a opção desejada: ', (opcao) => {
      switch (opcao) {
        case '1':
          this.cadastrarPaciente();
          break;
        case '2':
          this.exibirAgenda();
          break;
        case '3':
          this.rl.close();
          console.log('Programa encerrado.');
          break;
        default:
          console.log('Opção inválida. Digite uma opção válida.');
          this.exibir();
          break;
      }
    });
  }

  cadastrarPaciente() {
    console.log('--- Cadastro de Pacientes ---');
    this.agenda.adicionarPaciente(() => {
      console.log('Paciente cadastrado com sucesso.');
      this.exibir();
    });
  }

  exibirAgenda() {
    console.log('--- Agenda ---');
    this.agenda.exibir();
    this.exibir();
  }
}

class Agenda {
  constructor() {
    this.pacientes = [];
  }

  adicionarPaciente(callback) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Digite o CPF do Paciente: ', (cpf) => {
      // Implementação da lógica de cadastro de pacientes
      // ...
      rl.close();
      callback();
    });
  }

  exibir() {
    console.log('--- Lista de Pacientes ---');
    for (const paciente of this.pacientes) {
      console.log(`CPF: ${paciente.cpf}`);
      console.log(`Nome: ${paciente.nome}`);
      console.log(`Data de Nascimento: ${paciente.dataNascimento}`);
      console.log('---');
    }
  }
} 

const menu = new Menu();
menu.exibir();


