<?php

namespace Kodeingatan\Invitation\Provider;

use Illuminate\Routing\Router;
use Kodeingatan\Invitation\Invitation;
use Illuminate\Support\ServiceProvider;
use Kodeingatan\Invitation\Console\Commands\AboutCommand;
use Kodeingatan\Invitation\Console\Commands\InstallationCommand;
use Kodeingatan\Invitation\Facades\Invitation as FacadesInvitation;

class InvitationServiceProvider extends ServiceProvider
{
    public function register()
    {
        require __DIR__ . "/../helpers.php";

        $this->app->bind('kodeingatan/invitation', function ($app) {
            return new FacadesInvitation();
        });

        $loader = \Illuminate\Foundation\AliasLoader::getInstance();
        $loader->alias('Invitation', Invitation::class);

        $this->mergeConfigFrom(module_invitation_path("/config/invitation.php"), 'invitation');
    }

    public function boot()
    {
        $router = $this->app->make(Router::class);
        $router->aliasMiddleware('auth', \App\Http\Middleware\Authenticate::class);
        $router->aliasMiddleware('permission', \App\Http\Middleware\ValidateRolePermission::class);

        $this->loadCommands();
        $this->loadRoutesFrom(module_invitation_path("/routes/web.php"));
        $this->loadRoutesFrom(module_invitation_path("/routes/admin.php"));
        $this->loadRoutesFrom(module_invitation_path("/routes/api.php"));
        $this->loadTranslationsFrom(module_invitation_path("/resources/lang"), 'invitation');
        $this->loadViewsFrom(module_invitation_path("/resources/views"), 'invitation');
        $this->loadMigrationsFrom(module_invitation_path("/database/migrations"));

        $this->publishConfigs();
    }

    public function publishConfigs()
    {
        $this->publishes([
            module_invitation_path("/config/invitation.php") => config_path('invitation.php'),
        ], 'invitation-configs');
    }

    public function loadCommands()
    {
        if ($this->app->runningInConsole()) {
            $this->commands([
                AboutCommand::class,
                InstallationCommand::class,
            ]);
        }
    }
}
