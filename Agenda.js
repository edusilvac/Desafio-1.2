import PromptSync from 'prompt-sync';

export class Agenda {
  constructor() {
    this.pacientes = []; // Array para armazenar os pacientes cadastrados
    this.consultas = []; // Array para armazenar as consultas agendadas
  }

  // Método para formatar a data no formato DD/MM/AAAA
  formatarData(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = String(data.getFullYear());

    return `${dia}/${mes}/${ano}`;
  }


  

  // Método para listar os pacientes ordenados por CPF
  listarPacientes() {
    // Ordenar os pacientes por CPF
    const pacientesOrdenados = this.pacientes.sort((a, b) => a.cpf.localeCompare(b.cpf));
  
    console.log('------------------------------------------------------------');
    console.log('CPF           Nome                           Dt.Nasc.  Idade');
    console.log('------------------------------------------------------------');
  
    // Exibir os dados dos pacientes
    pacientesOrdenados.forEach((paciente) => {
      console.log(`${paciente.cpf} ${paciente.nome.padEnd(33)} ${paciente.dataNascimento} ${this.calcularIdade(paciente.dataNascimento)}`);
  
      // Verificar se o paciente possui agendamento futuro
      const agendamentoFuturo = this.consultas.find((consulta) => consulta.paciente === paciente && consulta.data > new Date());
      if (agendamentoFuturo) {
        const dataFormatada = this.formatarData(agendamentoFuturo.data);
        console.log('\nAgendado para:', dataFormatada);
        console.log(`${agendamentoFuturo.horaInicial} às ${agendamentoFuturo.horaFinal}\n`);
      }
    });
  
    console.log('------------------------------------------------------------');
  } 
  







  
  // Método para listar a agenda completa dentro de um período
  listarAgendaCompleta() {
    console.log('--- Listar Agenda ---');
    this.ordenarConsultasPorDataHora(); // Ordenar as consultas por data e hora antes de exibir a agenda

    const readlineInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // Solicitar a data inicial e final ao usuário
    readlineInterface.question('Apresentar a agenda T-Toda ou P-Periodo: P\nData inicial: ', (dataInicial) => {
      readlineInterface.question('Data final: ', (dataFinal) => {
        console.log('-------------------------------------------------------------');
        console.log('Data    H.Ini H.Fim Tempo Nome                     Dt.Nasc.');
        console.log('-------------------------------------------------------------');

        // Converter as datas de string para objetos Date
        const dataInicialObj = this.converterStringParaData(dataInicial);
        const dataFinalObj = this.converterStringParaData(dataFinal);

        // Filtrar as consultas dentro do período informado
        const consultasPeriodo = this.consultas.filter((consulta) => {
          const dataConsultaObj = new Date(consulta.data);
          return dataConsultaObj >= dataInicialObj && dataConsultaObj <= dataFinalObj;
        });

        // Exibir os dados das consultas no período informado
        consultasPeriodo.forEach((consulta) => {
          const dataFormatada = this.formatarData(consulta.data);
          const duracao = this.calcularDuracao(consulta.horaInicial, consulta.horaFinal);
          console.log(`${dataFormatada} ${consulta.horaInicial} ${consulta.horaFinal} ${duracao} ${consulta.paciente.nome.padEnd(25)} ${this.formatarDataNascimento(consulta.paciente.dataNascimento)}`);
        });

        console.log('-------------------------------------------------------------');

        readlineInterface.close();
      });
    });
  }





  // Método para ordenar as consultas por data e hora
  ordenarConsultasPorDataHora() {
    this.consultas.sort((a, b) => {
      const dataA = new Date(a.data + ' ' + a.horaInicial);
      const dataB = new Date(b.data + ' ' + b.horaInicial);
      return dataA - dataB;
    });
  }

  // ...

  // Método para formatar a data no formato DD/MM/AAAA
  formatarData(data) {
    const partesData = data.split('/');
    const dia = partesData[0]?.padStart(2, '0');
    const mes = partesData[1]?.padStart(2, '0');
    const ano = partesData[2];
    return `${dia}/${mes}/${ano}`;
  }

