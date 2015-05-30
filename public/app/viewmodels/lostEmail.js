define(["plugins/router", "knockout", "backend"],
        function(router, ko, be) {
    var viewModel = function() {
        var self = this;
        self.email = ko.observable('');
        self.formSubmitted = function() {
            alert('submit');
        };

        self.cancelButtonClicked = function() {
            router.navigateBack();
        };
    };

    return viewModel;
});
