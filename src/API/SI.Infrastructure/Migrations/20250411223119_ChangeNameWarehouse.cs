using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangeNameWarehouse : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EMPLOYEE_Warehouses_WarehouseId",
                table: "EMPLOYEE");

            migrationBuilder.DropForeignKey(
                name: "FK_GOODSISSUE_Warehouses_WarehouseId",
                table: "GOODSISSUE");

            migrationBuilder.DropForeignKey(
                name: "FK_GOODSRECEIPT_Warehouses_WarehouseId",
                table: "GOODSRECEIPT");

            migrationBuilder.DropForeignKey(
                name: "FK_INVENTORY_Warehouses_WarehouseId",
                table: "INVENTORY");

            migrationBuilder.DropForeignKey(
                name: "FK_PRODUCT_Warehouses_WarehouseId",
                table: "PRODUCT");

            migrationBuilder.DropForeignKey(
                name: "FK_USER_Warehouses_WarehouseId",
                table: "USER");

            migrationBuilder.DropForeignKey(
                name: "FK_Warehouses_DISTRICT_DistrictId",
                table: "Warehouses");

            migrationBuilder.DropForeignKey(
                name: "FK_Warehouses_EMPLOYEE_ManagerId",
                table: "Warehouses");

            migrationBuilder.DropForeignKey(
                name: "FK_Warehouses_PROVINCE_ProvinceId",
                table: "Warehouses");

            migrationBuilder.DropForeignKey(
                name: "FK_Warehouses_WARD_WardId",
                table: "Warehouses");

            migrationBuilder.DropForeignKey(
                name: "FK_Warehouses_Warehouses_WarehouseId",
                table: "Warehouses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Warehouses",
                table: "Warehouses");

            migrationBuilder.RenameTable(
                name: "Warehouses",
                newName: "Warehouse");

            migrationBuilder.RenameIndex(
                name: "IX_Warehouses_WarehouseId",
                table: "Warehouse",
                newName: "IX_Warehouse_WarehouseId");

            migrationBuilder.RenameIndex(
                name: "IX_Warehouses_WardId",
                table: "Warehouse",
                newName: "IX_Warehouse_WardId");

            migrationBuilder.RenameIndex(
                name: "IX_Warehouses_ProvinceId",
                table: "Warehouse",
                newName: "IX_Warehouse_ProvinceId");

            migrationBuilder.RenameIndex(
                name: "IX_Warehouses_ManagerId",
                table: "Warehouse",
                newName: "IX_Warehouse_ManagerId");

            migrationBuilder.RenameIndex(
                name: "IX_Warehouses_DistrictId",
                table: "Warehouse",
                newName: "IX_Warehouse_DistrictId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Warehouse",
                table: "Warehouse",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "huhuhu",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 11, 22, 31, 19, 403, DateTimeKind.Unspecified).AddTicks(4178), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaha",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 11, 22, 31, 19, 404, DateTimeKind.Unspecified).AddTicks(3143), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 12, 5, 31, 19, 404, DateTimeKind.Local).AddTicks(4475) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaharamram",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 11, 22, 31, 19, 404, DateTimeKind.Unspecified).AddTicks(4737), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 12, 5, 31, 19, 404, DateTimeKind.Local).AddTicks(4742) });

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "0193e2ce-ee41-7fcb-9b52-5bba105dc0bd",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 11, 22, 31, 19, 404, DateTimeKind.Unspecified).AddTicks(9169), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "123456789",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 11, 22, 31, 19, 404, DateTimeKind.Unspecified).AddTicks(9800), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "147894561230",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 11, 22, 31, 19, 405, DateTimeKind.Unspecified).AddTicks(45), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "789456123",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 11, 22, 31, 19, 405, DateTimeKind.Unspecified).AddTicks(43), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "987654321",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 11, 22, 31, 19, 404, DateTimeKind.Unspecified).AddTicks(9803), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Warehouse",
                keyColumn: "Id",
                keyValue: "choi-da-time",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 11, 22, 31, 19, 413, DateTimeKind.Unspecified).AddTicks(5592), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddForeignKey(
                name: "FK_EMPLOYEE_Warehouse_WarehouseId",
                table: "EMPLOYEE",
                column: "WarehouseId",
                principalTable: "Warehouse",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GOODSISSUE_Warehouse_WarehouseId",
                table: "GOODSISSUE",
                column: "WarehouseId",
                principalTable: "Warehouse",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_GOODSRECEIPT_Warehouse_WarehouseId",
                table: "GOODSRECEIPT",
                column: "WarehouseId",
                principalTable: "Warehouse",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_INVENTORY_Warehouse_WarehouseId",
                table: "INVENTORY",
                column: "WarehouseId",
                principalTable: "Warehouse",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PRODUCT_Warehouse_WarehouseId",
                table: "PRODUCT",
                column: "WarehouseId",
                principalTable: "Warehouse",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_USER_Warehouse_WarehouseId",
                table: "USER",
                column: "WarehouseId",
                principalTable: "Warehouse",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Warehouse_DISTRICT_DistrictId",
                table: "Warehouse",
                column: "DistrictId",
                principalTable: "DISTRICT",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Warehouse_EMPLOYEE_ManagerId",
                table: "Warehouse",
                column: "ManagerId",
                principalTable: "EMPLOYEE",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Warehouse_PROVINCE_ProvinceId",
                table: "Warehouse",
                column: "ProvinceId",
                principalTable: "PROVINCE",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Warehouse_WARD_WardId",
                table: "Warehouse",
                column: "WardId",
                principalTable: "WARD",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Warehouse_Warehouse_WarehouseId",
                table: "Warehouse",
                column: "WarehouseId",
                principalTable: "Warehouse",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EMPLOYEE_Warehouse_WarehouseId",
                table: "EMPLOYEE");

            migrationBuilder.DropForeignKey(
                name: "FK_GOODSISSUE_Warehouse_WarehouseId",
                table: "GOODSISSUE");

            migrationBuilder.DropForeignKey(
                name: "FK_GOODSRECEIPT_Warehouse_WarehouseId",
                table: "GOODSRECEIPT");

            migrationBuilder.DropForeignKey(
                name: "FK_INVENTORY_Warehouse_WarehouseId",
                table: "INVENTORY");

            migrationBuilder.DropForeignKey(
                name: "FK_PRODUCT_Warehouse_WarehouseId",
                table: "PRODUCT");

            migrationBuilder.DropForeignKey(
                name: "FK_USER_Warehouse_WarehouseId",
                table: "USER");

            migrationBuilder.DropForeignKey(
                name: "FK_Warehouse_DISTRICT_DistrictId",
                table: "Warehouse");

            migrationBuilder.DropForeignKey(
                name: "FK_Warehouse_EMPLOYEE_ManagerId",
                table: "Warehouse");

            migrationBuilder.DropForeignKey(
                name: "FK_Warehouse_PROVINCE_ProvinceId",
                table: "Warehouse");

            migrationBuilder.DropForeignKey(
                name: "FK_Warehouse_WARD_WardId",
                table: "Warehouse");

            migrationBuilder.DropForeignKey(
                name: "FK_Warehouse_Warehouse_WarehouseId",
                table: "Warehouse");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Warehouse",
                table: "Warehouse");

            migrationBuilder.RenameTable(
                name: "Warehouse",
                newName: "Warehouses");

            migrationBuilder.RenameIndex(
                name: "IX_Warehouse_WarehouseId",
                table: "Warehouses",
                newName: "IX_Warehouses_WarehouseId");

            migrationBuilder.RenameIndex(
                name: "IX_Warehouse_WardId",
                table: "Warehouses",
                newName: "IX_Warehouses_WardId");

            migrationBuilder.RenameIndex(
                name: "IX_Warehouse_ProvinceId",
                table: "Warehouses",
                newName: "IX_Warehouses_ProvinceId");

            migrationBuilder.RenameIndex(
                name: "IX_Warehouse_ManagerId",
                table: "Warehouses",
                newName: "IX_Warehouses_ManagerId");

            migrationBuilder.RenameIndex(
                name: "IX_Warehouse_DistrictId",
                table: "Warehouses",
                newName: "IX_Warehouses_DistrictId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Warehouses",
                table: "Warehouses",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "huhuhu",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 11, 22, 26, 43, 988, DateTimeKind.Unspecified).AddTicks(5593), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaha",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 11, 22, 26, 43, 989, DateTimeKind.Unspecified).AddTicks(7384), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 12, 5, 26, 43, 989, DateTimeKind.Local).AddTicks(8718) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaharamram",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 11, 22, 26, 43, 989, DateTimeKind.Unspecified).AddTicks(8982), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 12, 5, 26, 43, 989, DateTimeKind.Local).AddTicks(8986) });

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "0193e2ce-ee41-7fcb-9b52-5bba105dc0bd",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 11, 22, 26, 43, 990, DateTimeKind.Unspecified).AddTicks(3176), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "123456789",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 11, 22, 26, 43, 990, DateTimeKind.Unspecified).AddTicks(3722), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "147894561230",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 11, 22, 26, 43, 990, DateTimeKind.Unspecified).AddTicks(3953), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "789456123",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 11, 22, 26, 43, 990, DateTimeKind.Unspecified).AddTicks(3952), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "987654321",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 11, 22, 26, 43, 990, DateTimeKind.Unspecified).AddTicks(3724), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Warehouses",
                keyColumn: "Id",
                keyValue: "choi-da-time",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 11, 22, 26, 43, 998, DateTimeKind.Unspecified).AddTicks(9130), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddForeignKey(
                name: "FK_EMPLOYEE_Warehouses_WarehouseId",
                table: "EMPLOYEE",
                column: "WarehouseId",
                principalTable: "Warehouses",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GOODSISSUE_Warehouses_WarehouseId",
                table: "GOODSISSUE",
                column: "WarehouseId",
                principalTable: "Warehouses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_GOODSRECEIPT_Warehouses_WarehouseId",
                table: "GOODSRECEIPT",
                column: "WarehouseId",
                principalTable: "Warehouses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_INVENTORY_Warehouses_WarehouseId",
                table: "INVENTORY",
                column: "WarehouseId",
                principalTable: "Warehouses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PRODUCT_Warehouses_WarehouseId",
                table: "PRODUCT",
                column: "WarehouseId",
                principalTable: "Warehouses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_USER_Warehouses_WarehouseId",
                table: "USER",
                column: "WarehouseId",
                principalTable: "Warehouses",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Warehouses_DISTRICT_DistrictId",
                table: "Warehouses",
                column: "DistrictId",
                principalTable: "DISTRICT",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Warehouses_EMPLOYEE_ManagerId",
                table: "Warehouses",
                column: "ManagerId",
                principalTable: "EMPLOYEE",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Warehouses_PROVINCE_ProvinceId",
                table: "Warehouses",
                column: "ProvinceId",
                principalTable: "PROVINCE",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Warehouses_WARD_WardId",
                table: "Warehouses",
                column: "WardId",
                principalTable: "WARD",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Warehouses_Warehouses_WarehouseId",
                table: "Warehouses",
                column: "WarehouseId",
                principalTable: "Warehouses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
