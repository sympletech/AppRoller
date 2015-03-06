//Helper factory to remember how to do cross site calls that work in IE 8+ 
app.factory('xssAjax', ['$q',
	function($q) {
		var $scope = {};

		var proxyUrl = 'http://webappsproxy.esri.com/Get2Post?';

		$scope.get = function (path, params) {
			return makeAjaxCall('GET', path, params);
		};

		$scope.post = function(path, params) {
			return makeAjaxCall('POST', path, params);
		};

		$scope.put = function (path, params) {
			return makeAjaxCall('PUT', path, params);
		};

		$scope.delete = function (path, params) {
			return makeAjaxCall('DELETE', path, params);
		};

		function useJsonp() {
			return navigator.appVersion.indexOf("MSIE 9.")
				|| navigator.appVersion.indexOf("MSIE 8.")
				|| navigator.appVersion.indexOf("MSIE 7.");
		}

		function makeAjaxCall(verb, path, params) {
			var deferred = $q.defer();

			if (useJsonp() && verb != 'GET') {
				path = proxyUrl + path + '?' + $.param(params);
				verb = 'GET';
			}

			$.ajax({
				url: path,
				type: verb,
				data: params,
				timeout: 15000,
				dataType: useJsonp() ? 'jsonp' : null,
				success: function (data) {
					try {
						var dataObj = JSON.parse(data);
						deferred.resolve(dataObj);
					} catch (e) {
						deferred.resolve(data);
					}
				},
				error: function (jqXhr, textStatus, errorThrown) {
					deferred.reject(errorThrown);
				}
			});

			return deferred.promise;
		}

		return $scope;
	}
]);