import { IsNotEmpty, IsString, IsDate, IsOptional, IsInt } from 'class-validator';

// CreateCollectionNoticeDto
export class CreateCollectionNoticeDto {
    @IsNotEmpty()
    @IsInt()
    readonly collection_id: number;

    @IsNotEmpty()
    @IsString()
    readonly visitDate: string;

    @IsNotEmpty()
    @IsString()
    readonly record: string;

    @IsNotEmpty()
    @IsString()
    readonly remindDate: string;

    @IsNotEmpty()
    @IsString()
    readonly remind: string;
}


// UpdateCollectionNoticeDto
export class UpdateCollectionNoticeDto {
    @IsOptional()
    @IsInt()
    readonly collection_id?: number;

    @IsOptional()
    @IsString()
    readonly visitDate?: string;

    @IsOptional()
    @IsString()
    readonly record?: string;

    @IsOptional()
    @IsString()
    readonly remindDate?: string;

    @IsOptional()
    @IsString()
    readonly remind?: string;

    isNew?: boolean;
}
export class CreateTenementNoticeDto {
    @IsNotEmpty()
    @IsInt()
    readonly tenement_id: number;

    @IsNotEmpty()
    @IsString()
    readonly visitDate: string;

    @IsNotEmpty()
    @IsString()
    readonly record: string;

    @IsNotEmpty()
    @IsString()
    readonly remindDate: string;

    @IsNotEmpty()
    @IsString()
    readonly remind: string;

    @IsNotEmpty()
    @IsString()
    readonly type: string;

    @IsNotEmpty()
    @IsInt()
    readonly owner: number;
}
// UpdateTenementNoticeDto
export class UpdateTenementNoticeDto {
    @IsOptional()
    @IsInt()
    readonly tenement_id?: number;

    @IsOptional()
    @IsString()
    readonly visitDate?: string;

    @IsOptional()
    @IsString()
    readonly record?: string;

    @IsOptional()
    @IsString()
    readonly remindDate?: string;

    @IsOptional()
    @IsString()
    readonly remind?: string;

    @IsOptional()
    @IsString()
    readonly type?: string;

    @IsOptional()
    @IsInt()
    readonly owner?: number;

    isNew?: boolean;
}

export class NoticeDto {
    @IsOptional()
    @IsInt()
    readonly collection_id?: number;

    @IsOptional()
    @IsInt()
    readonly tenement_id?: number;

    @IsOptional()
    @IsString()
    readonly visitDate?: string;

    @IsOptional()
    @IsString()
    readonly record?: string;

    @IsOptional()
    @IsString()
    readonly remindDate?: string;

    @IsOptional()
    @IsString()
    readonly remind?: string;

    // 特定于 TenementNotice 的字段
    @IsOptional()
    @IsString()
    readonly type?: string;

    @IsOptional()
    @IsInt()
    readonly owner?: number;
}