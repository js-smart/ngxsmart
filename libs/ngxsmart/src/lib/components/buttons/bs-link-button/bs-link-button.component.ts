import { Component, Input, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
	selector: "bs-link-button",
	template: `
		<a class="bs-link-button" mat-button>
			<mat-icon>{{ icon }}</mat-icon>
			{{ label }}
		</a>
	`,
	styles: [
		`
			.bs-link-button {
				color: #0d6efd;
				font-size: 0.9rem
			}
		`
	]
})
export class BsLinkButtonComponent {
	/**
	 * Icon to display
	 */
	@Input() icon = "visibility";

	/**
	 * If set, shows the label
	 */
	@Input() label = "View";
}

@NgModule({
	imports: [CommonModule, MatIconModule, MatButtonModule],
	declarations: [BsLinkButtonComponent],
	exports: [BsLinkButtonComponent],
})
export class BsLinkButtonComponentModule {}
