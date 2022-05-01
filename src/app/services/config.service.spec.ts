import { TestBed } from '@angular/core/testing';
import { LOCALE_ID } from '@angular/core';

/* import locale de-DE
details https://stackoverflow.com/questions/66010145/missing-locale-data-for-the-locale-de-de*/
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
registerLocaleData(localeDe, 'de-DE', localeDeExtra);

import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should contain en-US locale by default', () => {
    expect(service.locale).toEqual('en-US');
  });

  it('should return isMockData=true by default', () => {
    expect(service.isMockData).toEqual(true);
  });

  it('should set serverUrl', () => {
    service.setServerUrl('someUrl');
    expect(service.serverUrl).toEqual('someUrl');
  });

  it('should return isMockData=false when serverUrl is set', () => {
    expect(service.isMockData).toEqual(true);
    service.setServerUrl('someUrl');
    expect(service.serverUrl).toEqual('someUrl');
    expect(service.isMockData).toEqual(false);
  });
  it('should unset serverUrl when setMockServer was called', () => {
    service.setServerUrl('someUrl');
    expect(service.serverUrl).toEqual('someUrl');
    service.setMockServer();
    expect(service.serverUrl).toEqual('');
    expect(service.isMockData).toEqual(true);
  });
});

describe('ConfigService with German locale settings', () => {
  let service: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: LOCALE_ID, useValue: 'de-DE' }]
    });
    service = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should contain de-DE locale', () => {
    expect(service.locale).toEqual('de-DE');
  });
});
