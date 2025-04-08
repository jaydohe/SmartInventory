using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SeedData_Warehouse_User_Employee_Department : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "DEPARTMENT",
                columns: new[] { "Id", "CreatedAt", "DeletedOn", "ModifiedOn", "Name" },
                values: new object[] { "huhuhu", new DateTimeOffset(new DateTime(2025, 4, 8, 19, 0, 40, 69, DateTimeKind.Unspecified).AddTicks(5013), new TimeSpan(0, 0, 0, 0, 0)), null, null, "Bộ phận quản lý kho" });

            migrationBuilder.InsertData(
                table: "USER",
                columns: new[] { "Id", "CreatedAt", "DeletedOn", "EmployeeId", "HashPassword", "IsLogin", "LoginName", "ModifiedOn", "Name", "Role", "Status", "WarehouseId" },
                values: new object[,]
                {
                    { "0193e2ce-ee41-7fcb-9b52-5bba105dc0bd", new DateTimeOffset(new DateTime(2025, 4, 8, 19, 0, 40, 70, DateTimeKind.Unspecified).AddTicks(9024), new TimeSpan(0, 0, 0, 0, 0)), null, null, "27dee27aa573be269f95143a213fe18e29a90e1124b371d280a6c4b88f85f749", true, "dev0", null, "Develop", 0, 1, null },
                    { "123456789", new DateTimeOffset(new DateTime(2025, 4, 8, 19, 0, 40, 70, DateTimeKind.Unspecified).AddTicks(9755), new TimeSpan(0, 0, 0, 0, 0)), null, null, "7ced44abd56279573d3e9730f7845fd68bb5e1d1b09dee076b066f53ca8e8247", true, "admin0", null, "Admin", 1, 1, null },
                    { "147894561230", new DateTimeOffset(new DateTime(2025, 4, 8, 19, 0, 40, 70, DateTimeKind.Unspecified).AddTicks(9908), new TimeSpan(0, 0, 0, 0, 0)), null, null, "cfbff703c63d47180b95190dac7b4ca5e04e20af5b3c5ec515e4136710815d84", true, "salesman1", null, "Salesman test", 4, 1, null }
                });

            migrationBuilder.InsertData(
                table: "EMPLOYEE",
                columns: new[] { "Id", "Address", "CreatedAt", "DateHired", "DeletedOn", "DepartmentId", "DistrictId", "Email", "IsMale", "ModifiedOn", "Name", "PhoneNumber", "Position", "ProvinceId", "WardId", "WarehouseId" },
                values: new object[] { "hihihaha", "Hà Nội", new DateTimeOffset(new DateTime(2025, 4, 8, 19, 0, 40, 70, DateTimeKind.Unspecified).AddTicks(3594), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 9, 2, 0, 40, 70, DateTimeKind.Local).AddTicks(4831), null, "huhuhu", "1", "VanA@gmail.com", true, null, "Nguyễn Văn A", "0123456789", "Quản lý kho", "1", "1", null });

            migrationBuilder.InsertData(
                table: "WAREHOUSE",
                columns: new[] { "Id", "Address", "Capacity", "CreatedAt", "DeletedOn", "DistrictId", "ManagerId", "ModifiedOn", "Name", "ProvinceId", "WardId", "WarehouseId" },
                values: new object[] { "choi-da-time", "123 ham tu", 999, new DateTimeOffset(new DateTime(2025, 4, 8, 19, 0, 40, 71, DateTimeKind.Unspecified).AddTicks(3294), new TimeSpan(0, 0, 0, 0, 0)), null, "1", "hihihaha", null, "Jellyjellyjelly", "1", "1", null });

            migrationBuilder.InsertData(
                table: "USER",
                columns: new[] { "Id", "CreatedAt", "DeletedOn", "EmployeeId", "HashPassword", "IsLogin", "LoginName", "ModifiedOn", "Name", "Role", "Status", "WarehouseId" },
                values: new object[,]
                {
                    { "789456123", new DateTimeOffset(new DateTime(2025, 4, 8, 19, 0, 40, 70, DateTimeKind.Unspecified).AddTicks(9906), new TimeSpan(0, 0, 0, 0, 0)), null, null, "cfbff703c63d47180b95190dac7b4ca5e04e20af5b3c5ec515e4136710815d84", true, "producer1", null, "Producer test", 3, 1, "choi-da-time" },
                    { "987654321", new DateTimeOffset(new DateTime(2025, 4, 8, 19, 0, 40, 70, DateTimeKind.Unspecified).AddTicks(9758), new TimeSpan(0, 0, 0, 0, 0)), null, null, "cfbff703c63d47180b95190dac7b4ca5e04e20af5b3c5ec515e4136710815d84", true, "staff1", null, "Staff test", 2, 1, "choi-da-time" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "0193e2ce-ee41-7fcb-9b52-5bba105dc0bd");

            migrationBuilder.DeleteData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "123456789");

            migrationBuilder.DeleteData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "147894561230");

            migrationBuilder.DeleteData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "789456123");

            migrationBuilder.DeleteData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "987654321");

            migrationBuilder.DeleteData(
                table: "WAREHOUSE",
                keyColumn: "Id",
                keyValue: "choi-da-time");

            migrationBuilder.DeleteData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaha");

            migrationBuilder.DeleteData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "huhuhu");
        }
    }
}
