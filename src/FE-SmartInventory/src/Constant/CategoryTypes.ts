export const enum CategoryEntityTypes {
    WAREHOUSE = "WAREHOUSE",
    PRODUCT = "PRODUCT",
    POSITION = "POSITION",
}
export const genCategoryEntityTypes= {
    [CategoryEntityTypes.WAREHOUSE]: 'Kho',
    [CategoryEntityTypes.PRODUCT]: 'Sản phẩm',
    [CategoryEntityTypes.POSITION]: 'Chức vụ',
};