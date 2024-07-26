<?php

namespace App\Http\Controllers;

use App\Http\Filters\CustomerFilter;
use App\Http\Filters\UserFilter;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Resources\CustomerResource;
use App\Http\Resources\UserResource;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CustomerController extends Controller
{

    /**
     * Show the form for creating a new resource.
     */
    public function index(CustomerFilter $filter)
    {
        return inertia("Customers/Index", [
            "customers" => CustomerResource::collection(Customer::filter($filter)->paginate(10)),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function users(UserFilter $filter)
    {
        return inertia("Customers/Users", [
            "users" => UserResource::collection(User::with('customer', 'roles')->where('customer_id', Auth::user()->customer_id)->filter($filter)->paginate(10)->withQueryString()),
            'customers' => Customer::select('name', 'id')->get(),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function create()
    {

        return inertia(
            "Customers/Create",
            []
        );
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRequest $request)
    {
        $data = $request->validated();
        Customer::create($data);
        return to_route('customers.index')
            ->with('success', 'Customer is created');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        return inertia('Customers/Edit', [
            'customer' => new CustomerResource($customer)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        $name = $customer->name;
        $customer->delete();
        return to_route('customers.index')
            ->with('success', "Customer {$name} is deleted");
    }
}
