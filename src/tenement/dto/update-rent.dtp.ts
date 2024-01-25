/* eslint-disable prettier/prettier */
export class UpdateTenementRentDto {
  // Tenement 字段
  tenement_address: string;
  tenement_product_type: string;
  tenement_type: string;
  tenement_face: string;
  tenement_images: string[];
  tenement_status: string;

  // Tenement_Create 字段
  total_rating: string;
  main_building: string;
  inside_rating: string;
  affiliated_building: string;
  public_building: string;
  unregistered_area: string;
  management_magnification: string;
  management_fee: string;
  selling_price: string;
  rent_price: string;
  deposit_price: string;
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

  // Tenement_Rent 特有字段
  renter_start_date: string;
  renter_end_date: string;
  renter_name: string;
  renter_id_images: string[];
  renter_phone: string;
  renter_jobtitle: string;
  renter_guarantor_name: string;
  renter_guarantor_phone: string;
  renter_remark: string;

  tenement_id: number;
}
