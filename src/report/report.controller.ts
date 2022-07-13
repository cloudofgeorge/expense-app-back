import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ReportType } from '../data';
import {
  CreateReportDto,
  ReportResponseDto,
  UpdateReportDto,
} from './report.dto';
import { ReportService } from './report.service';

@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Query() { limit }: { limit: number },
  ): ReportResponseDto[] {
    return this.reportService.getAllReports(type, limit);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    return this.reportService.getReportById(type, id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createReport(
    @Body() { source, amount }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ) {
    return this.reportService.createReport(type, { source, amount });
  }

  @Put(':id')
  updateReport(
    @Param('id', ParseUUIDPipe) reportId: string,
    @Param('type', new ParseEnumPipe(ReportType)) reportType: ReportType,
    @Body() { id, updatedAt, ...body }: UpdateReportDto,
  ) {
    return this.reportService.updateReport(reportType, reportId, body);
  }

  @Delete(':id')
  deleteReport(
    @Param('id', ParseUUIDPipe) reportId: string,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Res() response,
  ) {
    const reports = this.reportService.deleteReport(type, reportId);

    if (reports) {
      response.status(HttpStatus.OK).send(reports);
    } else {
      response
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'Report not found' });
    }
  }
}
