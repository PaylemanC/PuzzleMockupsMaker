import { Component } from '@angular/core';
import { Mockup } from 'src/app/models/mockup.model';
import { MOCKUPS } from 'src/app/data/mockups-list.data';

@Component({
  selector: 'app-mockups-list',
  template: `<div id="mockups-list">
  <p class="mockups-title">Escoge tu mockup:</p>
  <div class="mockups-container">
    <app-mockups-card *ngFor="let mockup of mockups" [mockup]="mockup"></app-mockups-card>
  </div>
</div>`,
  styleUrls: ['./mockups-list.component.scss']
})
export class MockupsListComponent {
  mockups: Mockup[] = MOCKUPS;
}
