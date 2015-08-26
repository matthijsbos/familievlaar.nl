define(['knockout', 'viewmodels/shell', 'backend'],
    function(ko, shell, be) {
        var viewModel = function() {
            var self = this;

            self.email = ko.observable();
            self.admin = ko.observable();
            self.passwordSet = ko.observable();
            self.password = ko.observable();
            self.confirmPassword = ko.observable();
            
            self.setPasswordFormSubmitted = function() {
                self.password('');
                self.confirmPassword('');
            };

            self.changePasswordFormSubmitted = function() {
                be.setPassword(self.password()).then(function() {
                    self.password('');
                    self.confirmPassword('');
                }).then(null, function(error) {
                    shell.handleError(error);   
                });
            };

            self.activate = function() {
                be.currentLogin().then(function(data) {
                    self.email(data.email);
                    self.admin(data.admin);
                    self.passwordSet(data.password_set);
                });
            };
        };

        return viewModel;
});
