export class CreateCollectionNoticeDto {
    collection_id: number; // 確保這個字段的類型與 Prisma 模型中的類型一致
    visitDate: Date;
    record: string;
    remindDate: Date;
    remind: string;
}