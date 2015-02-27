var Browser = {
	IE9: navigator.appVersion.indexOf("MSIE 9.") != -1,
	IE8: navigator.appVersion.indexOf("MSIE 8.") != -1,
	IE7: navigator.appVersion.indexOf("MSIE 7.") != -1,
};

Browser.LTEIE9 =  Browser.IE9 || Browser.IE8 || Browser.IE7;
Browser.LTEIE8 = Browser.IE8 || Browser.IE7;