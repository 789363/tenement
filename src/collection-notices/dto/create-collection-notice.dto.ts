export class CreateCollectionNoticeDto {
    collection_id: number; // 確保這個字段的類型與 Prisma 模型中的類型一致
    visitDate: Date;
    collection_record: string;
    collection_remind: string;
    remindDate: Date;
}