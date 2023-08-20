<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        try {
            Schema::create('asset_html', function (Blueprint $table) {
                $table->id();
                $table->bigInteger('invitation_template_id')->unsigned();
                $table->string('name');
                $table->string('dir_path');
                $table->timestamps();

                $table->foreign('invitation_template_id')->references('id')->on('invitation_templates');
            });
        } catch (\Throwable $th) {
            $this->down();

            throw $th;
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asset_html');
    }
};
