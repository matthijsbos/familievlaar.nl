<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;

class User extends Model implements AuthenticatableContract {

    use Authenticatable;

    protected $table = 'user';
    protected $hidden = ['password', 'login_token', 'remember_token'];
    protected $appends = ['password_set'];
    protected $casts = [
        'admin' => 'boolean',
    ];

    public function getPasswordSetAttribute() {
        return !empty($this->password);
    }
}
