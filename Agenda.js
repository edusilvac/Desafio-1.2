import readline from 'readline';

export class Agenda {
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
