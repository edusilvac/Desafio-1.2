//Importar Paciente no Menu
import Paciente from './Layout/paciente.js'

//Módulos PromptSync
import PromptSync from 'prompt-sync';

import readline from 'readline';
import { Agenda } from './Agenda.js';

//const prompt = require('prompt-sync')({ sigint: true }); // Permite terminar o programa com CTRL-C
//let nome = prompt('Digite seu nome'); 

class Menu {
  constructor(pacientes, rl) {
    this.pacientes = pacientes;
    this.consultas = [];
    this.rl = rl;
    this.agenda = new Agenda();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    this.pacientes = []; // Array para armazenar os pacientes cadastrados
    this.consultas = []; // Array para armazenar as consultas agendadas
    
  }


  //Exclusão de Pacientes do Cadastro
  excluirPaciente() {
    console.log('--- Excluir Paciente ---');

    this.rl.question('Digite o CPF do paciente a ser excluído: ', (cpf) => {
      // Procurar o paciente pelo CPF no array de pacientes
      const pacienteIndex = this.pacientes.findIndex((paciente) => paciente.cpf === cpf);

      if (pacienteIndex === -1) {
        console.log('Paciente não encontrado.');
        this.exibirMenuPrincipal();
        return;
      }

      const paciente = this.pacientes[pacienteIndex];

      // Verificar se o paciente possui consultas agendadas futuras
      const consultasFuturas = this.consultas.some((consulta) => consulta.paciente === paciente && consulta.data > new Date());

      if (consultasFuturas) {
        console.log('O paciente possui consultas agendadas futuras e não pode ser excluído.');
        this.exibirMenuPrincipal();
        return;
      }

      // Excluir as consultas agendadas passadas do paciente, se houver
      this.consultas = this.consultas.filter((consulta) => consulta.paciente !== paciente || consulta.data > new Date());

      // Excluir o paciente do array de pacientes
      this.pacientes.splice(pacienteIndex, 1);

      console.log('Paciente excluído com sucesso.');

      this.exibirMenuPrincipal();
    });
  }

  // Menu Principal
  exibirMenuPrincipal() {
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
          this.exibirMenuPrincipal();
          break;
      }
    });
  }

  // Opções do Cadastro de Pacientes
  cadastrarPaciente() {
    console.log('--- Cadastro de Pacientes ---');
    console.log('1 - Cadastrar novo Paciente');
    console.log('2 - Excluir Paciente');
    console.log('3 - Listar Pacientes (Ordenado por CPF)');
    console.log('4 - Listar Pacientes (Ordenado por Nome)');
    console.log('5 - Voltar para o menu principal');

    this.rl.question('Digite a opção desejada: ', (opcao) => {
      switch (opcao) {
        case '1':
          // Lógica para cadastrar novo Paciente
          console.log('Cadastrar Novo Paciente');
          this.cadastrarNovoPaciente();
          break;
        case '2':
          // Lógica para Excluir um Paciente
          console.log('Excluir Paciente');
          this.excluirPaciente();
          break;
        case '3':
          // Lógica para Listar Pacientes (Ordenado por CPF)
          console.log('Listar Pacientes (Ordenado por CPF)');
          this.exibirMenuPrincipal();
          break;
        case '4':
          // Lógica para Listar Pacientes (Ordenado por Nome)
          console.log('Listar Pacientes (Ordenado por Nome)');
          this.exibirMenuPrincipal();
          break;
        case '5':
          // Lógica para Voltar para o menu principal
          console.log('Voltar para o menu principal');
          this.exibirMenuPrincipal();
          break;
        default:
          console.log('Opção Inválida. Digite uma Opção Válida');
          this.cadastrarPaciente();
          break;
      }
    });
  }

  //CASO 1 - CADASTRO DE NOVO PACIENTE
  cadastrarNovoPaciente() {
    console.log('--- Cadastrar Novo Paciente ---');

    this.rl.question('Digite o CPF: ', (cpf) => {
      this.rl.question('Digite o nome: ', (nome) => {
        this.rl.question('Digite a data de nascimento (DD/MM/AAAA): ', (dataNascimento) => {
          const paciente = new Paciente(cpf, nome, dataNascimento); // Cria uma instância da classe Paciente

          // Aqui você pode chamar os métodos da instância de Paciente,
          // como validarCPF() e validarDataNascimento(), para validar
          // os dados do paciente antes de realizar o cadastro.

          if (!paciente.validarCPF()) {
            console.log('CPF inválido. Digite um CPF válido.');
            this.exibirMenuPrincipal();
            return;
          }

          if (!paciente.validarDataNascimento()) {
            console.log('Data de nascimento inválida. Digite uma data válida.');
            this.exibirMenuPrincipal();
            return;
          }

          // Aqui você pode realizar o cadastro do paciente no sistema,
          // como adicionar o objeto paciente a uma lista de pacientes, etc.

          console.log('Paciente cadastrado com sucesso.');

          this.exibirMenuPrincipal();
        });
      });
    });
  }


  // Opções da Agenda
  exibirAgenda() {
    console.log('--- Agenda ---');
    console.log('1 - Agendar Consulta');
    console.log('2 - Cancelar Agendamento');
    console.log('3 - Listar Agenda');
    console.log('4 - Voltar para o menu principal');

    this.rl.question('Digite a opção desejada: ', (opcao) => {
      switch (opcao) {
        case '1':
          // Lógica para Agendar Consulta
          console.log('Agendar Consulta');
          this.rl.question('CPF do paciente: ', (cpf) => {
            this.rl.question('Data da consulta (DD/MM/AAAA): ', (dataConsulta) => {
              this.rl.question('Hora inicial (HHMM): ', (horaInicial) => {
                this.rl.question('Hora final (HHMM): ', (horaFinal) => {
                  this.agenda.agendarConsulta(cpf, dataConsulta, horaInicial, horaFinal);
                });
              });
            });
          });
          break;
        case '2':
        // Lógica para Cancelar Agendamento
        console.log('Cancelar Agendamento');
        this.rl.question('CPF do paciente: ', (cpf) => {
          this.rl.question('Data da consulta (DD/MM/AAAA): ', (dataConsulta) => {
            this.rl.question('Hora inicial (HHMM): ', (horaInicial) => {
              this.agenda.cancelarAgendamento(cpf, dataConsulta, horaInicial);
              this.exibirMenuPrincipal();
            });
          });
        });
        break;
        case '3':
          // Lógica para Listar Agenda
          console.log('Listar Agenda');
          this.exibirMenuPrincipal();
          break;
        case '4':
          // Lógica para Voltar para o menu principal
          console.log('Voltar para o menu principal');
          this.exibirMenuPrincipal();
          break;
        default:
          console.log('Opção Inválida. Digite uma Opção Válida');
          this.exibirAgenda();
          break;
      }
    });
  }
}

const menu = new Menu();
menu.exibirMenuPrincipal(); 
