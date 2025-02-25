using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using SI.Domain.Common.Utils;
using SI.Domain.Enums;
using SI.Infrastructure.Integrations.OpenXML.Types;

namespace SI.Infrastructure.Integrations.OpenXML;

public class TicketStatisticETE
{
    //private const int BASE_COL = 2;
    //private const int BASE_ROW = 10;
    //public MemoryStream GetStream(TicketStatisticArg arg)
    //{
    //    var memoryStream = new MemoryStream();
    //    using var spreadsheetDocument = SpreadsheetDocument.Create(memoryStream, SpreadsheetDocumentType.Workbook);
    //    Handle(spreadsheetDocument, arg);

    //    spreadsheetDocument.Save();
    //    memoryStream.Position = 0;
    //    return memoryStream;
    //}
    //public void GetFile(TicketStatisticArg arg)
    //{
    //    var name = Guid.NewGuid().ToString();
    //    using var spreadsheetDocument = SpreadsheetDocument.Create(name, SpreadsheetDocumentType.Workbook);
    //    Handle(spreadsheetDocument, arg);
    //}

    //private static void Handle(SpreadsheetDocument spreadsheetDocument, TicketStatisticArg arg)
    //{
    //    var data = arg.Data;
    //    var workbookPart = spreadsheetDocument.AddWorkbookPart();
    //    workbookPart.Workbook = new Workbook();

    //    var stylessheet = OpenXMLHelper.GetStylesheet();

    //    var stylesPart = workbookPart.AddNewPart<WorkbookStylesPart>();
    //    stylesPart.Stylesheet = stylessheet;

    //    var sheets = spreadsheetDocument.WorkbookPart?.Workbook.AppendChild(new Sheets());
    //    var allUnit = data.GroupBy(x => x.User?.UnitId).ToList();
    //    var unitCount = allUnit.Count;

    //    //Create a worksheet
    //    var worksheetPart = workbookPart.AddNewPart<WorksheetPart>();
    //    worksheetPart.Worksheet = new Worksheet(new SheetData());

    //    var sheetData = worksheetPart.Worksheet.GetFirstChild<SheetData>();
    //    worksheetPart.Worksheet.InsertAt(OpenXMLHelper.GetColumns(), 0);

    //    #region title
    //    var titleRow = new Row { Height = 40, CustomHeight = true, RowIndex = 2 };
    //    if(arg.StartDate != null && arg.EndDate != null)
    //        titleRow.Append(OpenXMLHelper.CreateCell($"BẢNG THỐNG KÊ BÁO CÁO SỰ CỐ TỪ NGÀY {arg.StartDate:dd/MM/yyyy} ĐẾN NGÀY {arg.EndDate:dd/MM/yyyy}", 6, 2, 2));
    //    else
    //        titleRow.Append(OpenXMLHelper.CreateCell("BẢNG THỐNG KÊ BÁO CÁO SỰ CỐ", 6, 2, 2));
    //    sheetData?.Append(titleRow);
    //    #endregion

    //    WriteStatisticTicketTotal(sheetData!, data);

    //    int idxRow = BASE_ROW;

    //    // Prepare default header values based on unit count.
    //    List<string> defaultHeaders = unitCount > 1
    //        ? new List<string> { "STT", "Tên sự cố", "Nội dung", "Thiết bị", "Người báo cáo", "Thời gian", "Trạng thái", "Đơn vị" }
    //        : new List<string> { "STT", "Tên sự cố", "Nội dung", "Thiết bị", "Người báo cáo", "Thời gian", "Trạng thái" };

    //    // Replace default headers with custom values if provided.
    //    if (arg.CustomHeaders != null && arg.CustomHeaders.Any())
    //    {
    //        for (int i = 0; i < defaultHeaders.Count; i++)
    //        {
    //            var customHeader = arg.CustomHeaders
    //                .FirstOrDefault(e => string.Equals(e.DefaultValue, defaultHeaders[i], StringComparison.OrdinalIgnoreCase));
    //            if (customHeader != null && !string.IsNullOrEmpty(customHeader.CustomValue))
    //            {
    //                defaultHeaders[i] = customHeader.CustomValue;
    //            }
    //        }
    //    }

    //    // Create header row.
    //    var headerRow = new Row { RowIndex = (uint)idxRow };
    //    foreach (var (idHeader, header) in defaultHeaders.Index())
    //    {
    //        headerRow.Append(OpenXMLHelper.CreateCell(header, 3, idHeader + BASE_COL, BASE_ROW));
    //    }
    //    sheetData?.Append(headerRow);
    //    idxRow++;

