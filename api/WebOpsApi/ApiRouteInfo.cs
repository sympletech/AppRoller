using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using WebOpsApi.Shared;

namespace WebOpsApi
{
    public static class ApiRouteInfo
    {
        private static List<ApiRoutingTable> _definedRoutes;

        public static List<ApiRoutingTable> DefinedRoutes
        {
            get { return _definedRoutes ?? (_definedRoutes = BuildDefinedRoutes()); }
            set { _definedRoutes = value; }
        }

        private static List<ApiRoutingTable> BuildDefinedRoutes()
        {
            var type = typeof(ApiRoutingTable);
            IEnumerable<Type> routingTables = new List<Type>();

            //var test = AppDomain.CurrentDomain.GetAssemblies().ToList();
            //    //.SelectMany(s => s.GetTypes()).ToList();

            try
            {
                routingTables = AppDomain.CurrentDomain.GetAssemblies()
                    .SelectMany(s => s.GetTypes())
                    .Where(type.IsAssignableFrom);
            }
            catch (Exception ex)
            {
                var typeLoadException = ex as ReflectionTypeLoadException;
                var loaderExceptions = typeLoadException.LoaderExceptions;

                var exceptions = string.Join("<br />", loaderExceptions.Select(x => x.Message));

                //throw new Exception(exceptions);
            }

            var definedRoutes = new List<ApiRoutingTable>();
            foreach (var routingTableType in routingTables)
            {
                var routingTable = (ApiRoutingTable)Activator.CreateInstance(routingTableType);

                var basePath = routingTableType.Assembly.GetName().Name;
                routingTable.BasePath = basePath.Replace("WebOpsApi.", "").Replace(".", "/");

                definedRoutes.Add(routingTable);
            }

            


            return definedRoutes;
        }
    }
}