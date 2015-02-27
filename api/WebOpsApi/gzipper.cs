using Nancy;
using System.Collections.Generic;
using System.IO.Compression;
using System.Linq;

namespace WebOpsApi
{
    public class Gzipper
    {
        public static void Compress(NancyContext ctx)
        {
            if (!RequestIsGzipCompatible(ctx.Request))
            {
                return;
            }

            if (ctx.Response.StatusCode != HttpStatusCode.OK)
            {
                return;
            }

            if (!ResponseIsCompatibleMimeType(ctx.Response))
            {
                return;
            }

            if (ContentLengthIsTooSmall(ctx.Response))
            {
                return;
            }




            ctx.Response.Headers.Add("Content-Encoding", "gzip");
            var contents = ctx.Response.Contents;

            ctx.Response.Contents = responseStream =>
            {
                using (var compression = new GZipStream(responseStream, CompressionMode.Compress))
                {
                    contents(compression);
                }
            };
        }

        static bool ContentLengthIsTooSmall(Response response)
        {
            string contentLength;
            if (response.Headers.TryGetValue("Content-Length", out contentLength))
            {
                var length = long.Parse(contentLength);
                if (length < 4096)
                {
                    return true;
                }
            }
            return false;
        }

        public static List<string> ValidMimes = new List<string>
                                                {
                                                    "text/css",
                                                    "text/html",
                                                    "text/plain",
                                                    "application/xml",
                                                    "application/json",
                                                    "application/xaml+xml",
                                                    "application/x-javascript"
                                                };
        static bool ResponseIsCompatibleMimeType(Response response)
        {
            return ValidMimes.Any(x => x == response.ContentType);
        }

        static bool RequestIsGzipCompatible(Request request)
        {
            return request.Headers.AcceptEncoding.Any(x => x.Contains("gzip"));
        }


    }
}