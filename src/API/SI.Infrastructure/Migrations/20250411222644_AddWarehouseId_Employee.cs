using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddWarehouseId_Employee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EMPLOYEE_WAREHOUSE_WarehouseId",
                table: "EMPLOYEE");

            migrationBuilder.DropForeignKey(
                name: "FK_GOODSISSUE_WAREHOUSE_WarehouseId",
                table: "GOODSISSUE");

            migrationBuilder.DropForeignKey(
                name: "FK_GOODSRECEIPT_WAREHOUSE_WarehouseId",
                table: "GOODSRECEIPT");

            migrationBuilder.DropForeignKey(
                name: "FK_INVENTORY_WAREHOUSE_WarehouseId",
                table: "INVENTORY");

            migrationBuilder.DropForeignKey(
                name: "FK_PRODUCT_WAREHOUSE_WarehouseId",
                table: "PRODUCT");

            migrationBuilder.DropForeignKey(
                name: "FK_USER_WAREHOUSE_WarehouseId",
                table: "USER");

            migrationBuilder.DropForeignKey(
                name: "FK_WAREHOUSE_DISTRICT_DistrictId",
                table: "WAREHOUSE");

            migrationBuilder.DropForeignKey(
                name: "FK_WAREHOUSE_EMPLOYEE_ManagerId",
                table: "WAREHOUSE");

            migrationBuilder.DropForeignKey(
                name: "FK_WAREHOUSE_PROVINCE_ProvinceId",
                table: "WAREHOUSE");

            migrationBuilder.DropForeignKey(
                name: "FK_WAREHOUSE_WARD_WardId",
                table: "WAREHOUSE");

            migrationBuilder.DropForeignKey(
                name: "FK_WAREHOUSE_WAREHOUSE_WarehouseId",
                table: "WAREHOUSE");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WAREHOUSE",
                table: "WAREHOUSE");

            migrationBuilder.RenameTable(
                name: "WAREHOUSE",
                newName: "Warehouses");

            migrationBuilder.RenameIndex(
                name: "IX_WAREHOUSE_WarehouseId",
                table: "Warehouses",
                newName: "IX_Warehouses_WarehouseId");

            migrationBuilder.RenameIndex(
                name: "IX_WAREHOUSE_WardId",
                table: "Warehouses",
                newName: "IX_Warehouses_WardId");

            migrationBuilder.RenameIndex(
                name: "IX_WAREHOUSE_ProvinceId",
                table: "Warehouses",
                newName: "IX_Warehouses_ProvinceId");

            migrationBuilder.RenameIndex(
                name: "IX_WAREHOUSE_ManagerId",
                table: "Warehouses",
                newName: "IX_Warehouses_ManagerId");

            migrationBuilder.RenameIndex(
                name: "IX_WAREHOUSE_DistrictId",
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
                columns: new[] { "CreatedAt", "DateHired", "WarehouseId" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 11, 22, 26, 43, 989, DateTimeKind.Unspecified).AddTicks(7384), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 12, 5, 26, 43, 989, DateTimeKind.Local).AddTicks(8718), "choi-da-time" });

            migrationBuilder.InsertData(
                table: "EMPLOYEE",
                columns: new[] { "Id", "Address", "CreatedAt", "DateHired", "DeletedOn", "DepartmentId", "DistrictId", "Email", "IsMale", "ModifiedOn", "Name", "PhoneNumber", "Position", "ProvinceId", "WardId", "WarehouseId" },
                values: new object[] { "hihihaharamram", "Hà Nội", new DateTimeOffset(new DateTime(2025, 4, 11, 22, 26, 43, 989, DateTimeKind.Unspecified).AddTicks(8982), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 12, 5, 26, 43, 989, DateTimeKind.Local).AddTicks(8986), null, "huhuhu", "1", "VanB@gmail.com", true, null, "Nguyễn Văn B", "0123456987", "Nhân viên kho", "1", "1", "choi-da-time" });

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DeleteData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaharamram");

            migrationBuilder.RenameTable(
                name: "Warehouses",
                newName: "WAREHOUSE");

            migrationBuilder.RenameIndex(
                name: "IX_Warehouses_WarehouseId",
                table: "WAREHOUSE",
                newName: "IX_WAREHOUSE_WarehouseId");

            migrationBuilder.RenameIndex(
                name: "IX_Warehouses_WardId",
                table: "WAREHOUSE",
                newName: "IX_WAREHOUSE_WardId");

            migrationBuilder.RenameIndex(
                name: "IX_Warehouses_ProvinceId",
                table: "WAREHOUSE",
                newName: "IX_WAREHOUSE_ProvinceId");

            migrationBuilder.RenameIndex(
                name: "IX_Warehouses_ManagerId",
                table: "WAREHOUSE",
                newName: "IX_WAREHOUSE_ManagerId");

            migrationBuilder.RenameIndex(
                name: "IX_Warehouses_DistrictId",
                table: "WAREHOUSE",
                newName: "IX_WAREHOUSE_DistrictId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WAREHOUSE",
                table: "WAREHOUSE",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "huhuhu",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 11, 21, 29, 45, 193, DateTimeKind.Unspecified).AddTicks(5207), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaha",
                columns: new[] { "CreatedAt", "DateHired", "WarehouseId" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 11, 21, 29, 45, 194, DateTimeKind.Unspecified).AddTicks(4642), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 12, 4, 29, 45, 194, DateTimeKind.Local).AddTicks(5986), null });

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "0193e2ce-ee41-7fcb-9b52-5bba105dc0bd",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 11, 21, 29, 45, 195, DateTimeKind.Unspecified).AddTicks(848), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "123456789",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 11, 21, 29, 45, 195, DateTimeKind.Unspecified).AddTicks(1673), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "147894561230",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 11, 21, 29, 45, 195, DateTimeKind.Unspecified).AddTicks(2033), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "789456123",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 11, 21, 29, 45, 195, DateTimeKind.Unspecified).AddTicks(2030), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "987654321",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 11, 21, 29, 45, 195, DateTimeKind.Unspecified).AddTicks(1677), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "WAREHOUSE",
                keyColumn: "Id",
                keyValue: "choi-da-time",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 11, 21, 29, 45, 195, DateTimeKind.Unspecified).AddTicks(5858), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddForeignKey(
                name: "FK_EMPLOYEE_WAREHOUSE_WarehouseId",
                table: "EMPLOYEE",
                column: "WarehouseId",
                principalTable: "WAREHOUSE",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GOODSISSUE_WAREHOUSE_WarehouseId",
                table: "GOODSISSUE",
                column: "WarehouseId",
                principalTable: "WAREHOUSE",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_GOODSRECEIPT_WAREHOUSE_WarehouseId",
                table: "GOODSRECEIPT",
                column: "WarehouseId",
                principalTable: "WAREHOUSE",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_INVENTORY_WAREHOUSE_WarehouseId",
                table: "INVENTORY",
                column: "WarehouseId",
                principalTable: "WAREHOUSE",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PRODUCT_WAREHOUSE_WarehouseId",
                table: "PRODUCT",
                column: "WarehouseId",
                principalTable: "WAREHOUSE",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_USER_WAREHOUSE_WarehouseId",
                table: "USER",
                column: "WarehouseId",
                principalTable: "WAREHOUSE",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WAREHOUSE_DISTRICT_DistrictId",
                table: "WAREHOUSE",
                column: "DistrictId",
                principalTable: "DISTRICT",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WAREHOUSE_EMPLOYEE_ManagerId",
                table: "WAREHOUSE",
                column: "ManagerId",
                principalTable: "EMPLOYEE",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WAREHOUSE_PROVINCE_ProvinceId",
                table: "WAREHOUSE",
                column: "ProvinceId",
                principalTable: "PROVINCE",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WAREHOUSE_WARD_WardId",
                table: "WAREHOUSE",
                column: "WardId",
                principalTable: "WARD",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WAREHOUSE_WAREHOUSE_WarehouseId",
                table: "WAREHOUSE",
                column: "WarehouseId",
                principalTable: "WAREHOUSE",
                principalColumn: "Id");
        }
    }
}
