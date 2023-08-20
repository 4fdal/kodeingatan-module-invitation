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
        Schema::create('invitation_templates', function (Blueprint $table) {
            $table->id();
            $table->string('key')->nullable()->unique();
            $table->string('slug');
            $table->string('name');
            $table->timestamps();
            $table->timestamp('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invitation_templates');
    }
};


// 1. input slug template
//    1. input nama template
//    2. upload assets zip
//    3. input html upperbody
//    4. input html lowerbody
//    5. input html open undangan (one to many)
//    6. input html header (one to many)
//    7. input html pasangan pertaman (one to many)
//    8. input html item sosial media (one to many)
//    9.  input html simpan-acara (one to many)
//    10. input html acara (one to many)
//    11. input html item acara (one to many)
//    12. input html undangan-spesial (one to many)
//    13. input html ourstroy (one to many)
//    14. input html item ourstroy (one to many)
//    15. input html moment (one to many)
//    16. input html item foto moment (one to many)
//    17. input html live-striming (one to many)
//    18. input html item live-striming (one to many)
//    19. input html testimonial-best-friend (one to many)
//    20. input html item testimonial-best-friend (one to many)
//    21. input html kirim-hadiah (one to many)
//    23. input html item bank kirim-hadiah (one to many)
//    24. input html item alamt mengiriman kado kirim-hadiah (one to many)
//    25. input html kirim-ucapan (one to many)
//    26. input html protokol-kesehatan (one to many)
//    27. input html item protokol-kesehatan (one to many)
//    28. input footer (one to many)