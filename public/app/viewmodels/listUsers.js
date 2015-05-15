define(["knockout", "jquery", 'backend', 'viewmodels/shell', 'plugins/router'], 
    function(ko, $, be, shell, router) {
    var viewModel = function() {
        var self = this;
        this.users = ko.observableArray();
        this.activate = function() {

            be.listUsers()
            .then(function(data) {
                self.users(data); 
            })
            .then(null, function(error) {
                shell.handleError(error);
            });
        };
        this.userClicked = function(data) {
            router.navigate('/users/'+data.id);
        };
    };

    return viewModel;
});
