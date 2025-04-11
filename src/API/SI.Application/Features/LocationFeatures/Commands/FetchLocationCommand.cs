using System.Text;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.Extensions.Configuration;
using SI.Infrastructure.Integrations;
using SI.Infrastructure.Integrations.ProvinceOpenAPI.DTO;

namespace SI.Application.Features.LocationFeature.Commands;

public class FetchLocationCommand: ICommand<OkResponse>
{

}

public class FetchLocationCommandHandler(
    ProvinceOpenAPIService provinceOpenAPIService,
    IConfiguration configuration)
    : ICommandHandler<FetchLocationCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle
        (FetchLocationCommand request,
        CancellationToken cancellationToken)
    {
        using var connection = new MySql.Data.MySqlClient.MySqlConnection(
            configuration.GetConnectionString("MySql")!);
        connection.Open();
        var trans = await connection.BeginTransactionAsync(cancellationToken);
        // delete old data
        using var delCmd = new MySql.Data.MySqlClient.MySqlCommand("delete from WARD", connection);
        await delCmd.ExecuteNonQueryAsync(cancellationToken);
        using var delCmd2 = new MySql.Data.MySqlClient.MySqlCommand("delete from DISTRICT", connection);
        await delCmd2.ExecuteNonQueryAsync(cancellationToken);
        using var delCmd3 = new MySql.Data.MySqlClient.MySqlCommand("delete from PROVINCE", connection);
        await delCmd3.ExecuteNonQueryAsync(cancellationToken);

        // insert new data
        var rawProvinces = await provinceOpenAPIService.GetProvincesAsync(cancellationToken);
        await BulkInsertProvincesAsync(rawProvinces!, connection);
        var rawDistrict = await provinceOpenAPIService.GetDistrictAsync(cancellationToken);
        await BulkInsertDistrictAsync(rawDistrict!, connection);
        var rawWards = await provinceOpenAPIService.GetWardAsync(cancellationToken);
        await BulkInsertWardAsync(rawWards!, connection);

        await trans.CommitAsync(cancellationToken);

        return CTBaseResult.Success("Sync success!");
    }

    private async Task BulkInsertProvincesAsync(IEnumerable<GetProvinceDTO> provinces,  MySql.Data.MySqlClient.MySqlConnection connection)
    {
        var sqlBuilder = new StringBuilder("INSERT INTO PROVINCE (Id, Name, IsDeleted) VALUES ");

        var values = provinces.Select(p => $"('{p.Code}', '{EscapeSingleQuote(p.Name)}', '0')");
        sqlBuilder.Append(string.Join(", ", values));
        sqlBuilder.Append(";");

        using var command = new MySql.Data.MySqlClient.MySqlCommand(sqlBuilder.ToString(), connection);
        await command.ExecuteNonQueryAsync();
    }
    
    private async Task BulkInsertDistrictAsync(IEnumerable<GetDistrictDTO> districts,  MySql.Data.MySqlClient.MySqlConnection connection)
    {
        var sqlBuilder = new StringBuilder("INSERT INTO DISTRICT (Id, Name, ProvinceId, IsDeleted) VALUES ");

        var values = districts.Select(p => $"('{p.Code}', '{EscapeSingleQuote(p.Name)}', '{p.ProvinceCode}', '0')");
        sqlBuilder.Append(string.Join(", ", values));
        sqlBuilder.Append(";");

        using var command = new MySql.Data.MySqlClient.MySqlCommand(sqlBuilder.ToString(), connection);
        await command.ExecuteNonQueryAsync();
    }

    private async Task BulkInsertWardAsync(IEnumerable<GetWardDTO> wards,  MySql.Data.MySqlClient.MySqlConnection connection)
    {
        var sqlBuilder = new StringBuilder("INSERT INTO WARD (Id, Name, DistrictId, IsDeleted) VALUES ");

        var values = wards.Select(p => $"('{p.Code}', '{EscapeSingleQuote(p.Name)}', '{p.DistrictCode}', '0')");
        sqlBuilder.Append(string.Join(", ", values));
        sqlBuilder.Append(";");


        using var command = new MySql.Data.MySqlClient.MySqlCommand(sqlBuilder.ToString(), connection);
        await command.ExecuteNonQueryAsync();
    }

    private string EscapeSingleQuote(string input)
    {
        return input.Replace("'", "''");
    }
}
