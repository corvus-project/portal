<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Customer;
use App\Models\Product;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        Role::create(['name' => 'Admin']);
        Role::create(['name' => 'Manager']);
        Role::create(['name' => 'User']);

        $roles = Role::all()->where('name', '!=', 'Admin')->pluck('name');

        $customers = Customer::factory(10)->create();
        $categories = Category::factory(3)->create();

        Product::factory(100)
            ->recycle($categories)
            ->create();

        User::factory(100)
            ->recycle($customers)
            ->create()
            ->each(function ($user) use ($roles) {
                $user->assignRole($roles->random());
            });


        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ])->assignRole('Admin');
    }
}
