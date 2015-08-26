<?php namespace App\Commands;

use App\Commands\Command;
use App\User;
use Uuid;
use Hash;

use Illuminate\Contracts\Bus\SelfHandling;

class CreateUserCommand extends Command implements SelfHandling {

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
    public function __construct($email, $password=NULL, $admin=false)
	{
        $this->email = $email;
        $this->password= $password;
        $this->admin = $admin;
	}

	/**
	 * Execute the command.
	 *
	 * @return void
	 */
	public function handle()
	{
        if (empty($this->password)) {
            $hashed = null;
        } else {
            $hashed = Hash::make($this->password);
        }

        $trimmed = trim($this->email);

        $user = new User();
        $user->email = $trimmed;
        $user->password = $hashed;
        $user->admin = $this->admin;
        $user->login_token = Uuid::generate(4);
        $user->save();
	}

}
