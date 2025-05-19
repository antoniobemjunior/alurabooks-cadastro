import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ConsultaCepService } from "../service/consulta-cep.service";

@Component({
	selector: "app-cadastro",
	templateUrl: "./cadastro.component.html",
	styleUrls: ["./cadastro.component.css"],
})
export class CadastroComponent implements OnInit {
	constructor(
		private router: Router,
		private cepService: ConsultaCepService,
	) {}

	ngOnInit(): void {}

	cadastrar(form: NgForm) {
		form.valid == true
			? (() => {
					this.router.navigate(["./sucesso"]);
				})()
			: (() => {
					alert("Formulário inválido");
				})();
	}

	consultaCEP(evento: any, form: NgForm) {
		if (evento.target.value !== "")
			return this.cepService.cep(evento.target.value).subscribe((dados) => {
				this.preencherDados(dados,form)
			});
		return null;
	}

	preencherDados(dados: any,form: NgForm){
		form.form.patchValue({
			cep: dados.cep,
			endereco: dados.logradouro,
			complemento: dados.complemento,
			bairro: dados.bairro,
			cidade: dados.localidade,
			estado: dados.uf
		})
	}
}
