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
            //shell.transparentNavbar(false);
        };
    };

    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //This pattern is also recognized by Durandal so that it can create instances on demand.
    //If you wish to create a singleton, you should export an object instead of a function.
    //See the "flickr" module for an example of object export.

    return viewModel;
});
