using System.Collections.Generic;
using System.Linq;

namespace WebOpsApi.Shared
{
    public class ApiRequest
    {
        public dynamic Route { get; set; }
        public dynamic Request { get; set; }
        public Dictionary<string,object> QueryParams { get; set; }
        public Dictionary<string,object> PostData { get; set; }

        public object ReadParam(string key)
        {
            object result = null;
            if (QueryParams.Keys.Contains(key))
            {
                result = QueryParams[key];
            }else if (PostData.ContainsKey(key))
            {
                result = PostData[key];
            }

            result = result ?? "";

            return result;
        }
    }
}
