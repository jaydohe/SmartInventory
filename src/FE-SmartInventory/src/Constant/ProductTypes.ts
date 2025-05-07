export const enum ProductTypes {
    GOODS = "GOODS",
    RAW_MATERIAL = "RAW_MATERIAL",
    SEMI_FINISHED_PRODUCT = "SEMI_FINISHED_PRODUCT",
    FINISHED_PRODUCT = "FINISHED_PRODUCT",
}
export const genCategoryEntityTypes= {
    [ProductTypes.GOODS]: 'Hàng hóa',
    [ProductTypes.RAW_MATERIAL]: 'Nguyên liệu',
    [ProductTypes.SEMI_FINISHED_PRODUCT]: 'Bán thành phẩm',
    [ProductTypes.FINISHED_PRODUCT]: 'Sản phẩm hoàn thành',
};