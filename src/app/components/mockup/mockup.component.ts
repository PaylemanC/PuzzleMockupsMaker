import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mockup } from 'src/app/models/mockup.model';
import { MOCKUPS } from 'src/app/data/mockups-list.data';

@Component({
  selector: 'app-mockup',
  templateUrl: './mockup.component.html',
  styleUrls: ['./mockup.component.scss']
})
export class MockupComponent {
  mockup: Mockup | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.mockup = MOCKUPS.find(mockup => mockup.id === id);
  }
}
