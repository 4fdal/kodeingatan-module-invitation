<?php

namespace Kodeingatan\Invitation\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InvitationTemplate extends Model
{
    use SoftDeletes;

    protected $fillable  = ["id", "key", "slug", "name"];

    protected $dates = ['deleted_at'];
}
