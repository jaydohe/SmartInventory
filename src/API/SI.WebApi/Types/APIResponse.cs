using CTCore.DynamicQuery.Common.Definations;
using CTCore.DynamicQuery.Core.Primitives;

namespace SI.Webapi.Types;

public sealed class APIErrorResponse(string msg, ErrorCodes errorCode) : BaseResponse(msg, errorCode)
{
}

