using System;
using System.Collections.Generic;
using System.IO;
using WebOpsApi.Shared.Helpers;

namespace WebOpsApi.Shared
{
    public class ApiRoutingTable
    {
        public Dictionary<string, Func<ApiRequest, ApiResponse>> Get = new Dictionary<string, Func<ApiRequest, ApiResponse>>();
        public Dictionary<string, Func<ApiRequest, ApiResponse>> Post = new Dictionary<string, Func<ApiRequest, ApiResponse>>();
        public Dictionary<string, Func<ApiRequest, ApiResponse>> Put = new Dictionary<string, Func<ApiRequest, ApiResponse>>();
        public Dictionary<string, Func<ApiRequest, ApiResponse>> Delete = new Dictionary<string, Func<ApiRequest, ApiResponse>>();
        public Dictionary<string, Func<ApiRequest, ApiResponse>> EndPoint = new Dictionary<string, Func<ApiRequest, ApiResponse>>();

        private string _basePath;

        public string BasePath
        {
            get { return _basePath ?? (_basePath = GetBasePath()); }
            set { _basePath = value; }
        }

        private string GetBasePath()
        {
            string basePath = System.Reflection.Assembly.GetCallingAssembly().GetName().Name;
            basePath = basePath.Replace("WebOpsApi.", "").Replace(".", "/");
            return basePath;
        }

        public T Bind<T>(Dictionary<string, object> request) where T : class, new()
        {
            var result = request.ToObject<T>();
            return result;
        }

        public T BindJson<T>(ApiRequest request)
        {
            if (request.QueryParams.ContainsKey("payload"))
            {
                return this.BindJson<T>(request.QueryParams);
            }

            if (request.PostData.ContainsKey("payload"))
            {
                return this.BindJson<T>(request.PostData);
            }

            throw new Exception("No payload in request.");
        }

        public T BindJson<T>(Dictionary<string, object> request)
        {
            if (request.ContainsKey("payload"))
            {
                var payload = request["payload"].ToString();
                var result = Newtonsoft.Json.JsonConvert.DeserializeObject<T>(payload);
                return result;
            }

            throw new Exception("No payload in request.");
        }
    }
}