export class UpdateCollectionDto {

    collection_id?: number;
    collection_name?: string;
    price?: number;
    payment?: string;
    collection_remark?: string;
    remittance_bank?: string;
    remittance_account?: string;
    isDelete?: boolean;
    // 不包含 tenement_id，因为通常不更新外键关联
}
