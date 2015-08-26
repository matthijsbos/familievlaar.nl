# Familievlaar.nl
Archive site for my familiy photo album


## Installation
1. Install composer via `https://getcomposer.org/`
2. Clone this repository `$ git clone https://github.com/matthijsbos/familievlaar.nl.git`
3. Navigate into the directory and execute `$ composer install`. Composer will
   now download and install all php dependencies.
4. Copy the `.env.example` file to `.env`.
5. Modify all relevant lines in the `.env` file.
6. Run `php artisan migrate` to run all database scripts.
7. Create first user using command line tools: `php artisan user:create --help`.


## Development environment setup
1. Install the Homestead Vagrant box by following the instructions on http://laravel.com/docs/5.0/homestead
2. Modify the `~/.homestead/Homestead.yaml` file so that it points to the 
   site installation folder


