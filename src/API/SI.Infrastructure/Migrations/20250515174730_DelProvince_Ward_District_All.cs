using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class DelProvince_Ward_District_All : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AGENCY_DISTRICT_DistrictId",
                table: "AGENCY");

            migrationBuilder.DropForeignKey(
                name: "FK_AGENCY_PROVINCE_ProvinceId",
                table: "AGENCY");

            migrationBuilder.DropForeignKey(
                name: "FK_AGENCY_WARD_WardId",
                table: "AGENCY");

            migrationBuilder.DropForeignKey(
                name: "FK_EMPLOYEE_DISTRICT_DistrictId",
                table: "EMPLOYEE");

            migrationBuilder.DropForeignKey(
                name: "FK_EMPLOYEE_PROVINCE_ProvinceId",
                table: "EMPLOYEE");

            migrationBuilder.DropForeignKey(
                name: "FK_EMPLOYEE_WARD_WardId",
                table: "EMPLOYEE");

            migrationBuilder.DropForeignKey(
                name: "FK_MATERIALSUPPLIER_DISTRICT_DistrictId",
                table: "MATERIALSUPPLIER");

            migrationBuilder.DropForeignKey(
                name: "FK_MATERIALSUPPLIER_PROVINCE_ProvinceId",
                table: "MATERIALSUPPLIER");

            migrationBuilder.DropForeignKey(
                name: "FK_MATERIALSUPPLIER_WARD_WardId",
                table: "MATERIALSUPPLIER");

            migrationBuilder.DropForeignKey(
                name: "FK_WAREHOUSE_DISTRICT_DistrictId",
                table: "WAREHOUSE");

            migrationBuilder.DropForeignKey(
                name: "FK_WAREHOUSE_PROVINCE_ProvinceId",
                table: "WAREHOUSE");

            migrationBuilder.DropForeignKey(
                name: "FK_WAREHOUSE_WARD_WardId",
                table: "WAREHOUSE");

            migrationBuilder.DropTable(
                name: "WARD");

            migrationBuilder.DropTable(
                name: "DISTRICT");

            migrationBuilder.DropTable(
                name: "PROVINCE");

            migrationBuilder.DropIndex(
                name: "IX_WAREHOUSE_DistrictId",
                table: "WAREHOUSE");

            migrationBuilder.DropIndex(
                name: "IX_WAREHOUSE_ProvinceId",
                table: "WAREHOUSE");

            migrationBuilder.DropIndex(
                name: "IX_WAREHOUSE_WardId",
                table: "WAREHOUSE");

            migrationBuilder.DropIndex(
                name: "IX_MATERIALSUPPLIER_DistrictId",
                table: "MATERIALSUPPLIER");

            migrationBuilder.DropIndex(
                name: "IX_MATERIALSUPPLIER_ProvinceId",
                table: "MATERIALSUPPLIER");

            migrationBuilder.DropIndex(
                name: "IX_MATERIALSUPPLIER_WardId",
                table: "MATERIALSUPPLIER");

            migrationBuilder.DropIndex(
                name: "IX_EMPLOYEE_DistrictId",
                table: "EMPLOYEE");

            migrationBuilder.DropIndex(
                name: "IX_EMPLOYEE_ProvinceId",
                table: "EMPLOYEE");

            migrationBuilder.DropIndex(
                name: "IX_EMPLOYEE_WardId",
                table: "EMPLOYEE");

            migrationBuilder.DropIndex(
                name: "IX_AGENCY_DistrictId",
                table: "AGENCY");

            migrationBuilder.DropIndex(
                name: "IX_AGENCY_ProvinceId",
                table: "AGENCY");

            migrationBuilder.DropIndex(
                name: "IX_AGENCY_WardId",
                table: "AGENCY");

            migrationBuilder.DropColumn(
                name: "DistrictId",
                table: "WAREHOUSE");

            migrationBuilder.DropColumn(
                name: "ProvinceId",
                table: "WAREHOUSE");

            migrationBuilder.DropColumn(
                name: "WardId",
                table: "WAREHOUSE");

            migrationBuilder.DropColumn(
                name: "DistrictId",
                table: "MATERIALSUPPLIER");

            migrationBuilder.DropColumn(
                name: "ProvinceId",
                table: "MATERIALSUPPLIER");

            migrationBuilder.DropColumn(
                name: "WardId",
                table: "MATERIALSUPPLIER");

            migrationBuilder.DropColumn(
                name: "TotalToText",
                table: "GOODSRECEIPT");

            migrationBuilder.DropColumn(
                name: "TotalToText",
                table: "GOODSISSUE");

            migrationBuilder.DropColumn(
                name: "DistrictId",
                table: "EMPLOYEE");

            migrationBuilder.DropColumn(
                name: "ProvinceId",
                table: "EMPLOYEE");

            migrationBuilder.DropColumn(
                name: "WardId",
                table: "EMPLOYEE");

            migrationBuilder.DropColumn(
                name: "DistrictId",
                table: "AGENCY");

            migrationBuilder.DropColumn(
                name: "ProvinceId",
                table: "AGENCY");

            migrationBuilder.DropColumn(
                name: "WardId",
                table: "AGENCY");

            migrationBuilder.UpdateData(
                table: "AGENCY",
                keyColumn: "Id",
                keyValue: "law",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 880, DateTimeKind.Unspecified).AddTicks(4079), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "AGENCY",
                keyColumn: "Id",
                keyValue: "sunshine",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 880, DateTimeKind.Unspecified).AddTicks(6405), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 881, DateTimeKind.Unspecified).AddTicks(5329), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 881, DateTimeKind.Unspecified).AddTicks(5955), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "3",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 881, DateTimeKind.Unspecified).AddTicks(5957), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "huhuhu",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 881, DateTimeKind.Unspecified).AddTicks(9709), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "parrot-smell",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 882, DateTimeKind.Unspecified).AddTicks(144), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "sugar-town",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 882, DateTimeKind.Unspecified).AddTicks(138), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "bankmiramram",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 882, DateTimeKind.Unspecified).AddTicks(6689), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 16, 0, 47, 29, 882, DateTimeKind.Local).AddTicks(6691) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "bonk",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 882, DateTimeKind.Unspecified).AddTicks(5302), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 16, 0, 47, 29, 882, DateTimeKind.Local).AddTicks(6153) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "dainam",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 882, DateTimeKind.Unspecified).AddTicks(6692), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 16, 0, 47, 29, 882, DateTimeKind.Local).AddTicks(6694) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaha",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 882, DateTimeKind.Unspecified).AddTicks(6312), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 16, 0, 47, 29, 882, DateTimeKind.Local).AddTicks(6567) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaharamram",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 882, DateTimeKind.Unspecified).AddTicks(6685), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 16, 0, 47, 29, 882, DateTimeKind.Local).AddTicks(6689) });

            migrationBuilder.UpdateData(
                table: "MATERIALSUPPLIER",
                keyColumn: "Id",
                keyValue: "bare",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 883, DateTimeKind.Unspecified).AddTicks(434), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "MATERIALSUPPLIER",
                keyColumn: "Id",
                keyValue: "cower",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 883, DateTimeKind.Unspecified).AddTicks(1738), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 883, DateTimeKind.Unspecified).AddTicks(4345), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 883, DateTimeKind.Unspecified).AddTicks(4529), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "3",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 883, DateTimeKind.Unspecified).AddTicks(4530), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "4",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 883, DateTimeKind.Unspecified).AddTicks(4531), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "5",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 883, DateTimeKind.Unspecified).AddTicks(4532), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "6",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 883, DateTimeKind.Unspecified).AddTicks(4536), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "7",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 883, DateTimeKind.Unspecified).AddTicks(4536), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "PRODUCT",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 883, DateTimeKind.Unspecified).AddTicks(8385), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "PRODUCT",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 883, DateTimeKind.Unspecified).AddTicks(9813), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "0193e2ce-ee41-7fcb-9b52-5bba105dc0bd",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 884, DateTimeKind.Unspecified).AddTicks(2527), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "123456789",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 884, DateTimeKind.Unspecified).AddTicks(3076), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "147894561230",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 884, DateTimeKind.Unspecified).AddTicks(3203), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "789456123",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 884, DateTimeKind.Unspecified).AddTicks(3202), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "987654321",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 884, DateTimeKind.Unspecified).AddTicks(3200), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "WAREHOUSE",
                keyColumn: "Id",
                keyValue: "basket",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 890, DateTimeKind.Unspecified).AddTicks(6104), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "WAREHOUSE",
                keyColumn: "Id",
                keyValue: "choi-da-time",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 15, 17, 47, 29, 890, DateTimeKind.Unspecified).AddTicks(5398), new TimeSpan(0, 0, 0, 0, 0)));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DistrictId",
                table: "WAREHOUSE",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "ProvinceId",
                table: "WAREHOUSE",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "WardId",
                table: "WAREHOUSE",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "DistrictId",
                table: "MATERIALSUPPLIER",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "ProvinceId",
                table: "MATERIALSUPPLIER",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "WardId",
                table: "MATERIALSUPPLIER",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "TotalToText",
                table: "GOODSRECEIPT",
                type: "varchar(1024)",
                maxLength: 1024,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "TotalToText",
                table: "GOODSISSUE",
                type: "varchar(1024)",
                maxLength: 1024,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "DistrictId",
                table: "EMPLOYEE",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "ProvinceId",
                table: "EMPLOYEE",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "WardId",
                table: "EMPLOYEE",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "DistrictId",
                table: "AGENCY",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "ProvinceId",
                table: "AGENCY",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "WardId",
                table: "AGENCY",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PROVINCE",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PROVINCE", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "DISTRICT",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProvinceId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DISTRICT", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DISTRICT_PROVINCE_ProvinceId",
                        column: x => x.ProvinceId,
                        principalTable: "PROVINCE",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "WARD",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DistrictId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WARD", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WARD_DISTRICT_DistrictId",
                        column: x => x.DistrictId,
                        principalTable: "DISTRICT",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "AGENCY",
                keyColumn: "Id",
                keyValue: "law",
                columns: new[] { "CreatedAt", "DistrictId", "ProvinceId", "WardId" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 643, DateTimeKind.Unspecified).AddTicks(3479), new TimeSpan(0, 0, 0, 0, 0)), "1", "1", "1" });

            migrationBuilder.UpdateData(
                table: "AGENCY",
                keyColumn: "Id",
                keyValue: "sunshine",
                columns: new[] { "CreatedAt", "DistrictId", "ProvinceId", "WardId" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 643, DateTimeKind.Unspecified).AddTicks(7860), new TimeSpan(0, 0, 0, 0, 0)), "1", "1", "1" });

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 644, DateTimeKind.Unspecified).AddTicks(7888), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 644, DateTimeKind.Unspecified).AddTicks(8425), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "3",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 644, DateTimeKind.Unspecified).AddTicks(8428), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "huhuhu",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 645, DateTimeKind.Unspecified).AddTicks(1731), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "parrot-smell",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 645, DateTimeKind.Unspecified).AddTicks(2126), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "sugar-town",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 645, DateTimeKind.Unspecified).AddTicks(2124), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "bankmiramram",
                columns: new[] { "CreatedAt", "DateHired", "DistrictId", "ProvinceId", "WardId" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 645, DateTimeKind.Unspecified).AddTicks(8974), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 12, 23, 49, 46, 645, DateTimeKind.Local).AddTicks(8977), "1", "1", "1" });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "bonk",
                columns: new[] { "CreatedAt", "DateHired", "DistrictId", "ProvinceId", "WardId" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 645, DateTimeKind.Unspecified).AddTicks(6972), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 12, 23, 49, 46, 645, DateTimeKind.Local).AddTicks(8325), "1", "1", "1" });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "dainam",
                columns: new[] { "CreatedAt", "DateHired", "DistrictId", "ProvinceId", "WardId" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 645, DateTimeKind.Unspecified).AddTicks(8977), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 12, 23, 49, 46, 645, DateTimeKind.Local).AddTicks(8979), "1", "1", "1" });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaha",
                columns: new[] { "CreatedAt", "DateHired", "DistrictId", "ProvinceId", "WardId" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 645, DateTimeKind.Unspecified).AddTicks(8486), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 12, 23, 49, 46, 645, DateTimeKind.Local).AddTicks(8818), "1", "1", "1" });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaharamram",
                columns: new[] { "CreatedAt", "DateHired", "DistrictId", "ProvinceId", "WardId" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 645, DateTimeKind.Unspecified).AddTicks(8962), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 12, 23, 49, 46, 645, DateTimeKind.Local).AddTicks(8973), "1", "1", "1" });

            migrationBuilder.UpdateData(
                table: "MATERIALSUPPLIER",
                keyColumn: "Id",
                keyValue: "bare",
                columns: new[] { "CreatedAt", "DistrictId", "ProvinceId", "WardId" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 646, DateTimeKind.Unspecified).AddTicks(2974), new TimeSpan(0, 0, 0, 0, 0)), "1", "1", "1" });

            migrationBuilder.UpdateData(
                table: "MATERIALSUPPLIER",
                keyColumn: "Id",
                keyValue: "cower",
                columns: new[] { "CreatedAt", "DistrictId", "ProvinceId", "WardId" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 646, DateTimeKind.Unspecified).AddTicks(4374), new TimeSpan(0, 0, 0, 0, 0)), "1", "1", "1" });

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 646, DateTimeKind.Unspecified).AddTicks(6675), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 646, DateTimeKind.Unspecified).AddTicks(6864), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "3",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 646, DateTimeKind.Unspecified).AddTicks(6866), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "4",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 646, DateTimeKind.Unspecified).AddTicks(6867), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "5",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 646, DateTimeKind.Unspecified).AddTicks(6868), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "6",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 646, DateTimeKind.Unspecified).AddTicks(6871), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "7",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 646, DateTimeKind.Unspecified).AddTicks(6872), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "PRODUCT",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 647, DateTimeKind.Unspecified).AddTicks(764), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "PRODUCT",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 647, DateTimeKind.Unspecified).AddTicks(1949), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "0193e2ce-ee41-7fcb-9b52-5bba105dc0bd",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 647, DateTimeKind.Unspecified).AddTicks(4763), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "123456789",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 647, DateTimeKind.Unspecified).AddTicks(5339), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "147894561230",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 647, DateTimeKind.Unspecified).AddTicks(5512), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "789456123",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 647, DateTimeKind.Unspecified).AddTicks(5510), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "987654321",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 647, DateTimeKind.Unspecified).AddTicks(5508), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "WAREHOUSE",
                keyColumn: "Id",
                keyValue: "basket",
                columns: new[] { "CreatedAt", "DistrictId", "ProvinceId", "WardId" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 655, DateTimeKind.Unspecified).AddTicks(2157), new TimeSpan(0, 0, 0, 0, 0)), "1", "1", "1" });

            migrationBuilder.UpdateData(
                table: "WAREHOUSE",
                keyColumn: "Id",
                keyValue: "choi-da-time",
                columns: new[] { "CreatedAt", "DistrictId", "ProvinceId", "WardId" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 12, 16, 49, 46, 655, DateTimeKind.Unspecified).AddTicks(1139), new TimeSpan(0, 0, 0, 0, 0)), "1", "1", "1" });

            migrationBuilder.CreateIndex(
                name: "IX_WAREHOUSE_DistrictId",
                table: "WAREHOUSE",
                column: "DistrictId");

            migrationBuilder.CreateIndex(
                name: "IX_WAREHOUSE_ProvinceId",
                table: "WAREHOUSE",
                column: "ProvinceId");

            migrationBuilder.CreateIndex(
                name: "IX_WAREHOUSE_WardId",
                table: "WAREHOUSE",
                column: "WardId");

            migrationBuilder.CreateIndex(
                name: "IX_MATERIALSUPPLIER_DistrictId",
                table: "MATERIALSUPPLIER",
                column: "DistrictId");

            migrationBuilder.CreateIndex(
                name: "IX_MATERIALSUPPLIER_ProvinceId",
                table: "MATERIALSUPPLIER",
                column: "ProvinceId");

            migrationBuilder.CreateIndex(
                name: "IX_MATERIALSUPPLIER_WardId",
                table: "MATERIALSUPPLIER",
                column: "WardId");

            migrationBuilder.CreateIndex(
                name: "IX_EMPLOYEE_DistrictId",
                table: "EMPLOYEE",
                column: "DistrictId");

            migrationBuilder.CreateIndex(
                name: "IX_EMPLOYEE_ProvinceId",
                table: "EMPLOYEE",
                column: "ProvinceId");

            migrationBuilder.CreateIndex(
                name: "IX_EMPLOYEE_WardId",
                table: "EMPLOYEE",
                column: "WardId");

            migrationBuilder.CreateIndex(
                name: "IX_AGENCY_DistrictId",
                table: "AGENCY",
                column: "DistrictId");

            migrationBuilder.CreateIndex(
                name: "IX_AGENCY_ProvinceId",
                table: "AGENCY",
                column: "ProvinceId");

            migrationBuilder.CreateIndex(
                name: "IX_AGENCY_WardId",
                table: "AGENCY",
                column: "WardId");

            migrationBuilder.CreateIndex(
                name: "IX_DISTRICT_Name",
                table: "DISTRICT",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_DISTRICT_ProvinceId",
                table: "DISTRICT",
                column: "ProvinceId");

            migrationBuilder.CreateIndex(
                name: "IX_PROVINCE_Name",
                table: "PROVINCE",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_WARD_DistrictId",
                table: "WARD",
                column: "DistrictId");

            migrationBuilder.CreateIndex(
                name: "IX_WARD_Name",
                table: "WARD",
                column: "Name");

            migrationBuilder.AddForeignKey(
                name: "FK_AGENCY_DISTRICT_DistrictId",
                table: "AGENCY",
                column: "DistrictId",
                principalTable: "DISTRICT",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AGENCY_PROVINCE_ProvinceId",
                table: "AGENCY",
                column: "ProvinceId",
                principalTable: "PROVINCE",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AGENCY_WARD_WardId",
                table: "AGENCY",
                column: "WardId",
                principalTable: "WARD",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_EMPLOYEE_DISTRICT_DistrictId",
                table: "EMPLOYEE",
                column: "DistrictId",
                principalTable: "DISTRICT",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_EMPLOYEE_PROVINCE_ProvinceId",
                table: "EMPLOYEE",
                column: "ProvinceId",
                principalTable: "PROVINCE",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_EMPLOYEE_WARD_WardId",
                table: "EMPLOYEE",
                column: "WardId",
                principalTable: "WARD",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MATERIALSUPPLIER_DISTRICT_DistrictId",
                table: "MATERIALSUPPLIER",
                column: "DistrictId",
                principalTable: "DISTRICT",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MATERIALSUPPLIER_PROVINCE_ProvinceId",
                table: "MATERIALSUPPLIER",
                column: "ProvinceId",
                principalTable: "PROVINCE",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MATERIALSUPPLIER_WARD_WardId",
                table: "MATERIALSUPPLIER",
                column: "WardId",
                principalTable: "WARD",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WAREHOUSE_DISTRICT_DistrictId",
                table: "WAREHOUSE",
                column: "DistrictId",
                principalTable: "DISTRICT",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

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
        }
    }
}
