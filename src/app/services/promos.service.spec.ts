import {async, fakeAsync, TestBed} from '@angular/core/testing';

import {PromosService} from './promos.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Promotion} from '../models/Promotion';


// let httpServiceSpy: jasmine.SpyObj<HttpClient>;
describe('PromosService', () => {
    let promosService: PromosService;
    let httpTestingController: HttpTestingController;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => promosService = TestBed.get(PromosService));

    beforeEach(() => httpTestingController = TestBed.get(HttpTestingController));

    afterEach(() => {
        httpTestingController.verify();
    });
    it('should be created', () => {
        expect(promosService).toBeTruthy();
    });

    it('should grab promotions', fakeAsync(() => {
        const url = 'https://europe-west1-mspr-gostyleapp.cloudfunctions.net/webServices/v1/users/PZFFr1V26VMlMrCmQloez9DOEQQ2e/promotions';
        const testPromos: Array<Promotion> = [
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
        ];

        promosService.getPromos('PZFFr1V26VMlMrCmQloez9DOEQQ2e')
            .subscribe(promos => {
              expect(promos.length).toBe(2);
              expect(promos).toEqual(testPromos);
            });

        const req = httpTestingController.expectOne(url);

        // Assert that the request is a GET.
        expect(req.request.method).toEqual('GET');
        expect(req.request.responseType).toEqual('json');

        // Respond with mock data, causing Observable to resolve.
        // Subscribe callback asserts that correct data was returned.
        req.flush(testPromos);


    }));

    it('should put the correct data', () => {
        const url = 'https://europe-west1-mspr-gostyleapp.cloudfunctions.net/webServices/v1/users/PZFFr1V26VMlMrCmQloez9DOEQQ2e';
        const uid = 'PZFFr1V26VMlMrCmQloez9DOEQQ2e';
        const promo = 'TESTCODEPROMO';
        promosService.addPromoToUser(promo, uid).subscribe((body: {id: string}) => {
            expect(body.id).toBe(uid);
        });

        const req = httpTestingController.expectOne(url);
        expect(req.request.method).toBe('PUT');

        expect(req.request.responseType).toEqual('json');

        req.flush({
            id: 'PZFFr1V26VMlMrCmQloez9DOEQQ2e'
        });
    });
    it('should respond with error', () => {
        const url = 'https://europe-west1-mspr-gostyleapp.cloudfunctions.net/webServices/v1/users/PZFFr1V26VMlMrCmQloez9DOEQQ2e';
        const uid = 'PZFFr1V26VMlMrCmQloez9DOEQQ2e';
        const promo = 'TESTCODEPROMO';
        const errorMessage = 'Vous détenez déjà cette promotion.';
        promosService.addPromoToUser(promo, uid).subscribe((body: {id: string}) => fail('should have failed'), (error: HttpErrorResponse
        ) => {
            expect(error.statusText).toEqual('Bad Request');
            expect(error.status).toBe(400);
        });

        const req = httpTestingController.expectOne(url);

        req.flush(null,  {status: 400, statusText: 'Bad Request'});
    });
});
