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
			var deferred = $q.defer();

			if (Browser.LTEIE9) {
				var url = proxyUrl + path + '?' + $.param(params);

				$scope.get(url, null).then(
					function(data) {
						deferred.resolve(data);
					},
					function(errorThrown) {
						deferred.reject(errorThrown);
					});
			} else {
				$.ajax({
					url: path,
					type : 'POST',
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
		};

		return $scope;
	}
]);