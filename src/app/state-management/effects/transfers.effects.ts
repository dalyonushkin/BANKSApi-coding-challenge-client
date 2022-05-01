import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { TransfersService } from 'src/app/services/transfers.service';

@Injectable()
export class TransfersEffects {

  loadTransfers$ = createEffect(() => this.actions$.pipe(
    ofType('[Home Page] Load Transfers'),
    mergeMap(() => this.transfersService.getAllTransfers()
      .pipe(
        map(transfers => ({ type: '[Transfers API] Transfers Loaded Success', transfers })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private transfersService: TransfersService
  ) {}
}
