import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { EditTransferPage } from './edit-transfer.page';
import { UtilsService } from '../services/utils.service';


describe('EditTransferPage in Add mode', () => {
  let component: EditTransferPage;
  let fixture: ComponentFixture<EditTransferPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditTransferPage],
      imports: [IonicModule.forRoot(), ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(EditTransferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


describe('EditTransferPage in Edit mode', () => {
  let component: EditTransferPage;
  let fixture: ComponentFixture<EditTransferPage>;
  const transfer = {
    date: new Date('2022-04-10'),
    amount: 99999.3,
    accountHolder: 'Judy Doe',
    iban: 'DE12500105170648489890'
  };
  //Spys fro Modal forms
  const modalSpy = jasmine.createSpyObj('Modal', {
    create: async () => { },
    present: async () => { },
    onWillDismiss: async () => { }
  });
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', {
    create: () => { },
    dismiss: async () => { },
  });
  modalCtrlSpy.create.and.callFake(() => modalSpy);
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditTransferPage],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      providers: [{
        provide: ModalController,
        useValue: modalCtrlSpy
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(EditTransferPage);
    component = fixture.componentInstance;
    component.transfer = transfer;
    component.transferId = '16a';
    fixture.detectChanges();
    modalSpy.present.calls.reset();
    modalSpy.onWillDismiss.calls.reset();
    modalSpy.create.calls.reset();
    modalCtrlSpy.create.calls.reset();
    modalCtrlSpy.dismiss.calls.reset();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have proper from values', () => {
    expect(component.transferForm.value).toEqual({ ...transfer, note: null });
  });
  it('when set date in past should have error "futureDate"', () => {
    component.setDate(new Date('2022-02-02T00:00:00'));
    expect(component.date.invalid).toEqual(true);
    expect(component.date.errors.futureDate).toBeDefined();
  });
  it('when call save with proper data dismiss called with proper parameters', () => {
    const utl = new UtilsService();
    const date = utl.addDays(new Date(), 1);
    component.setDate(date);
    component.save();
    expect(component.transferForm.valid).toBeTrue();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalledWith({
      transferId: '16a',
      transfer: { ...transfer, note: null, date }
    });
  });
  it('when call cancel should call dismiss without parameters', () => {
    expect(modalCtrlSpy.dismiss).not.toHaveBeenCalled();
    component.cancel();
    expect(modalCtrlSpy.dismiss).toHaveBeenCalledWith();
  });

});
