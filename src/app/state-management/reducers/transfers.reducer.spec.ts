import * as fromReducer from './transfers.reducer';
import { deleteTransfer, addTransfer, updateTransfer } from '../actions/home-page.actions';
import { TransferRecordDataI } from '../model/transfers.model';

describe('TransfersReducer', () => {
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
    describe('unknown action', () => {
        it('should return the default state', () => {
            const action = {
                type: 'Unknown',
            };
            const state = fromReducer.transfersReducer(initialState, action);

            expect(state).toBe(initialState);
        });
    });

    describe('addTransfer action', () => {
        it('should add new transfer and update the state in an immutable way', () => {
            const transferRecord: TransferRecordDataI = {
                accountHolder: 'Account Holder1234',
                amount: 123245, date: new Date('2022.01.01'),
                iban: 'DE12500105170648489890',
                note: 'no note'
            };
            const action = addTransfer({ transfer: transferRecord });
            const state = fromReducer.transfersReducer(initialState, action);

            expect(Object.keys(state.transfers).length).toEqual(Object.keys(initialState.transfers).length + 1);
            expect(Object.values(state.transfers).sort()).toEqual([...Object.values(initialState.transfers), transferRecord].sort());
            expect(state).not.toBe(initialState);
        });
    });
    describe('deleteTransfer action', () => {
        it('should delete transfer and update the state in an immutable way', () => {
            const id = '16b';
            const action = deleteTransfer({ id });
            const state = fromReducer.transfersReducer(initialState, action);

            expect(Object.keys(state.transfers).length).toEqual(Object.keys(initialState.transfers).length - 1);
            expect(state.transfers[id]).not.toBeDefined();
            expect(initialState.transfers[id]).toBeDefined();
            expect(state).not.toBe(initialState);
        });
    });
    describe('update action', () => {
        it('should update transfer and update the state in an immutable way', () => {

            const transferRecord: TransferRecordDataI = {
                accountHolder: 'Account Holder1234',
                amount: 123245, date: new Date('2022.01.01'),
                iban: 'DE12500105170648489890',
                note: 'no note'
            };
            const id = '16b';
            const action = updateTransfer({ id, transfer: transferRecord });
            const state = fromReducer.transfersReducer(initialState, action);

            expect(Object.keys(state.transfers).length).toEqual(Object.keys(initialState.transfers).length);
            const initialStateForAssert: TransferRecordDataI[] = [...Object.values(initialState.transfers)];
            initialStateForAssert[0] = transferRecord;
            expect(Object.values(state.transfers)).toEqual(initialStateForAssert);
            expect(state).not.toBe(initialState);
        });
    });
});
