import { Directive } from "@angular/core";
import {
	AbstractControl,
	NG_VALIDATORS,
	ValidationErrors,
	Validator,
} from "@angular/forms";

@Directive({
	selector: "[appMaiorIdade]",
	providers: [
		{
			provide: NG_VALIDATORS,
			useExisting: MaiorIdadeDirective,
			multi: true,
		},
	],
})
export class MaiorIdadeDirective implements Validator {
	constructor() {}
	validate(control: AbstractControl): ValidationErrors | null {
		function temMaisDe18Anos(): boolean {
			let idade =
				new Date().getFullYear() - new Date(control.value).getFullYear();
			if (new Date().getMonth() < new Date(control.value).getMonth() ||
				(new Date().getMonth() === new Date(control.value).getMonth() &&
					new Date().getDate() < new Date(control.value).getDate())) idade--;
			return idade >= 18;
		}
		if (Number.isNaN(new Date(control.value).getFullYear())) return null;
		return temMaisDe18Anos() ? null : { appMaiorIdade: true };
	}
}
