define(["plugins/router", "knockout", "jquery", 'viewmodels/shell', 'backend'], 
        function(router, ko, $, shell, be) {
    var viewModel = function () {
        var self = this;

        this.isAdmin = ko.observable(false);
        this.passwordSet = ko.observable(true);

        this.createAlbumButtonClicked = function() {
            router.navigate('/albums/create');
        };
        this.albumClicked = function(data) {
            router.navigate('/albums/'+data.id); 
        };
        this.activate = function() {
            $.backstretch(['/img/bg2.jpg'],{ fade:1000});
            shell.transparentNavbar(true);
            be.currentLogin().then(function(data) {
                self.passwordSet(data.password_set);
                self.isAdmin(data.admin);
            });
        };
        this.deactivate = function() {
            $.backstretch(['/img/bg1.jpg'],{ fade:1000});
            shell.transparentNavbar(false);
        };
    };

    return viewModel;
});