  // Método para formatar a data de nascimento no formato DD/MM/AAAA
  formatarDataNascimento(dataNascimento) {
    const partesData = dataNascimento.split('/');
    const dia = partesData[0].padStart(2, '0');
    const mes = partesData[1].padStart(2, '0');
    const ano = partesData[2];
    return `${dia}/${mes}/${ano}`;
  }

  // Método para calcular a duração em horas e minutos entre dois horários
  calcularDuracao(horaInicial, horaFinal) {
    const partesHoraInicial = String(horaInicial || '').split(':');
    const partesHoraFinal = String(horaFinal || '').split(':');

    const horaInicialObj = new Date();
    horaInicialObj.setHours(parseInt(partesHoraInicial[0]));
    horaInicialObj.setMinutes(parseInt(partesHoraInicial[1]));

    const horaFinalObj = new Date();
    horaFinalObj.setHours(parseInt(partesHoraFinal[0]));
    horaFinalObj.setMinutes(parseInt(partesHoraFinal[1]));

    const duracaoMinutos = Math.abs(horaFinalObj - horaInicialObj) / 60000;
    const horas = Math.floor(duracaoMinutos / 60);
    const minutos = duracaoMinutos % 60;

    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`;
  }

  // Método para converter uma string no formato DD/MM/AAAA para um objeto Date
  converterStringParaData(dataString) {
    const partesData = dataString.split('/');
    const dia = parseInt(partesData[0]);
    const mes = parseInt(partesData[1]) - 1; // Subtrair 1 do mês, pois em JavaScript os meses são indexados de 0 a 11
    const ano = parseInt(partesData[2]);
    return new Date(ano, mes, dia);
  }

  // ...

  // Método para calcular a idade com base na data de nascimento
  calcularIdade(dataNascimento) {
    const dataAtual = new Date();
    const partesData = dataNascimento.split('/');
    const dia = parseInt(partesData[0]);
    const mes = parseInt(partesData[1]) - 1; // Subtrair 1 do mês, pois em JavaScript os meses são indexados de 0 a 11
    const ano = parseInt(partesData[2]);
    const dataNascimentoObj = new Date(ano, mes, dia);
    const diffAnos = dataAtual.getFullYear() - dataNascimentoObj.getFullYear();

    const mesAtual = dataAtual.getMonth();
    const diaAtual = dataAtual.getDate();
    const mesNascimento = dataNascimentoObj.getMonth();
    const diaNascimento = dataNascimentoObj.getDate();

    // Verificar se o aniversário já passou no ano atual
    if (mesNascimento > mesAtual || (mesNascimento === mesAtual && diaNascimento > diaAtual)) {
      return diffAnos - 1;
    }

    return diffAnos;
  }

  // Método para cadastrar um paciente na agenda
  cadastrarPaciente(cpf, nome, dataNascimento) {
    const paciente = {
      cpf,
      nome,
      dataNascimento
    };

    this.pacientes.push(paciente);

    //console.log('Paciente cadastrado com sucesso.');
  }

  // Método para obter um paciente pelo CPF
  getPacienteByCPF(cpf) {
    return this.pacientes.find((paciente) => paciente.cpf === cpf);
  }

  // Método para agendar uma consulta
  agendarConsulta(cpf, dataConsulta, horaInicial, horaFinal) {
    const paciente = this.getPacienteByCPF(cpf);
    if (!paciente) {
      console.log('CPF do paciente não encontrado.');
      return;
    }

    // Verificar se a data da consulta está em formato válido
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regexData.test(dataConsulta)) {
      console.log('Formato inválido da data da consulta. Utilize o formato DD/MM/AAAA.');
      return;
    }

    // Verificar se as horas estão em formato válido
    const regexHora = /^\d{4}$/;
    if (!regexHora.test(horaInicial) || !regexHora.test(horaFinal)) {
      console.log('Formato inválido das horas. Utilize o formato HHMM (padrão brasileiro).');
      return;
    }

    // Verificar se as horas estão em intervalos de 15 minutos
    const minutosInicial = parseInt(horaInicial.substring(2));
    const minutosFinal = parseInt(horaFinal.substring(2));
    if (minutosInicial % 15 !== 0 || minutosFinal % 15 !== 0) {
      console.log('As horas devem ser definidas de 15 em 15 minutos.');
      return;
    }

    // Verificar se as horas estão dentro do horário de funcionamento
    const horaInicialInt = parseInt(horaInicial.substring(0, 2));
    const horaFinalInt = parseInt(horaFinal.substring(0, 2));
    if (horaInicialInt < 8 || horaFinalInt > 19) {
      console.log('Os horários devem estar dentro do horário de funcionamento (8:00h às 19:00h).');
      return;
    }

    const dataAtual = new Date();
    const horaAtual = dataAtual.getHours() * 100 + dataAtual.getMinutes();

    const [dia, mes, ano] = dataConsulta.split('/');
    const dataConsultaObj = new Date(ano, mes - 1, dia);

    // Verificar se a consulta está agendada para um período futuro
    if (dataConsultaObj < dataAtual || (dataConsultaObj.getTime() === dataAtual.getTime() && horaInicialInt <= horaAtual)) {
      console.log('A consulta deve ser agendada para um período futuro.');
      return;
    }

    // Verificar se a hora final é maior que a hora inicial
    if (horaFinalInt <= horaInicialInt) {
      console.log('A hora final deve ser maior que a hora inicial.');
      return;
    }

    // Verificar se o paciente já possui um agendamento futuro
    const agendamentosFuturos = this.consultas.some(
      (consulta) => consulta.paciente === paciente && consulta.data > dataAtual
    );
    if (agendamentosFuturos) {
      console.log('O paciente já possui um agendamento futuro.');
      return;
    }

    // Verificar se há horários sobrepostos com outras consultas
    const horariosSobrepostos = this.consultas.some(
      (consulta) =>
        consulta.data.getTime() === dataConsultaObj.getTime() &&
        ((horaInicialInt >= consulta.horaInicial && horaInicialInt < consulta.horaFinal) ||
          (horaFinalInt > consulta.horaInicial && horaFinalInt <= consulta.horaFinal))
    );
    if (horariosSobrepostos) {
      console.log('Já existe um agendamento para o mesmo horário.');
      return;
    }

    // Criar um novo objeto de consulta e adicioná-lo ao array de consultas
    const novaConsulta = {
      paciente,
      data: dataConsultaObj,
      horaInicial: horaInicialInt,
      horaFinal: horaFinalInt,
    };
    this.consultas.push(novaConsulta);

    console.log('Consulta agendada com sucesso.');
  }

  // Método para cancelar um agendamento
  cancelarAgendamento(cpf, dataConsulta, horaInicial) {
    const paciente = this.getPacienteByCPF(cpf);
    if (!paciente) {
      console.log('CPF do paciente não encontrado.');
      return;
    }

    // Verificar se a data da consulta está em formato válido
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regexData.test(dataConsulta)) {
      console.log('Formato inválido da data da consulta. Utilize o formato DD/MM/AAAA.');
      return;
    }

    // Verificar se a hora inicial está em formato válido
    const regexHora = /^\d{4}$/;
    if (!regexHora.test(horaInicial)) {
      console.log('Formato inválido da hora inicial. Utilize o formato HHMM (padrão brasileiro).');
      return;
    }

    const dataAtual = new Date();
    const horaAtual = dataAtual.getHours() * 100 + dataAtual.getMinutes();

    const [dia, mes, ano] = dataConsulta.split('/');
    const dataConsultaObj = new Date(ano, mes - 1, dia);
    const horaInicialInt = parseInt(horaInicial);

    // Verificar se o cancelamento é permitido apenas para consultas futuras
    if (dataConsultaObj < dataAtual || (dataConsultaObj.getTime() === dataAtual.getTime() && horaInicialInt <= horaAtual)) {
      console.log('O cancelamento só pode ser realizado para um agendamento futuro.');
      return;
    }

    // Encontrar o índice do agendamento a ser cancelado
    const agendamentoIndex = this.consultas.findIndex(
      (consulta) =>
        consulta.paciente === paciente &&
        consulta.data.getTime() === dataConsultaObj.getTime() &&
        consulta.horaInicial === horaInicialInt
    );
    if (agendamentoIndex === -1) {
      console.log('Não foi encontrado um agendamento para o paciente informado.');
      return;
    }

    // Remover o agendamento do array de consultas
    this.consultas.splice(agendamentoIndex, 1);

    console.log('Agendamento cancelado com sucesso.');
  }
}