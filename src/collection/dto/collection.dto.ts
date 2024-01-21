// src/collection/dto/create-collection.dto.ts
export class CreateCollectionDto {
    tenement_no: string;
    collection_id: string;
    collection_name: string;
    collection_type: string;
    price: string;
    payment: string;
    collection_remark: string;
    collection_date: string;
    remittance_bank: string;
    remittance_account: string;
    cus_remittance_account: string;
    cus_remittance_bank: string;
    collection_complete: string;
    owner: number;
    is_deleted: boolean;

}










export class UpdateCollectionDto {
    tenement_no?: string;
    collection_id?: string;
    collection_name?: string;
    collection_type?: string;
    price?: string;
    payment?: string;
    collection_remark?: string;
    collection_date?: string;
    remittance_bank?: string;
    remittance_account?: string;
    cus_remittance_account?: string;
    cus_remittance_bank?: string;
    collection_complete?: string;
    owner?: number;
}
