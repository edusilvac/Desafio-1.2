//Classe Paciente
export default class Paciente{
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
