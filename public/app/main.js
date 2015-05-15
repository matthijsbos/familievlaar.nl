requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-3.1.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'jquery': '../lib/jquery/jquery-1.9.1',
        'jquery.ui': '../lib/jquery-ui/js/jquery-ui',
        'jquery.ui.widget': '../lib/jquery-file-upload/js/vendor/jquery.ui.widget',
        'jquery.ui.touch-punch': '../lib/jquery-ui.touch-punch/jquery-ui.touch-punch',
        'backstretch': '../lib/backstretch/jquery.backstretch.min',
        'q': '../lib/q/q',
        'jquery.fileupload': '../lib/jquery-file-upload/js/jquery.file-upload',
        'jquery.fileupload-ui': '../lib/jquery-file-upload/js/jquery.file-upload-ui',
        'jquery.fileupload-image': '../lib/jquery-file-upload/js/jquery.file-upload-image',
        'jquery.fileupload-audio': '../lib/jquery-file-upload/js/jquery.file-upload-audio',
        'jquery.fileupload-video': '../lib/jquery-file-upload/js/jquery.file-upload-video',
        'jquery.fileupload-validate': '../lib/jquery-file-upload/js/jquery.file-upload-validate',
        'jquery.iframe-transport': '../lib/jquery-file-upload/js/iframe-transport',
        'unveil': '../lib/unveil/jquery.unveil',
        'tmpl': '../lib/tmpl/tmpl.min',
        'lazyload': '../lib/lazyload/jquery.lazyload.min',
        'dropzone': '../lib/dropzone/dropzone-amd' //TODO add moxie polyfill
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        'unveil': ['jquery']            
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'q'],  
        function (system, app, viewLocator, Q) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'Familie Vlaar';

    //setup q to handle durandal framework promises
    system.defer = function(action) {
        var deferred = Q.defer();
        action.call(deferred, deferred);
        var promise = deferred.promise;
        deferred.promise = function() {
            return promise;
        };
        return deferred;
    };

    app.configurePlugins({
        router:true,
        dialog: true,
        widget: true
    });

    app.start().then(function() {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell', 'entrance');
    });
});
