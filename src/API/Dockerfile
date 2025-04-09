FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base

WORKDIR /app

EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

WORKDIR /src

COPY . .

RUN dotnet restore "SI.WebApi/SI.WebApi.csproj"

RUN dotnet build "SI.WebApi/SI.WebApi.csproj" -c Release -o /app/build

RUN dotnet publish "SI.WebApi/SI.WebApi.csproj" -c Release -o /app/publish

FROM base AS final

WORKDIR /app

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "SI.WebApi.dll"]
