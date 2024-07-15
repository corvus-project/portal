<?php

namespace App\Models;

use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Carbon;
use App\Http\Filters\QueryFilter;
use Illuminate\Database\Eloquent\Builder;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'status',
        'balance'
    ];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d',
        'status' => 'boolean'
    ];
 
    public function users()
    {
        return $this->hasMany(User::class);
    }

    protected function status(): Attribute
    {
        return Attribute::make(
            get: fn (bool $value) => (($value) ? 'Active' : 'Inactive'),
        );
    }

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => Carbon::createFromFormat('Y-m-d H:i:s', $value)->format('d/M/Y'),
        );
    }

    protected function balance(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => (is_numeric($value)) ? number_format($value, 2) : $value,
        );
    }


    public function scopeFilter(Builder $builder, QueryFilter $filters)
    {
        return $filters->apply($builder);
    }
 
}