// tenement.dto.ts
export class CreateTenementDto {
    tenement_address: string;
    tenement_product_type: string;
    tenement_type: string;
    tenement_face: string;
    tenement_images: string;
    tenement_status: string;
    total_rating: string;
    main_building: string;
    affiliated_building: string;
    public_buliding: string;
    unregistered_area: string;
    management_magnification: string;
    management_fee: string;
    tenement_floor: string;
    tenement_host_name: string;
    tenement_host_telphone: string;
    tenement_host_phone: string;
    tenement_host_line: string;
    tenement_host_remittance_bank: string;
    tenement_host_remittance_account: string;
    tenement_host_address: string;
    tenement_host_birthday: string;
    tenement_host_hobby: string;
    tenement_host_remark: string;
    owner: number;
    is_deleted: boolean;
}

export class UpdateTenementDto {
    tenement_address?: string;
    tenement_product_type?: string;
    tenement_type?: string;
    tenement_face?: string;
    tenement_images?: string;
    tenement_status?: string;
    total_rating?: string;
    main_building?: string;
    affiliated_building?: string;
    public_buliding?: string;
    unregistered_area?: string;
    management_magnification?: string;
    management_fee?: string;
    tenement_floor?: string;
    tenement_host_name?: string;
    tenement_host_telphone?: string;
    tenement_host_phone?: string;
    tenement_host_line?: string;
    tenement_host_remittance_bank?: string;
    tenement_host_remittance_account?: string;
    tenement_host_address?: string;
    tenement_host_birthday?: string;
    tenement_host_hobby?: string;
    tenement_host_remark?: string;
    owner?: number;
    is_deleted?: boolean;
    // 注意：关联的字段（如 Tenement_Market[]）通常不包含在更新 DTO 中
}
