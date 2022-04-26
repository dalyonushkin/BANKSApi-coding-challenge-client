import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { transfersReducer } from '../state-management/reducers/transfers.reducer';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AngularIbanModule } from 'angular-iban';

import { HomePage } from './home.page';
import { ReactiveFormsModule } from '@angular/forms';

import { LOCALE_ID } from '@angular/core';

/* import locale de-DE
details https://stackoverflow.com/questions/66010145/missing-locale-data-for-the-locale-de-de*/
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { ConfigService } from '../services/config.service';
import { FormatterService } from '../services/formatter.service';
import { UtilsService } from '../services/utils.service';
import { EditTransferPage } from '../edit-transfer/edit-transfer.page';
import { skip } from 'rxjs/operators';
import { DaInputFormValueComponent } from '../components/da-input-form-value/da-input-form-value.component';
import { FilterTransferPipe } from '../pipes/filter-transfer.pipe';
registerLocaleData(localeDe, 'de-DE', localeDeExtra);

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  //Spys fro Modal forms
  const modalSpy = jasmine.createSpyObj('Modal', {
    create: async () => { },
    present: async () => { },
    onWillDismiss: async () => { }
  });
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['create']);
  modalCtrlSpy.create.and.callFake(() => modalSpy);
  //Spys fro Alerts
  const alertSpy = jasmine.createSpyObj('Modal', {
    create: async () => { },
    present: async () => { },
    onWillDismiss: async () => { }
  });
  const alertCtrlSpy = jasmine.createSpyObj('ModalController', ['create']);
  alertCtrlSpy.create.and.callFake(() => alertSpy);

  const initialState = {
    transfers: {
      '16b': {
        date: new Date('2022-04-10'),
        amount: 9999999999999.333333,
        accountHolder: 'Judy Doe',
        iban: 'DE12500105170648489890'
      }
    }
  };
  let store: MockStore;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage,DaInputFormValueComponent,FilterTransferPipe],
      imports: [IonicModule.forRoot(), StoreModule.forRoot({ transfersStore: transfersReducer }), AngularIbanModule, ReactiveFormsModule],
      providers: [
        {
          provide: ModalController,
          useValue: modalCtrlSpy
        },
        {
          provide: AlertController,
          useValue: alertCtrlSpy
        },
        { provide: LOCALE_ID, useValue: 'de-DE' },
        provideMockStore({ initialState }),
        ConfigService, FormatterService, UtilsService
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
    store.setState({ transfersStore: initialState });
    store.refreshState();
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    modalSpy.present.calls.reset();
    modalSpy.onWillDismiss.calls.reset();
    modalSpy.create.calls.reset();
    modalCtrlSpy.create.calls.reset();
    alertCtrlSpy.create.calls.reset();
  }));

  it('should create', async () => {
    expect(component).toBeTruthy();

  });
  describe('when call presentEditModal', () => {
    it('should show EditTransferPage', async () => {
      await component.presentEditModal();
      expect(modalCtrlSpy.create).toHaveBeenCalledWith({
        component: EditTransferPage,
        componentProps: { transfer: undefined, transferId: undefined }
      });
      expect(modalSpy.present).toHaveBeenCalled();
    });
    it('call updateTransfer when edit transfer record', async () => {
      const transfer = {
        accountHolder: 'Account Holder1234',
        amount: 123245, date: new Date('2022.01.01'),
        iban: 'DE12500105170648489890',
        note: 'no note'
      };
      modalSpy.onWillDismiss.and.returnValue(Promise.resolve({ data: { transferId: 'aa', transfer } }));
      const methodSpy = spyOn(component, 'updateTransfer');
      await component.presentEditModal();
      expect(modalSpy.present).toHaveBeenCalled();
      expect(modalSpy.onWillDismiss).toHaveBeenCalled();
      expect(methodSpy).toHaveBeenCalledWith('aa', transfer);

    });
    it('call addTransfer when add transfer record', async () => {
      const transfer = {
        accountHolder: 'Account Holder1234',
        amount: 123245, date: new Date('2022.01.01'),
        iban: 'DE12500105170648489890',
        note: 'no note'
      };
      modalSpy.onWillDismiss.and.returnValue(Promise.resolve({ data: { transfer } }));
      const methodSpy = spyOn(component, 'addTransfer');
      await component.presentEditModal();
      expect(modalSpy.present).toHaveBeenCalled();
      expect(modalSpy.onWillDismiss).toHaveBeenCalled();
      expect(methodSpy).toHaveBeenCalledWith(transfer);

    });
  });

  it('should show Sort Modal', async () => {

    await component.presentSortModal();
    expect(modalSpy.present).toHaveBeenCalled();
  });

  it('should show confirm on delete', async () => {
    await component.confirmDeleteTransfer('a', { amount: 1, date: new Date(), iban: '123' });
    expect(alertSpy.present).toHaveBeenCalled();
  });

});
