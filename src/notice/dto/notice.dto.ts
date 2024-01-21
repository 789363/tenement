import { IsString, IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateNoticeDto {
    @IsNotEmpty()
    @IsString()
    readonly type: string;

    @IsNotEmpty()
    @IsDate()
    readonly visitDate: Date;

    @IsNotEmpty()
    @IsString()
    readonly record: string;

    @IsNotEmpty()
    @IsDate()
    readonly remindDate: Date;

    @IsNotEmpty()
    @IsString()
    readonly remind: string;
}

export class UpdateNoticeDto {
    @IsOptional()
    @IsString()
    readonly type?: string;

    @IsOptional()
    @IsDate()
    readonly visitDate?: Date;

    @IsOptional()
    @IsString()
    readonly record?: string;

    @IsOptional()
    @IsDate()
    readonly remindDate?: Date;

    @IsOptional()
    @IsString()
    readonly remind?: string;
}