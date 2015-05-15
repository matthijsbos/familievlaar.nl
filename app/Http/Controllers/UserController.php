<?php

class UserController extends BaseController {

    /*
     * Lists all users
     * HTTP status codes
     * - 200 OK
     *      returns json array
     * - 401 Not authenticated (route filter)
     * - 403 Not authorized (route filter)
     */
    public function index() {
        return User::all()->toArray();
    }

    public function current() {
        if (Auth::check()) {
            $user = Auth::user();
            $data = array(
                'id'=>$user->id,
                'email'=>$user->email,
                'admin'=>$user->admin
            );

            return Response::json($data);
        } else {
            App::abort(401);
        }
    }

    /*
     * Authenticates the current user
     * HTTP status codes
     * - 200 OK
     * - 422 Validation error
     */
    public function login() {

        $data = Input::only('email', 'password');
        
        $validator = Validator::make(
            $data,
            array(
                'email'=>'required|email',
                'password'=>'required'
            )
        );
        
        if ($validator->fails()) {
            return Response::json($validator->messages(), 422);
        }

        if (Auth::attempt($data)) {
            return Response::json(array('success' => Auth::id()));
        } else {
            return Response::json(
                array(
                    'password'=>array('the provided password is incorrect')
                ), 
                422
            );
        }
    }

    public function logout() {
        Auth::logout();

        return Response::json(array('success' => true));
    }

    public function resetPassword() {
        $validator = Validator::make(
            Input::only('email'),
            array(
                'email' => 'required|exists:user,email'
            )
        );

        if ($validator->fails()) {
            return Response::json($validator->messages(), 422);
        }

        
        Mail::queue('email.invitation', Array(), function($message) {
            $message->to('matthijs_vlaarbos@hotmail.com', 'Matthijs Bos')
                ->subject('test');
        });

        return Response::make('', 204);
    }

	public function create()
	{
        $email = Input::get('email');
        $password = Input::get('password');
        $admin = Input::get('admin');

        $validator = Validator::make(
            //data
            Input::only('email', 'password', 'admin'),
            //rules
            array(
                'email' => 'email|required|unique:user,email', 
                'password' => 'required|min:6',
                'admin' => 'required'
            )
        );
        
        if ($validator->fails()) {
            return Response::json($validator->messages(), 422);
        }

        $user = new User;
        $user->email = $email;
        $user->password = Hash::make($password);
        $user->admin = $admin;
        $user->save();

        return Response::json(array('success' => true));
	}

	public function show($userId)
	{
        return Response::json(User::find($userId)->toArray());
	}

    public function setup() {

        if (User::all()->count() > 0) {
            App::abort(404);
        }

        $email = Input::get('email');
        $password = Input::get('password');

        $user = new User;
        $user->email = $email;
        $user->password = Hash::make($password);
        $user->admin = true;
        $user->save();
        return 'setup complete';

    }
}
