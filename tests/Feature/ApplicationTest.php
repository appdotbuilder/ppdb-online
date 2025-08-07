<?php

use App\Models\Application;
use App\Models\User;

test('applicant can create application', function () {
    $user = User::factory()->applicant()->create();
    
    $response = $this->actingAs($user)
        ->post(route('applications.store'), [
            'student_name' => 'John Doe',
            'birth_date' => '2010-01-01',
            'full_address' => '123 Main Street, Jakarta',
            'previous_school' => 'SD Negeri 1',
            'parent_name' => 'Jane Doe',
            'parent_contact' => '081234567890',
        ]);

    $this->assertDatabaseHas('applications', [
        'user_id' => $user->id,
        'student_name' => 'John Doe',
        'status' => 'pending',
    ]);

    $response->assertRedirect();
});

test('admin can view all applications', function () {
    $admin = User::factory()->admin()->create();
    $applicant = User::factory()->applicant()->create();
    $application = Application::factory()->create(['user_id' => $applicant->id]);

    $response = $this->actingAs($admin)
        ->get(route('applications.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('admin/applications/index')
        ->has('applications.data', 1)
    );
});

test('admin can update application status', function () {
    $admin = User::factory()->admin()->create();
    $applicant = User::factory()->applicant()->create();
    $application = Application::factory()->pending()->create(['user_id' => $applicant->id]);

    $response = $this->actingAs($admin)
        ->put(route('admin.applications.update', $application), [
            'status' => 'accepted'
        ]);

    $this->assertDatabaseHas('applications', [
        'id' => $application->id,
        'status' => 'accepted',
    ]);

    $response->assertRedirect();
});

test('applicant cannot access admin routes', function () {
    $user = User::factory()->applicant()->create();

    $response = $this->actingAs($user)
        ->get(route('applications.index'));

    $response->assertForbidden();
});

test('applicant can view own application', function () {
    $user = User::factory()->applicant()->create();
    $application = Application::factory()->create(['user_id' => $user->id]);

    $response = $this->actingAs($user)
        ->get(route('applications.show', $application));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('applications/show')
        ->has('application')
    );
});

test('applicant cannot view others application', function () {
    $user1 = User::factory()->applicant()->create();
    $user2 = User::factory()->applicant()->create();
    $application = Application::factory()->create(['user_id' => $user2->id]);

    $response = $this->actingAs($user1)
        ->get(route('applications.show', $application));

    $response->assertForbidden();
});

test('dashboard shows correct content for applicant', function () {
    $user = User::factory()->applicant()->create();
    
    $response = $this->actingAs($user)->get(route('dashboard'));
    
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('dashboard')
        ->where('auth.user.role', 'applicant')
    );
});

test('dashboard shows correct content for admin', function () {
    $admin = User::factory()->admin()->create();
    
    $response = $this->actingAs($admin)->get(route('dashboard'));
    
    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('dashboard')
        ->has('stats')
        ->where('auth.user.role', 'admin')
    );
});