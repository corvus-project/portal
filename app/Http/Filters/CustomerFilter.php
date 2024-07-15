<?php

namespace App\Http\Filters;

class CustomerFilter extends QueryFilter
{

    protected $sortable = [
        'name',
        'email',
        'createdAt' => 'created_at',
    ];

    public function include($value)
    {
        return $this->builder->with($value);
    }

    public function name($value)
    {
        $likeStr = str_replace('*', '%', $value);
        return $this->builder->where('name', 'like', $likeStr);
    }

    public function email($value)
    {
        $likeStr = str_replace('*', '%', $value);
        return $this->builder->where('email', 'like', $likeStr);
    }

    public function status($value)
    {
        (strtolower($value) === 'active' ? $value = 1 : $value = 0);
        return $this->builder->where('status', $value);
    }
}
