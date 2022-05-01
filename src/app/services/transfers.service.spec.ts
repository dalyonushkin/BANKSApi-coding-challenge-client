import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TransfersService } from './transfers.service';
import { Data } from '@angular/router';
import { TransfersInterceptor } from './interceptors/transfers.interceptor';
import { ConfigService } from './config.service';

describe('TransfersService', () => {
  let service: TransfersService;
  let configService: ConfigService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: TransfersInterceptor,
        multi: true,
      }]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TransfersService);
    configService = TestBed.inject(ConfigService);
  });
  //beforeEach(() => {
  //
  //});

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('can test HttpClient.get', () => {
    const testData: Data = {
      '1a': {
        amount: 50,
        date: '2022-01-22',
        iban: 'DE12500105170648489890',
        accountHolder: 'John Doe (local)',
        note: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.'
      }
    };
    const expectedTestData: Data = {
      '1a': {
        amount: 50,
        date: new Date(Date.parse('2022-01-22')),
        iban: 'DE12500105170648489890',
        accountHolder: 'John Doe (local)',
        note: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.'
      }
    };

    // Make an HTTP GET request
    httpClient.get<Data>('http://some.site/transfers')
      .subscribe(data =>
        // When observable resolves, result should match test data
        expect(data).toEqual(expectedTestData)
      );

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne('http://some.site/transfers');

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(testData);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should construct url for local asset when ConfigService.isMockData==true', () => {
    configService.setMockServer();
    expect(service.getUrl('get', 'transfers')).toEqual('../assets/mock/get/transfers.json');
  });
  it('should construct url for remote server when ConfigService.isMockData==false', () => {
    configService.setServerUrl('http://some.site:8900');
    expect(service.getUrl('get', 'transfers')).toEqual('http://some.site:8900/transfers');
  });
  //todo: add body transform testing
  it('should conatain Accept header when getAllTransfers called', () => {
    configService.setMockServer();
    service.getAllTransfers().subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpTestingController.expectOne('../assets/mock/get/transfers.json');
    expect(httpRequest.request.headers.has('Accept')).toEqual(true);
    expect(httpRequest.request.headers.get('Accept')).toEqual('application/json');
  });
  //todo: add body transform testing
  it('should conatain Accept header when deleteTransfer called', () => {
    configService.setMockServer();
    service.deleteTransfer('123').subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpTestingController.expectOne('../assets/mock/delete/transfers.json');
    expect(httpRequest.request.headers.has('Accept')).toEqual(true);
    expect(httpRequest.request.headers.get('Accept')).toEqual('application/json');
  });
  //todo: add body transform testing
  it('should conatain Accept header when updateTransfer called', () => {
    configService.setMockServer();
    service.updateTransfer('123', { amount: 50, iban: '1232', date: new Date() }).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpTestingController.expectOne('../assets/mock/patch/transfers.json');
    expect(httpRequest.request.headers.has('Accept')).toEqual(true);
    expect(httpRequest.request.headers.get('Accept')).toEqual('application/json');
  });
  //todo: add body transform testing
  it('should conatain Accept header when addTransfer called', () => {
    configService.setMockServer();
    service.addTransfer('123', { amount: 50, iban: '1232', date: new Date() }).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpTestingController.expectOne('../assets/mock/post/transfers.json');
    expect(httpRequest.request.headers.has('Accept')).toEqual(true);
    expect(httpRequest.request.headers.get('Accept')).toEqual('application/json');
  });
});


