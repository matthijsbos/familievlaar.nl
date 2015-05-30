define(['knockout', 'backend', 'viewmodels/shell', 'plugins/router'], 
        function(ko, be, shell, router) {
    var viewModel = function() {
        var self = this;
        this.albums = ko.observableArray();
        this.albumClicked = function(album) {
            router.navigate('albums/'+album.id);
        };
        this.activate = function() {
            be.listAlbums()
            .then(function(data) {
                self.albums(data);
            })
            .then(null, function(error) {
                shell.handleError(error);
            });
        };
    };

    return viewModel;
});
    
