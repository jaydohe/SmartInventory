namespace SI.Domain.Common.Exceptions;

public class NotFoundException(string entity) : Exception($"{entity} not found.")
{
}