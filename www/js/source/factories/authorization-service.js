app.factory('authorizationService',
	['$rootScope', '$location', '$q', 'xssAjax',
		function ($rootScope, $location, $q, xssAjax) {
			var $scope = {};

			$.cookie.json = true;
			var cookieName = 'currentUser';

			$scope.token = null;
			$scope.currentUser = {};
			$scope.userLoggedIn = false;

			//*******************************************
			//  BroadcastAuthChange
			//*******************************************
			$scope.BroadcastAuthChange = function () {
				$rootScope.$broadcast('auth-state-changed', {
					currentUser: $scope.currentUser,
					userLoggedIn: $scope.userLoggedIn
				});
			};

			//*******************************************
			//  Login User
			//*******************************************
			$scope.logInUser = function (username, password) {
				var deferred = $q.defer();

				//todo: impliment user validation
				$scope.currentUser = { username: username, token: 'ABz123S' };
				$scope.token = $scope.currentUser.token;
				$scope.userLoggedIn = true;

				$.cookie(cookieName, $scope.currentUser, { expires: 3 });

				$scope.BroadcastAuthChange();

				deferred.resolve({
					success: true,
					message: 'user logged in'
				});

				return deferred.promise;
			};

			//*******************************************
			//  Read Cookie
			//*******************************************
			$scope.getAuthInfoFromCookie = function () {
				var currentUser = $.cookie(cookieName);
				if (currentUser) {
					$scope.token = currentUser.token;
					$scope.currentUser = currentUser;
					$scope.userLoggedIn = true;
				} else {
					$scope.userLoggedIn = false;
				}

				$scope.BroadcastAuthChange();
			};

			//*******************************************
			//  Logout
			//*******************************************
			$scope.logOut = function () {
				$.removeCookie(cookieName);
				$scope.currentUser = null;
				$scope.token = null;
				$scope.userLoggedIn = false;
				$location.path("/home");

				$scope.BroadcastAuthChange();
			};

			//*******************************************
			//  Route Security
			//*******************************************
			$rootScope.$on('$routeChangeStart', function (event, next) {
				var routeInfo = _.find(app.routes, { path: next.path });
				if (routeInfo.secure && $scope.userLoggedIn != true) {
					$location.path('/home');
				}
			});


			//*******************************************
			//  Init
			//*******************************************
			function init() {
				$scope.getAuthInfoFromCookie();
			}
			init();


			return $scope;
		}]);