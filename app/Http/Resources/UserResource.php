<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'type' => 'user',
            'id' => $this->id,
            'attributes' => [
                'name' => $this->name,
                'email' => $this->email,
                'customer_name' => $this->customer?->name,
                'roles' => $this->roles->pluck('name')->toArray(),
            ],
            'relationships' => [
                'customer' => [
                    'data' => [
                        'type' => 'customer',
                        'id' => $this->customer_id
                    ],
                    'links' => [
                        'self' => route('customers.show', ['customer' => $this->customer_id])
                    ]
                ]
            ],
            'includes' => new CustomerResource($this->whenLoaded('customer')),
            'links' => [
                'self' => route('users.show', ['user' => $this->id])
            ]
        ];
    }
}
