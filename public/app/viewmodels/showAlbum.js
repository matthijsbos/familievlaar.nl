define(["plugins/router", "knockout", "jquery", 'backend', 'lazyload', 'viewmodels/shell'],
        function(router, ko, $, be, lazyload, shell) {
    var imgurl = "http://www.simpsoncrazy.com/content/pictures/family/SimpsonsFamily2.gif";
    
    var viewModel = function() {
        var self = this;
        this.title = ko.observable('');
        this.photos = ko.observableArray();
        this.album = ko.observable();

        this.photoClicked = function(photo) {
            router.navigate('/albums/'+photo.album_id+'/photos/'+photo.id);
        };
        this.uploadButtonClicked = function() {
            router.navigate('/albums/'+self.album().id+'/upload');
        };
        this.activate = function(albumId) {
            be.getAlbum(albumId)
            .then(function(data) {
                self.title(data.title); 
                self.photos(data.photos); 
                $('img.lazy').lazyload();
            })
            .then(null, function(error) {
                shell.handleError(error);
            });
        };
        this.compositionComplete = function() {
            $('img.lazy').lazyload();
        };
    };

    return viewModel;
});
