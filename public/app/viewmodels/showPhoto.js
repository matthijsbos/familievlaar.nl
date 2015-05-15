define(['jquery', 'knockout', 'backend', 'viewmodels/shell', 'plugins/router'], 
    function($, ko, be, shell, router) {
    var viewModel = function() {
        var self = this;

        this.id = ko.observable();
        this.albumId = ko.observable();
        this.description = ko.observable();
        this.imageUrl    = ko.observable();
        this.originalUrl = ko.observable();
        this.downloadUrl = ko.observable();
        this.nextPhotoId = ko.observable(false);
        this.prevPhotoId = ko.observable(false);
        this.comments = ko.observableArray();
        this.coordinates = ko.observable('');
        this.newComment = ko.observable();
        this.tags = ko.observableArray();

        this.activate = function(albumId, photoId) {
            be.getPhoto(albumId, photoId)
            .then(function(data) {
                self.id(data.id);
                self.albumId(data.album_id);
                self.description(data.description);
                self.imageUrl(data.thumbnail_large);
                self.originalUrl(data.original);
                self.downloadUrl(data.download);
                if (data.longtitude && data.lattitude) {
                    self.coordinates(data.longtitude.toString() + ',' 
                        + data.lattitude.toString());
                }
                self.nextPhotoId(data.next_photo_id);
                self.prevPhotoId(data.previous_photo_id);
            })
            .then(null, function(error) {
                shell.handleError(error);
            });
        };

        this.photoClicked = function() {
            
        };

        this.prevButtonClicked = function() {
            router.navigate('/albums/'+self.albumId()+'/photos/'+self.prevPhotoId());
        };

        this.nextButtonClicked = function() {
            router.navigate('/albums/'+self.albumId()+'/photos/'+self.nextPhotoId());
        };

        this.commentFormSubmitted = function() {
            self.comments.push({ 'text': self.newComment() });
            self.newComment('');
        };

        this.tagClicked = function() {

            document.getElementById("photo").scrollIntoView();
            var photo = $("#photo");
            var width = photo.innerWidth();
            var height = photo.innerHeight();
            var div = $("<div/>");
            div.css("margin", "0px");
            div.css("padding", "0px");
            div.css("position", "absolute");
            div.css("border", "2px solid #333");  
            var tagpos = {  left:   55, //percentages
                            top:    50,
                            width:  20, 
                            height: 20 };
            div.css("left", tagpos.left+"%");
            div.css("top", tagpos.top+"%");
            div.css("width", tagpos.width+"%");
            div.css("height", tagpos.height+"%");

            photo.append(div);

            div.popover({ placement:'bottom', 
                          title:'<input type="text" />',
                          html:true,
                          content:'<form class="inline-form" role="form"><div class="form-group"><input class="form-control" type="text" />',
                          trigger: 'manual' })
               .popover('show');


            var move = $('<span/>')
                .addClass('glyphicon glyphicon-move');
            var moveDiv = $('<div/>');
            moveDiv.append(move);
            moveDiv.css("border", "2px solid #333");  
            moveDiv.css("background", "#FFF");  
            moveDiv.css("padding", "2px");  
            moveDiv.css('display', 'inline-block');
            moveDiv.css('position', 'absolute');
            moveDiv.css('left', '-10px');
            moveDiv.css('top', '-10px');
            div.append(moveDiv);

             var move = $('<span/>')
                .addClass('glyphicon glyphicon-resize-horizontal');
            var moveDiv = $('<div/>');
            moveDiv.append(move);
            moveDiv.css("border", "2px solid #333");  
            moveDiv.css("background", "#FFF");  
            moveDiv.css("padding", "2px");  
            moveDiv.css('display', 'inline-block');
            moveDiv.css('position', 'absolute');
            moveDiv.css('right', '-10px');
            moveDiv.css('top', '-10px');
            div.append(moveDiv);

             var move = $('<span/>')
                .addClass('glyphicon glyphicon-resize-vertical');
            var moveDiv = $('<div/>');
            moveDiv.append(move);
            moveDiv.css("border", "2px solid #333");  
            moveDiv.css("background", "#FFF");  
            moveDiv.css("padding", "2px");  
            moveDiv.css('display', 'inline-block');
            moveDiv.css('position', 'absolute');
            moveDiv.css('left', '-10px');
            moveDiv.css('bottom', '-10px');
            div.append(moveDiv);

                                                                    
        }
    };

    return viewModel;
});
