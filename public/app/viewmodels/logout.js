define(['plugins/router', 'backend', 'viewmodels/shell', 'knockout'], 
    function(router, be, shell, ko) {
    var viewModel = function() {
        var self = this;
        var timer = null;
        this.countdown = ko.observable();
        this.countdown.subscribe(function() {
            if (self.countdown() > 0) {
                timer = window.setTimeout(function() {
                    self.countdown(self.countdown()-1);
                }, 1000);
            } else {
                router.navigate('/'); 
                timer = null;
            }

        });
        this.activate = function() {
            be.logout()
            .then(function() {
                shell.login(null);
                self.countdown(3);
                
            })
            .then(null, function(error) {
                shell.handleError(error);
            });
        };
        this.deactivate = function() {
            if (timer) {
                window.clearTimeout(timer);
                timer = null;
            }
        };
    };

    return viewModel;
});
