import { AfterContentChecked, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

/**
 * Reusable Auto Complete component that extends MatAutoComplete to show Clear icon and Arrow buttons
 *
 * @author Pavan Kumar Jadda
 * @since 12.0.0
 */
@Component({
	selector: 'lib-object-autocomplete,object-autocomplete',
	templateUrl: './object-autocomplete.component.html',
	styleUrls: ['./object-autocomplete.component.scss'],
})
export class ObjectAutocompleteComponent implements OnInit, AfterContentChecked {
	/**
	 * Gets reference inputAutoComplete HTML attribute
	 */
	@ViewChild('inputAutoComplete') inputAutoComplete!: ElementRef;

	/**
	 * Input form group of the auto complete
	 */
	@Input() inputFormGroup!: FormGroup;

	/**
	 * Label of the AutoComplete
	 */
	@Input() label = '';

	/**
	 * Place Holder of the AutoComplete
	 */
	@Input() placeHolder = '';

	/**
	 * Appearance of the AutoComplete, defaults to `fill`
	 */
	@Input() appearance = 'fill';

	/**
	 * List of CSS classes that need to applied to autocomplete
	 */
	@Input() classes = '';

	/**
	 * Attribute of the Object whose value would be shown when searching for data. Defaults to `ID`
	 */
	@Input() bindLabel = '';

	/**
	 * Attribute of the Object whose value would be used for search
	 */
	@Input() bindValue = 'id';

	/**
	 * Specifies if the autocomplete is required. Default is not required.
	 */
	@Input() required = false;

	/**
	 * List of Objects that need to be bind and searched for
	 */
	@Input() data: any[] | undefined;

	/**
	 * BehaviorSubject that shows the current active arrow icon
	 */
	arrowIconSubject = new BehaviorSubject('arrow_drop_down');

	/**
	 * Filtered options when user
	 */
	filteredOptions: Observable<any[]> | undefined;

	constructor(private cdRef: ChangeDetectorRef) {}

	/**
	 * Define autocomplete search filter on search text changes
	 *
	 * @author Pavan Kumar Jadda
	 * @since 12.0.0
	 */
	ngOnInit() {
		// @ts-ignore
		this.filteredOptions = this.inputFormGroup?.get('autocomplete')?.valueChanges.pipe(
			startWith(''),
			map((value) => (typeof value === 'string' ? value : value !== null ? value[this.bindLabel] : '')),
			map((propertyName) =>
				propertyName
					? this.data?.filter((option) => option[this.bindLabel].toLowerCase().indexOf(propertyName.toLowerCase()) === 0)
					: this.data?.slice()
			)
		);
	}

	/**
	 * Detect and load changes when Form changed
	 *
	 * @author Pavan Kumar Jadda
	 * @since 12.0.0
	 */
	ngAfterContentChecked(): void {
		this.cdRef.detectChanges();
	}

	/**
	 * Clear input and Reset autocomplete form control
	 *
	 * @author Pavan Kumar Jadda
	 * @since 12.0.0
	 */
	clearInput(evt: any): void {
		evt.stopPropagation();
		this.inputFormGroup.get('autocomplete')?.reset();
		this.inputAutoComplete?.nativeElement.focus();
	}

	/**
	 * Open or Close panel
	 *
	 * @author Pavan Kumar Jadda
	 * @since 12.0.0
	 */
	openOrClosePanel(evt: any, trigger: MatAutocompleteTrigger): void {
		evt.stopPropagation();
		if (trigger.panelOpen) trigger.closePanel();
		else trigger.openPanel();
	}

	/**
	 * Display function that is used to show the values
	 *
	 * @author Pavan Kumar Jadda
	 * @since 12.0.0
	 */
	displayFn(object: any): string {
		return object && object[this.bindLabel] ? object[this.bindLabel] : '';
	}

	/**
	 * Tracks autocomplete values by bindVale
	 *
	 * @author Pavan Kumar Jadda
	 * @since 12.1.2
	 */
	trackByFn(index: number, item: any) {
		return item[this.bindLabel]?.bindValue;
	}
}