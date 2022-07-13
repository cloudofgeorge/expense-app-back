import {
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
} from 'class-validator';
import { ReportType } from '../data';

export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;
}

export class UpdateReportDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsOptional()
  @IsDate()
  updatedAt: Date;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  source: string;
}

export class ReportResponseDto {
  id: string;
  source: string;
  amount: number;

  // @Exclude()
  // created_at: Date;

  // @Expose({ name: 'createdAt' })
  // transformedCreatedAt() {
  //   return this.created_at;
  // }

  // @Exclude()
  updatedAt: Date;
  createdAt: Date;
  type: ReportType;

  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial);
  }
}
