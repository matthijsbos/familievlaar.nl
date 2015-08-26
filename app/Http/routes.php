<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('home');
});

Route::filter('authenticated', function() {
    if (!Auth::check()) {
        App::abort(401, 'Not authenticated');
    }
});

Route::filter('admin', function() {
    if (!Auth::user()->admin) {
        App::abort(403, 'Not authorized, admin only');
    }
});

Route::group(array('prefix'=>'api/v1'), function() {
    Route::get( '/login', 'UserController@current');
    Route::post('/login', 'UserController@login');
    Route::get( '/setup', 'UserController@setup');
    Route::put( '/password', 'UserController@setPassword');

    // routes available to authenticated users only
    Route::group(array('before'=>'authenticated'), function() { 
        Route::get( '/logout', 'UserController@logout');
        Route::post('/logout', 'UserController@logout');

        Route::get('/albums/{albumId}/photos', 'AlbumController@listPhotos');
        Route::post('/albums/{albumId}/photos', 'AlbumController@postPhotoFile');
        Route::get('/albums/{albumId}/photos/{photoId}', 'AlbumController@showPhoto');
        Route::get('/albums/{albumId}/photos/{photoId}/file', 
            array(
                'as'=>'photo_original',
                'uses'=>'AlbumController@getPhotoFile'
            )
        );
        Route::get('/albums/{albumId}/photos/{photoId}/file/download', 
            array(
                'as'=>'photo_download',
                'uses'=>'AlbumController@getPhotoFileDownload'
            )
        );
        Route::get('/albums/{albumId}/photos/{photoId}/file/small', 
            array(
                'as'=>'photo_thumbnail_small',
                'uses'=>'AlbumController@getPhotoFileSmall'
            )
        );
        Route::get('/albums/{albumId}/photos/{photoId}/file/large', 
            array(
                'as'=>'photo_thumbnail_large',
                'uses'=>'AlbumController@getPhotoFileLarge'
            )
        );
        Route::resource('/albums', 'AlbumController');
        Route::resource('/comments', 'PhotoController');
        Route::resource('/tags', 'PhotoController');
        Route::resource('/familymember', 'FamiliyMemberController');
        Route::resource('/relationship', 'RelationshipController');

        // routes available to admin users only
        Route::group(array('before'=>'admin'), function() {
            // /users/*
            Route::get( '/users/', 'UserController@index');
            Route::post('/users/', 'UserController@create');
            Route::get( '/users/{userId}', 'UserController@show');
        });
    });
});

