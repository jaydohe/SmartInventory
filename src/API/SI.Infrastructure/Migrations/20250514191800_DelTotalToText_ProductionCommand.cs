using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class DelTotalToText_ProductionCommand : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalToText",
                table: "PRODUCTIONCOMMAND");

            migrationBuilder.UpdateData(
                table: "AGENCY",
                keyColumn: "Id",
                keyValue: "law",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 631, DateTimeKind.Unspecified).AddTicks(9446), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "AGENCY",
                keyColumn: "Id",
                keyValue: "sunshine",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 632, DateTimeKind.Unspecified).AddTicks(2338), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 633, DateTimeKind.Unspecified).AddTicks(1380), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 633, DateTimeKind.Unspecified).AddTicks(1949), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "3",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 633, DateTimeKind.Unspecified).AddTicks(1951), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "huhuhu",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 633, DateTimeKind.Unspecified).AddTicks(5468), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "parrot-smell",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 633, DateTimeKind.Unspecified).AddTicks(5807), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "sugar-town",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 633, DateTimeKind.Unspecified).AddTicks(5805), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "bankmiramram",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 634, DateTimeKind.Unspecified).AddTicks(2618), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 15, 2, 17, 59, 634, DateTimeKind.Local).AddTicks(2620) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "bonk",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 634, DateTimeKind.Unspecified).AddTicks(759), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 15, 2, 17, 59, 634, DateTimeKind.Local).AddTicks(2057) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "dainam",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 634, DateTimeKind.Unspecified).AddTicks(2620), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 15, 2, 17, 59, 634, DateTimeKind.Local).AddTicks(2622) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaha",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 634, DateTimeKind.Unspecified).AddTicks(2225), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 15, 2, 17, 59, 634, DateTimeKind.Local).AddTicks(2487) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaharamram",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 634, DateTimeKind.Unspecified).AddTicks(2613), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 15, 2, 17, 59, 634, DateTimeKind.Local).AddTicks(2616) });

            migrationBuilder.UpdateData(
                table: "MATERIALSUPPLIER",
                keyColumn: "Id",
                keyValue: "bare",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 634, DateTimeKind.Unspecified).AddTicks(6875), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "MATERIALSUPPLIER",
                keyColumn: "Id",
                keyValue: "cower",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 634, DateTimeKind.Unspecified).AddTicks(8354), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 635, DateTimeKind.Unspecified).AddTicks(681), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 635, DateTimeKind.Unspecified).AddTicks(870), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "3",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 635, DateTimeKind.Unspecified).AddTicks(871), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "4",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 635, DateTimeKind.Unspecified).AddTicks(872), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "5",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 635, DateTimeKind.Unspecified).AddTicks(873), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "6",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 635, DateTimeKind.Unspecified).AddTicks(876), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "7",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 635, DateTimeKind.Unspecified).AddTicks(877), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "PRODUCT",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 635, DateTimeKind.Unspecified).AddTicks(4907), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "PRODUCT",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 635, DateTimeKind.Unspecified).AddTicks(6191), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "0193e2ce-ee41-7fcb-9b52-5bba105dc0bd",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 635, DateTimeKind.Unspecified).AddTicks(9020), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "123456789",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 635, DateTimeKind.Unspecified).AddTicks(9589), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "147894561230",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 635, DateTimeKind.Unspecified).AddTicks(9722), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "789456123",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 635, DateTimeKind.Unspecified).AddTicks(9721), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "987654321",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 635, DateTimeKind.Unspecified).AddTicks(9719), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "WAREHOUSE",
                keyColumn: "Id",
                keyValue: "basket",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 643, DateTimeKind.Unspecified).AddTicks(1152), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "WAREHOUSE",
                keyColumn: "Id",
                keyValue: "choi-da-time",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 19, 17, 59, 643, DateTimeKind.Unspecified).AddTicks(52), new TimeSpan(0, 0, 0, 0, 0)));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TotalToText",
                table: "PRODUCTIONCOMMAND",
                type: "varchar(1024)",
                maxLength: 1024,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "AGENCY",
                keyColumn: "Id",
                keyValue: "law",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 18, DateTimeKind.Unspecified).AddTicks(486), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "AGENCY",
                keyColumn: "Id",
                keyValue: "sunshine",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 18, DateTimeKind.Unspecified).AddTicks(4996), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 19, DateTimeKind.Unspecified).AddTicks(5267), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 19, DateTimeKind.Unspecified).AddTicks(5804), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "3",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 19, DateTimeKind.Unspecified).AddTicks(5807), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "huhuhu",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 19, DateTimeKind.Unspecified).AddTicks(9306), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "parrot-smell",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 19, DateTimeKind.Unspecified).AddTicks(9630), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "sugar-town",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 19, DateTimeKind.Unspecified).AddTicks(9628), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "bankmiramram",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 20, DateTimeKind.Unspecified).AddTicks(6315), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 15, 1, 55, 24, 20, DateTimeKind.Local).AddTicks(6318) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "bonk",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 20, DateTimeKind.Unspecified).AddTicks(4517), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 15, 1, 55, 24, 20, DateTimeKind.Local).AddTicks(5771) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "dainam",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 20, DateTimeKind.Unspecified).AddTicks(6318), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 15, 1, 55, 24, 20, DateTimeKind.Local).AddTicks(6320) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaha",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 20, DateTimeKind.Unspecified).AddTicks(5933), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 15, 1, 55, 24, 20, DateTimeKind.Local).AddTicks(6189) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaharamram",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 20, DateTimeKind.Unspecified).AddTicks(6310), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 15, 1, 55, 24, 20, DateTimeKind.Local).AddTicks(6314) });

            migrationBuilder.UpdateData(
                table: "MATERIALSUPPLIER",
                keyColumn: "Id",
                keyValue: "bare",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 21, DateTimeKind.Unspecified).AddTicks(490), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "MATERIALSUPPLIER",
                keyColumn: "Id",
                keyValue: "cower",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 21, DateTimeKind.Unspecified).AddTicks(2009), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 21, DateTimeKind.Unspecified).AddTicks(4289), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 21, DateTimeKind.Unspecified).AddTicks(4476), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "3",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 21, DateTimeKind.Unspecified).AddTicks(4478), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "4",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 21, DateTimeKind.Unspecified).AddTicks(4479), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "5",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 21, DateTimeKind.Unspecified).AddTicks(4480), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "6",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 21, DateTimeKind.Unspecified).AddTicks(4483), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "7",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 21, DateTimeKind.Unspecified).AddTicks(4484), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "PRODUCT",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 21, DateTimeKind.Unspecified).AddTicks(8293), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "PRODUCT",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 21, DateTimeKind.Unspecified).AddTicks(9480), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "0193e2ce-ee41-7fcb-9b52-5bba105dc0bd",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 22, DateTimeKind.Unspecified).AddTicks(2485), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "123456789",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 22, DateTimeKind.Unspecified).AddTicks(3011), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "147894561230",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 22, DateTimeKind.Unspecified).AddTicks(3140), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "789456123",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 22, DateTimeKind.Unspecified).AddTicks(3138), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "987654321",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 22, DateTimeKind.Unspecified).AddTicks(3136), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "WAREHOUSE",
                keyColumn: "Id",
                keyValue: "basket",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 29, DateTimeKind.Unspecified).AddTicks(7514), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "WAREHOUSE",
                keyColumn: "Id",
                keyValue: "choi-da-time",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 14, 18, 55, 24, 29, DateTimeKind.Unspecified).AddTicks(6370), new TimeSpan(0, 0, 0, 0, 0)));
        }
    }
}
