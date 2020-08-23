import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';
import {Observable, of} from 'rxjs';
import {UserFirestore} from '../models/firestore/UserFirestore';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpRequestInterceptorMock} from '../services/http-request-interceptor-mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {RouterModule} from '@angular/router';
import {By, element} from 'protractor';

class MockAuthService implements Partial<AuthService> {
  getUid(): Promise<string> {
    return Promise.resolve('PZFFr1V26VMlMrCmQloez9DOEQQ2e');
  }
  doLogout() {
    return Promise.resolve();
  }
}
class MockUserService implements Partial<UserService> {
  getUserDoc(uid: string): Observable<UserFirestore | undefined> {
    return of({firstname: 'Test', name: 'test', ownedPromos: {}});
  }
  updateUserDoc(uid: string, name: string, firstname: string): Promise<void> {
    return Promise.resolve();
  }
}
describe('HomePage', () => {

  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterModule.forRoot([])],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: UserService, useClass: MockUserService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpRequestInterceptorMock,
          multi: true
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display coupons', () => {
    component.promos = [
        {
      code: 'SUPER50',
      dateExpiration: new Date('2020-09-09'),
      description: 'Pour un super client 50% sur le catalogue'
    },
      {
        code: 'KADO20',
        dateExpiration: new Date('2021-10-07'),
        description: '20€ de réduction sur tout le catalogue'
      }
      ];

    fixture.detectChanges();
    const elements = fixture.debugElement.nativeElement.querySelectorAll('ion-label');
    expect(elements.length).toBe(2);
    expect(elements[0].getElementsByTagName('h2')[0].textContent).toEqual('Pour un super client 50% sur le catalogue');
    expect(elements[0].getElementsByTagName('p')[0].textContent).toEqual('SUPER50 Date limite : 09/09/2020');
    expect(elements[1].getElementsByTagName('h2')[0].textContent).toEqual('20€ de réduction sur tout le catalogue');
    expect(elements[1].getElementsByTagName('p')[0].textContent).toEqual('KADO20 Date limite : 07/10/2021');
  });
});
