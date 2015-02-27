﻿using System;
using System.Collections.Generic;
using System.Reflection;

namespace WebOpsApi.Shared.Helpers
{
    public static class ParseExtension
    {
        public static T Parse<T>(this object thingToParse)
        {
            return (thingToParse ?? "").ToString().Parse<T>();
        }

        public static T Parse<T>(this string thingToParse)
        {
            return thingToParse.Parse<T>(default(T));
        }

        public static T Parse<T>(this object thingToParse, T defaultValue)
        {
            return (thingToParse ?? "").ToString().Parse<T>(defaultValue);
        }

        public static T Parse<T>(this string thingToParse, T defaultValue)
        {
            var retType = typeof(T);
            if (KnownParsers.ContainsKey(retType) != true)
            {

                KnownParsers[retType] = retType.GetMethod("TryParse",
                                                          BindingFlags.Public | BindingFlags.Static, null,
                                                          new[] { typeof(string), retType.MakeByRefType() }, null);
            }
            MethodInfo tParse = KnownParsers[retType];

            if (tParse != null)
            {
                var parameters = new object[] { thingToParse, null };
                var success = (bool)tParse.Invoke(null, parameters);
                if (success)
                {
                    return (T)parameters[1];
                }
            }

            return defaultValue;
        }

        public static T Parse<T>(this string thingToParse, Func<string, T> parser)
        {
            return parser.Invoke(thingToParse);
        }


        private static Dictionary<Type, MethodInfo> _knownParsers;
        public static Dictionary<Type, MethodInfo> KnownParsers
        {
            get { return _knownParsers ?? (_knownParsers = new Dictionary<Type, MethodInfo>()); }
            set { _knownParsers = value; }
        }
    }
}
