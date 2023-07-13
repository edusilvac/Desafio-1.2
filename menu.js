/* //Importar Paciente no Menu
import Paciente from './Layout/paciente.js'

//Módulos PromptSync
import PromptSync from 'prompt-sync';

import readline from 'readline';
import { Agenda } from './Agenda.js';

//const prompt = require('prompt-sync')({ sigint: true }); // Permite terminar o programa com CTRL-C
//let nome = prompt('Digite seu nome'); 

class Menu {
  constructor() {
    this.pacientes = [];
    this.consultas = [];
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.agenda = new Agenda(); // Passar o array pacientes como argumento
  }


  //Exclusão de Pacientes do Cadastro
  excluirPaciente() {
    console.log('--- Excluir Paciente ---');
  
    this.rl.question('Digite o CPF do paciente a ser excluído: ', (cpf) => {
      // Procurar o paciente pelo CPF no array de pacientes da instância da classe Agenda
      const pacienteIndex = this.agenda.pacientes.findIndex((paciente) => paciente.cpf === cpf);
  
      if (pacienteIndex === -1) {
        console.log('Paciente não encontrado.');
        this.exibirMenuPrincipal();
        return;
      }
  
      // Verificar se o paciente possui consultas agendadas futuras
      const consultasFuturas = this.agenda.consultas.some((consulta) => consulta.paciente.cpf === cpf && consulta.data > new Date());
  
      if (consultasFuturas) {
        console.log('O paciente possui consultas agendadas futuras e não pode ser excluído.');
        this.exibirMenuPrincipal();
        return;
      }
  
      // Excluir as consultas agendadas passadas do paciente, se houver
      this.agenda.consultas = this.agenda.consultas.filter((consulta) => consulta.paciente.cpf !== cpf || consulta.data > new Date());
  
      // Excluir o paciente do array de pacientes da instância da classe Agenda
      this.agenda.pacientes.splice(pacienteIndex, 1);
  
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
          this.agenda.listarPacientes();
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
          // Criar uma instância da classe Paciente
          const paciente = new Paciente(cpf, nome, dataNascimento);
  
          // Validar o CPF e a data de nascimento
          if (!paciente.validarCPF()) {
            console.log('CPF inválido. Digite um CPF válido.');
            this.exibirMenuPrincipal();
            return;
          }
  
          if (!paciente.validarDataNascimento()) {
            //console.log('Data de nascimento inválida. Digite uma data válida.');
            this.exibirMenuPrincipal();
            return;
          }
  
          // Cadastrar o paciente na agenda
          this.agenda.cadastrarPaciente(paciente.cpf, paciente.nome, paciente.dataNascimento);

  
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
          this.agendarConsulta();
          break;
        case '2':
          this.cancelarAgendamento();
          break;
        case '3':
          this.agenda.listarAgendaCompleta();
          this.exibirAgenda(); // Chamar a própria função novamente para exibir o menu da agenda
          break;
        case '4':
          this.exibirMenuPrincipal();
          break;
        default:
          console.log('Opção inválida. Digite uma opção válida.');
          this.exibirAgenda();
          break;
      }
    });
  }
  //Agendar Consulta
  agendarConsulta() {
    console.log('--- Agendar Consulta ---');
    this.rl.question('Digite o CPF do paciente: ', (cpf) => {
      const paciente = this.agenda.getPacienteByCPF(cpf);
      if (!paciente) {
        console.log('Erro: Paciente não cadastrado.');
        this.exibirAgenda();
        return;
      }
      this.rl.question('Digite a data da consulta (DD/MM/AAAA): ', (dataConsulta) => {
        this.rl.question('Digite a hora inicial (HHMM): ', (horaInicial) => {
          this.rl.question('Digite a hora final (HHMM): ', (horaFinal) => {
            this.agenda.agendarConsulta(cpf, dataConsulta, horaInicial, horaFinal);
            this.exibirAgenda();
          });
        });
      });
    });
  }

  // Cancelar Agendamento
  cancelarAgendamento() {
  console.log('--- Cancelar Agendamento ---');
  this.rl.question('Digite o CPF do paciente: ', (cpf) => {
    const paciente = this.agenda.getPacienteByCPF(cpf);
    if (!paciente) {
      console.log('CPF do paciente não encontrado.');
      this.exibirAgenda();
      return;
    }
    this.rl.question('Digite a data da consulta (DD/MM/AAAA): ', (dataConsulta) => {
      const [dia, mes, ano] = dataConsulta.split('/');
      const dataConsultaObj = new Date(ano, mes - 1, dia);

      const agendamentoIndex = this.agenda.consultas.findIndex(
        (consulta) =>
          consulta.paciente.cpf === cpf &&
          consulta.data.getDate() === dataConsultaObj.getDate() &&
          consulta.data.getMonth() === dataConsultaObj.getMonth() &&
          consulta.data.getFullYear() === dataConsultaObj.getFullYear()
      );

      if (agendamentoIndex === -1) {
        console.log('Não foi encontrado um agendamento para o paciente informado.');
        this.exibirAgenda();
        return;
      }

      const agendamento = this.agenda.consultas[agendamentoIndex];
      this.agenda.consultas.splice(agendamentoIndex, 1);

      console.log('Agendamento cancelado com sucesso.');
      this.exibirAgenda();
    });
  });
} 

  //ListarAgenda
  listarAgenda() {
    console.log('--- Listar Agenda ---');
    console.log('Data    H.Ini H.Fim Nome                     Dt.Nasc.');
    this.consultas.forEach((consulta) => {
      const { paciente, data, horaInicial, horaFinal } = consulta;
      console.log(`${this.agenda.formatarData(data)} ${horaInicial} ${horaFinal} ${paciente.nome} ${paciente.dataNascimento}`);
    });
    this.exibirMenuAgenda();
  }
}

const menu = new Menu();
menu.exibirMenuPrincipal(); */

