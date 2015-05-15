<?php

class TestController extends BaseController {

	public function check() {
        return Response::json(array('authenticated'=>Auth::check()));
	}

    public function login() {
        $email = Input::get('email');
        $password = Input::get('password');

        $auth = Auth::attempt(array('email'=>$email, 'password'=>$password));

        return Response::json(array('success'=>$auth));
    }

    public function logout() {
        return Response::json(array('success'=>Auth::logout()));
    }

    public function testuser() {
        $user = new User;

        $user->email = "matthijs_vlaarbos@hotmail.com";
        $user->password = Hash::make('test');

        $user->save();


    }


}
