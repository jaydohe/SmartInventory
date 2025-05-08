export type TEmployee = {
    id: string;
    departmentId?: string;
    warehouseId?: string;
    positionId?: string;
    code: string;
    name: string;
    genderType: string;
    isManager?: boolean;
    phoneNumber: string;
    email: string;
    address: string;
    dateHired: string;
    wardId: string | null;
    ward?: {
        id: string;
        name: string;
        districtId: string;
    };
    districtId: string | null;
    district?: {
        id: string;
        name: string;
        provinceId: string;
    };
    provinceId: string | null;
    province?: {
        id: string;
        name: string;
    };  
    createdAt: string;
    modifiedOn?: string;
    deletedOn?: string;
};

export type TCreateEmployee = {
    positionId: string;
    departmentId: string;
    warehouseId?: string;
    code: string;
    name: string;
    genderType: string;
    isManager: boolean;
    phoneNumber: string;
    email: string;
    address: string;
    dateHired: string;
    wardId: string;
    districtId: string;
    provinceId: string;  
};

export type TUpdateEmployee = {
    id: string; // cần để biết đang cập nhật employee nào
    positionId?: string;
    departmentId?: string;
    warehouseId?: string;
    name?: string;
    genderType?: string;
    isManager?: boolean;
    phoneNumber: string;
    email?: string;
    address?: string;
    wardId?: string;
    districtId?: string;
    provinceId?: string;  
};