<?php

namespace App\Http\Filters;

class UserFilter extends QueryFilter {

    protected $sortable = [
        'name',
        'email',
        'createdAt' => 'created_at',
        'updatedAt' => 'updated_at'
    ];

    public function include($value) {
        return $this->builder->with($value);
    }
 
    public function name($value) {
        $likeStr = str_replace('*', '%', $value);
        return $this->builder->where('name', 'like', $likeStr);
    }

    public function email($value) {
        $likeStr = str_replace('*', '%', $value);
        return $this->builder->where('email', 'like', $likeStr);
    }  

    public function customer_id($value) {
        return $this->builder->where('customer_id', $value);
    }


    public function roles($value) {
        return $this->builder->whereHas('roles', function ($query) use ($value) {
            $query->where('roles.name', $value);
            });
    }

    public function updatedAt($value) {
        $dates = explode(',', $value);

        if (count($dates) > 1) {
            return $this->builder->whereBetween('updated_at', $dates);
        }

        return $this->builder->whereDate('updated_at', $value);
    }

    
}