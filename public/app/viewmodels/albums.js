define(['knockout', 'backend', 'viewmodels/shell', 'plugins/router', 'jquery', 'gridmanager', 'jquery.ui'], 
        function(ko, be, shell, router, $, gridmanager) {
    var viewModel = function() {
        var self = this;
        self.albums = ko.observableArray();
        self.albumClicked = function(album) {
            router.navigate('albums/'+album.id);
        };
        self.createButtonClicked = function() {
            alert('TODO: create new');
        };
        self.editOrder = ko.observable(false);
        self.editOrderButtonClicked = function() {
            self.editOrder(!self.editOrder);
            $('.gridmanager').gridmanager();
        }
        self.activate = function() {
            /*be.listAlbums()
            .then(function(data) {
                self.albums(data);
            })
            .then(null, function(error) {
                shell.handleError(error);
            });
            */



            self.albums([{
                id: 2, 
                count: 6,
                title: 'Familieweekend 2014',
                thumbnailUrl: 'http://www.garethjmsaunders.co.uk/blueprint/placeholders/gif/square/span-11.gif'
            },{
                id: 2, 
                count: 36,
                title: 'Familieweekend 2014',
                thumbnailUrl: 'http://www.garethjmsaunders.co.uk/blueprint/placeholders/gif/square/span-11.gif'
            },{
                id: 2, 
                count: 6,
                title: 'Familieweekend 2014',
                thumbnailUrl: 'http://www.garethjmsaunders.co.uk/blueprint/placeholders/gif/square/span-11.gif'
            },{
                id: 2, 
                count: 6,
                title: 'Familieweekend 2014',
                thumbnailUrl: 'http://www.garethjmsaunders.co.uk/blueprint/placeholders/gif/square/span-11.gif'
            },{
                id: 2, 
                count: 6,
                title: 'Familieweekend 2014',
                thumbnailUrl: 'http://www.garethjmsaunders.co.uk/blueprint/placeholders/gif/square/span-11.gif'
            },{
                id: 2, 
                count: 6,
                title: 'Familieweekend 2014',
                thumbnailUrl: 'http://www.garethjmsaunders.co.uk/blueprint/placeholders/gif/square/span-11.gif'
            }]);
        };
    };

    return viewModel;
});
    
