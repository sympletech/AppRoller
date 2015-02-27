using System;
using Newtonsoft.Json;
using WebOpsApi.Shared.Enums;

namespace WebOpsApi.Shared
{
    public class ApiResponse
    {
        public ApiResponse()
        {
            TimeStamp = DateTime.Now;
            HttpStatusCode = HttpStatusCode.OK;
        }

        public DateTime TimeStamp { get; private set; }
        public HttpStatusCode HttpStatusCode { get; set; }

        public bool Success { get; set; }
        public string ErrorMessage { get; set; }
        
        public string DataType { get; set; }
        public object Data { get; set; }

        public string Serialize()
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(this, Formatting.Indented);
        }
    }
}
