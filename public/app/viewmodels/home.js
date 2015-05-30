define(["plugins/router", "knockout", "jquery", 'viewmodels/shell', 'backend'], 
        function(router, ko, $, shell, be) {
    var viewModel = function () {
        var self = this;

        this.albums = ko.observableArray();
        this.createAlbumButtonClicked = function() {
            router.navigate('/albums/create');
        };
        this.albumClicked = function(data) {
            router.navigate('/albums/'+data.id); 
        };
        this.activate = function() {
            $.backstretch(['/img/bg2.jpg'],{ fade:1000});
            shell.transparentNavbar(true);
        };
        this.deactivate = function() {
            $.backstretch(['/img/bg1.jpg'],{ fade:1000});
            shell.transparentNavbar(false);
        };
    };

    return viewModel;
});
