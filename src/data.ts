export interface Data {
  report: ReportItem[];
}

export interface ReportItem {
  id: string;
  source: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  type: ReportType;
}

export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export const data: Data = {
  report: [
    {
      id: '09971c68-af96-49db-a4a5-b3e1215782a7',
      source: 'Salary',
      amount: 500,
      createdAt: new Date(),
      updatedAt: new Date(),
      type: ReportType.INCOME,
    },
    {
      id: '4cd6b2df-a964-4234-965f-fc6507133dc0',
      source: 'YouTube',
      amount: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
      type: ReportType.EXPENSE,
    },
  ],
};
