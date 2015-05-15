define(["plugins/router","knockout", "jquery", "backend", 'viewmodels/shell'], 
        function(router, ko, $, be, shell) {

    var model = function() {
        var self = this;
        self.email = ko.observable("");
        self.password = ko.observable("");
        self.remember = ko.observable(false);
        self.errors = ko.observable({});
        self.formSubmitted = function() {
            be.login(self.email(), self.password())
            .then(function(data) {
                shell.login({ email: self.email() });
                router.navigate('/');
            })
            .then(null, function(error) {
                if (error instanceof be.ValidationError) {
                    self.errors(error.messages);
                } else {
                    fe.getManager().handleError(error);
                }
            });
        };
        self.resetPasswordButtonClicked = function() {
            router.navigate('forgotPassword');
        };
    };

    return model;
});
