import {Component} from '@angular/core';
import {AppService} from './service/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nome = '';
  telefone = '';
  comoNosEncontrou = '';
  redeSocial = '';
  qualRedeSocial = [];
  mensagem = null;
  desativarBotao = false;
  redeSociaisList = [];

  constructor(private app: AppService) {
  }


  validarFormulario() {

    if (!this.validarNome()) {
      this.desativarBotao = false;
      return false;
    } else {
      return true;
    }
  }


  validarNome() {
    if (this.nome) {
      const nome = this.nome.split(' ');
      if (nome.length >= 2 && nome[1].length > 0) {
        return true;
      } else {
        this.mensagem = 'O campo nome deve conter nome e sobrenome';
        return false;
      }
    } else {
      this.mensagem = 'O campo nome é obrigatorio';
      return false;
    }
  }

  resetFormulario() {
    this.nome = null;
    this.telefone = null;
    this.qualRedeSocial = [];
    this.redeSocial = null;
    this.comoNosEncontrou = '';
  }

  enviarFormulario() {
    this.desativarBotao = true;
    if (this.validarFormulario()) {
      this.criarListaDeRedesSociais();
      this.mensagem = null;

      this.app.cadastrarUsuario({
        nome: this.nome,
        telefone: this.telefone,
        comoNosEncontrou: this.comoNosEncontrou,
        redeSocial: this.redeSocial,
        redeSociaisList: this.redeSociaisList
      }).subscribe(resp => {
        this.desativarBotao = true;

        console.log(resp);
        this.resetFormulario();

      }, error => {
        this.desativarBotao = true;

        console.log(error);
        this.resetFormulario();

      });
    }
  }

  criarListaDeRedesSociais() {
    if (this.redeSocial == 'Não') {
      this.redeSociaisList = [];
    } else {
      if (this.qualRedeSocial[0]) {
        this.redeSociaisList.push('FaceBock');
      }
      if (this.qualRedeSocial[1]) {
        this.redeSociaisList.push('Instagran');
      }
      if (this.qualRedeSocial[2]) {
        this.redeSociaisList.push('Linkedin');
      }

    }
  }

}
