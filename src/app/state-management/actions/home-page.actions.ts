import { createAction, props } from '@ngrx/store';
import { TransferRecordDataI } from '../model/transfers.model';



export const addTransfer = createAction(
  '[Home Page] Add transfer',
  props<{transfer: TransferRecordDataI}>()
);

export const deleteTransfer = createAction(
    '[Home Page] Delete transfer',
    props<{id: string}>()
  );

export const updateTransfer = createAction(
  '[Home Page] Update transfer',
  props<{id: string; transfer: TransferRecordDataI}>()
);



