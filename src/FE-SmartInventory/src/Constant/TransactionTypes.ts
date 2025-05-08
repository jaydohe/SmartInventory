export const enum TransactionTypes {
    IMPORT = "IMPORT",
    EXPORT = "EXPORT",
    ADJUST = "ADJUST",
}
export const genTransactionTypes= {
    [TransactionTypes.IMPORT]: 'Nhập kho',
    [TransactionTypes.EXPORT]: 'Xuất kho',
    [TransactionTypes.ADJUST]: 'Điều chỉnh số lượng tồn kho',
};