import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabListPromosPage } from './tab-list-promos.page';

describe('TabListPromosPage', () => {
  let component: TabListPromosPage;
  let fixture: ComponentFixture<TabListPromosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabListPromosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabListPromosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
