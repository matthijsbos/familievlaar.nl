<?php namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use App\Commands\CreateUserCommand;
use Bus;

class CreateUserConsoleCommand extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'user:create';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Creates a new user';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function fire()
	{
        if (!empty($this->option('email'))) {
            $email = $this->option('email');
        }

        if (!empty($this->option('password'))) {
            $password = $this->option('password');
        } elseif (!empty($this->option('nopassword'))) {
            $password = NULL;
        }

        if (!empty($this->option('admin'))) {
            $admin = true;
        } elseif (!empty($this->option('noadmin'))) {
            $admin = false;
        }

        if (!isset($email)) {
            $email = $this->ask('What is the user\'s email address?');
        }

        if (!isset($password) && !($password == null)) {
            if ($this->confirm('Do you want to set a password?')) {
                $password = $this->secret('What is the user\'s password?');
            } else {
                $password = null;
            }
        }

        if (!isset($admin)) {
            $admin = $this->confirm('Is this user an administrator?');
        }

        $cmd = new CreateUserCommand($email, $password, $admin);
        $cmd->handle();
	}

	/**
	 * Get the console command arguments.
	 *
	 * @return array
	 */
	protected function getArguments()
	{
		return [
			//['email', InputArgument::REQUIRED, 'user\'s email address'],
		];
	}

	/**
	 * Get the console command options.
	 *
	 * @return array
	 */
	protected function getOptions()
	{
		return [
            ['email', NULL, InputOption::VALUE_OPTIONAL, 'new user\'s email address', null],
			['nopassword', NULL, InputOption::VALUE_NONE, 'no password', null],
			['password', NULL, InputOption::VALUE_OPTIONAL, 'user\'s password', null],
            ['admin', NULL, InputOption::VALUE_NONE, 'set if user is admin', null],
            ['noadmin', NULL, InputOption::VALUE_NONE, 'set if user is admin', null],
		];
	}

}
