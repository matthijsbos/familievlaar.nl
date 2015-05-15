define(['plugins/router', 'knockout', 'jquery', 'backend', 'viewmodels/shell'],
        function(router, ko, $, be, shell) {

    var viewModel = function() {
        var self = this;

        self.email = ko.observable();
        self.resetButtonDisabled = ko.observable(false);
        self.resetButtonClicked = function() {
            self.resetButtonDisabled(true);
            be.resetPassword(self.email())
            .then(function() {
                router.navigate("/forgotPasswordComplete", {trigger: true, replace: true});
            })
            .then(null, function(error) {
                self.resetButtonDisabled(false);
                shell.handleError(error);
            });
        };
    };

    return viewModel;
});
