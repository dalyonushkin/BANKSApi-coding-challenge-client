export interface TransferRecordDataI  {
    date: Date;
    amount: number;
    accountHolder: string;
    iban: string;
    note?: string;
  }

export type TransferRecordsList =  {
    [key: string]: TransferRecordDataI;
  };

