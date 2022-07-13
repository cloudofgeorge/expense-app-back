import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { data, ReportItem, ReportType } from '../data';
import { ReportResponseDto } from './report.dto';

const checkType = (type: ReportType) =>
  type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

interface ReportData {
  amount: number;
  source: string;
}

@Injectable()
export class ReportService {
  getAllReports(type: ReportType, limit = 30): ReportResponseDto[] {
    const reports = data.report
      .filter((report) => report.type === checkType(type))
      .map((report) => new ReportResponseDto(report));

    if (limit) {
      return reports.slice(0, limit);
    }

    return reports;
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    const report = data.report
      .filter((report) => report.type === checkType(type))
      .find((report) => report.id === id);

    if (!report) return null;

    // return new ReportResponseDto(report);
    return report;
  }

  createReport(
    type: ReportType,
    { source, amount }: ReportData,
  ): ReportResponseDto {
    const newReport = {
      id: uuid(),
      source,
      amount,
      createdAt: new Date(),
      updatedAt: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };

    data.report.push(newReport);

    return new ReportResponseDto(newReport);
  }

  updateReport(
    type: ReportType,
    id: string,
    body: Partial<ReportItem>,
  ): ReportResponseDto {
    const reportIndex = data.report.findIndex(
      (report) => report.id === id && report.type === checkType(type),
    );

    if (reportIndex !== -1) {
      data.report[reportIndex] = {
        ...data.report[reportIndex],
        ...body,
        updatedAt: new Date(),
      };

      return new ReportResponseDto(data.report[reportIndex]);
    }

    return null;
  }

  deleteReport(type: ReportType, id: string): ReportResponseDto[] | null {
    const reportIndex = data.report.findIndex(
      (report) => report.id === id && checkType(type),
    );

    if (reportIndex !== -1) {
      data.report.splice(reportIndex, 1);

      return this.getAllReports(type);
    }

    return null;
  }
}
