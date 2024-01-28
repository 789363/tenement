/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class UpdateTenementRentDto {
  // Tenement 字段
  @ApiProperty({ example: '123 Main St', description: 'Tenement address' })
  tenement_address: string;

  @ApiProperty({ example: 'Residential', description: 'Tenement product type' })
  tenement_product_type: string;

  @ApiProperty({ example: 'Apartment', description: 'Tenement type' })
  tenement_type: string;

  @ApiProperty({ example: 'North', description: 'Tenement face' })
  tenement_face: string;

  @ApiProperty({ example: ['image1.jpg', 'image2.jpg'], description: 'Tenement images' })
  tenement_images: string[];

  @ApiProperty({ example: 'Occupied', description: 'Tenement status' })
  tenement_status: string;

  // Tenement_Create 字段
  @ApiProperty({ example: 50, description: 'Total rating' })
  total_rating: number;

  @ApiProperty({ example:5, description: 'Main building' })
  main_building:number;

  @ApiProperty({ example: 5, description: 'Inside rating' })
  inside_rating: number;

  @ApiProperty({ example: 5, description: 'Affiliated building' })
  affiliated_building:number;

  @ApiProperty({ example: 50, description: 'Public building' })
  public_building: number;

  @ApiProperty({ example: 50, description: 'Unregistered area' })
  unregistered_area: number;

  @ApiProperty({ example: 15, description: 'Management magnification' })
  management_magnification: number;

  @ApiProperty({ example: 100, description: 'Management fee' })
  management_fee: number;

  @ApiProperty({ example: 80, description: 'Rent price' })
  rent_price: number;

  @ApiProperty({ example: 100, description: 'Deposit price' })
  deposit_price: number;

  @ApiProperty({ example: 50, description: 'Tenement floor' })
  tenement_floor: number;

  @ApiProperty({ example: 'John Doe', description: 'Tenement host name' })
  tenement_host_name: string;

  @ApiProperty({ example: '123-456-7890', description: 'Tenement host telephone' })
  tenement_host_telphone: string;

  @ApiProperty({ example: '987-654-3210', description: 'Tenement host phone' })
  tenement_host_phone: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Tenement host line' })
  tenement_host_line: string;

  @ApiProperty({ example: 'Bank of America', description: 'Tenement host remittance bank' })
  tenement_host_remittance_bank: string;

  @ApiProperty({ example: '1234567890', description: 'Tenement host remittance account' })
  tenement_host_remittance_account: string;

  @ApiProperty({ example: '456 Elm St', description: 'Tenement host address' })
  tenement_host_address: string;

  @ApiProperty({ example: '1985-01-15', description: 'Tenement host birthday' })
  tenement_host_birthday: string;

  @ApiProperty({ example: 'Hiking, Reading', description: 'Tenement host hobby' })
  tenement_host_hobby: string;

  @ApiProperty({ example: 'Additional remarks about the host', description: 'Tenement host remark' })
  tenement_host_remark: string;

  // Tenement_Rent 特有字段
  @ApiProperty({ example: '2024-02-15', description: 'Renter start date' })
  renter_start_date: string;

  @ApiProperty({ example: '2024-03-01', description: 'Renter end date' })
  renter_end_date: string;

  @ApiProperty({ example: 'Jane Smith', description: 'Renter name' })
  renter_name: string;

  @ApiProperty({ example: ['id_image1.jpg', 'id_image2.jpg'], description: 'Renter ID images' })
  renter_id_images: string[];

  @ApiProperty({ example: '555-555-5555', description: 'Renter phone' })
  renter_phone: string;

  @ApiProperty({ example: 'Software Engineer', description: 'Renter job title' })
  renter_jobtitle: string;

  @ApiProperty({ example: 'John Doe', description: 'Renter guarantor name' })
  renter_guarantor_name: string;

  @ApiProperty({ example: '555-555-5555', description: 'Renter guarantor phone' })
  renter_guarantor_phone: string;

  @ApiProperty({ example: 'Additional remarks about the renter', description: 'Renter remark' })
  renter_remark: string;

  @ApiProperty({ example: 1, description: 'Tenement ID' })
  tenement_id: number;


  selling_price?: number;
}
