using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FixForecast : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "FORECAST",
                newName: "SeasonalityPeriod");

            migrationBuilder.AddColumn<double>(
                name: "ForecastValue",
                table: "FORECAST",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Level",
                table: "FORECAST",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "LowerBound",
                table: "FORECAST",
                type: "double",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ModelParameters",
                table: "FORECAST",
                type: "json",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<double>(
                name: "Seasonal",
                table: "FORECAST",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Trend",
                table: "FORECAST",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "UpperBound",
                table: "FORECAST",
                type: "double",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AGENCY",
                keyColumn: "Id",
                keyValue: "law",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 125, DateTimeKind.Unspecified).AddTicks(6350), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "AGENCY",
                keyColumn: "Id",
                keyValue: "sunshine",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 125, DateTimeKind.Unspecified).AddTicks(8965), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 126, DateTimeKind.Unspecified).AddTicks(8107), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 126, DateTimeKind.Unspecified).AddTicks(8569), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "3",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 126, DateTimeKind.Unspecified).AddTicks(8571), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "4",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 126, DateTimeKind.Unspecified).AddTicks(8573), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "5",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 126, DateTimeKind.Unspecified).AddTicks(8574), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "huhuhu",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 127, DateTimeKind.Unspecified).AddTicks(1980), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "parrot-smell",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 127, DateTimeKind.Unspecified).AddTicks(2309), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "sugar-town",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 127, DateTimeKind.Unspecified).AddTicks(2307), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "bankmiramram",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 127, DateTimeKind.Unspecified).AddTicks(8966), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 9, 2, 12, 59, 127, DateTimeKind.Local).AddTicks(8968) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "bonk",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 127, DateTimeKind.Unspecified).AddTicks(7238), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 9, 2, 12, 59, 127, DateTimeKind.Local).AddTicks(8419) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "dainam",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 127, DateTimeKind.Unspecified).AddTicks(8969), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 9, 2, 12, 59, 127, DateTimeKind.Local).AddTicks(8971) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaha",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 127, DateTimeKind.Unspecified).AddTicks(8582), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 9, 2, 12, 59, 127, DateTimeKind.Local).AddTicks(8842) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaharamram",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 127, DateTimeKind.Unspecified).AddTicks(8961), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 9, 2, 12, 59, 127, DateTimeKind.Local).AddTicks(8965) });

            migrationBuilder.UpdateData(
                table: "MATERIALSUPPLIER",
                keyColumn: "Id",
                keyValue: "bare",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 128, DateTimeKind.Unspecified).AddTicks(2999), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "MATERIALSUPPLIER",
                keyColumn: "Id",
                keyValue: "cower",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 128, DateTimeKind.Unspecified).AddTicks(4568), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 128, DateTimeKind.Unspecified).AddTicks(7015), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 128, DateTimeKind.Unspecified).AddTicks(7325), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "3",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 128, DateTimeKind.Unspecified).AddTicks(7326), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "4",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 128, DateTimeKind.Unspecified).AddTicks(7328), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "5",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 128, DateTimeKind.Unspecified).AddTicks(7328), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "6",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 128, DateTimeKind.Unspecified).AddTicks(7331), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "7",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 128, DateTimeKind.Unspecified).AddTicks(7332), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "PRODUCT",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 129, DateTimeKind.Unspecified).AddTicks(1216), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "PRODUCT",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 129, DateTimeKind.Unspecified).AddTicks(2558), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "0193e2ce-ee41-7fcb-9b52-5bba105dc0bd",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 129, DateTimeKind.Unspecified).AddTicks(5399), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "123456789",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 129, DateTimeKind.Unspecified).AddTicks(5945), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "147894561230",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 129, DateTimeKind.Unspecified).AddTicks(6076), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "789456123",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 129, DateTimeKind.Unspecified).AddTicks(6075), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "987654321",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 129, DateTimeKind.Unspecified).AddTicks(6073), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "WAREHOUSE",
                keyColumn: "Id",
                keyValue: "basket",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 137, DateTimeKind.Unspecified).AddTicks(2995), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "WAREHOUSE",
                keyColumn: "Id",
                keyValue: "choi-da-time",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 8, 19, 12, 59, 137, DateTimeKind.Unspecified).AddTicks(1526), new TimeSpan(0, 0, 0, 0, 0)));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ForecastValue",
                table: "FORECAST");

            migrationBuilder.DropColumn(
                name: "Level",
                table: "FORECAST");

            migrationBuilder.DropColumn(
                name: "LowerBound",
                table: "FORECAST");

            migrationBuilder.DropColumn(
                name: "ModelParameters",
                table: "FORECAST");

            migrationBuilder.DropColumn(
                name: "Seasonal",
                table: "FORECAST");

            migrationBuilder.DropColumn(
                name: "Trend",
                table: "FORECAST");

            migrationBuilder.DropColumn(
                name: "UpperBound",
                table: "FORECAST");

            migrationBuilder.RenameColumn(
                name: "SeasonalityPeriod",
                table: "FORECAST",
                newName: "Quantity");

            migrationBuilder.UpdateData(
                table: "AGENCY",
                keyColumn: "Id",
                keyValue: "law",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 462, DateTimeKind.Unspecified).AddTicks(3779), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "AGENCY",
                keyColumn: "Id",
                keyValue: "sunshine",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 462, DateTimeKind.Unspecified).AddTicks(8354), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 463, DateTimeKind.Unspecified).AddTicks(8390), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 463, DateTimeKind.Unspecified).AddTicks(8862), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "3",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 463, DateTimeKind.Unspecified).AddTicks(8864), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "4",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 463, DateTimeKind.Unspecified).AddTicks(8865), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "5",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 463, DateTimeKind.Unspecified).AddTicks(8866), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "huhuhu",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 464, DateTimeKind.Unspecified).AddTicks(2218), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "parrot-smell",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 464, DateTimeKind.Unspecified).AddTicks(2553), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "sugar-town",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 464, DateTimeKind.Unspecified).AddTicks(2551), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "bankmiramram",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 464, DateTimeKind.Unspecified).AddTicks(9342), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 20, 4, 23, 31, 464, DateTimeKind.Local).AddTicks(9344) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "bonk",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 464, DateTimeKind.Unspecified).AddTicks(7582), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 20, 4, 23, 31, 464, DateTimeKind.Local).AddTicks(8800) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "dainam",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 464, DateTimeKind.Unspecified).AddTicks(9345), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 20, 4, 23, 31, 464, DateTimeKind.Local).AddTicks(9347) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaha",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 464, DateTimeKind.Unspecified).AddTicks(8958), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 20, 4, 23, 31, 464, DateTimeKind.Local).AddTicks(9217) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaharamram",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 464, DateTimeKind.Unspecified).AddTicks(9337), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 4, 20, 4, 23, 31, 464, DateTimeKind.Local).AddTicks(9341) });

            migrationBuilder.UpdateData(
                table: "MATERIALSUPPLIER",
                keyColumn: "Id",
                keyValue: "bare",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 465, DateTimeKind.Unspecified).AddTicks(3697), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "MATERIALSUPPLIER",
                keyColumn: "Id",
                keyValue: "cower",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 465, DateTimeKind.Unspecified).AddTicks(5303), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 465, DateTimeKind.Unspecified).AddTicks(7851), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 465, DateTimeKind.Unspecified).AddTicks(8159), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "3",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 465, DateTimeKind.Unspecified).AddTicks(8161), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "4",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 465, DateTimeKind.Unspecified).AddTicks(8162), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "5",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 465, DateTimeKind.Unspecified).AddTicks(8163), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "6",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 465, DateTimeKind.Unspecified).AddTicks(8167), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "7",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 465, DateTimeKind.Unspecified).AddTicks(8167), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "PRODUCT",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 466, DateTimeKind.Unspecified).AddTicks(2165), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "PRODUCT",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 466, DateTimeKind.Unspecified).AddTicks(3430), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "0193e2ce-ee41-7fcb-9b52-5bba105dc0bd",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 466, DateTimeKind.Unspecified).AddTicks(6199), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "123456789",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 466, DateTimeKind.Unspecified).AddTicks(6738), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "147894561230",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 466, DateTimeKind.Unspecified).AddTicks(6865), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "789456123",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 466, DateTimeKind.Unspecified).AddTicks(6864), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "987654321",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 466, DateTimeKind.Unspecified).AddTicks(6862), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "WAREHOUSE",
                keyColumn: "Id",
                keyValue: "basket",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 474, DateTimeKind.Unspecified).AddTicks(2290), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "WAREHOUSE",
                keyColumn: "Id",
                keyValue: "choi-da-time",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 4, 19, 21, 23, 31, 474, DateTimeKind.Unspecified).AddTicks(1049), new TimeSpan(0, 0, 0, 0, 0)));
        }
    }
}
