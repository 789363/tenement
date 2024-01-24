/* eslint-disable prettier/prettier */
export class UpdateTenementSellDto {
  // Tenement 的字段
  tenement_address: string;
  tenement_product_type: string;
  tenement_type: string;
  tenement_face: string;
  tenement_images: string;
  tenement_status: string;

  // Tenement_Create 的字段
  total_rating: string;
  main_building: string;
  affiliated_building: string;
  public_building: string;
  unregistered_area: string;
  management_magnification: string;
  management_fee: string;
  selling_price: string;
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

  // Tenement_Sell 的字段
  buyer_order_date: string;
  buyer_handout_date: string;
  buyer_name: string;
  buyer_id_images: string;
  buyer_phone: string;
  buyer_jobtitle: string;
  buyer_remark: string;

  // 唯一标识字段
  tenement_id: number;
}
