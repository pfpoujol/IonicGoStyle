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
});
