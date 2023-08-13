<?php

namespace Kodeingatan\Invitation\Console\Commands;

use Illuminate\Console\Command;

class AboutCommand extends Command
{


    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'kiinvitation:about';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'About kodeingatan invitation module';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info("This kodeingatan invitation module");

        return Command::SUCCESS;
    }
}
