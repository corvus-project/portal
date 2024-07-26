<?php

namespace App\Http\Controllers;

use App\Http\Filters\UserFilter;
use App\Http\Resources\UserResource;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function index(UserFilter $filter)
    {

        $user = Auth::user();

        if ($user->hasRole('Admin')) {
            return inertia("Dashboard/Index", [
                "users" => UserResource::collection(User::with('customer', 'roles')->role('New')->filter($filter)->paginate(10)->withQueryString()),
                'customers' => Customer::select('name', 'id')->get(),
                'queryParams' => request()->query() ?: null,
                'success' => session('success')
            ]);
        }

        return redirect()->route('products.index');
    }
}
