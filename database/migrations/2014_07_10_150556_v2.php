<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class V2 extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::table('user', function($table) {
            $table->string('once_token', 100)
                ->nullable();
            $table->string('name', 100)
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
        Schema::table('user', function($table) {
            $table->dropColumn(array('once_token', 'name'));
        });
	}

}
