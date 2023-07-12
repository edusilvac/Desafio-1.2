import readline from 'readline';

export class Agenda {
  constructor() {
    this.pacientes = [];
    this.consultas = [];
  }

  cadastrarPaciente(cpf, nome, dataNascimento) {
    const paciente = {
      cpf,
      nome,
      dataNascimento
    };

    this.pacientes.push(paciente);

    console.log('Paciente cadastrado com sucesso.');
  }

  agendarConsulta(cpf, dataConsulta, horaInicial, horaFinal) {
    // Verificar se o CPF do paciente existe no cadastro
    const paciente = this.pacientes.find((paciente) => paciente.cpf === cpf);
    if (!paciente) {
      console.log('CPF do paciente não encontrado.');
      return;
    }

    // Verificar formato da data da consulta
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regexData.test(dataConsulta)) {
      console.log('Formato inválido da data da consulta. Utilize o formato DD/MM/AAAA.');
      return;
    }

    // Verificar formato das horas inicial e final
    const regexHora = /^\d{4}$/;
    if (!regexHora.test(horaInicial) || !regexHora.test(horaFinal)) {
      console.log('Formato inválido das horas. Utilize o formato HHMM (padrão brasileiro).');
      return;
    }

    // Verificar se as horas estão definidas de 15 em 15 minutos
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

    // Obter data e hora atual
    const dataAtual = new Date();
    const horaAtual = dataAtual.getHours() * 100 + dataAtual.getMinutes();

    // Converter data e horas da consulta para objetos Date e número inteiro
    const [dia, mes, ano] = dataConsulta.split('/');
    const dataConsultaObj = new Date(ano, mes - 1, dia);

    // Verificar se a consulta é para um período futuro
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

    // Verificar se há sobreposição de horários
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

    // Agendar a consulta
    const novaConsulta = {
      paciente,
      data: dataConsultaObj,
      horaInicial: horaInicialInt,
      horaFinal: horaFinalInt,
    };
    this.consultas.push(novaConsulta);

    console.log('Consulta agendada com sucesso.');
  }

  //Cancelar Agendamento
  cancelarAgendamento(cpf, dataConsulta, horaInicial) {
    // Verificar se o CPF do paciente existe no cadastro
    const paciente = this.pacientes.find((paciente) => paciente.cpf === cpf);
    if (!paciente) {
      console.log('CPF do paciente não encontrado.');
      return;
    }

    // Verificar formato da data da consulta
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regexData.test(dataConsulta)) {
      console.log('Formato inválido da data da consulta. Utilize o formato DD/MM/AAAA.');
      return;
    }

    // Verificar formato da hora inicial
    const regexHora = /^\d{4}$/;
    if (!regexHora.test(horaInicial)) {
      console.log('Formato inválido da hora inicial. Utilize o formato HHMM (padrão brasileiro).');
      return;
    }

    // Obter data e hora atual
    const dataAtual = new Date();
    const horaAtual = dataAtual.getHours() * 100 + dataAtual.getMinutes();

    // Converter data e hora da consulta para objetos Date e número inteiro
    const [dia, mes, ano] = dataConsulta.split('/');
    const dataConsultaObj = new Date(ano, mes - 1, dia);
    const horaInicialInt = parseInt(horaInicial);

    // Verificar se o agendamento é para um período futuro
    if (dataConsultaObj < dataAtual || (dataConsultaObj.getTime() === dataAtual.getTime() && horaInicialInt <= horaAtual)) {
      console.log('O cancelamento só pode ser realizado para um agendamento futuro.');
      return;
    }

    // Verificar se o paciente possui o agendamento a ser cancelado
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

    // Remover o agendamento da lista de consultas
    this.consultas.splice(agendamentoIndex, 1);

    console.log('Agendamento cancelado com sucesso.');
  }
}
