define(["knockout", "jquery", 'backend', 'viewmodels/shell'], 
        function(ko, $, be, shell) {
    var viewModel = function() {
        var self = this;
        self.id = null;
        self.name = ko.observable();
        self.email = ko.observable();
        self.admin = ko.observable(false);
        self.activate = function(id) {
            self.id = id;
            be.getUser(id)
            .then(function(data) {
                self.name(data.name);
                self.email(data.email);
            })
            .then(null, function(error) {
                shell.handleError(error);
            });
        };

    };

    return viewModel;
});
