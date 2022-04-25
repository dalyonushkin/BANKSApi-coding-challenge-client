import { createReducer, on } from '@ngrx/store';
import { TransferRecordsList } from '../model/transfers.model';
import * as HomePageActions from '../actions/home-page.actions';
import { v4 as uuidv4 } from 'uuid';

export interface State {
  transfers: TransferRecordsList;
}

export const initialState: State = {
  transfers: {
    '10a': {
      date: new Date(),
      amount: 123.33,
      accountHolder: 'John Doe',
      iban: 'DE12500105170648489890',
      note: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
scrambled it to make a type specimen book. It has survived not only five centuries, but also theleap
into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
software like Aldus PageMaker including versions of Lorem Ipsum.`
    },
    '11b': {
      date: new Date('2022-04-01'),
      amount: 99999999.33,
      accountHolder: 'Jane Doe',
      iban: 'DE12500105170648489890',
      note: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
scrambled it to make a type specimen book. It has survived not only five centuries, but also theleap
into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
software like Aldus PageMaker including versions of Lorem Ipsum.`},
    '13b': {
      date: new Date('2022-04-10'),
      amount: 9999999999999.333333,
      accountHolder: 'Baby Doe',
      iban: 'DE12500105170648489890'
    },
    '14a': {
      date: new Date('2022-04-10'),
      amount: 9999999999999.333333,
      accountHolder: 'James Doe',
      iban: 'DE12500105170648489890'
    },
    '16b': {
      date: new Date('2022-04-10'),
      amount: 9999999999999.333333,
      accountHolder: 'Judy Doe',
      iban: 'DE12500105170648489890'
    }
  }
};


export const transfersReducer = createReducer(
  initialState,
  on(HomePageActions.addTransfer, (state, { transfer}) => {
    const transfers: TransferRecordsList={...state.transfers};
    transfers[uuidv4()]={...transfer};
    return { ...state, transfers};
  }),
  on(HomePageActions.deleteTransfer, (state, { id }) => {
    const transfers: TransferRecordsList={...state.transfers};
    delete transfers[id];
    return { ...state, transfers};
  }),
  on(HomePageActions.updateTransfer, (state, { id, transfer }) => {
    const transfers: TransferRecordsList={...state.transfers};
    transfers[id]={...transfer};
    return { ...state, transfers};
  }),
);
