import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

// import { mockPromotions } from './promos.service.spec';

@Injectable()
export class HttpRequestInterceptorMock implements HttpInterceptor {
    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        const url = 'https://europe-west1-mspr-gostyleapp.cloudfunctions.net/webServices/v1/users/PZFFr1V26VMlMrCmQloez9DOEQQ2e/promotions';
        if (request.url && request.url.indexOf(url) > -1) {
            return of(new HttpResponse({ status: 200, body: [
                    {
                        code: 'SUPER50',
                        dateExpiration: new Date('2020-09-08T22:00:00.000Z'),
                        description: 'Pour un super client 50% sur le catalogue'
                    },
                    {
                        code: 'KADO20',
                        dateExpiration: new Date('2021-10-06T22:00:00.000Z'),
                        description: '20€ de réduction sur tout le catalogue'
                    }
                ] }));
        }

        return next.handle(request);
    }
}
