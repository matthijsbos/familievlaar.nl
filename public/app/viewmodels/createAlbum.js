define(['plugins/router', 'knockout', 'jquery'], function(router, ko, $) {
    var viewModel = function() {
        var self = this;
        this.title = ko.observable("");
        this.submitButtonClicked = function() {
            var data = { title: self.title() };
            var request = $.post('/api/v1/albums', data);
            request.done(function(data) {
                router.navigate('/'); 
            });
        };
    }; 

    return viewModel;
});
