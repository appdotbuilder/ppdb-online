<?php

namespace Database\Seeders;

use App\Models\Application;
use App\Models\User;
use Illuminate\Database\Seeder;

class ApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create an admin user
        $admin = User::factory()->admin()->create([
            'name' => 'Administrator',
            'email' => 'admin@ppdb.test',
            'password' => bcrypt('password'),
        ]);

        // Create sample applicant users with applications
        $applicantUsers = User::factory()
            ->applicant()
            ->count(10)
            ->create();

        // Create applications for each applicant
        foreach ($applicantUsers as $user) {
            Application::factory()->create([
                'user_id' => $user->id,
            ]);
        }

        // Create specific status samples
        $pendingUser = User::factory()->applicant()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
        ]);
        Application::factory()->pending()->create([
            'user_id' => $pendingUser->id,
            'student_name' => 'John Doe Jr.',
        ]);

        $acceptedUser = User::factory()->applicant()->create([
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
        ]);
        Application::factory()->accepted()->create([
            'user_id' => $acceptedUser->id,
            'student_name' => 'Jane Smith',
        ]);

        $rejectedUser = User::factory()->applicant()->create([
            'name' => 'Bob Johnson',
            'email' => 'bob@example.com',
        ]);
        Application::factory()->rejected()->create([
            'user_id' => $rejectedUser->id,
            'student_name' => 'Bob Johnson',
        ]);
    }
}