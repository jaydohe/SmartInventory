using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class WarehouseId_Forecast : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "WarehouseId",
                table: "FORECAST",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "AGENCY",
                keyColumn: "Id",
                keyValue: "law",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 90, DateTimeKind.Unspecified).AddTicks(1423), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "AGENCY",
                keyColumn: "Id",
                keyValue: "sunshine",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 90, DateTimeKind.Unspecified).AddTicks(5540), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 91, DateTimeKind.Unspecified).AddTicks(6137), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 91, DateTimeKind.Unspecified).AddTicks(6593), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "3",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 91, DateTimeKind.Unspecified).AddTicks(6595), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "huhuhu",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 92, DateTimeKind.Unspecified).AddTicks(67), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "parrot-smell",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 92, DateTimeKind.Unspecified).AddTicks(389), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "sugar-town",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 92, DateTimeKind.Unspecified).AddTicks(388), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "bankmiramram",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 92, DateTimeKind.Unspecified).AddTicks(6567), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 22, 6, 10, 45, 92, DateTimeKind.Local).AddTicks(6569) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "bonk",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 92, DateTimeKind.Unspecified).AddTicks(5098), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 22, 6, 10, 45, 92, DateTimeKind.Local).AddTicks(5949) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "dainam",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 92, DateTimeKind.Unspecified).AddTicks(6569), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 22, 6, 10, 45, 92, DateTimeKind.Local).AddTicks(6571) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaha",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 92, DateTimeKind.Unspecified).AddTicks(6106), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 22, 6, 10, 45, 92, DateTimeKind.Local).AddTicks(6431) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaharamram",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 92, DateTimeKind.Unspecified).AddTicks(6563), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 22, 6, 10, 45, 92, DateTimeKind.Local).AddTicks(6566) });

            migrationBuilder.UpdateData(
                table: "MATERIALSUPPLIER",
                keyColumn: "Id",
                keyValue: "bare",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 93, DateTimeKind.Unspecified).AddTicks(442), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "MATERIALSUPPLIER",
                keyColumn: "Id",
                keyValue: "cower",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 93, DateTimeKind.Unspecified).AddTicks(1578), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 93, DateTimeKind.Unspecified).AddTicks(4004), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 93, DateTimeKind.Unspecified).AddTicks(4196), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "3",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 93, DateTimeKind.Unspecified).AddTicks(4197), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "4",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 93, DateTimeKind.Unspecified).AddTicks(4198), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "5",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 93, DateTimeKind.Unspecified).AddTicks(4199), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "6",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 93, DateTimeKind.Unspecified).AddTicks(4202), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "7",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 93, DateTimeKind.Unspecified).AddTicks(4203), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "PRODUCT",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 93, DateTimeKind.Unspecified).AddTicks(8113), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "PRODUCT",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 93, DateTimeKind.Unspecified).AddTicks(9452), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "0193e2ce-ee41-7fcb-9b52-5bba105dc0bd",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 94, DateTimeKind.Unspecified).AddTicks(2162), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "123456789",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 94, DateTimeKind.Unspecified).AddTicks(2709), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "147894561230",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 94, DateTimeKind.Unspecified).AddTicks(2842), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "789456123",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 94, DateTimeKind.Unspecified).AddTicks(2841), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "987654321",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 94, DateTimeKind.Unspecified).AddTicks(2839), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "WAREHOUSE",
                keyColumn: "Id",
                keyValue: "basket",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 101, DateTimeKind.Unspecified).AddTicks(6), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "WAREHOUSE",
                keyColumn: "Id",
                keyValue: "choi-da-time",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 21, 23, 10, 45, 100, DateTimeKind.Unspecified).AddTicks(9255), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.CreateIndex(
                name: "IX_FORECAST_WarehouseId",
                table: "FORECAST",
                column: "WarehouseId");

            migrationBuilder.AddForeignKey(
                name: "FK_FORECAST_WAREHOUSE_WarehouseId",
                table: "FORECAST",
                column: "WarehouseId",
                principalTable: "WAREHOUSE",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FORECAST_WAREHOUSE_WarehouseId",
                table: "FORECAST");

            migrationBuilder.DropIndex(
                name: "IX_FORECAST_WarehouseId",
                table: "FORECAST");

            migrationBuilder.DropColumn(
                name: "WarehouseId",
                table: "FORECAST");

            migrationBuilder.UpdateData(
                table: "AGENCY",
                keyColumn: "Id",
                keyValue: "law",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 187, DateTimeKind.Unspecified).AddTicks(3425), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "AGENCY",
                keyColumn: "Id",
                keyValue: "sunshine",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 187, DateTimeKind.Unspecified).AddTicks(5831), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 188, DateTimeKind.Unspecified).AddTicks(5299), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 188, DateTimeKind.Unspecified).AddTicks(5775), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "CATEGORY",
                keyColumn: "Id",
                keyValue: "3",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 188, DateTimeKind.Unspecified).AddTicks(5777), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "huhuhu",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 188, DateTimeKind.Unspecified).AddTicks(9389), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "parrot-smell",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 188, DateTimeKind.Unspecified).AddTicks(9720), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "DEPARTMENT",
                keyColumn: "Id",
                keyValue: "sugar-town",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 188, DateTimeKind.Unspecified).AddTicks(9718), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "bankmiramram",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 189, DateTimeKind.Unspecified).AddTicks(5984), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 19, 14, 22, 43, 189, DateTimeKind.Local).AddTicks(5986) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "bonk",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 189, DateTimeKind.Unspecified).AddTicks(4411), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 19, 14, 22, 43, 189, DateTimeKind.Local).AddTicks(5392) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "dainam",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 189, DateTimeKind.Unspecified).AddTicks(5987), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 19, 14, 22, 43, 189, DateTimeKind.Local).AddTicks(5988) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaha",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 189, DateTimeKind.Unspecified).AddTicks(5580), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 19, 14, 22, 43, 189, DateTimeKind.Local).AddTicks(5856) });

            migrationBuilder.UpdateData(
                table: "EMPLOYEE",
                keyColumn: "Id",
                keyValue: "hihihaharamram",
                columns: new[] { "CreatedAt", "DateHired" },
                values: new object[] { new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 189, DateTimeKind.Unspecified).AddTicks(5980), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 19, 14, 22, 43, 189, DateTimeKind.Local).AddTicks(5983) });

            migrationBuilder.UpdateData(
                table: "MATERIALSUPPLIER",
                keyColumn: "Id",
                keyValue: "bare",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 189, DateTimeKind.Unspecified).AddTicks(9767), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "MATERIALSUPPLIER",
                keyColumn: "Id",
                keyValue: "cower",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 190, DateTimeKind.Unspecified).AddTicks(895), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 190, DateTimeKind.Unspecified).AddTicks(3196), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 190, DateTimeKind.Unspecified).AddTicks(3391), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "3",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 190, DateTimeKind.Unspecified).AddTicks(3393), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "4",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 190, DateTimeKind.Unspecified).AddTicks(3394), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "5",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 190, DateTimeKind.Unspecified).AddTicks(3395), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "6",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 190, DateTimeKind.Unspecified).AddTicks(3398), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "POSITION",
                keyColumn: "Id",
                keyValue: "7",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 190, DateTimeKind.Unspecified).AddTicks(3398), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "PRODUCT",
                keyColumn: "Id",
                keyValue: "1",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 190, DateTimeKind.Unspecified).AddTicks(7323), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "PRODUCT",
                keyColumn: "Id",
                keyValue: "2",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 190, DateTimeKind.Unspecified).AddTicks(8547), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "0193e2ce-ee41-7fcb-9b52-5bba105dc0bd",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 191, DateTimeKind.Unspecified).AddTicks(1206), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "123456789",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 191, DateTimeKind.Unspecified).AddTicks(1751), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "147894561230",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 191, DateTimeKind.Unspecified).AddTicks(1885), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "789456123",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 191, DateTimeKind.Unspecified).AddTicks(1884), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "USER",
                keyColumn: "Id",
                keyValue: "987654321",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 191, DateTimeKind.Unspecified).AddTicks(1882), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "WAREHOUSE",
                keyColumn: "Id",
                keyValue: "basket",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 197, DateTimeKind.Unspecified).AddTicks(6718), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.UpdateData(
                table: "WAREHOUSE",
                keyColumn: "Id",
                keyValue: "choi-da-time",
                column: "CreatedAt",
                value: new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 197, DateTimeKind.Unspecified).AddTicks(5872), new TimeSpan(0, 0, 0, 0, 0)));
        }
    }
}
