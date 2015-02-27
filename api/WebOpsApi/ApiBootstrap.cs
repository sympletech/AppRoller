using System.IO.Compression;
using Nancy;
using Nancy.Bootstrapper;
using Nancy.Conventions;
using Nancy.Elmah;
using Nancy.TinyIoc;
using Nancy.Session;

namespace WebOpsApi
{
    public class ApiBootstrap : DefaultNancyBootstrapper
    {
        protected override void ApplicationStartup(TinyIoCContainer container, IPipelines pipelines)
        {
            base.ApplicationStartup(container, pipelines);
            Elmahlogging.Enable(pipelines, "elmah");
            CookieBasedSessions.Enable(pipelines);
        }

        protected override void RequestStartup(TinyIoCContainer requestContainer, IPipelines pipelines, NancyContext context)
        {
            pipelines.AfterRequest += Gzipper.Compress;
        }
    }
}