<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class V1 extends Migration {

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
            $table->string('email')->unique();
            $table->string('password');
            $table->boolean('admin')
                ->nullable()
                ->default(false);
            $table->string('remember_token', 100)
                ->nullable();
            $table->integer('family_member_id')
                ->nullable()
                ->unsigned();
        });

	    Schema::create('album', function($table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('title');//required
            $table->integer('user_id')//required
                ->unsigned();
            $table->foreign('user_id')
                ->references('id')
                ->on('user');
        });    

        Schema::create('photo', function($table) {
            $table->increments('id');
            $table->timestamps();
            $table->text('description'); //required
            $table->string('mimetype', 100); //required
            $table->string('filename', 100); //required
            $table->datetime('datetime')
                ->nullable();
            $table->float('longtitude')
                ->nullable();
            $table->float('lattitude')
                ->nullable();
            $table->integer('album_order') //required
                ->unsigned();
            $table->integer('album_id') //required
                ->unsigned();
            $table->foreign('album_id')
                ->references('id')
                ->on('album');
            $table->integer('user_id') //required
                ->unsigned();
            $table->foreign('user_id')
                ->references('id')
                ->on('user');
        });

        Schema::create('comment', function($table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('text');
            $table->integer('user_id')
                ->unsigned();
            $table->foreign('user_id')
                ->references('id')
                ->on('user');
            $table->integer('photo_id')
                ->unsigned();
            $table->foreign('photo_id')
                ->references('id')
                ->on('photo');
        });

        Schema::create('tag', function($table) {
            $table->increments('id');
            $table->timestamps();
            $table->float('x') // percentage
                ->unsigned(); 
            $table->float('y') // percentage
                ->unsigned();
            $table->integer('photo_id')
                ->unsigned();
            $table->foreign('photo_id')
                ->references('id')
                ->on('photo');
        });

        Schema::create('family_member', function($table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('firstname');
            $table->string('lastname');
            $table->date('dateofbirth');
            $table->boolean('dead')
                ->default(false);
            $table->date('dateofdeath');
        });

        Schema::create('relationship', function($table) {
            $table->increments('id');
            $table->timestamps();
            $table->integer('family_member_a_id')
                  ->unsigned();
            $table->foreign('family_member_a_id')
                  ->references('id')
                  ->on('family_member');
            $table->integer('family_member_b_id')
                  ->unsigned();
            $table->foreign('family_member_b_id')
                  ->references('id')
                  ->on('family_member');
            $table->enum('role', array('parent', 'relationship', 'cousin'));
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::dropIfExists('relationship');
        Schema::dropIfExists('family_member');
        Schema::dropIfExists('comment');
        Schema::dropIfExists('tag');
        Schema::dropIfExists('photo');
        Schema::dropIfExists('album');
        Schema::dropIfExists('user');
	}
}
