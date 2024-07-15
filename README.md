

## Description
Corvus is a client management system for any-sized organizations. The organization owners can manage the customer accounts and the users with sepearte roles. 
The user with Manager role can manage the accounts and the users. Admin role is dedicated to manage all accounts with all features.

## Planned features
Here are some planned key features:

    - The product management with categories
    - Account pricing for each customer
    - Assigning the Account Managers to the customers 
    - API system with authentication
    - The account manager will be able to revoke and regenerate the API tokens
    - API Documentation


## Getting started
Please check the official guides for server requirements before you start. 
    - [Laravel Documentation](https://laravel.com/docs/10.x)
    - [Jetstream Documentation](https://jetstream.laravel.com/introduction.html)
    - [Inertia Documentation](https://inertiajs.com/)
    - [React Documentation](https://react.dev/learn)


### Installation
Install all the dependencies using composer and npm

php packages:
`
    composer install
`

npm packages:
`
    npm install
`

Create a new environment file based on given example. Update the settings based on your system. 

Run the database migration to create the data tables based on your database choice in environment file:

`
    php artisan migrate
`

Build your frontend framework:

`
    npm run build
`

If you need to update the frontend code, don't forget the run the build in development mode to see the changes on real time.

`
    npm run dev
`    


### Database seeding
The application is coming a complete sample data to test the system before going live. You may easily remove the data.


`
    php artisan db:seed
`

You may run migration  and seeder in anytime to reset the database:

`
    php artisan migrate:fresh --seed
`


## License
This project is licensed under the MIT License - see the [LICENSE] file for details. I reserve the right to change the license of future releases.
