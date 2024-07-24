<?php

use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use App\Models\User;
use Spatie\Permission\Models\Role;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

use Inertia\Testing\AssertableInertia;

beforeEach(function () {
     Customer::factory(10)->create();
    Role::create(['name' => 'Admin']);
    actingAs(User::factory()->create([
        'name' => 'Test User',
        'email' => 'test@example.com',
    ])->assignRole('Admin'));
});

/*  it('should return a successful response', function () {
    get(route('customers.index'))
        ->assertOk();
});

it('should return the correct component', function () {
    get(route('customers.index'))
        ->assertComponent('Customers/Index');
});
   */

it('passes customers to the view', function () {
    $customers = Customer::paginate(10);

    get(route('customers.index'))
        ->assertHasPaginatedResource('customers', CustomerResource::collection($customers->sortBy('id')));
});