<?php 

class Photo extends Eloquent {
    protected $table = 'photo';
    protected $appends = array(
        'previous_photo_id', 'next_photo_id', 'original', 
        'download', 'thumbnail_small', 'thumbnail_large'
    );

    public function getPreviousPhotoIdAttribute() {
        $first = Photo::where('album_id', '=', $this->album_id)
            ->where('album_order', '<', $this->album_order)
            ->orderBy('album_order', 'desc')
            ->first();
        if ($first) {
            return $first->id;
        }
    }

    public function getNextPhotoIdAttribute() {
        $first = Photo::where('album_id', $this->album_id)
            ->where('album_order', '>', $this->album_order)
            ->orderBy('album_order', 'asc')
            ->first();
        if ($first) {
            return $first->id;
        }
    }

    public function getOriginalAttribute() {
        return route('photo_original',
            array(
                'albumId'=>$this->album_id,
                'photoId'=>$this->id
            )
        );
    }

    public function getDownloadAttribute() {
        return route('photo_download',
            array(
                'albumId'=>$this->album_id,
                'photoId'=>$this->id
            )
        );
    }

    public function getThumbnailSmallAttribute() {
        return route('photo_thumbnail_small',
            array(
                'albumId'=>$this->album_id,
                'photoId'=>$this->id
            )
        );
    }

    public function getThumbnailLargeAttribute() {
        return route('photo_thumbnail_large',
            array(
                'albumId'=>$this->album_id,
                'photoId'=>$this->id
            )
        );
    }
}
