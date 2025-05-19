import { Directive } from "@angular/core";
import {
	AbstractControl,
	AsyncValidator,
	NG_ASYNC_VALIDATORS,
	ValidationErrors,
} from "@angular/forms";
import { map, Observable } from "rxjs";
import { ConsultaCepService } from "../service/consulta-cep.service";

@Directive({
	selector: "[appValidandoCep]",
	providers: [
		{
			provide: NG_ASYNC_VALIDATORS,
			useExisting: ValidandoCepDirective,
			multi: true,
		},
	],
})
export class ValidandoCepDirective implements AsyncValidator {
	constructor(private consultaCEP: ConsultaCepService) {}
	validate(
		control: AbstractControl,
	): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
		return this.consultaCEP
			.cep(control.value)
			.pipe(map((dados: any) => (dados.erro ? { appValidandoCep: true } : null)));
	}
}
