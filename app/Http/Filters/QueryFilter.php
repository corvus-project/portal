<?php

namespace App\Http\Filters;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

abstract class QueryFilter {

    protected $builder;
    protected $request;
    protected $sortable = [];

    public function __construct(Request $request)
    {
        Log::debug($request->all());
        $this->request = $request;
    } 

    public function apply(Builder $builder) {
        $this->builder = $builder;

        foreach($this->request->all() as $key => $value) {
            if (method_exists($this, $key)) {
                $this->$key($value);
            }
        }

        return $builder;
    }

    protected function filter($arr) {
        foreach($arr as $key => $value) {
            if (method_exists($this, $key)) {
                $this->$key($value);
            }
        }

        return $this->builder;
    }

    protected function sort_field($value) {
        $sortAttributes = explode(',', $value);

        foreach($sortAttributes as $sortAttribute) {
            if($this->request->sort_direction === 'desc') {
                $direction = 'desc';
            }

            if($this->request->sort_direction === 'asc') {
                $direction = 'asc';
            }


            if (!in_array($sortAttribute, $this->sortable) && !array_key_exists($sortAttribute, $this->sortable)) {
                continue;
            }

            $columnName = $this->sortable[$sortAttribute] ?? null;

            if ($columnName === null) {
                $columnName = $sortAttribute;
            }

            $this->builder->orderBy($columnName, $direction);
        }
    }
}