import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabBarcodeScannerPage } from './tab-barcode-scanner.page';

describe('TabBarcodeScannerPage', () => {
  let component: TabBarcodeScannerPage;
  let fixture: ComponentFixture<TabBarcodeScannerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabBarcodeScannerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabBarcodeScannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
