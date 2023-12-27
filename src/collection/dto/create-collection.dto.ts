export class CreateCollectionDto {
    tenement_id: string;
    collection_name: string;
    price: number;
    payment: string;
    collection_remark: string;
    remittance_bank: string;
    remittance_account: string;
    isDelete: boolean;
}
