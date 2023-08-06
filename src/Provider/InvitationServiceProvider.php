<?php

namespace Kodeingatan\Invitation\Provider;

use Kodeingatan\Invitation\Invitation;
use Illuminate\Support\ServiceProvider;
use Kodeingatan\Invitation\Commands\InstallationCommand;
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

        $this->mergeConfigFrom(__DIR__ . '/../Configs/invitation.php', 'invitation');
    }

    public function boot()
    {
        $this->loadCommands();
        $this->loadRoutesFrom(__DIR__ . '/../Routes/web.php');
        $this->loadRoutesFrom(__DIR__ . '/../Routes/api.php');
        $this->loadTranslationsFrom(__DIR__ . '/../Resources/lang', 'invitation');
        $this->loadViewsFrom(__DIR__ . '/../Resources/views', 'invitation');

        $this->publishConfigs();
    }

    public function publishConfigs()
    {
        $this->publishes([
            __DIR__ . '/../Configs/invitation.php' => config_path('invitation.php'),
        ], 'invitation-configs');
    }

    public function loadCommands()
    {
        if ($this->app->runningInConsole()) {
            $this->commands([
                InstallationCommand::class,
            ]);
        }
    }
}
