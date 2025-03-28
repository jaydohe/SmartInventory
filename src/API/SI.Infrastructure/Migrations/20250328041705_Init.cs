using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ACTIVITY",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Content = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TargetId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    WarehouseId = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DepartmentId = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EntityType = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ContentType = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ACTIVITY", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "NOTIFICATION",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TargetId = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Type = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Content = table.Column<string>(type: "varchar(2048)", maxLength: 2048, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Title = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsMarked = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NOTIFICATION", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PROVINCE",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PROVINCE", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "SETUP",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ZScore = table.Column<double>(type: "double", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SETUP", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "DISTRICT",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProvinceId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
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
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DistrictId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
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

            migrationBuilder.CreateTable(
                name: "AGENCY",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    WardId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DistrictId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProvinceId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Address = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TaxCode = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CurrentDebt = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AGENCY", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AGENCY_DISTRICT_DistrictId",
                        column: x => x.DistrictId,
                        principalTable: "DISTRICT",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AGENCY_PROVINCE_ProvinceId",
                        column: x => x.ProvinceId,
                        principalTable: "PROVINCE",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AGENCY_WARD_WardId",
                        column: x => x.WardId,
                        principalTable: "WARD",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MATERIALSUPPLIER",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    WardId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DistrictId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProvinceId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Address = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MATERIALSUPPLIER", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MATERIALSUPPLIER_DISTRICT_DistrictId",
                        column: x => x.DistrictId,
                        principalTable: "DISTRICT",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MATERIALSUPPLIER_PROVINCE_ProvinceId",
                        column: x => x.ProvinceId,
                        principalTable: "PROVINCE",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MATERIALSUPPLIER_WARD_WardId",
                        column: x => x.WardId,
                        principalTable: "WARD",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ORDER",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AgencyId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TotalAmount = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    OrderStatus = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ORDER", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ORDER_AGENCY_AgencyId",
                        column: x => x.AgencyId,
                        principalTable: "AGENCY",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PRODUCT",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MaterialSupplierId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Code = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Unit = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    ProductionCost = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    HoldingCost = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PRODUCT", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PRODUCT_MATERIALSUPPLIER_MaterialSupplierId",
                        column: x => x.MaterialSupplierId,
                        principalTable: "MATERIALSUPPLIER",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "FORECAST",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProductId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Method = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Period = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EOQ = table.Column<double>(type: "double", nullable: false),
                    SafetyStock = table.Column<double>(type: "double", nullable: false),
                    OptimalInventory = table.Column<double>(type: "double", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FORECAST", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FORECAST_PRODUCT_ProductId",
                        column: x => x.ProductId,
                        principalTable: "PRODUCT",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "INVENTORYTRANSACTION",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ReferenceId = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProductId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_INVENTORYTRANSACTION", x => x.Id);
                    table.ForeignKey(
                        name: "FK_INVENTORYTRANSACTION_PRODUCT_ProductId",
                        column: x => x.ProductId,
                        principalTable: "PRODUCT",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ORDERDETAIL",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    OrderId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProductId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ORDERDETAIL", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ORDERDETAIL_ORDER_OrderId",
                        column: x => x.OrderId,
                        principalTable: "ORDER",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ORDERDETAIL_PRODUCT_ProductId",
                        column: x => x.ProductId,
                        principalTable: "PRODUCT",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "DEPARTMENT",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    WarehouseId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DEPARTMENT", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EMPLOYEE",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DepartmentId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    WardId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DistrictId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProvinceId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Address = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Position = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DateHired = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EMPLOYEE", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EMPLOYEE_DEPARTMENT_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "DEPARTMENT",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EMPLOYEE_DISTRICT_DistrictId",
                        column: x => x.DistrictId,
                        principalTable: "DISTRICT",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EMPLOYEE_PROVINCE_ProvinceId",
                        column: x => x.ProvinceId,
                        principalTable: "PROVINCE",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EMPLOYEE_WARD_WardId",
                        column: x => x.WardId,
                        principalTable: "WARD",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "WAREHOUSE",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    WarehouseId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EmployeeId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    WardId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DistrictId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProvinceId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Address = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Capacity = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WAREHOUSE", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WAREHOUSE_DISTRICT_DistrictId",
                        column: x => x.DistrictId,
                        principalTable: "DISTRICT",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WAREHOUSE_EMPLOYEE_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "EMPLOYEE",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_WAREHOUSE_PROVINCE_ProvinceId",
                        column: x => x.ProvinceId,
                        principalTable: "PROVINCE",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WAREHOUSE_WARD_WardId",
                        column: x => x.WardId,
                        principalTable: "WARD",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WAREHOUSE_WAREHOUSE_WarehouseId",
                        column: x => x.WarehouseId,
                        principalTable: "WAREHOUSE",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "INVENTORY",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProductId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    WarehouseId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_INVENTORY", x => x.Id);
                    table.ForeignKey(
                        name: "FK_INVENTORY_PRODUCT_ProductId",
                        column: x => x.ProductId,
                        principalTable: "PRODUCT",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_INVENTORY_WAREHOUSE_WarehouseId",
                        column: x => x.WarehouseId,
                        principalTable: "WAREHOUSE",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "USER",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DepartmentId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    WarehouseId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LoginName = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    HashPassword = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsLogin = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_USER", x => x.Id);
                    table.ForeignKey(
                        name: "FK_USER_DEPARTMENT_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "DEPARTMENT",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_USER_WAREHOUSE_WarehouseId",
                        column: x => x.WarehouseId,
                        principalTable: "WAREHOUSE",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "GOODSISSUE",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    WarehouseId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AgencyId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Code = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TotalAmount = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    TotalToText = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Note = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GOODSISSUE", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GOODSISSUE_AGENCY_AgencyId",
                        column: x => x.AgencyId,
                        principalTable: "AGENCY",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_GOODSISSUE_USER_UserId",
                        column: x => x.UserId,
                        principalTable: "USER",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_GOODSISSUE_WAREHOUSE_WarehouseId",
                        column: x => x.WarehouseId,
                        principalTable: "WAREHOUSE",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PRODUCTIONCOMMAND",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AgencyId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TotalAmount = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    TotalToText = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Status = table.Column<int>(type: "int", nullable: false),
                    PlannedStart = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    PlannedEnd = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PRODUCTIONCOMMAND", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PRODUCTIONCOMMAND_AGENCY_AgencyId",
                        column: x => x.AgencyId,
                        principalTable: "AGENCY",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PRODUCTIONCOMMAND_USER_UserId",
                        column: x => x.UserId,
                        principalTable: "USER",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "TOKENSTORE",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AccessToken = table.Column<string>(type: "varchar(2048)", maxLength: 2048, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RefreshToken = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsBlocked = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IpAddress = table.Column<string>(type: "varchar(128)", maxLength: 128, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    OSPlatform = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Browser = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ExpiredAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TOKENSTORE", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TOKENSTORE_USER_UserId",
                        column: x => x.UserId,
                        principalTable: "USER",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "GOODSISSUEDETAIL",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    GoodsIssueId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProductId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    QuantityRequested = table.Column<int>(type: "int", nullable: false),
                    QuantityIssued = table.Column<int>(type: "int", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GOODSISSUEDETAIL", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GOODSISSUEDETAIL_GOODSISSUE_GoodsIssueId",
                        column: x => x.GoodsIssueId,
                        principalTable: "GOODSISSUE",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_GOODSISSUEDETAIL_PRODUCT_ProductId",
                        column: x => x.ProductId,
                        principalTable: "PRODUCT",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "GOODSRECEIPT",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProductionCommandId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MaterialSupplierId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    WarehouseId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Code = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ShipperName = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TotalAmount = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    TotalToText = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Note = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GOODSRECEIPT", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GOODSRECEIPT_MATERIALSUPPLIER_MaterialSupplierId",
                        column: x => x.MaterialSupplierId,
                        principalTable: "MATERIALSUPPLIER",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_GOODSRECEIPT_PRODUCTIONCOMMAND_ProductionCommandId",
                        column: x => x.ProductionCommandId,
                        principalTable: "PRODUCTIONCOMMAND",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_GOODSRECEIPT_USER_UserId",
                        column: x => x.UserId,
                        principalTable: "USER",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_GOODSRECEIPT_WAREHOUSE_WarehouseId",
                        column: x => x.WarehouseId,
                        principalTable: "WAREHOUSE",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PRODUCTIONCOMMANDDETAIL",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProductionCommandId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProductId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PRODUCTIONCOMMANDDETAIL", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PRODUCTIONCOMMANDDETAIL_PRODUCTIONCOMMAND_ProductionCommandId",
                        column: x => x.ProductionCommandId,
                        principalTable: "PRODUCTIONCOMMAND",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PRODUCTIONCOMMANDDETAIL_PRODUCT_ProductId",
                        column: x => x.ProductId,
                        principalTable: "PRODUCT",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PRODUCTIONCOMMANDPROCESS",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProductionCommandId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Percentage = table.Column<double>(type: "double", nullable: false),
                    Note = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Status = table.Column<int>(type: "int", nullable: false),
                    ActualStart = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    ActualEnd = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PRODUCTIONCOMMANDPROCESS", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PRODUCTIONCOMMANDPROCESS_PRODUCTIONCOMMAND_ProductionCommand~",
                        column: x => x.ProductionCommandId,
                        principalTable: "PRODUCTIONCOMMAND",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "GOODSRECEIPTDETAIL",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    GoodsReceiptId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProductId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    QuantityOrdered = table.Column<int>(type: "int", nullable: false),
                    QuantityReceived = table.Column<int>(type: "int", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GOODSRECEIPTDETAIL", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GOODSRECEIPTDETAIL_GOODSRECEIPT_GoodsReceiptId",
                        column: x => x.GoodsReceiptId,
                        principalTable: "GOODSRECEIPT",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_GOODSRECEIPTDETAIL_PRODUCT_ProductId",
                        column: x => x.ProductId,
                        principalTable: "PRODUCT",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_ACTIVITY_TargetId",
                table: "ACTIVITY",
                column: "TargetId");

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
                name: "IX_DEPARTMENT_WarehouseId",
                table: "DEPARTMENT",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_DISTRICT_Name",
                table: "DISTRICT",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_DISTRICT_ProvinceId",
                table: "DISTRICT",
                column: "ProvinceId");

            migrationBuilder.CreateIndex(
                name: "IX_EMPLOYEE_DepartmentId",
                table: "EMPLOYEE",
                column: "DepartmentId");

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
                name: "IX_FORECAST_ProductId",
                table: "FORECAST",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_GOODSISSUE_AgencyId",
                table: "GOODSISSUE",
                column: "AgencyId");

            migrationBuilder.CreateIndex(
                name: "IX_GOODSISSUE_UserId",
                table: "GOODSISSUE",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_GOODSISSUE_WarehouseId",
                table: "GOODSISSUE",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_GOODSISSUEDETAIL_GoodsIssueId",
                table: "GOODSISSUEDETAIL",
                column: "GoodsIssueId");

            migrationBuilder.CreateIndex(
                name: "IX_GOODSISSUEDETAIL_ProductId",
                table: "GOODSISSUEDETAIL",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_GOODSRECEIPT_MaterialSupplierId",
                table: "GOODSRECEIPT",
                column: "MaterialSupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_GOODSRECEIPT_ProductionCommandId",
                table: "GOODSRECEIPT",
                column: "ProductionCommandId");

            migrationBuilder.CreateIndex(
                name: "IX_GOODSRECEIPT_UserId",
                table: "GOODSRECEIPT",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_GOODSRECEIPT_WarehouseId",
                table: "GOODSRECEIPT",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_GOODSRECEIPTDETAIL_GoodsReceiptId",
                table: "GOODSRECEIPTDETAIL",
                column: "GoodsReceiptId");

            migrationBuilder.CreateIndex(
                name: "IX_GOODSRECEIPTDETAIL_ProductId",
                table: "GOODSRECEIPTDETAIL",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_INVENTORY_ProductId",
                table: "INVENTORY",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_INVENTORY_WarehouseId",
                table: "INVENTORY",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_INVENTORYTRANSACTION_ProductId",
                table: "INVENTORYTRANSACTION",
                column: "ProductId");

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
                name: "IX_ORDER_AgencyId",
                table: "ORDER",
                column: "AgencyId");

            migrationBuilder.CreateIndex(
                name: "IX_ORDERDETAIL_OrderId",
                table: "ORDERDETAIL",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_ORDERDETAIL_ProductId",
                table: "ORDERDETAIL",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_PRODUCT_MaterialSupplierId",
                table: "PRODUCT",
                column: "MaterialSupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_PRODUCTIONCOMMAND_AgencyId",
                table: "PRODUCTIONCOMMAND",
                column: "AgencyId");

            migrationBuilder.CreateIndex(
                name: "IX_PRODUCTIONCOMMAND_UserId",
                table: "PRODUCTIONCOMMAND",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PRODUCTIONCOMMANDDETAIL_ProductId",
                table: "PRODUCTIONCOMMANDDETAIL",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_PRODUCTIONCOMMANDDETAIL_ProductionCommandId",
                table: "PRODUCTIONCOMMANDDETAIL",
                column: "ProductionCommandId");

            migrationBuilder.CreateIndex(
                name: "IX_PRODUCTIONCOMMANDPROCESS_ProductionCommandId",
                table: "PRODUCTIONCOMMANDPROCESS",
                column: "ProductionCommandId");

            migrationBuilder.CreateIndex(
                name: "IX_PROVINCE_Name",
                table: "PROVINCE",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_TOKENSTORE_UserId",
                table: "TOKENSTORE",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_USER_DepartmentId",
                table: "USER",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_USER_WarehouseId",
                table: "USER",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_WARD_DistrictId",
                table: "WARD",
                column: "DistrictId");

            migrationBuilder.CreateIndex(
                name: "IX_WARD_Name",
                table: "WARD",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_WAREHOUSE_DistrictId",
                table: "WAREHOUSE",
                column: "DistrictId");

            migrationBuilder.CreateIndex(
                name: "IX_WAREHOUSE_EmployeeId",
                table: "WAREHOUSE",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_WAREHOUSE_ProvinceId",
                table: "WAREHOUSE",
                column: "ProvinceId");

            migrationBuilder.CreateIndex(
                name: "IX_WAREHOUSE_WardId",
                table: "WAREHOUSE",
                column: "WardId");

            migrationBuilder.CreateIndex(
                name: "IX_WAREHOUSE_WarehouseId",
                table: "WAREHOUSE",
                column: "WarehouseId");

            migrationBuilder.AddForeignKey(
                name: "FK_DEPARTMENT_WAREHOUSE_WarehouseId",
                table: "DEPARTMENT",
                column: "WarehouseId",
                principalTable: "WAREHOUSE",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EMPLOYEE_DISTRICT_DistrictId",
                table: "EMPLOYEE");

            migrationBuilder.DropForeignKey(
                name: "FK_WARD_DISTRICT_DistrictId",
                table: "WARD");

            migrationBuilder.DropForeignKey(
                name: "FK_WAREHOUSE_DISTRICT_DistrictId",
                table: "WAREHOUSE");

            migrationBuilder.DropForeignKey(
                name: "FK_EMPLOYEE_PROVINCE_ProvinceId",
                table: "EMPLOYEE");

            migrationBuilder.DropForeignKey(
                name: "FK_WAREHOUSE_PROVINCE_ProvinceId",
                table: "WAREHOUSE");

            migrationBuilder.DropForeignKey(
                name: "FK_EMPLOYEE_WARD_WardId",
                table: "EMPLOYEE");

            migrationBuilder.DropForeignKey(
                name: "FK_WAREHOUSE_WARD_WardId",
                table: "WAREHOUSE");

            migrationBuilder.DropForeignKey(
                name: "FK_DEPARTMENT_WAREHOUSE_WarehouseId",
                table: "DEPARTMENT");

            migrationBuilder.DropTable(
                name: "ACTIVITY");

            migrationBuilder.DropTable(
                name: "FORECAST");

            migrationBuilder.DropTable(
                name: "GOODSISSUEDETAIL");

            migrationBuilder.DropTable(
                name: "GOODSRECEIPTDETAIL");

            migrationBuilder.DropTable(
                name: "INVENTORY");

            migrationBuilder.DropTable(
                name: "INVENTORYTRANSACTION");

            migrationBuilder.DropTable(
                name: "NOTIFICATION");

            migrationBuilder.DropTable(
                name: "ORDERDETAIL");

            migrationBuilder.DropTable(
                name: "PRODUCTIONCOMMANDDETAIL");

            migrationBuilder.DropTable(
                name: "PRODUCTIONCOMMANDPROCESS");

            migrationBuilder.DropTable(
                name: "SETUP");

            migrationBuilder.DropTable(
                name: "TOKENSTORE");

            migrationBuilder.DropTable(
                name: "GOODSISSUE");

            migrationBuilder.DropTable(
                name: "GOODSRECEIPT");

            migrationBuilder.DropTable(
                name: "ORDER");

            migrationBuilder.DropTable(
                name: "PRODUCT");

            migrationBuilder.DropTable(
                name: "PRODUCTIONCOMMAND");

            migrationBuilder.DropTable(
                name: "MATERIALSUPPLIER");

            migrationBuilder.DropTable(
                name: "AGENCY");

            migrationBuilder.DropTable(
                name: "USER");

            migrationBuilder.DropTable(
                name: "DISTRICT");

            migrationBuilder.DropTable(
                name: "PROVINCE");

            migrationBuilder.DropTable(
                name: "WARD");

            migrationBuilder.DropTable(
                name: "WAREHOUSE");

            migrationBuilder.DropTable(
                name: "EMPLOYEE");

            migrationBuilder.DropTable(
                name: "DEPARTMENT");
        }
    }
}
