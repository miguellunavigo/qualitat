import { ISegmentSelector } from 'src/app/common/interfaces/default.interface';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-switch-button',
  templateUrl: './switch-button.component.html',
  styleUrls: ['./switch-button.component.scss'],
})
export class SwitchButtonComponent {

  @Input() firstSegment: ISegmentSelector;
  @Input() secondSegment: ISegmentSelector;
  @Output() selectedSegment: EventEmitter<string>;

  constructor() {
    this.selectedSegment = new EventEmitter();
  }

  public segmentChanged(value: string) {
    this.selectedSegment.emit(value);
  }

}
