define(['jquery', 'q'], function($, Q) {
    var module = function() {
        var self = this;
        
        /*
         * Custom errors
         * Based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
         *
         * NetworkError represents an error on the network, such as timeout
         */
        this.NetworkError = function() { };
        this.NetworkError.prototype = new Error();
        this.NetworkError.prototype.name = "NetworkError";
        this.NetworkError.prototype.constructor = this.NetworkError;

        /*
         * ServerError represents the case in which the server could not fulfull
         * the request 
         * http 500+
         */
        this.ServerError = function() { };
        this.ServerError.prototype = new Error();
        this.ServerError.prototype.name = "ServerError";
        this.ServerError.prototype.constructor = this.ServerError;

        /*
         * NotFoundError represents a 404 case
         */
        this.NotFoundError = function() { };
        this.NotFoundError.prototype = new Error();
        this.NotFoundError.prototype.name = "NotFoundError";
        this.NotFoundError.prototype.constructor = this.NotFoundError;

        /*
         * AuthenticationError represents the case in which the user is
         * required to authenticate to acceess the resource.
         * http 401
         */
        this.AuthenticationError = function() { };
        this.AuthenticationError.prototype = new Error();
        this.AuthenticationError.prototype.name = "AuthenticationError";
        this.AuthenticationError.prototype.constructor = this.AuthenticationError;

        /*
         * AuthorizationError represents the case in which the currently 
         * authenticated user is not authorized to access the requested 
         * resource.
         * http 403
         */
        this.AuthorizationError = function() { };
        this.AuthorizationError.prototype = new Error();
        this.AuthorizationError.prototype.name = "AuthorizationError";
        this.AuthorizationError.prototype.constructor = this.AuthorizationError;

        /*
         * ValidationError represents the case in which the submitted resource
         * is not valid for the current endpoint
         * http 415 "Unsupported Media Type"
         * http 422 "Unprocessable Entity"
         */
        this.ValidationError = function(messages) { 
            this.messages = messages;
        };
        this.ValidationError.prototype = new Error();
        this.ValidationError.prototype.name = "ValidationError";
        this.ValidationError.prototype.constructor = this.ValidationError;

        /*
         * Performs an ajax json request. options similar to $.ajax()
         */
        var ajaxJSON = function(url, options) {
            options = options || {};
            options.dataType = "json";

            /*
             * Create a new promise object in which the http request in 
             * initialized. If an error occurs, the promise's reject
             * handler is called.
             */
            var promise = new Q.Promise(function(resolve, reject) {
                //create the ajax request
                var req = $.ajax(url, options);

                req.done(function(data, textStatus, jqXHR) {
                    resolve(data);
                });

                req.fail(function(jqXHR, textStatus, errorThrown) {
                    /*
                     * Handle http request error response and reject 
                     */
                    var error = null;

                    if (jqXHR.status == 401) {
                        error = new self.AuthenticationError();
                    } else if (jqXHR.status == 403) {
                        error = new self.AuthorizationError();
                    } else if (jqXHR.status >= 500) {
                        error = new self.ServerError();
                    } else if (jqXHR.status == 404) {
                        error = new self.NotFoundError();
                    } else if (jqXHR.status == 415 || jqXHR.status == 422) {
                        if (jqXHR.responseText) {
                            var messages = $.parseJSON(jqXHR.responseText);
                        }
                        error = new self.ValidationError(messages);
                    } else if (textStatus == "timeout" || 
                        textStatus == "error" || textStatus == "abort") {
                        error = new self.NetworkError();
                    } else {
                        error = new Error("Unknown error");
                    }

                    reject(error); 
                });
            });

            return promise;
        };

        /*
         * helper function for json get requests. uses ajaxJSON internally
         */
        var getJSON = function(url, data, options) {
            options = options || {};
            options.type = 'GET';
            if (data) {
                options.data = data;
            }

            return ajaxJSON(url, options);
        }

        /*
         * helper function for json post requests. uses ajaxJSON internally.
         */
        var postJSON = function(url, data, options) {
            options = options || {};
            options.type = 'POST';

            if (data) {
                options.data = JSON.stringify(data);
                options.contentType = "application/json; charset=utf-8";
            }

            return ajaxJSON(url, options);
        };

        /*
         * Constants
         */

        var API_PREFIX          = '/api/v1',
            LOGIN_PATH          = API_PREFIX + '/login',
            LOGOUT_PATH         = API_PREFIX + '/logout',
            CREATE_ALBUM_PATH   = API_PREFIX + '/albums',
            LIST_ALBUMS_PATH    = API_PREFIX + '/albums',
            LIST_USERS_PATH     = API_PREFIX + '/users';

        this.login = function(email, password) {
            var data = { email:email, password:password };
            return postJSON(LOGIN_PATH, data);
        };

        /*
         * Gets the current user login information from the server. 
         */
        this.currentLogin = function() {
            return getJSON(LOGIN_PATH);
        };

        this.logout = function() {
            return postJSON(LOGOUT_PATH);
        };

        this.resetPassword = function(email) {
            var data = { email: email };
            return postJSON(API_PREFIX + '/resetPassword', data);
        };

        this.createAlbum = function(title) {
            return postJSON(CREATE_ALBUM_PATH, { title: title });
        };

        this.listAlbums = function() {
            return getJSON(LIST_ALBUMS_PATH);
        };

        this.listUsers = function() {
            return getJSON(LIST_USERS_PATH);
        };

        this.listPhotos = function(albumId) {
            return getJSON(API_PREFIX + '/albums/'+albumId+'/photos');
        };

        this.getAlbum = function(albumId) {
            return getJSON(API_PREFIX + '/albums/'+albumId);
        };

        this.getPhoto = function(albumId, photoId) {
            return getJSON(API_PREFIX + '/albums/'+albumId+'/photos/'+photoId);
        };

        this.getUser = function(userId) {
            return getJSON(API_PREFIX + '/users/' + userId);
        };
    };

    return new module();
});