    //    // Add data rows
    //    foreach (var (idx, item) in data.Index())
    //    {
    //        var status = item.Status switch
    //        {
    //            TicketStatus.NEW => "Mới",
    //            TicketStatus.RECEVIED => "Đang xử lý",
    //            TicketStatus.PROCESSED => "Đã xử lý",
    //            TicketStatus.REJECTED => "Đã xử lý",
    //            _ => "Khác"
    //        };
    //        var row = new Row()
    //        {
    //            RowIndex = (uint)idxRow
    //        };
    //        row.Append(
    //            OpenXMLHelper.CreateCell((idx + 1).ToString(), 1, BASE_COL, idxRow),
    //            OpenXMLHelper.CreateCell(item.Name, 4, BASE_COL + 1, idxRow),
    //            OpenXMLHelper.CreateCell(item.Description ?? " ", 4, BASE_COL + 2, idxRow),
    //            OpenXMLHelper.CreateCell($"{item.Device?.Latitude}, {item.Device?.Longitude}", 1, BASE_COL + 3, idxRow),
    //            OpenXMLHelper.CreateCell(item.User?.Name ?? " ", 1, BASE_COL + 4, idxRow),
    //            OpenXMLHelper.CreateCell(item.CreatedAt.ToLocal().ToString("dd/MM/yyyy HH:mm:ss"), 1, BASE_COL + 5, idxRow),
    //            OpenXMLHelper.CreateCell(status, 1, BASE_COL + 6, idxRow)
    //        );
    //        if(unitCount > 1)
    //        {
    //            row.Append(OpenXMLHelper.CreateCell(item.User?.Unit?.Name ?? "N/A", 1, BASE_COL + 7, idxRow));
    //        }
    //        sheetData?.Append(row);
    //        idxRow++;
    //    }
    //    var mergeCells = new MergeCells();
    //    mergeCells.Append(new MergeCell { Reference = new StringValue($"B2:{OpenXMLHelper.GetColumnName(defaultHeaders.Count + BASE_COL - 1)}2") });
    //    worksheetPart.Worksheet.InsertAfter(mergeCells, sheetData);

    //    var sheet = new Sheet
    //    {
    //        Id = spreadsheetDocument.WorkbookPart?.GetIdOfPart(worksheetPart),
    //        SheetId = 1,
    //        Name = "Báo cáo sự cố"
    //    };
    //    sheets?.Append(sheet);
    //    workbookPart.Workbook.Save();
    //}
    //private static void WriteStatisticTicketTotal(SheetData sheetData, List<Ticket> data)
    //{
    //    var statisticTickets = data
    //        .GroupBy(e => e.User?.Unit?.Name)
    //        .Select(unitGroup => new
    //        {
    //            UnitName = unitGroup.Key,
    //            Total = unitGroup.Count(),
    //            TotalNew = unitGroup.Count(e => e.Status == TicketStatus.NEW),
    //            TotalProcess = unitGroup.Count(e => e.Status == TicketStatus.RECEVIED),
    //            TotalDone = unitGroup.Count(e => e.Status != TicketStatus.NEW && e.Status != TicketStatus.RECEVIED)
    //        });
    //    var baseRow = 4;
    //    var baseCol = BASE_COL;

    //    var unitRow = new Row { RowIndex = (uint)baseRow };
    //    var totalNewRow = new Row { RowIndex = (uint)baseRow + 1 };
    //    var totalProcessRow = new Row { RowIndex = (uint)baseRow + 2 };
    //    var totalDoneRow = new Row { RowIndex = (uint)baseRow + 3 };
    //    var totalRow = new Row { RowIndex = (uint)baseRow + 4 };

    //    unitRow.AppendChild(OpenXMLHelper.CreateCell("Đơn vị", 3, baseCol, baseRow));
    //    totalNewRow.AppendChild(OpenXMLHelper.CreateCell("Mới", 3, baseCol, baseRow + 1));
    //    totalProcessRow.AppendChild(OpenXMLHelper.CreateCell("Đang xử lý", 3, baseCol, baseRow + 2));
    //    totalDoneRow.AppendChild(OpenXMLHelper.CreateCell("Đã xử lý", 3, baseCol, baseRow + 3));
    //    totalRow.AppendChild(OpenXMLHelper.CreateCell("Tổng cộng", 3, baseCol, baseRow + 4));


    //    foreach (var (index,item) in  statisticTickets.Index())
    //    {
    //        var itemCol = baseCol + index + 1;
    //        unitRow.AppendChild(OpenXMLHelper.CreateCell(item.UnitName!, 5, itemCol, baseRow));
    //        totalNewRow.AppendChild(OpenXMLHelper.CreateCell(item.TotalNew.ToString(), 5, itemCol, baseRow + 1));
    //        totalProcessRow.AppendChild(OpenXMLHelper.CreateCell(item.TotalProcess.ToString(), 5, itemCol, baseRow + 2));
    //        totalDoneRow.AppendChild(OpenXMLHelper.CreateCell(item.TotalDone.ToString(), 5, itemCol, baseRow + 3));
    //        totalRow.AppendChild(OpenXMLHelper.CreateCell(item.Total.ToString(), 5, itemCol, baseRow + 4));
    //    }
    //    sheetData?.AppendChild(unitRow);
    //    sheetData?.AppendChild(totalNewRow);
    //    sheetData?.AppendChild(totalProcessRow);
    //    sheetData?.AppendChild(totalDoneRow);
    //    sheetData?.AppendChild(totalRow);
    //}
}
