<?php

use Imagine\Image\Box;
use Imagine\Image\Point;
use Imagine\Image\ImageInterface;
use Imagine\Gd\Imagine;

class AlbumController extends BaseController {

	public function index()
	{
        return Response::json(Album::all());
	}

    public function archive() {
        return 'archive';
    }

    public function show($id) {
        $album = Album::with('photos')->find($id);
        return Response::json($album);
    }

	public function store()	{
        $album = new Album();
        $album->title = Input::get('title');
        $album->user_id = Auth::id();
        $album->Save();

        return Response::json(array('success'=>true));
	}

    public function listPhotos($albumId) {
        $photos = Photo::where('album_id', '=', $albumId)->get();
        
        return Response::json($photos);
    }

    public function showPhoto($albumId, $photoId) {
        $photo = Photo::findOrFail($photoId);

        return Response::json($photo);
    }

    public function postPhotoFile($albumId) {
        $file = Input::file('file');
        $filename_original = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        $mimetype = $file->getMimeType();
        $path = Config::get('app.photo_path');

        $photo = new Photo();
        $photo->description = $filename_original;
        $photo->album_id = $albumId;
        $photo->user_id = Auth::id();
        $photo->mimetype = $mimetype;
        $photo->filename = 'temporary value';

        //calculate new album order value
        $maxAlbumOrder = Photo::where('album_id', $albumId)
            ->max('album_order');

        if ($maxAlbumOrder) {
            $maxAlbumOrder++;
        } else {
            $maxAlbumOrder = 1;
        }
        $photo->album_order = $maxAlbumOrder;

        $photo->save();

        $filename = $photo->id.'.'.$extension;
        $upload_success = $file->move($path, $filename);
        if ($upload_success) {
            $photo->filename = $filename;
            $photo->save();
        } else {
            $photo->delete();
        }
    }

    public function getPhotoFile($albumId, $photoId) {
        $filepath = $this->getPhotoFilePath($photoId);
        $response = Response::make(
            File::get($filepath),
            200
        );
        $response->header('Content-type', 'image/jpeg');

        return $response;
    }

    public function getPhotoFileDownload($albumId, $photoId) {
        $filepath = $this->getPhotoFilePath($photoId);
        $pinfo = pathinfo($filepath);
        $filename = $pinfo['basename'];

        return Response::download($filepath, $filename);
    }

    public function getPhotoFileSmall($albumId, $photoId) {
        $filename = $this->getSmallThumbnailFilepath($photoId);
        if (!file_exists($filename)) {
            $this->generateSmallThumbnail($photoId);
        }
        $response = Response::make(
            File::get($filename),
            200
        );
        $response->header('Content-type', 'image/jpeg');

        return $response;
    }

    public function getPhotoFileLarge($albumId, $photoId) {
        $filename = $this->getLargeThumbnailFilepath($photoId);

        if (!file_exists($filename)) {
            $this->generateLargeThumbnail($photoId);
        }

        $response = Response::make(
            File::get($filename),
            200
        );
        $response->header('Content-type', 'image/jpeg');

        return $response;
    }

    private function getPhotoFilepath($photoId) {
        $path = Config::get('app.photo_path');
        $photo = Photo::findOrFail($photoId);

        return $path.$photo->filename;
    }

    private function getSmallThumbnailFilepath($photoId) {
        $path = Config::get('app.photo_path');
        $photo = Photo::findOrFail($photoId);

        return $path.'small/'.$photo->filename;
    }

    private function getLargeThumbnailFilepath($photoId) {
        $path = Config::get('app.photo_path');
        $photo = Photo::findOrFail($photoId);

        return $path.'large/'.$photo->filename;
    }

    private function generateSmallThumbnail($photoId) {
        $imagine = new Imagine();
        $filepath = $this->getPhotoFilepath($photoId);

        $image = $imagine->open($filepath);
        $size = $image->getSize();
        $width = $size->getWidth();
        $height = $size->getHeight();

        if ($height > $width) {
            $point = new Point(0, ($height-$width)/2);
            $box = new Box($width, $width);
            $image = $image->crop($point, $box);
        }
        elseif ($height < $width) {
            $point = new Point(($width-$height)/2, 0);
            $box = new Box($height, $height);
            $image = $image->crop($point, $box);
        }

        $image = $image->thumbnail(new Box(300,300));

        
        $pinfo = pathinfo($filepath);
        $dirname = $pinfo['dirname'].'/small/';
        $filename = $pinfo['basename'];
        if (!file_exists($dirname)) {
            mkdir($dirname);
        }
        $image = $image->save($dirname.$filename);
    }

    private function generateLargeThumbnail($photoId) {
        $imagine = new Imagine();
        $filepath = $this->getPhotoFilepath($photoId);
        $image = $imagine->open($filepath);
        $image = $image->thumbnail(new Box(1000,1000));

        $pinfo = pathinfo($filepath);
        $dirname = $pinfo['dirname'].'/large/';
        $filename = $pinfo['basename'];
        if (!file_exists($dirname)) {
            mkdir($dirname);
        }
        $image = $image->save($dirname.$filename);
    }
}
