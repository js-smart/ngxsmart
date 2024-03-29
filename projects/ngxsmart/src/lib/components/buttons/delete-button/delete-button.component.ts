import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'delete-button',
	standalone: true,
	imports: [MatButtonModule, MatIconModule],
	template: `
		<button class="btn delete-button {{ loading ? 'disabled' : '' }}" mat-raised-button type="{{ type }}" data-cy="delete-button">
			@if (loading) {
				<span aria-hidden="true" class="spinner-border spinner-border-sm" role="status"></span>
			}
			@if (!loading) {
				<mat-icon>{{ icon }}</mat-icon>
			}
			{{ loading ? loadingLabel : label }}
		</button>
	`,
	styleUrls: ['../../../../assets/app-buttons.css'],
})
export class DeleteButtonComponent {
	/**
	 *  Is search in progress and loading the data
	 */
	@Input() loading: boolean | undefined = false;

	/**
	 * Type of the button. Following values are supported. See BootStrap docs for more information
	 * <pre>
	 *   1. button
	 *   2. submit
	 * </pre>
	 */
	@Input() type = 'button';

	/**
	 * If set, shows when Delete in Progress
	 */
	@Input() loadingLabel = 'Deleting...';

	/**
	 * If set, shows when Delete is not in progress
	 */
	@Input() label = 'Delete';

	/**
	 * If set, shows the icon. Otherwise, shows delete icon
	 */
	@Input() icon = 'delete';
}
