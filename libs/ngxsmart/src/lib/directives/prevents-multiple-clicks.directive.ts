import { Directive, EventEmitter, HostListener, Input, NgModule, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, throttleTime } from 'rxjs';
import { CommonModule } from '@angular/common';

@Directive({
	selector: '[preventMultipleClicks]',
})
export class PreventMultipleClicksDirective implements OnInit, OnDestroy {
	@Input() throttleTime = 2000;
	@Output() throttleClick = new EventEmitter();

	private clicks = new Subject();
	private subscription: Subscription | undefined;

	constructor() {}

	/**
	 * Intercepts click event and stops default navigation. After first click set {@link throttleTime} to 2000 to prevent duplicate clicks
	 *
	 * @param event DOM event
	 *
	 * @author Pavan Kumar Jadda
	 * @since 2.3.27
	 */
	@HostListener('click', ['$event'])
	clickEvent(event) {
		event.preventDefault();
		event.stopPropagation();
		this.clicks.next(event);
	}

	ngOnInit() {
		this.subscription = this.clicks.pipe(throttleTime(this.throttleTime)).subscribe((e) => this.throttleClick.emit(e));
	}

	ngOnDestroy() {
		this.subscription?.unsubscribe();
	}
}

@NgModule({
	imports: [CommonModule],
	declarations: [PreventMultipleClicksDirective],
	exports: [PreventMultipleClicksDirective],
})
export class PreventsMultipleClicksDirectiveModule {}