using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SeedData_Employee_User_Department : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "huhuhu",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 12, 7, 5, 34, 938, DateTimeKind.Unspecified).AddTicks(7472), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.InsertData(
                table: "DEPARTMENT",
                columns: new[] { "Id", "CreatedAt", "DeletedOn", "ModifiedOn", "Name" },
                values: new object[,]
                {
                    { "parrot-smell", new DateTimeOffset(new DateTime(2025, 4, 12, 7, 5, 34, 938, DateTimeKind.Unspecified).AddTicks(8762), new TimeSpan(0, 0, 0, 0, 0)), null, null, "Bộ phận quản lý bán hàng" },
                    { "sugar-town", new DateTimeOffset(new DateTime(2025, 4, 12, 7, 5, 34, 938, DateTimeKind.Unspecified).AddTicks(8759), new TimeSpan(0, 0, 0, 0, 0)), null, null, "Bộ phận quản lý sản xuất" }
                });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaha",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 12, 7, 5, 34, 939, DateTimeKind.Unspecified).AddTicks(8910), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 12, 14, 5, 34, 939, DateTimeKind.Local).AddTicks(9094) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaharamram",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 12, 7, 5, 34, 939, DateTimeKind.Unspecified).AddTicks(9340), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 12, 14, 5, 34, 939, DateTimeKind.Local).AddTicks(9343) });

            migrationBuilder.InsertData(
                table: "EMPLOYEE",
                columns: new[] { "Id", "Address", "CreatedAt", "DateHired", "DeletedOn", "DepartmentId", "DistrictId", "Email", "IsMale", "ModifiedOn", "Name", "PhoneNumber", "Position", "ProvinceId", "WardId", "WarehouseId" },
                values: new object[] { "bonk", "Hà Nội", new DateTimeOffset(new DateTime(2025, 4, 12, 7, 5, 34, 939, DateTimeKind.Unspecified).AddTicks(7521), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 12, 14, 5, 34, 939, DateTimeKind.Local).AddTicks(8751), null, null, "1", "VanC@gmail.com", true, null, "Nguyễn Văn C", "7894561230", "Giám đốc công ty", "1", "1", null });

            migrationBuilder.InsertData(
                table: "EMPLOYEE",
                columns: new[] { "Id", "Address", "CreatedAt", "DateHired", "DeletedOn", "DepartmentId", "DistrictId", "Email", "IsMale", "ModifiedOn", "Name", "PhoneNumber", "Position", "ProvinceId", "WardId", "WarehouseId" },
                values: new object[,]
                {
                    { "bankmiramram", "Hà Nội", new DateTimeOffset(new DateTime(2025, 4, 12, 7, 5, 34, 939, DateTimeKind.Unspecified).AddTicks(9344), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 12, 14, 5, 34, 939, DateTimeKind.Local).AddTicks(9346), null, "sugar-town", "1", "VanD@gmail.com", true, null, "Nguyễn Văn D", "0123457953", "Quản lý sản xuất", "1", "1", "choi-da-time" },
                    { "dainam", "Hà Nội", new DateTimeOffset(new DateTime(2025, 4, 12, 7, 5, 34, 939, DateTimeKind.Unspecified).AddTicks(9347), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 12, 14, 5, 34, 939, DateTimeKind.Local).AddTicks(9348), null, "parrot-smell", "1", "VanE@gmail.com", true, null, "Nguyễn Văn E", "012548756", "Nhân viên bán hàng", "1", "1", null }
                });

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "0193e2ce-ee41-7fcb-9b52-5bba105dc0bd",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 12, 7, 5, 34, 940, DateTimeKind.Unspecified).AddTicks(3496), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "123456789",
                columns: new[] { "CreatedAt", "EmployeeId" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 12, 7, 5, 34, 940, DateTimeKind.Unspecified).AddTicks(4029), new TimeSpan(0, 0, 0, 0, 0)), "bonk" });

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "147894561230",
                columns: new[] { "CreatedAt", "EmployeeId" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 12, 7, 5, 34, 940, DateTimeKind.Unspecified).AddTicks(4256), new TimeSpan(0, 0, 0, 0, 0)), "dainam" });

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "789456123",
                columns: new[] { "CreatedAt", "EmployeeId" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 12, 7, 5, 34, 940, DateTimeKind.Unspecified).AddTicks(4254), new TimeSpan(0, 0, 0, 0, 0)), "bankmiramram" });

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "987654321",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 12, 7, 5, 34, 940, DateTimeKind.Unspecified).AddTicks(4146), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Warehouse",
                keyColumn: "Id",
                keyValue: "choi-da-time",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 12, 7, 5, 34, 948, DateTimeKind.Unspecified).AddTicks(9212), new TimeSpan(0, 0, 0, 0, 0)));
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
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "parrot-smell");

            migrationBuilder.DeleteData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "sugar-town");

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
                columns: new[] { "CreatedAt", "EmployeeId" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 11, 22, 31, 19, 404, DateTimeKind.Unspecified).AddTicks(9800), new TimeSpan(0, 0, 0, 0, 0)), null });

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "147894561230",
                columns: new[] { "CreatedAt", "EmployeeId" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 11, 22, 31, 19, 405, DateTimeKind.Unspecified).AddTicks(45), new TimeSpan(0, 0, 0, 0, 0)), null });

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "789456123",
                columns: new[] { "CreatedAt", "EmployeeId" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 11, 22, 31, 19, 405, DateTimeKind.Unspecified).AddTicks(43), new TimeSpan(0, 0, 0, 0, 0)), null });

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
        }
    }
}
