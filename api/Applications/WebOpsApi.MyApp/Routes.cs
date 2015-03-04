
using System.Collections.Generic;
using System.Linq;
using WebOpsApi.Shared;

namespace WebOpsApi.MyApp
{
	public class Routes : ApiRoutingTable
	{
		public Routes()
		{
			Get["/"] = ctx => new ApiResponse
			{
				Success = true,
				Data = "Welcome To My App"
			};

			//*************************************************
			//	Example REST Implementation
			//*************************************************

			var things = new List<string> { "Thing 1", "Thing 2" };

			Get["/Things"] = ctx => new ApiResponse
			{
				Success = true,
				Data = things
			};

			Post["/Things"] = ctx =>
			{
				var thing = ctx.ReadParam("thing").ToString();
				if (!string.IsNullOrWhiteSpace(thing))
				{
					things.Add(thing);

					return new ApiResponse
					{
						Success = true,
						Data = thing + " Added to collection"
					};
				}

				return new ApiResponse
				{
					Success = false,
					ErrorMessage = "No Thing In Post Data!"
				};

			};

			Put["/Things"] = ctx =>
			{
				var pk = ctx.ReadParam("pk").ToString();  //In this example we use the previous value
				var thing = ctx.ReadParam("thing").ToString();

				var thingToUpdate = things.FirstOrDefault(x => x == pk);

				return null;

			};

		}
	}
}
