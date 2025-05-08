export interface GenderObject {
    id: number;
    name: GenderTypes;
};

export enum  GenderTypes {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER",
};

export const GENDER_TYPES: GenderTypes[] = [
    GenderTypes.FEMALE,
    GenderTypes.MALE,
    GenderTypes.OTHER
];

export const GENDER: GenderObject[] = [
    { id: 0, name: GenderTypes.FEMALE },
    { id: 1, name: GenderTypes.MALE },
    { id: 2, name: GenderTypes.OTHER }
];

export const genGenderTypes = {
    [GenderTypes.MALE]: 'Nam',
    [GenderTypes.FEMALE]: 'Nữ',
    [GenderTypes.OTHER]: 'Khác',
};