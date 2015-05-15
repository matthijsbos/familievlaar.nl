define(["plugins/router", "knockout", "jquery"], function(router, ko, $) {
    var viewModel = function() {
        var self = this;
        this.email = ko.observable("");
        this.password = ko.observable("");
        this.admin = ko.observable(false);
        this.errors = ko.observable({});
        this.formSubmitted = function() {
            var data = { 
                email: self.email(),
                password: self.password(),
                admin: self.admin()
            };

            var xhr = $.post("/api/v1/users/", data)
                .done(function() {
                    router.navigate("/users/");
                })
                .fail(function(jqxhr) {
                    var data = $.parseJSON(jqxhr.responseText);
                    self.errors(data);
                });
        };
    };

    return viewModel;
});
