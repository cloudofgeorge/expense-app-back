import { Injectable } from '@nestjs/common';
import { ReportService } from '../report/report.service';
import { ReportType } from '../data';
import { SummaryResponseDto } from './summary.dto';

@Injectable()
export class SummaryService {
  constructor(private readonly reportService: ReportService) {}

  calculateSummary(): SummaryResponseDto {
    const totalExpense = this.reportService
      .getAllReports(ReportType.EXPENSE)
      .reduce((prev, current) => prev + current.amount, 0);

    const totalIncome = this.reportService
      .getAllReports(ReportType.INCOME)
      .reduce((prev, current) => prev + current.amount, 0);

    return new SummaryResponseDto({
      totalIncome,
      totalExpense,
      netIncome: totalIncome - totalExpense,
    });
  }
}
