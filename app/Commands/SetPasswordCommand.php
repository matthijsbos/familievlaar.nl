<?php namespace App\Commands;

use Hash;

use App\Commands\Command;
use App\User;

use Illuminate\Contracts\Bus\SelfHandling;

class SetPasswordCommand extends Command implements SelfHandling {

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct(User $user, $password)
	{
        $this->user = $user;
        $this->password = $password;
	}

	/**
	 * Execute the command.
	 *
	 * @return void
	 */
	public function handle()
	{
        $hashed = Hash::make($this->password);

        $this->user->password = $hashed;
        $this->user->save();
	}

}
