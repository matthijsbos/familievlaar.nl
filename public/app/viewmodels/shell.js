define(['plugins/router', 'durandal/app', 'knockout', 'plugins/history', 
    'backend', 'jquery', 'bootstrap', 'backstretch'],
    function (router, app, ko, history, be, $)  {
    
    /*
     * Shell class singleton instance
     */
    var shellInstance = null;

    /*
     * Shell class
     */
    var Shell = function() {
        self = this;
        this.title = app.title;
        this.router = router;
        this.error = ko.observable();
        this.error.subscribe(function() {
            if (self.error()) {
                window.setTimeout(function() {
                    self.error('');
                }, 5000);
            }
        });

        this.login = ko.observable();
        this.transparentNavbar = ko.observable(false);

        this.logoutButtonClicked = function() {
            be.logout()
            .then(function() {
                self.login(null);
                router.navigate("/login");
            })
            .then(null, function(error) {
                fe.getManager.handleError(error);
            });
        };
        this.handleError = function(error) {
            if (error instanceof be.AuthenticationError) { 
                self.error('U dient eerst in te loggen');
                router.navigate('/login');
            } else if (error instanceof be.AuthorizationError) {
                self.error('you must be an admin!');
                history.navigateBack();
            } else if (error instanceof be.NotFoundError) {
                self.error('Couldn\'t load url');
            } else if (error instanceof be.ServerError) {
                self.error('server error...');   
            } else if (error instanceof be.NetworkError) {
                self.error('network error...');    
            } else if (error instanceof be.ValidationError) {
                self.error('Validation error');    
            } else {
                self.error('Unknown error');
                throw error;
            }
        };

        this.activate = function () {
            /*
             * Check that user is logged in
             */

            $.backstretch(['/img/bg1.jpg'],{fade:1000});

            /*
             * Register durandal app routes
             */
            router.map(
            [{ 
                route: '',             
                title: 'Home',             
                moduleId: 'viewmodels/home'  
            }, { 
                route: 'about',        
                title: 'Over deze website',         
                moduleId: 'viewmodels/about' 
            }, { 
                route: 'login',        
                title: 'Inloggen',         
                moduleId: 'viewmodels/login' 
            }, { 
                route: 'logout',       
                title: 'Uitloggen',        
                moduleId: 'viewmodels/logout' 
            }, { 
                route: 'lostEmail',
                title: 'Stuur e-mail opnieuw',
                moduleId: 'viewmodels/lostEmail' 
            }, { 
                route: 'forgotPassword',
                title: 'Wachtwoord vergeten',
                moduleId: 'viewmodels/forgotPassword' 
            }, { 
                route: 'forgotPasswordComplete',
                title: 'Wachtwoord vergeten',
                moduleId: 'viewmodels/forgotPasswordComplete' 
            }, { route: 'albums',       title: 'Fotoalbums',       moduleId: 'viewmodels/albums' },
                { route: 'albums/create',title: 'Nieuw fotoalbum',  moduleId: 'viewmodels/createAlbum' },
                { route: 'albums/:albumId',   
                                         title: 'Fotoalbum',        moduleId: 'viewmodels/showAlbum' },
                { route: 'albums/:albumId/upload',    
                                         title: 'Foto\'s uploaden', moduleId: 'viewmodels/uploadPhotos' },
                { route: 'albums/:albumId/photos/:photoId',   
                                         title: 'Foto',             moduleId: 'viewmodels/showPhoto' },
                { route: 'users',        title: 'Gebruikers',       moduleId: 'viewmodels/listUsers' },
                { route: 'users/create', title: 'Nieuwe gebruiker', moduleId: 'viewmodels/createUser' },
                { route: 'users/:id',    title: 'Gebruiker',        moduleId: 'viewmodels/showUser' },
                { route: 'user',         title: 'Gebruiker',        moduleId: 'viewmodels/user' },
            ]).buildNavigationModel();

            /*
             * Hide menu when navigating.
             */
            router.on('router:route:activating', function() {
                $('#menu').collapse('hide');
            });


            return router.activate().then(function(data) {
                return be.currentLogin();
            }).then(function(data) {
                self.login(data); 
            })
            .then(null, function(error) {
                /* error */
                self.login(null);
                /*
                 * catch authentication error 401 since we manually want
                 * to handle this type of exceptions and redirect to
                 * the login page.
                 */
                if (error instanceof be.AuthenticationError) {
                    router.navigate('login');
                } else {
                    self.handleError(error);
                }
            });
        }

    };

    if (shellInstance == null) {
        shellInstance = new Shell();
    }
    return shellInstance;
});
