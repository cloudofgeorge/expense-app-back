export class SummaryResponseDto {
  totalIncome: number;
  totalExpense: number;
  netIncome: number;

  constructor(partial: Partial<SummaryResponseDto>) {
    Object.assign(this, partial);
  }
}
