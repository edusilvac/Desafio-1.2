//Módulos PromptSync
import PromptSync from 'prompt-sync';

import readline from 'readline';

const prompt = require('prompt-sync')({ sigint: true }); // Permite terminar o programa com CTRL-C

//let nome = prompt('Digite seu nome'); 

class Paciente{
    constructor(cpf, nome, dataNascimento){
        this.cpf = cpf;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
    }

    validarCPF(){
        const cpfDigits = this.cpf.replace(/[^\d]/g, ''); // Remover caracteres não numéricos do CPF

    // Verificar se o CPF possui exatamente 11 dígitos
    if (cpfDigits.length !== 11) {
      return false; // CPF inválido
    }

    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpfDigits)) {
      return false; // CPF inválido (todos os dígitos são iguais)
    }

    // Calcular o primeiro dígito verificador (J)
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpfDigits.charAt(i)) * (10 - i);
    }
    let remainder = sum % 11;
    let firstVerifierDigit = remainder < 2 ? 0 : 11 - remainder;

    // Verificar o primeiro dígito verificador (J)
    if (parseInt(cpfDigits.charAt(9)) !== firstVerifierDigit) {
      return false; // CPF inválido (primeiro dígito verificador não corresponde)
    }

    // Calcular o segundo dígito verificador (K)
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpfDigits.charAt(i)) * (11 - i);
    }
    remainder = sum % 11;
    let secondVerifierDigit = remainder < 2 ? 0 : 11 - remainder;

    // Verificar o segundo dígito verificador (K)
    if (parseInt(cpfDigits.charAt(10)) !== secondVerifierDigit) {
      return false; // CPF inválido (segundo dígito verificador não corresponde)
    }

    return true; // CPF válido
    }

    validarDataNascimento(){
        const regexData = /^\d{2}\/\d{2}\/\d{4}$/; //Validar Data de Nascimento

        if (!regexData.test(this.dataNascimento)){
            return false;  //Formato Inválido
        }

        const partesData = this.dataNascimento.split('/');
        const dia = parseInt(partesData[0]);
        const mes = parseInt(partesData[1]);
        const ano = parseInt(partesData[2]);

        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear();
        const mesAtual = dataAtual.getMonth() + 1; //Não existe mês 0.
        const diaAtual = dataAtual.getDate();

        if (ano > anoAtual){
            return false; //Ano Futuro Inválido
        }

        if (ano === anoAtual && mes > mesAtual){
            return false; //Mês futuro Inválido
        }

        if (ano === anoAtual && mes === mesAtual && dia > diasAtual){
            return false; //Ano futuro Inválido 
        }

        return true;
    }
}

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


