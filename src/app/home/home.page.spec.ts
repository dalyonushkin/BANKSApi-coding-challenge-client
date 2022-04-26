import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { transfersReducer } from '../state-management/reducers/transfers.reducer';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AngularIbanModule } from 'angular-iban';

import { HomePage } from './home.page';
import { ReactiveFormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';

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
      declarations: [HomePage, DaInputFormValueComponent, FilterTransferPipe],
      imports: [
        IonicModule.forRoot(),
        StoreModule.forRoot({ transfersStore: transfersReducer }),
        AngularIbanModule,
        ReactiveFormsModule,
        NgPipesModule
      ],
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


  it('should show confirm on delete', async () => {
    await component.confirmDeleteTransfer('a', { amount: 1, date: new Date(), iban: '123' });
    expect(alertSpy.present).toHaveBeenCalled();
  });

  it('should update "searchText" on event update text in searchbar', async () => {
    component.searchText=null;
    expect(component.searchText).toBeNull();
    const evt= new CustomEvent('update',{detail:{value:'abc123'}});
    component.onSearchUpdate(evt);
    expect(component.searchText).toEqual('abc123');
  });

  it('should allow "canToggleSearchBar" when no text in searchbar', async () => {
    component.showSearchBar=true;
    component.searchText=null;
    expect(component.canToggleSearchBar()).toBeTrue();
    component.showSearchBar=false;
    component.searchText=null;
    expect(component.canToggleSearchBar()).toBeTrue();
  });
  it('should allow "canToggleSearchBar" when there are text in searchbar and searchBar is hidden', async () => {
    component.showSearchBar=false;
    component.searchText='text';
    expect(component.canToggleSearchBar()).toBeTrue();
  });
  it('should disallow "canToggleSearchBar" when there are text in searchbar and searchBar is shown', async () => {
    component.showSearchBar=true;
    component.searchText='text';
    expect(component.canToggleSearchBar()).toBeFalse();
  });
  it('should "toggleSearchBar" when no text in searchbar', async () => {
    component.showSearchBar=true;
    component.searchText=null;
    component.toggleSearchBar();
    expect(component.showSearchBar).toBeFalse();
    component.toggleSearchBar();
    expect(component.showSearchBar).toBeTrue();
  });
  it('should "toggleSearchBar" to true when there are text in searchbar and searchBar is hidden', async () => {
    component.showSearchBar=true;
    component.searchText='text';
    component.toggleSearchBar();
    expect(component.showSearchBar).toBeTrue();
    component.toggleSearchBar();
    expect(component.showSearchBar).toBeTrue();
  });
  it('should "toggleSortBar"', async () => {
    component.showSortBar=true;
    component.toggleSortBar();
    expect(component.showSortBar).toBeFalse();
    component.toggleSortBar();
    expect(component.showSortBar).toBeTrue();
  });

  //skip this tests I have not so much time to learn how mock NgRX Store in a correct way
  //it.skip('should dispach deleteTransfer reducer when function deleteTransfer called',()=>{});
  //it.skip('should dispach addTransfer reducer when function addTransfer called',()=>{});
  //it.skip('should dispach updateTransfer reducer when function updateTransfer called',()=>{});
});
