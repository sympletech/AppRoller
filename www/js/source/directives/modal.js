app.directive('ngModal', function () {
	return{
		templateUrl: 'partials/templates/modal.html',
		transclude: true,
		scope: {
			show: '='
		},
		link: function (scope, element, attrs) {

			//scope.$watch('show', function () {
			//	scope.title = attrs.title;

			//	var modal = $(element).find('.modal');
			//	if (scope.show) {
			//		$(modal).modal('show');
			//	} else {
			//		if ($(modal).hasClass('active')) {
			//			$(modal).modal('hide');
			//		}
			//	}
			//});






			//scope.dialogStyle = {};
			//if (attrs.width)
			//	scope.dialogStyle.width = attrs.width;
			//if (attrs.height)
			//	scope.dialogStyle.height = attrs.height;

			//scope.hideModal = function () {
			//	scope.show = false;
			//};

			scope.$watch('show', function() {
				scope.title = attrs.title;

				var modal = $(element).find('.ng-modal'),
					modalContent = $(modal).find('.ng-modal-dialog');
				if (scope.show) {
					modal.show();
					modalContent.fadeIn(750);
					$(modal).modal('show');
				} else {
					modalContent.fadeOut(500, function() {
						modal.hide();
					});
				}

				$(element).find('.close-button').on('click', function () {
					scope.hideModal();
				});

			});
		}
	}
});