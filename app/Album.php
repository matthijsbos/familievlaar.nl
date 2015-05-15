<?php

class Album extends Eloquent {
    protected $table = 'album';

//    protected $appends = array('thumbnail_small');
//
//    public function getThumbnailSmallAttribute() {
//        return route('photo_thumbnail_small',
//            array(
//                'albumId'=>$this->id,
//                'photoId'=>Photo::where('album_id', $this->id)->first()->id
//            )
//        );
//    }

    public function photos() {
        return $this->hasMany('Photo', 'album_id', 'id');
    }
}
