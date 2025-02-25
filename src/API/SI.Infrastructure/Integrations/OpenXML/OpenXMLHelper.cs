using DocumentFormat.OpenXml.Spreadsheet;

namespace SI.Infrastructure.Integrations.OpenXML;

internal static class OpenXMLHelper
{
    internal static Columns GetColumns(){
        var columns = new Columns(
            new Column { Min = 1, Max = 3, Width = 15, CustomWidth = true }, // Adjust width for column A
            new Column { Min = 4, Max = 10, Width = 20, CustomWidth = true }  // Columns D-F
        );
        return columns;
    }
    internal static Stylesheet GetStylesheet(){
        return new Stylesheet(
            new Fonts(
                new Font(new FontSize() { Val = 14 }, new FontName() { Val = "Calibri" }),// Default font
                new Font(new FontSize() { Val = 16 }, new FontName() { Val = "Calibri" }, new Bold()),
                new Font(new FontSize() { Val = 23 }, new FontName() { Val = "Calibri" }, new Bold()),
                new Font(new FontSize() { Val = 14 }, new FontName() { Val = "Calibri" }, new Bold())

            ),
            new Fills(new Fill(new PatternFill() { PatternType = PatternValues.None }),
                      new Fill(new PatternFill() { PatternType = PatternValues.Gray125 }),
                      new Fill(new PatternFill() { PatternType = PatternValues.Solid,
                            ForegroundColor = new ForegroundColor() { Rgb = "FFBDD7EE" },
                            BackgroundColor = new BackgroundColor() { Indexed = 64 }
                      })), // Default fill
            new Borders(new Border(),
                        new Border(
                            new LeftBorder { Style = BorderStyleValues.Medium },
                            new RightBorder { Style = BorderStyleValues.Medium },
                            new TopBorder { Style = BorderStyleValues.Medium },
                            new BottomBorder { Style = BorderStyleValues.Medium },
                            new DiagonalBorder()
            )), // Default border
            new CellFormats(
                new CellFormat()
                {
                    FontId = 0, // Default font
                    FillId = 0, // Default fill
                    BorderId = 1,
                    ApplyBorder = true
                },
                new CellFormat()
                {
                    Alignment = new Alignment() { Horizontal= HorizontalAlignmentValues.Center,
                        Vertical = VerticalAlignmentValues.Center },
                    ApplyAlignment = true,
                    BorderId = 1,
                    ApplyBorder = true
                },
                new CellFormat()
                {
                    Alignment = new Alignment() { Horizontal= HorizontalAlignmentValues.Right,
                        Vertical = VerticalAlignmentValues.Center },
                    ApplyAlignment = true,
                    BorderId = 1,
                    ApplyBorder = true
                },
                new CellFormat()
                {
                    Alignment = new Alignment() { Horizontal= HorizontalAlignmentValues.Center,
                        Vertical = VerticalAlignmentValues.Center },
                    ApplyAlignment = true,
                    BorderId = 1,
                    ApplyBorder = true,
                    FontId = 1,
                    FillId = 2,
                    ApplyFill = true
                },
                new CellFormat()
                {
                    Alignment = new Alignment() { Horizontal= HorizontalAlignmentValues.Left,
                        Vertical = VerticalAlignmentValues.Center,
                        WrapText = true},
                    ApplyAlignment = true,
                    BorderId = 1,
                    ApplyBorder = true
                },
                new CellFormat()
                {
                    Alignment = new Alignment() { Horizontal= HorizontalAlignmentValues.Center,
                        Vertical = VerticalAlignmentValues.Center },
                    ApplyAlignment = true,
                    FontId = 3,
                    BorderId = 1,
                    ApplyBorder = true
                },
                new CellFormat()
                {
                    Alignment = new Alignment()
                    {
                        Horizontal = HorizontalAlignmentValues.Center,
                        Vertical = VerticalAlignmentValues.Center
                    },
                    ApplyAlignment = true,
                    FontId = 2,
                }
            )
        );
    }
    internal static Cell CreateCell(string value, uint sIndx = 0, string? address = null)
    {
        return new Cell
        { 
            CellReference = address,
            DataType = CellValues.String,
            CellValue = new CellValue(value ?? string.Empty), 
            StyleIndex = sIndx
        };
    }
    internal static Cell CreateCell(string value, uint sIndx = 0, int idCol = 1, int idRow = 1)
    {
        return new Cell
        { 
            CellReference = GetCellAddress(idCol, idRow),
            DataType = CellValues.String,
            CellValue = new CellValue(value ?? string.Empty), 
            StyleIndex = sIndx
        };
    }
    


    //internal static Cell CreateCellWithType(string value, RecordTypes type, int idCol, int idRow, uint sIndx = 0)
    //{
    //    return new Cell
    //    {
        
    //        CellReference = GetCellAddress(idCol, idRow),
    //        DataType = type switch
    //        {
    //            RecordTypes.Number => CellValues.Number,
    //            _ => CellValues.String
    //        },
    //        CellValue = new CellValue(value ?? string.Empty),
    //        StyleIndex = sIndx
    //    };
    //}
    private static string GetCellAddress(int columnIndex, int rowIndex)
    {
        string columnName = GetColumnName(columnIndex);
        return $"{columnName}{rowIndex}";
    }

    internal static string GetColumnName(int columnIndex)
    {
        var columnName = string.Empty;
        while (columnIndex > 0)
        {
            columnIndex--;
            columnName = (char)('A' + (columnIndex % 26)) + columnName;
            columnIndex /= 26;
        }
        return columnName;
    }
}