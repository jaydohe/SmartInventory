using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddStatus_Warehouse : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "USER");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Warehouse",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "huhuhu",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 12, 10, 24, 8, 894, DateTimeKind.Unspecified).AddTicks(7274), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "parrot-smell",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 12, 10, 24, 8, 894, DateTimeKind.Unspecified).AddTicks(8571), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "sugar-town",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 12, 10, 24, 8, 894, DateTimeKind.Unspecified).AddTicks(8569), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "bankmiramram",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 12, 10, 24, 8, 895, DateTimeKind.Unspecified).AddTicks(8999), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 12, 17, 24, 8, 895, DateTimeKind.Local).AddTicks(9001) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "bonk",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 12, 10, 24, 8, 895, DateTimeKind.Unspecified).AddTicks(7432), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 12, 17, 24, 8, 895, DateTimeKind.Local).AddTicks(8604) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "dainam",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 12, 10, 24, 8, 895, DateTimeKind.Unspecified).AddTicks(9001), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 12, 17, 24, 8, 895, DateTimeKind.Local).AddTicks(9003) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaha",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 12, 10, 24, 8, 895, DateTimeKind.Unspecified).AddTicks(8754), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 12, 17, 24, 8, 895, DateTimeKind.Local).AddTicks(8880) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaharamram",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 12, 10, 24, 8, 895, DateTimeKind.Unspecified).AddTicks(8995), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 12, 17, 24, 8, 895, DateTimeKind.Local).AddTicks(8998) });

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "0193e2ce-ee41-7fcb-9b52-5bba105dc0bd",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 12, 10, 24, 8, 896, DateTimeKind.Unspecified).AddTicks(3418), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "123456789",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 12, 10, 24, 8, 896, DateTimeKind.Unspecified).AddTicks(3976), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "147894561230",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 12, 10, 24, 8, 896, DateTimeKind.Unspecified).AddTicks(4351), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "789456123",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 12, 10, 24, 8, 896, DateTimeKind.Unspecified).AddTicks(4349), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "987654321",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 12, 10, 24, 8, 896, DateTimeKind.Unspecified).AddTicks(4194), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "Warehouse",
                keyColumn: "Id",
                keyValue: "choi-da-time",
                columns: new[] { "CreatedAt", "Status" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 12, 10, 24, 8, 906, DateTimeKind.Unspecified).AddTicks(1527), new TimeSpan(0, 0, 0, 0, 0)), 1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Warehouse");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "USER",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "huhuhu",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 12, 7, 5, 34, 938, DateTimeKind.Unspecified).AddTicks(7472), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "parrot-smell",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 12, 7, 5, 34, 938, DateTimeKind.Unspecified).AddTicks(8762), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "sugar-town",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 12, 7, 5, 34, 938, DateTimeKind.Unspecified).AddTicks(8759), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "bankmiramram",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 12, 7, 5, 34, 939, DateTimeKind.Unspecified).AddTicks(9344), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 12, 14, 5, 34, 939, DateTimeKind.Local).AddTicks(9346) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "bonk",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 12, 7, 5, 34, 939, DateTimeKind.Unspecified).AddTicks(7521), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 12, 14, 5, 34, 939, DateTimeKind.Local).AddTicks(8751) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "dainam",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 12, 7, 5, 34, 939, DateTimeKind.Unspecified).AddTicks(9347), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 12, 14, 5, 34, 939, DateTimeKind.Local).AddTicks(9348) });

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

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "0193e2ce-ee41-7fcb-9b52-5bba105dc0bd",
                columns: new[] { "CreatedAt", "Status" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 12, 7, 5, 34, 940, DateTimeKind.Unspecified).AddTicks(3496), new TimeSpan(0, 0, 0, 0, 0)), 1 });

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "123456789",
                columns: new[] { "CreatedAt", "Status" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 12, 7, 5, 34, 940, DateTimeKind.Unspecified).AddTicks(4029), new TimeSpan(0, 0, 0, 0, 0)), 1 });

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "147894561230",
                columns: new[] { "CreatedAt", "Status" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 12, 7, 5, 34, 940, DateTimeKind.Unspecified).AddTicks(4256), new TimeSpan(0, 0, 0, 0, 0)), 1 });

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "789456123",
                columns: new[] { "CreatedAt", "Status" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 12, 7, 5, 34, 940, DateTimeKind.Unspecified).AddTicks(4254), new TimeSpan(0, 0, 0, 0, 0)), 1 });

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "987654321",
                columns: new[] { "CreatedAt", "Status" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 12, 7, 5, 34, 940, DateTimeKind.Unspecified).AddTicks(4146), new TimeSpan(0, 0, 0, 0, 0)), 1 });

            migrationBuilder.UpdateData(
                table: "Warehouse",
                keyColumn: "Id",
                keyValue: "choi-da-time",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 12, 7, 5, 34, 948, DateTimeKind.Unspecified).AddTicks(9212), new TimeSpan(0, 0, 0, 0, 0)));
        }
    }
}
