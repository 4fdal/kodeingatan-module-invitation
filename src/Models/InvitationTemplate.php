<?php

namespace Kodeingatan\Invitation\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InvitationTemplate extends Model
{
    use SoftDeletes;

    protected $fillable  = ["id", "name", 'key', 'guard_name', 'allow_pathname', 'allow_methods'];

    protected $dates = ['deleted_at'];
}
