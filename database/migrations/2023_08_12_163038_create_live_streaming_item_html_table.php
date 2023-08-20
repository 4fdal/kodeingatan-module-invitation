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
        Schema::create('live_streaming_item_html', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('invitation_template_id')->unsigned();
            $table->string('name');
            $table->text('html');
            $table->foreign('invitation_template_id', 'live_streaming_item_html_itid')->references('id')->on('invitation_templates')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('live_streaming_item_html');
    }
};
