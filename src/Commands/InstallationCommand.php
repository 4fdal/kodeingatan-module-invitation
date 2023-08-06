<?php

namespace Kodeingatan\Invitation\Commands;

use Illuminate\Console\Command;
use Kodeingatan\AdminPanel\Provider\AdminPanelServiceProvider;

class InstallationCommand extends Command
{

    private bool $force = false;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ki-admin-panel:install {--force=false}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Install kodeingatan admin panel';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->initCommandParams();
        $this->publishConfigs();

        return Command::SUCCESS;
    }

    public function initCommandParams()
    {
        $this->force = $this->options()['force'] == 'true' || $this->options()['force'] == null;
    }

    public function publishConfigs()
    {
        $command_params = [
            '--provider' => AdminPanelServiceProvider::class,
            '--tag' => 'ki-admin-panel-configs',
            '--force' => $this->force,
        ];
        $this->call('vendor:publish', $command_params);

        $this->info(__('ki-admin-panel::installation.info.done-publish-configs'));
    }
}
