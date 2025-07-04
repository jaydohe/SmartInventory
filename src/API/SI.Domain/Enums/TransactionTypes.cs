﻿namespace SI.Domain.Enums;

public readonly struct TransactionTypes
{
    // <summary>
    // Nhập kho
    // </summary>
    public const string IMPORT = "IMPORT";

    // <summary>
    // Xuất kho
    // </summary>
    public const string EXPORT = "EXPORT";

    // <summary>
    // Điều chỉnh số lượng tồn kho
    // </summary>
    public const string ADJUST = "ADJUST";
}