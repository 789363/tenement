// tenement.dto.ts
export class CreateTenementDto {
    // 假设 Tenement 有以下属性
    name: string;       // 物业名称
    location: string;   // 物业位置
    size: number;       // 物业大小
    price: number;      // 物业价格
    // 可以根据您的需求添加更多属性
}

export class UpdateTenementDto {
    // 更新时可能不需要所有属性，所以可以将它们设置为可选
    name?: string;
    location?: string;
    size?: number;
    price?: number;
    // 其他可更新的属性
}
