<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('user', function($table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('email')
                ->unqiue();
            $table->string('password')
                ->nullable();
            $table->boolean('admin')
                ->default(false);
            $table->string('login_token');
            $table->string('remember_token')
                ->nullable();
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::dropIfExists('user');
	}

}
