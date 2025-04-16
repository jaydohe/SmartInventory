using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Config_Employee_Warehouse : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AGENCY",
                keyColumn: "Id",
                keyValue: "law",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 7, 59, 4, 507, DateTimeKind.Unspecified).AddTicks(5649), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "AGENCY",
                keyColumn: "Id",
                keyValue: "sunshine",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 7, 59, 4, 507, DateTimeKind.Unspecified).AddTicks(8268), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 7, 59, 4, 508, DateTimeKind.Unspecified).AddTicks(8261), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 7, 59, 4, 508, DateTimeKind.Unspecified).AddTicks(8774), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "3",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 7, 59, 4, 508, DateTimeKind.Unspecified).AddTicks(8776), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "4",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 7, 59, 4, 508, DateTimeKind.Unspecified).AddTicks(8777), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "5",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 7, 59, 4, 508, DateTimeKind.Unspecified).AddTicks(8779), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "huhuhu",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 7, 59, 4, 509, DateTimeKind.Unspecified).AddTicks(2210), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "parrot-smell",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 7, 59, 4, 509, DateTimeKind.Unspecified).AddTicks(2544), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "sugar-town",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 7, 59, 4, 509, DateTimeKind.Unspecified).AddTicks(2542), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.InsertData(
                table: "EMPLOYEE",
                columns: new[] { "Id", "Address", "Code", "CreatedAt", "DateHired", "DeletedOn", "DepartmentId", "DistrictId", "Email", "GenderType", "IsManager", "ManagerId", "ModifiedOn", "Name", "PhoneNumber", "PositionId", "ProvinceId", "WardId", "WarehouseId" },
                values: new object[,]
                {
                    { "bonk", "Hà Nội", "ADMIN01", new DateTimeOffset(new DateTime(2025, 4, 16, 7, 59, 4, 509, DateTimeKind.Unspecified).AddTicks(7336), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 16, 14, 59, 4, 509, DateTimeKind.Local).AddTicks(8584), null, null, "1", "VanC@gmail.com", "FEMALE", null, null, null, "Nguyễn Văn C", "7894561230", "1", "1", "1", null },
                    { "dainam", "Hà Nội", "EMPLOYEE03", new DateTimeOffset(new DateTime(2025, 4, 16, 7, 59, 4, 509, DateTimeKind.Unspecified).AddTicks(9079), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 16, 14, 59, 4, 509, DateTimeKind.Local).AddTicks(9081), null, "parrot-smell", "1", "VanE@gmail.com", "MALE", null, null, null, "Nguyễn Văn E", "012548756", "7", "1", "1", null }
                });

            migrationBuilder.UpdateData(
                table: "MATERIALSUPPLIER",
                keyColumn: "Id",
                keyValue: "bare",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 7, 59, 4, 510, DateTimeKind.Unspecified).AddTicks(3076), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "MATERIALSUPPLIER",
                keyColumn: "Id",
                keyValue: "cower",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 7, 59, 4, 510, DateTimeKind.Unspecified).AddTicks(4496), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 7, 59, 4, 510, DateTimeKind.Unspecified).AddTicks(7050), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 7, 59, 4, 510, DateTimeKind.Unspecified).AddTicks(7438), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "3",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 7, 59, 4, 510, DateTimeKind.Unspecified).AddTicks(7440), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "4",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 7, 59, 4, 510, DateTimeKind.Unspecified).AddTicks(7442), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "5",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 7, 59, 4, 510, DateTimeKind.Unspecified).AddTicks(7443), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "6",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 7, 59, 4, 510, DateTimeKind.Unspecified).AddTicks(7446), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "7",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 7, 59, 4, 510, DateTimeKind.Unspecified).AddTicks(7447), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.InsertData(
                table: "WAREHOUSE",
                columns: new[] { "Id", "Address", "Capacity", "CategoryId", "Code", "CreatedAt", "DeletedOn", "DistrictId", "ManagerId", "ModifiedOn", "Name", "ProvinceId", "Status", "WardId", "WarehouseId" },
                values: new object[,]
                {
                    { "basket", "123 ham tu", 999, "3", "BASKET001", new DateTimeOffset(new DateTime(2025, 4, 16, 7, 59, 4, 517, DateTimeKind.Unspecified).AddTicks(7183), new TimeSpan(0, 0, 0, 0, 0)), null, "1", null, null, "Basket", "1", 1, "1", null },
                    { "choi-da-time", "123 ham tu", 999, "1", "CDT001", new DateTimeOffset(new DateTime(2025, 4, 16, 7, 59, 4, 517, DateTimeKind.Unspecified).AddTicks(5940), new TimeSpan(0, 0, 0, 0, 0)), null, "1", null, null, "Jellyjellyjelly", "1", 1, "1", null }
                });

            migrationBuilder.InsertData(
                table: "EMPLOYEE",
                columns: new[] { "Id", "Address", "Code", "CreatedAt", "DateHired", "DeletedOn", "DepartmentId", "DistrictId", "Email", "GenderType", "IsManager", "ManagerId", "ModifiedOn", "Name", "PhoneNumber", "PositionId", "ProvinceId", "WardId", "WarehouseId" },
                values: new object[,]
                {
                    { "bankmiramram", "Hà Nội", "EMPLOYEE02", new DateTimeOffset(new DateTime(2025, 4, 16, 7, 59, 4, 509, DateTimeKind.Unspecified).AddTicks(9076), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 16, 14, 59, 4, 509, DateTimeKind.Local).AddTicks(9078), null, "sugar-town", "1", "VanD@gmail.com", "OTHER", null, null, null, "Nguyễn Văn D", "0123457953", "6", "1", "1", "choi-da-time" },
                    { "hihihaha", "Hà Nội", "MANAGER01", new DateTimeOffset(new DateTime(2025, 4, 16, 7, 59, 4, 509, DateTimeKind.Unspecified).AddTicks(8738), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 16, 14, 59, 4, 509, DateTimeKind.Local).AddTicks(8862), null, "huhuhu", "1", "VanA@gmail.com", "OTHER", null, null, null, "Nguyễn Văn A", "0123456789", "4", "1", "1", "choi-da-time" },
                    { "hihihaharamram", "Hà Nội", "EMPLOYEE01", new DateTimeOffset(new DateTime(2025, 4, 16, 7, 59, 4, 509, DateTimeKind.Unspecified).AddTicks(8970), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 16, 14, 59, 4, 509, DateTimeKind.Local).AddTicks(9075), null, "huhuhu", "1", "VanB@gmail.com", "MALE", null, "hihihaha", null, "Nguyễn Văn B", "0123456987", "5", "1", "1", "choi-da-time" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "bankmiramram");

            migrationBuilder.DeleteData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "bonk");

            migrationBuilder.DeleteData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "dainam");

            migrationBuilder.DeleteData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaharamram");

            migrationBuilder.DeleteData(
                table: "WAREHOUSE",
                keyColumn: "Id",
                keyValue: "basket");

            migrationBuilder.DeleteData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaha");

            migrationBuilder.DeleteData(
                table: "WAREHOUSE",
                keyColumn: "Id",
                keyValue: "choi-da-time");

            migrationBuilder.UpdateData(
                table: "AGENCY",
                keyColumn: "Id",
                keyValue: "law",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 0, 7, 9, 890, DateTimeKind.Unspecified).AddTicks(7763), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "AGENCY",
                keyColumn: "Id",
                keyValue: "sunshine",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 0, 7, 9, 891, DateTimeKind.Unspecified).AddTicks(358), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 0, 7, 9, 891, DateTimeKind.Unspecified).AddTicks(9481), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 0, 7, 9, 891, DateTimeKind.Unspecified).AddTicks(9938), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "3",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 0, 7, 9, 891, DateTimeKind.Unspecified).AddTicks(9941), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "4",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 0, 7, 9, 891, DateTimeKind.Unspecified).AddTicks(9942), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "5",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 0, 7, 9, 891, DateTimeKind.Unspecified).AddTicks(9943), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "huhuhu",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 0, 7, 9, 892, DateTimeKind.Unspecified).AddTicks(3298), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "parrot-smell",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 0, 7, 9, 892, DateTimeKind.Unspecified).AddTicks(3628), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "sugar-town",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 0, 7, 9, 892, DateTimeKind.Unspecified).AddTicks(3626), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "MATERIALSUPPLIER",
                keyColumn: "Id",
                keyValue: "bare",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 0, 7, 9, 892, DateTimeKind.Unspecified).AddTicks(9494), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "MATERIALSUPPLIER",
                keyColumn: "Id",
                keyValue: "cower",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 0, 7, 9, 893, DateTimeKind.Unspecified).AddTicks(1060), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 0, 7, 9, 893, DateTimeKind.Unspecified).AddTicks(3531), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 0, 7, 9, 893, DateTimeKind.Unspecified).AddTicks(3847), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "3",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 0, 7, 9, 893, DateTimeKind.Unspecified).AddTicks(3849), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "4",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 0, 7, 9, 893, DateTimeKind.Unspecified).AddTicks(3850), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "5",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 0, 7, 9, 893, DateTimeKind.Unspecified).AddTicks(3851), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "6",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 0, 7, 9, 893, DateTimeKind.Unspecified).AddTicks(3854), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "7",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 16, 0, 7, 9, 893, DateTimeKind.Unspecified).AddTicks(3855), new TimeSpan(0, 0, 0, 0, 0)));
        }
    }
}
