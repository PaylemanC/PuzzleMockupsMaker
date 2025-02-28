import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Mockup } from 'src/app/models/mockup.model';

@Component({
  selector: 'app-mockups-card',
  templateUrl: './mockups-card.component.html',
  styleUrls: ['./mockups-card.component.scss']
})
export class MockupsCardComponent {
  @Input() mockup!: Mockup;
}