//Importar Paciente no Menu
import Paciente from './Layout/paciente.js'

//Módulos PromptSync
import PromptSync from 'prompt-sync';

import { Agenda } from './Agenda.js';

//const prompt = require('prompt-sync')({ sigint: true }); // Permite terminar o programa com CTRL-C
//let nome = prompt('Digite seu nome'); 

class Menu {
  constructor() {
    this.pacientes = [];
    this.consultas = [];
    this.agenda = new Agenda(); // Passar o array pacientes como argumento
  }


  //Exclusão de Pacientes do Cadastro
  excluirPaciente() {
    console.log('--- Excluir Paciente ---');
  
    this.prompt.question('Digite o CPF do paciente a ser excluído: ', (cpf) => {
      // Procurar o paciente pelo CPF no array de pacientes da instância da classe Agenda
      const pacienteIndex = this.agenda.pacientes.findIndex((paciente) => paciente.cpf === cpf);
  
      if (pacienteIndex === -1) {
        console.log('Paciente não encontrado.');
        this.exibirMenuPrincipal();
        return;
      }
  
      // Verificar se o paciente possui consultas agendadas futuras
      const consultasFuturas = this.agenda.consultas.some((consulta) => consulta.paciente.cpf === cpf && consulta.data > new Date());
  
      if (consultasFuturas) {
        console.log('O paciente possui consultas agendadas futuras e não pode ser excluído.');
        this.exibirMenuPrincipal();
        return;
      }
  
      // Excluir as consultas agendadas passadas do paciente, se houver
      this.agenda.consultas = this.agenda.consultas.filter((consulta) => consulta.paciente.cpf !== cpf || consulta.data > new Date());
  
      // Excluir o paciente do array de pacientes da instância da classe Agenda
      this.agenda.pacientes.splice(pacienteIndex, 1);
  
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

    this.prompt.question('Digite a opção desejada: ', (opcao) => {
      switch (opcao) {
        case '1':
          this.cadastrarPaciente();
          break;
        case '2':
          this.exibirAgenda();
          break;
        case '3':
          this.prompt.close();
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

    this.prompt.question('Digite a opção desejada: ', (opcao) => {
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
          this.agenda.listarPacientes();
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

    this.prompt.question('Digite o CPF: ', (cpf) => {
      this.prompt.question('Digite o nome: ', (nome) => {
        this.prompt.question('Digite a data de nascimento (DD/MM/AAAA): ', (dataNascimento) => {
          // Criar uma instância da classe Paciente
          const paciente = new Paciente(cpf, nome, dataNascimento);
  
          // Validar o CPF e a data de nascimento
          if (!paciente.validarCPF()) {
            console.log('CPF inválido. Digite um CPF válido.');
            this.exibirMenuPrincipal();
            return;
          }
  
          if (!paciente.validarDataNascimento()) {
            //console.log('Data de nascimento inválida. Digite uma data válida.');
            this.exibirMenuPrincipal();
            return;
          }
  
          // Cadastrar o paciente na agenda
          this.agenda.cadastrarPaciente(paciente.cpf, paciente.nome, paciente.dataNascimento);

  
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

    this.prompt.question('Digite a opção desejada: ', (opcao) => {
      switch (opcao) {
        case '1':
          this.agendarConsulta();
          break;
        case '2':
          this.cancelarAgendamento();
          break;
        case '3':
          this.agenda.listarAgendaCompleta();
          this.exibirAgenda(); // Chamar a própria função novamente para exibir o menu da agenda
          break;
        case '4':
          this.exibirMenuPrincipal();
          break;
        default:
          console.log('Opção inválida. Digite uma opção válida.');
          this.exibirAgenda();
          break;
      }
    });
  }
  //Agendar Consulta
  agendarConsulta() {
    console.log('--- Agendar Consulta ---');
    this.prompt.question('Digite o CPF do paciente: ', (cpf) => {
      const paciente = this.agenda.getPacienteByCPF(cpf);
      if (!paciente) {
        console.log('Erro: Paciente não cadastrado.');
        this.exibirAgenda();
        return;
      }
      this.prompt.question('Digite a data da consulta (DD/MM/AAAA): ', (dataConsulta) => {
        this.prompt.question('Digite a hora inicial (HHMM): ', (horaInicial) => {
          this.prompt.question('Digite a hora final (HHMM): ', (horaFinal) => {
            this.agenda.agendarConsulta(cpf, dataConsulta, horaInicial, horaFinal);
            this.exibirAgenda();
          });
        });
      });
    });
  }

  // Cancelar Agendamento
  cancelarAgendamento() {
  console.log('--- Cancelar Agendamento ---');
  this.prompt.question('Digite o CPF do paciente: ', (cpf) => {
    const paciente = this.agenda.getPacienteByCPF(cpf);
    if (!paciente) {
      console.log('CPF do paciente não encontrado.');
      this.exibirAgenda();
      return;
    }
    this.prompt.question('Digite a data da consulta (DD/MM/AAAA): ', (dataConsulta) => {
      const [dia, mes, ano] = dataConsulta.split('/');
      const dataConsultaObj = new Date(ano, mes - 1, dia);

      const agendamentoIndex = this.agenda.consultas.findIndex(
        (consulta) =>
          consulta.paciente.cpf === cpf &&
          consulta.data.getDate() === dataConsultaObj.getDate() &&
          consulta.data.getMonth() === dataConsultaObj.getMonth() &&
          consulta.data.getFullYear() === dataConsultaObj.getFullYear()
      );

      if (agendamentoIndex === -1) {
        console.log('Não foi encontrado um agendamento para o paciente informado.');
        this.exibirAgenda();
        return;
      }

      const agendamento = this.agenda.consultas[agendamentoIndex];
      this.agenda.consultas.splice(agendamentoIndex, 1);

      console.log('Agendamento cancelado com sucesso.');
      this.exibirAgenda();
    });
  });
} 

  //ListarAgenda
  listarAgenda() {
    console.log('--- Listar Agenda ---');
    console.log('Data    H.Ini H.Fim Nome                     Dt.Nasc.');
    this.consultas.forEach((consulta) => {
      const { paciente, data, horaInicial, horaFinal } = consulta;
      console.log(`${this.agenda.formatarData(data)} ${horaInicial} ${horaFinal} ${paciente.nome} ${paciente.dataNascimento}`);
    });
    this.exibirMenuAgenda();
  }
}

const menu = new Menu();
menu.exibirMenuPrincipal();