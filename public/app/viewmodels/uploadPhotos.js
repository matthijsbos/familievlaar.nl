define(['jquery', 'dropzone'], function($, dz) {
    var viewModel = function() {
        var self = this;
        this.albumId;
        this.activate = function(albumId) {
            self.albumId = albumId;
        };
        this.compositionComplete = function() {
            var url = '/api/v1/albums/' + self.albumId + '/photos/';
            var options = {
                url: url,
                maxFilesize: 10, //mb
            };
            $('div#uploader').dropzone(options);
        };

    };

    return viewModel; 
});
