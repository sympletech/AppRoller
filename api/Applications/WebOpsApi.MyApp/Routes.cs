
using WebOpsApi.Shared;

namespace WebOpsApi.MyApp
{
	public class Routes : ApiRoutingTable
	{
		public Routes()
		{
			Get["/"] = ctx =>
			{
				return new ApiResponse
				{
					Success = true,
					Data = "Welcome To My App"
				};
			};
		}
	}
}
