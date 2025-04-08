using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SeedData_User_2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EMPLOYEE_DEPARTMENT_DepartmentId",
                table: "EMPLOYEE");

            migrationBuilder.AlterColumn<string>(
                name: "DepartmentId",
                table: "EMPLOYEE",
                type: "varchar(255)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(255)")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "huhuhu",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 8, 19, 59, 25, 310, DateTimeKind.Unspecified).AddTicks(1244), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaha",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 8, 19, 59, 25, 311, DateTimeKind.Unspecified).AddTicks(852), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 9, 2, 59, 25, 311, DateTimeKind.Local).AddTicks(2117) });

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "0193e2ce-ee41-7fcb-9b52-5bba105dc0bd",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 8, 19, 59, 25, 311, DateTimeKind.Unspecified).AddTicks(6393), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "123456789",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 8, 19, 59, 25, 311, DateTimeKind.Unspecified).AddTicks(7009), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "147894561230",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 8, 19, 59, 25, 311, DateTimeKind.Unspecified).AddTicks(7277), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "789456123",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 8, 19, 59, 25, 311, DateTimeKind.Unspecified).AddTicks(7275), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "987654321",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 8, 19, 59, 25, 311, DateTimeKind.Unspecified).AddTicks(7011), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "WAREHOUSE",
                keyColumn: "Id",
                keyValue: "choi-da-time",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 8, 19, 59, 25, 312, DateTimeKind.Unspecified).AddTicks(904), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddForeignKey(
                name: "FK_EMPLOYEE_DEPARTMENT_DepartmentId",
                table: "EMPLOYEE",
                column: "DepartmentId",
                principalTable: "DEPARTMENT",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EMPLOYEE_DEPARTMENT_DepartmentId",
                table: "EMPLOYEE");

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "DepartmentId",
                keyValue: null,
                column: "DepartmentId",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "DepartmentId",
                table: "EMPLOYEE",
                type: "varchar(255)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "huhuhu",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 8, 19, 50, 21, 182, DateTimeKind.Unspecified).AddTicks(7063), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaha",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 8, 19, 50, 21, 184, DateTimeKind.Unspecified).AddTicks(195), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 9, 2, 50, 21, 184, DateTimeKind.Local).AddTicks(1450) });

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "0193e2ce-ee41-7fcb-9b52-5bba105dc0bd",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 8, 19, 50, 21, 184, DateTimeKind.Unspecified).AddTicks(5782), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "123456789",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 8, 19, 50, 21, 184, DateTimeKind.Unspecified).AddTicks(6457), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "147894561230",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 8, 19, 50, 21, 184, DateTimeKind.Unspecified).AddTicks(6746), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "789456123",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 8, 19, 50, 21, 184, DateTimeKind.Unspecified).AddTicks(6743), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "987654321",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 8, 19, 50, 21, 184, DateTimeKind.Unspecified).AddTicks(6460), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "WAREHOUSE",
                keyColumn: "Id",
                keyValue: "choi-da-time",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 8, 19, 50, 21, 185, DateTimeKind.Unspecified).AddTicks(374), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddForeignKey(
                name: "FK_EMPLOYEE_DEPARTMENT_DepartmentId",
                table: "EMPLOYEE",
                column: "DepartmentId",
                principalTable: "DEPARTMENT",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
