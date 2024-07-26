<?php

namespace App\Http\Controllers;

use App\Http\Filters\UserFilter;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{

    /**
     * Show the form for creating a new resource.
     */
    public function index(UserFilter $filter)
    {
        return inertia("Users/Index", [
            "users" => UserResource::collection(User::with('customer', 'roles')->filter($filter)->paginate(10)->withQueryString()),
            'customers' => Customer::select('name', 'id')->get(),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    public function create()
    {
        $customers = Customer::select('name', 'id')->get();

        $auth_user = Auth::user();
        $user_roles = $auth_user->getRoleNames()->toArray();

        if (!in_array('Admin', $user_roles)) {
            $roles = Role::select('name', 'id')->where('name', '<>', 'Admin')->get();
        }else{
            $roles = Role::select('name', 'id')->get();
        }


        return inertia(
            "Users/Create",
            [
                'roles' => $roles,
                'customers' => $customers
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $user = Auth::user();
        $roles = $user->getRoleNames()->toArray();


        $data = $request->validated();

        if (in_array('Manager', $roles)) {
            $data['customer_id'] = $user->customer_id;
        }

        $data['email_verified_at'] = time();
        $data['password'] = bcrypt($data['password']);
        $roles_id = $data['role_id'];
        unset($data['role_id']);
 
        $user = User::create($data);

        $role = Role::find($roles_id);
        $user->assignRole($role);


        if (in_array('Admin', $roles)) {
            $return = 'users.index';
        }else{
            $return = 'customers.users';
        }

        return to_route($return)
            ->with('success', 'User was created');
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
    public function edit(User $user)
    {

        $auth_user = Auth::user();
        $user_roles = $auth_user->getRoleNames()->toArray();

        if (!in_array('Admin', $user_roles)) {
            $roles = Role::select('name', 'id')->where('name', '<>', 'Admin')->get();
        }else{
            $roles = Role::select('name', 'id')->get();
        }

        $customers = Customer::select('name', 'id')->get();

        $role_id = $user->roles
            ->pluck('id')
            ->toArray();
        return inertia('Users/Edit', [
            'user' => new UserResource($user),
            'customers' => $customers,
            'customer_id'=>$user->customer_id,
            'roles' => $roles,
            'current_role_id' => ($role_id ? $role_id[0] : null)
        ]);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $password = $data['password'] ?? null;
        if ($password) {
            $data['password'] = bcrypt($password);
        } else {
            unset($data['password']);
        }
        $user->update($data);
        $roles_id = $data['role_id'];
        unset($data['role_id']);
        $role = Role::find($roles_id);
        $user->syncRoles($role);

        $user = Auth::user();
        $user_roles = $user->getRoleNames()->toArray();

        if (in_array('Admin', $user_roles)) {
                $return = 'users.index';
        }else{
            $return = 'customers.users';
        }

        return to_route($return)
            ->with('success', "User {$user->name} was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $name = $user->name;
        $user->delete();
        return to_route('users.index')
            ->with('success', "User {$name} is deleted");
    }
}
