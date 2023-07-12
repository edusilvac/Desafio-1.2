//Importar Menu
import Paciente from './Layout/paciente.js'

//Módulos PromptSync
import PromptSync from 'prompt-sync';

import readline from 'readline';
import { Agenda } from './Agenda.js';

//const prompt = require('prompt-sync')({ sigint: true }); // Permite terminar o programa com CTRL-C
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

    //Aqui estão as Opçãos do Primeiro Caso
  cadastrarPaciente() {
    console.log('--- Cadastro de Pacientes ---');
    console.log('1 - Cadastrar novo Paciente');
    console.log('2 - Excluir Paciente');
    console.log('3 - Listar Pacientes (Ordenado por CPF)');
    console.log('4 - LIstar Pacientes (Ordenado por Nome)');
    console.log('5 - Voltar p/ menu principal');

    this.rl.question('Digite a opção desejada: ', (opcao) => {
      switch (opcao){
        case '1':
          // Lógica para cadastrar novo Cliente
          console.log('Cadastrar Novo Paciente');
          this.exibir();
          break;
        case '2':
          // Lógica para Excluir um Paciente
          console.log('Excluir Paciente');
          this.exibir();
          break;
        case '3':
          // Lógica para Listar Pacientes (Ordenado por CPF)
          console.log('Listar Pacientes (Ordenado por CPF');
          this.exibir();
          break;
          //Lógica para Listar Pacientes (Ordenado por Nome)
        case '4':
          console.log('Listar Pacientes (Ordenado por Nome');
          this.exibir();
          break;
        case '5':
          // Lógica para Voltar p/ menu Principal
          console.log('Voltar p/ Menu Principal');
          this.exibir();
          break;
          
          default:
            console.log('Opção Inválida. Digite uma Opção Válida');
            this.cadastrarPaciente();
            break;
      }
    });
  }

  //Aqui estão as Opçãos do Segundo Caso
  exibirAgenda() {
    console.log('--- Agenda ---');
    console.log('1 - Agendar Consulta');
    console.log('2 - Cancelar Agendamento');
    console.log('3 - Listar Agenda');
    console.log('4 - Voltar p/ Menu Principal');

    this.rl.question('Digite a opção desejada: ', (opcao) => {
      switch (opcao){
        case '1':
        // Lógica para Agendar Consulta
        console.log('Agendar Consulta');
        this.exibir();
        break;
        case '2':
        // Lógica para Cancelar Agendamento
        console.log('Cancelar Agendamento');
        this.exibir();
        break;
        case '3':
        // Lógica para Listar Agenda
        console.log('Listar Agenda');
        this.exibir();
        break;
        case '4':
        // Lógica para Voltar p/ menu principal
        console.log('Voltar p/ Menu Principal');
        this.exibir();
        break;

        default:
          console.log('Opção Inválida. Digite uma opção Válida');
          this.exibirAgenda();
        break;
      }
    });
  }
}

const menu = new Menu();
menu.exibir();