using Nancy;
using Nancy.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WebOpsApi.Shared;

namespace WebOpsApi
{
	public class ApiRouter : NancyModule
	{
		private List<ApiRouteEntry> definedRoutes;

		public ApiRouter()
		{
			definedRoutes = new List<ApiRouteEntry>();

			foreach (var routingTableEntry in ApiRouteInfo.DefinedRoutes)
			{
				AddRoutes(Get, "GET", routingTableEntry.BasePath, routingTableEntry.Get);
				AddRoutes(Post, "POST", routingTableEntry.BasePath, routingTableEntry.Post);
				AddRoutes(Put, "PUT", routingTableEntry.BasePath, routingTableEntry.Put);
				AddRoutes(Delete, "DELETE", routingTableEntry.BasePath, routingTableEntry.Delete);

				AddRoutes(Get, "GET", routingTableEntry.BasePath, routingTableEntry.EndPoint);
				AddRoutes(Post, "POST", routingTableEntry.BasePath, routingTableEntry.EndPoint);
				AddRoutes(Put, "PUT", routingTableEntry.BasePath, routingTableEntry.EndPoint);
				AddRoutes(Delete, "DELETE", routingTableEntry.BasePath, routingTableEntry.EndPoint);
			}


			//Add Index Route
			Get["/"] = _ =>
			{
				var sbRoutes = new StringBuilder();
				sbRoutes.Append("<h1>API Routes Available</h1><ul>");

				foreach (var route in definedRoutes.OrderBy(x => x.Method))
				{
					sbRoutes.AppendFormat("<li><b>{0}</b> -- {1}</li>", route.Method, route.Path);
				}

				sbRoutes.Append("</ul>");

				return sbRoutes.ToString();
			};
		}

		private void AddRoutes(RouteBuilder verb, string method, string basePath, Dictionary<string, Func<ApiRequest, ApiResponse>> routes)
		{
			foreach (var rKey in routes.Keys)
			{
				var key = rKey;
				verb[basePath + key] = ctx =>
				{
					var requestInfo = new ApiRequest
					{
						Route = ctx,
						Request = Request,
						PostData = new Dictionary<string, object>(),
						QueryParams = new Dictionary<string, object>()
					};

					foreach (var qKey in Request.Query.Keys)
					{
						requestInfo.QueryParams.Add(qKey, Request.Query[qKey].Value);
					}

					foreach (var fKey in Request.Form.Keys)
					{
						requestInfo.PostData.Add(fKey, Request.Form[fKey].Value);
					}

					var result = (ApiResponse)routes[key](requestInfo);

					JsonSettings.MaxJsonLength = Int32.MaxValue;

					return Response.AsJson(result, (HttpStatusCode)result.HttpStatusCode);
				};

				definedRoutes.Add(new ApiRouteEntry
				{
					Method = method,
					Path = basePath + key
				});
			}
		}
	}

	public class ApiRouteEntry
	{
		public string Method { get; set; }
		public string Path { get; set; }
	}
}
