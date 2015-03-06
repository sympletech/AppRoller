//Helper factory to remember how to do cross site calls that work in IE 8+ 
app.factory('xssAjax', ['$q',
	function($q) {
		var $scope = {};

		var proxyUrl = 'http://webappsproxy.esri.com/Get2Post?';

		$scope.get = function(path, params) {
			var deferred = $q.defer();

			$.ajax({
				url: path,
				data: params,
				dataType: 'jsonp',
				success: function (data) {
					deferred.resolve(data);
				},
				error: function (jqXhr, textStatus, errorThrown) {
					deferred.reject(errorThrown);
				}
			});

			return deferred.promise;
		};

		$scope.post = function(path, params) {
			return MakeAjaxCall('POST', path, params);
		};

		$scope.put = function (path, params) {
			return MakeAjaxCall('PUT', path, params);
		};

		$scope.delete = function (path, params) {
			return MakeAjaxCall('DELETE', path, params);
		};

		function useJsonp() {
			return navigator.appVersion.indexOf("MSIE 9.")
				|| navigator.appVersion.indexOf("MSIE 8.")
				|| navigator.appVersion.indexOf("MSIE 7.");
		}

		function MakeAjaxCall(verb, path, params) {
			var deferred = $q.defer();

			if (useJsonp()) {
				var url = proxyUrl + path + '?' + $.param(params);

				$scope.get(url, null).then(
					function (data) {
						deferred.resolve(data);
					},
					function (errorThrown) {
						deferred.reject(errorThrown);
					});
			} else {
				$.ajax({
					url: path,
					type: verb,
					data: params,
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
			}

			return deferred.promise;
		}

		return $scope;
	}
]);