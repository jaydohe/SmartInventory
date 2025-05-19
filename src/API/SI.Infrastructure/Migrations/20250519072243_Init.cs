using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

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
                name: "AGENCY",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Code = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Representative = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TaxCode = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Address = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CurrentDebt = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    Note = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AGENCY", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CATEGORY",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Code = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CategoryEntityType = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CATEGORY", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "DEPARTMENT",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Code = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
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
                name: "MATERIALSUPPLIER",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Code = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Representative = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TaxCode = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    BusinessItem = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Address = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CurrentDebt = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    Note = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MATERIALSUPPLIER", x => x.Id);
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
                name: "POSITION",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_POSITION", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "SETUP",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ZScore = table.Column<double>(type: "double", nullable: false),
                    MinStockLevel = table.Column<double>(type: "double", nullable: false),
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
                name: "PRODUCT",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MaterialSupplierId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CategoryId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Code = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Unit = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProductType = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PurchasePrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    SellingPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    HoldingCost = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PRODUCT", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PRODUCT_CATEGORY_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "CATEGORY",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PRODUCT_MATERIALSUPPLIER_MaterialSupplierId",
                        column: x => x.MaterialSupplierId,
                        principalTable: "MATERIALSUPPLIER",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "BILLOFMATERIAL",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProductId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Code = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BILLOFMATERIAL", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BILLOFMATERIAL_PRODUCT_ProductId",
                        column: x => x.ProductId,
                        principalTable: "PRODUCT",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                    ForecastValue = table.Column<double>(type: "double", nullable: true),
                    Method = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Period = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Level = table.Column<double>(type: "double", nullable: true),
                    Trend = table.Column<double>(type: "double", nullable: true),
                    Seasonal = table.Column<double>(type: "double", nullable: true),
                    LowerBound = table.Column<double>(type: "double", nullable: true),
                    UpperBound = table.Column<double>(type: "double", nullable: true),
                    ModelParameters = table.Column<string>(type: "json", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SeasonalityPeriod = table.Column<int>(type: "int", nullable: true),
                    EOQ = table.Column<double>(type: "double", nullable: true),
                    SafetyStock = table.Column<double>(type: "double", nullable: true),
                    OptimalInventory = table.Column<double>(type: "double", nullable: true),
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
                    TransactionType = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
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
                name: "BILLOFMATERIALDETAIL",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    BillOfMaterialId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MaterialId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Unit = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BILLOFMATERIALDETAIL", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BILLOFMATERIALDETAIL_BILLOFMATERIAL_BillOfMaterialId",
                        column: x => x.BillOfMaterialId,
                        principalTable: "BILLOFMATERIAL",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BILLOFMATERIALDETAIL_PRODUCT_MaterialId",
                        column: x => x.MaterialId,
                        principalTable: "PRODUCT",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EMPLOYEE",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DepartmentId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    WarehouseId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PositionId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Code = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    GenderType = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsManager = table.Column<bool>(type: "tinyint(1)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Address = table.Column<string>(type: "varchar(1024)", maxLength: 1024, nullable: false)
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
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EMPLOYEE_POSITION_PositionId",
                        column: x => x.PositionId,
                        principalTable: "POSITION",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "USER",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EmployeeId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Name = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LoginName = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    HashPassword = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsLogin = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    ModifiedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    DeletedOn = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_USER", x => x.Id);
                    table.ForeignKey(
                        name: "FK_USER_EMPLOYEE_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "EMPLOYEE",
                        principalColumn: "Id");
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
                    ManagerId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CategoryId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Code = table.Column<string>(type: "longtext", nullable: false)
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
                        name: "FK_WAREHOUSE_CATEGORY_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "CATEGORY",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_WAREHOUSE_EMPLOYEE_ManagerId",
                        column: x => x.ManagerId,
                        principalTable: "EMPLOYEE",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_WAREHOUSE_WAREHOUSE_WarehouseId",
                        column: x => x.WarehouseId,
                        principalTable: "WAREHOUSE",
                        principalColumn: "Id");
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
                    Code = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    VAT = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    Discount = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    TotalAmount = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    IsRefund = table.Column<bool>(type: "tinyint(1)", nullable: false),
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
                    table.ForeignKey(
                        name: "FK_ORDER_USER_UserId",
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
                    OrderId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Code = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TotalAmount = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
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
                        name: "FK_GOODSISSUE_ORDER_OrderId",
                        column: x => x.OrderId,
                        principalTable: "ORDER",
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
                name: "PRODUCTIONCOMMAND",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    OrderId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Code = table.Column<string>(type: "varchar(512)", maxLength: 512, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TotalAmount = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
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
                        name: "FK_PRODUCTIONCOMMAND_ORDER_OrderId",
                        column: x => x.OrderId,
                        principalTable: "ORDER",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PRODUCTIONCOMMAND_USER_UserId",
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
                    OrderId = table.Column<string>(type: "varchar(255)", nullable: true)
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
                        name: "FK_GOODSRECEIPT_ORDER_OrderId",
                        column: x => x.OrderId,
                        principalTable: "ORDER",
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

            migrationBuilder.InsertData(
                table: "AGENCY",
                columns: new[] { "Id", "Address", "Code", "CreatedAt", "CurrentDebt", "DeletedOn", "Email", "ModifiedOn", "Name", "Note", "PhoneNumber", "Representative", "TaxCode" },
                values: new object[,]
                {
                    { "law", "Hà Nội", "AGC001", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 187, DateTimeKind.Unspecified).AddTicks(3425), new TimeSpan(0, 0, 0, 0, 0)), 10000000m, null, "abc@gmail.com", null, "Công ty TNHH ABC", null, "5887798511", "Tuyến Quý Tuân Nguyen", "1234567890" },
                    { "sunshine", "Hà Nội", "AGC002", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 187, DateTimeKind.Unspecified).AddTicks(5831), new TimeSpan(0, 0, 0, 0, 0)), 20000000m, null, "xyz@gmail.com", null, "Công ty TNHH XYZ", null, "4975549838", "Sơn Nhung Ngải Phạm", "0987654321" }
                });

            migrationBuilder.InsertData(
                table: "CATEGORY",
                columns: new[] { "Id", "CategoryEntityType", "Code", "CreatedAt", "DeletedOn", "ModifiedOn", "Name" },
                values: new object[,]
                {
                    { "1", "WAREHOUSE", "CATW001", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 188, DateTimeKind.Unspecified).AddTicks(5299), new TimeSpan(0, 0, 0, 0, 0)), null, null, "Danh mục 1" },
                    { "2", "PRODUCT", "CATP002", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 188, DateTimeKind.Unspecified).AddTicks(5775), new TimeSpan(0, 0, 0, 0, 0)), null, null, "Danh mục 2" },
                    { "3", "WAREHOUSE", "CATW003", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 188, DateTimeKind.Unspecified).AddTicks(5777), new TimeSpan(0, 0, 0, 0, 0)), null, null, "Danh mục 3" }
                });

            migrationBuilder.InsertData(
                table: "DEPARTMENT",
                columns: new[] { "Id", "Code", "CreatedAt", "DeletedOn", "ModifiedOn", "Name" },
                values: new object[,]
                {
                    { "huhuhu", "DEPART001", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 188, DateTimeKind.Unspecified).AddTicks(9389), new TimeSpan(0, 0, 0, 0, 0)), null, null, "Bộ phận quản lý kho" },
                    { "parrot-smell", "DEPART003", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 188, DateTimeKind.Unspecified).AddTicks(9720), new TimeSpan(0, 0, 0, 0, 0)), null, null, "Bộ phận quản lý bán hàng" },
                    { "sugar-town", "DEPART002", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 188, DateTimeKind.Unspecified).AddTicks(9718), new TimeSpan(0, 0, 0, 0, 0)), null, null, "Bộ phận quản lý sản xuất" }
                });

            migrationBuilder.InsertData(
                table: "MATERIALSUPPLIER",
                columns: new[] { "Id", "Address", "BusinessItem", "Code", "CreatedAt", "CurrentDebt", "DeletedOn", "Email", "ModifiedOn", "Name", "Note", "PhoneNumber", "Representative", "TaxCode" },
                values: new object[,]
                {
                    { "bare", "Hà Nội", "Vật liệu xây dựng", "SUPPLIER001", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 189, DateTimeKind.Unspecified).AddTicks(9767), new TimeSpan(0, 0, 0, 0, 0)), 0m, null, "A@gmail.com", null, "Nhà cung cấp 1", null, "0123456789", "Nguyễn Văn A", "123456789" },
                    { "cower", "Hà Nội", "Vật liệu điện", "SUPPLIER002", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 190, DateTimeKind.Unspecified).AddTicks(895), new TimeSpan(0, 0, 0, 0, 0)), 0m, null, "B@gmail.com", null, "Nhà cung cấp 2", null, "0987654321", "Nguyễn Văn B", "8877955549" }
                });

            migrationBuilder.InsertData(
                table: "POSITION",
                columns: new[] { "Id", "CreatedAt", "DeletedOn", "ModifiedOn", "Name" },
                values: new object[,]
                {
                    { "1", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 190, DateTimeKind.Unspecified).AddTicks(3196), new TimeSpan(0, 0, 0, 0, 0)), null, null, "Giám đốc" },
                    { "2", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 190, DateTimeKind.Unspecified).AddTicks(3391), new TimeSpan(0, 0, 0, 0, 0)), null, null, "Phó giám đốc" },
                    { "3", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 190, DateTimeKind.Unspecified).AddTicks(3393), new TimeSpan(0, 0, 0, 0, 0)), null, null, "Trưởng phòng" },
                    { "4", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 190, DateTimeKind.Unspecified).AddTicks(3394), new TimeSpan(0, 0, 0, 0, 0)), null, null, "Quản lý kho" },
                    { "5", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 190, DateTimeKind.Unspecified).AddTicks(3395), new TimeSpan(0, 0, 0, 0, 0)), null, null, "Nhân viên kho" },
                    { "6", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 190, DateTimeKind.Unspecified).AddTicks(3398), new TimeSpan(0, 0, 0, 0, 0)), null, null, "Quản lý sản xuất" },
                    { "7", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 190, DateTimeKind.Unspecified).AddTicks(3398), new TimeSpan(0, 0, 0, 0, 0)), null, null, "Nhân viên bán hàng" }
                });

            migrationBuilder.InsertData(
                table: "USER",
                columns: new[] { "Id", "CreatedAt", "DeletedOn", "EmployeeId", "HashPassword", "IsLogin", "LoginName", "ModifiedOn", "Name", "Role" },
                values: new object[] { "0193e2ce-ee41-7fcb-9b52-5bba105dc0bd", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 191, DateTimeKind.Unspecified).AddTicks(1206), new TimeSpan(0, 0, 0, 0, 0)), null, null, "27dee27aa573be269f95143a213fe18e29a90e1124b371d280a6c4b88f85f749", true, "dev0", null, "Develop", 0 });

            migrationBuilder.InsertData(
                table: "EMPLOYEE",
                columns: new[] { "Id", "Address", "Code", "CreatedAt", "DateHired", "DeletedOn", "DepartmentId", "Email", "GenderType", "IsManager", "ModifiedOn", "Name", "PhoneNumber", "PositionId", "WarehouseId" },
                values: new object[,]
                {
                    { "bonk", "Hà Nội", "ADMIN01", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 189, DateTimeKind.Unspecified).AddTicks(4411), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 19, 14, 22, 43, 189, DateTimeKind.Local).AddTicks(5392), null, null, "VanC@gmail.com", "FEMALE", null, null, "Nguyễn Văn C", "7894561230", "1", null },
                    { "dainam", "Hà Nội", "EMPLOYEE03", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 189, DateTimeKind.Unspecified).AddTicks(5987), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 19, 14, 22, 43, 189, DateTimeKind.Local).AddTicks(5988), null, "parrot-smell", "VanE@gmail.com", "MALE", false, null, "Nguyễn Văn E", "012548756", "7", null }
                });

            migrationBuilder.InsertData(
                table: "PRODUCT",
                columns: new[] { "Id", "CategoryId", "Code", "CreatedAt", "DeletedOn", "Description", "HoldingCost", "MaterialSupplierId", "ModifiedOn", "Name", "ProductType", "PurchasePrice", "SellingPrice", "Unit" },
                values: new object[,]
                {
                    { "1", "2", "PROD001", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 190, DateTimeKind.Unspecified).AddTicks(7323), new TimeSpan(0, 0, 0, 0, 0)), null, "Mô tả sản phẩm 1", 50m, null, null, "Sản phẩm 1", "FINISHED_PRODUCT", 1000m, 1200m, "Cái" },
                    { "2", "2", "PROD002", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 190, DateTimeKind.Unspecified).AddTicks(8547), new TimeSpan(0, 0, 0, 0, 0)), null, "Mô tả sản phẩm 2", 100m, "bare", null, "Sản phẩm 2", "RAW_MATERIAL", 2000m, 2500m, "Cái" }
                });

            migrationBuilder.InsertData(
                table: "WAREHOUSE",
                columns: new[] { "Id", "Address", "Capacity", "CategoryId", "Code", "CreatedAt", "DeletedOn", "ManagerId", "ModifiedOn", "Name", "WarehouseId" },
                values: new object[,]
                {
                    { "basket", "123 ham tu", 999, "3", "BASKET001", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 197, DateTimeKind.Unspecified).AddTicks(6718), new TimeSpan(0, 0, 0, 0, 0)), null, null, null, "Basket", null },
                    { "choi-da-time", "123 ham tu", 999, "1", "CDT001", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 197, DateTimeKind.Unspecified).AddTicks(5872), new TimeSpan(0, 0, 0, 0, 0)), null, null, null, "Jellyjellyjelly", null }
                });

            migrationBuilder.InsertData(
                table: "EMPLOYEE",
                columns: new[] { "Id", "Address", "Code", "CreatedAt", "DateHired", "DeletedOn", "DepartmentId", "Email", "GenderType", "IsManager", "ModifiedOn", "Name", "PhoneNumber", "PositionId", "WarehouseId" },
                values: new object[,]
                {
                    { "bankmiramram", "Hà Nội", "EMPLOYEE02", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 189, DateTimeKind.Unspecified).AddTicks(5984), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 19, 14, 22, 43, 189, DateTimeKind.Local).AddTicks(5986), null, "sugar-town", "VanD@gmail.com", "OTHER", true, null, "Nguyễn Văn D", "0123457953", "6", "choi-da-time" },
                    { "hihihaha", "Hà Nội", "MANAGER01", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 189, DateTimeKind.Unspecified).AddTicks(5580), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 19, 14, 22, 43, 189, DateTimeKind.Local).AddTicks(5856), null, "huhuhu", "VanA@gmail.com", "OTHER", true, null, "Nguyễn Văn A", "0123456789", "4", "choi-da-time" },
                    { "hihihaharamram", "Hà Nội", "EMPLOYEE01", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 189, DateTimeKind.Unspecified).AddTicks(5980), new TimeSpan(0, 0, 0, 0, 0)), new DateTime(2025, 5, 19, 14, 22, 43, 189, DateTimeKind.Local).AddTicks(5983), null, "huhuhu", "VanB@gmail.com", "MALE", false, null, "Nguyễn Văn B", "0123456987", "5", "choi-da-time" }
                });

            migrationBuilder.InsertData(
                table: "USER",
                columns: new[] { "Id", "CreatedAt", "DeletedOn", "EmployeeId", "HashPassword", "IsLogin", "LoginName", "ModifiedOn", "Name", "Role" },
                values: new object[,]
                {
                    { "123456789", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 191, DateTimeKind.Unspecified).AddTicks(1751), new TimeSpan(0, 0, 0, 0, 0)), null, "bonk", "7ced44abd56279573d3e9730f7845fd68bb5e1d1b09dee076b066f53ca8e8247", true, "admin0", null, "Admin", 1 },
                    { "147894561230", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 191, DateTimeKind.Unspecified).AddTicks(1885), new TimeSpan(0, 0, 0, 0, 0)), null, "dainam", "cfbff703c63d47180b95190dac7b4ca5e04e20af5b3c5ec515e4136710815d84", true, "salesman1", null, "Salesman test", 4 },
                    { "789456123", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 191, DateTimeKind.Unspecified).AddTicks(1884), new TimeSpan(0, 0, 0, 0, 0)), null, "bankmiramram", "cfbff703c63d47180b95190dac7b4ca5e04e20af5b3c5ec515e4136710815d84", true, "producer1", null, "Producer test", 3 },
                    { "987654321", new DateTimeOffset(new DateTime(2025, 5, 19, 7, 22, 43, 191, DateTimeKind.Unspecified).AddTicks(1882), new TimeSpan(0, 0, 0, 0, 0)), null, "hihihaha", "cfbff703c63d47180b95190dac7b4ca5e04e20af5b3c5ec515e4136710815d84", true, "staff1", null, "Staff test", 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ACTIVITY_TargetId",
                table: "ACTIVITY",
                column: "TargetId");

            migrationBuilder.CreateIndex(
                name: "IX_AGENCY_Code",
                table: "AGENCY",
                column: "Code");

            migrationBuilder.CreateIndex(
                name: "IX_BILLOFMATERIAL_Code",
                table: "BILLOFMATERIAL",
                column: "Code");

            migrationBuilder.CreateIndex(
                name: "IX_BILLOFMATERIAL_ProductId",
                table: "BILLOFMATERIAL",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_BILLOFMATERIALDETAIL_BillOfMaterialId",
                table: "BILLOFMATERIALDETAIL",
                column: "BillOfMaterialId");

            migrationBuilder.CreateIndex(
                name: "IX_BILLOFMATERIALDETAIL_MaterialId",
                table: "BILLOFMATERIALDETAIL",
                column: "MaterialId");

            migrationBuilder.CreateIndex(
                name: "IX_CATEGORY_Code",
                table: "CATEGORY",
                column: "Code");

            migrationBuilder.CreateIndex(
                name: "IX_DEPARTMENT_Code",
                table: "DEPARTMENT",
                column: "Code");

            migrationBuilder.CreateIndex(
                name: "IX_EMPLOYEE_Code",
                table: "EMPLOYEE",
                column: "Code");

            migrationBuilder.CreateIndex(
                name: "IX_EMPLOYEE_DepartmentId",
                table: "EMPLOYEE",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_EMPLOYEE_PositionId",
                table: "EMPLOYEE",
                column: "PositionId");

            migrationBuilder.CreateIndex(
                name: "IX_EMPLOYEE_WarehouseId",
                table: "EMPLOYEE",
                column: "WarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_FORECAST_ProductId",
                table: "FORECAST",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_GOODSISSUE_AgencyId",
                table: "GOODSISSUE",
                column: "AgencyId");

            migrationBuilder.CreateIndex(
                name: "IX_GOODSISSUE_Code",
                table: "GOODSISSUE",
                column: "Code");

            migrationBuilder.CreateIndex(
                name: "IX_GOODSISSUE_OrderId",
                table: "GOODSISSUE",
                column: "OrderId");

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
                name: "IX_GOODSRECEIPT_Code",
                table: "GOODSRECEIPT",
                column: "Code");

            migrationBuilder.CreateIndex(
                name: "IX_GOODSRECEIPT_MaterialSupplierId",
                table: "GOODSRECEIPT",
                column: "MaterialSupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_GOODSRECEIPT_OrderId",
                table: "GOODSRECEIPT",
                column: "OrderId");

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
                name: "IX_MATERIALSUPPLIER_Code",
                table: "MATERIALSUPPLIER",
                column: "Code");

            migrationBuilder.CreateIndex(
                name: "IX_ORDER_AgencyId",
                table: "ORDER",
                column: "AgencyId");

            migrationBuilder.CreateIndex(
                name: "IX_ORDER_Code",
                table: "ORDER",
                column: "Code");

            migrationBuilder.CreateIndex(
                name: "IX_ORDER_UserId",
                table: "ORDER",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ORDERDETAIL_OrderId",
                table: "ORDERDETAIL",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_ORDERDETAIL_ProductId",
                table: "ORDERDETAIL",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_PRODUCT_CategoryId",
                table: "PRODUCT",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_PRODUCT_Code",
                table: "PRODUCT",
                column: "Code");

            migrationBuilder.CreateIndex(
                name: "IX_PRODUCT_MaterialSupplierId",
                table: "PRODUCT",
                column: "MaterialSupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_PRODUCTIONCOMMAND_Code",
                table: "PRODUCTIONCOMMAND",
                column: "Code");

            migrationBuilder.CreateIndex(
                name: "IX_PRODUCTIONCOMMAND_OrderId",
                table: "PRODUCTIONCOMMAND",
                column: "OrderId");

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
                name: "IX_TOKENSTORE_UserId",
                table: "TOKENSTORE",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_USER_EmployeeId",
                table: "USER",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_WAREHOUSE_CategoryId",
                table: "WAREHOUSE",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_WAREHOUSE_ManagerId",
                table: "WAREHOUSE",
                column: "ManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_WAREHOUSE_WarehouseId",
                table: "WAREHOUSE",
                column: "WarehouseId");

            migrationBuilder.AddForeignKey(
                name: "FK_EMPLOYEE_WAREHOUSE_WarehouseId",
                table: "EMPLOYEE",
                column: "WarehouseId",
                principalTable: "WAREHOUSE",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EMPLOYEE_DEPARTMENT_DepartmentId",
                table: "EMPLOYEE");

            migrationBuilder.DropForeignKey(
                name: "FK_EMPLOYEE_POSITION_PositionId",
                table: "EMPLOYEE");

            migrationBuilder.DropForeignKey(
                name: "FK_EMPLOYEE_WAREHOUSE_WarehouseId",
                table: "EMPLOYEE");

            migrationBuilder.DropTable(
                name: "ACTIVITY");

            migrationBuilder.DropTable(
                name: "BILLOFMATERIALDETAIL");

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
                name: "BILLOFMATERIAL");

            migrationBuilder.DropTable(
                name: "GOODSISSUE");

            migrationBuilder.DropTable(
                name: "GOODSRECEIPT");

            migrationBuilder.DropTable(
                name: "PRODUCT");

            migrationBuilder.DropTable(
                name: "PRODUCTIONCOMMAND");

            migrationBuilder.DropTable(
                name: "MATERIALSUPPLIER");

            migrationBuilder.DropTable(
                name: "ORDER");

            migrationBuilder.DropTable(
                name: "AGENCY");

            migrationBuilder.DropTable(
                name: "USER");

            migrationBuilder.DropTable(
                name: "DEPARTMENT");

            migrationBuilder.DropTable(
                name: "POSITION");

            migrationBuilder.DropTable(
                name: "WAREHOUSE");

            migrationBuilder.DropTable(
                name: "CATEGORY");

            migrationBuilder.DropTable(
                name: "EMPLOYEE");
        }
    }
}
