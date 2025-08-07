<?php

use App\Http\Controllers\AdminApplicationController;
use App\Http\Controllers\ApplicationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome', [
        'auth' => [
            'user' => auth()->user() ? [
                'id' => auth()->user()->id,
                'name' => auth()->user()->name,
                'email' => auth()->user()->email,
                'role' => auth()->user()->role,
            ] : null,
        ],
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        
        if ($user->isAdmin()) {
            // Admin dashboard with statistics
            $stats = [
                'total_applications' => \App\Models\Application::count(),
                'pending_applications' => \App\Models\Application::pending()->count(),
                'accepted_applications' => \App\Models\Application::accepted()->count(),
                'rejected_applications' => \App\Models\Application::rejected()->count(),
            ];
            
            return Inertia::render('dashboard', [
                'stats' => $stats
            ]);
        } else {
            // Applicant dashboard with their application
            $application = $user->application;
            
            return Inertia::render('dashboard', [
                'application' => $application ? [
                    'id' => $application->id,
                    'student_name' => $application->student_name,
                    'status' => $application->status,
                    'status_display' => $application->status_display,
                    'status_badge_color' => $application->status_badge_color,
                    'created_at' => $application->created_at->toISOString(),
                ] : null
            ]);
        }
    })->name('dashboard');

    // Application routes
    Route::controller(ApplicationController::class)->group(function () {
        // For applicants
        Route::get('/applications/create', 'create')->name('applications.create');
        Route::post('/applications', 'store')->name('applications.store');
        Route::get('/applications/{application}', 'show')->name('applications.show');
        Route::get('/applications/{application}/edit', 'edit')->name('applications.edit');
        Route::put('/applications/{application}', 'update')->name('applications.update');
        
        // For admin
        Route::middleware(\App\Http\Middleware\AdminMiddleware::class)->group(function () {
            Route::get('/applications', 'index')->name('applications.index');
        });
    });

    // My application route
    Route::get('/my-application', function () {
        if (!auth()->user()->isApplicant()) {
            abort(403, 'Unauthorized');
        }

        $application = auth()->user()->application;

        if (!$application) {
            return redirect()->route('applications.create');
        }

        return redirect()->route('applications.show', $application);
    })->name('applications.my');

    // Admin status updates
    Route::middleware(\App\Http\Middleware\AdminMiddleware::class)->group(function () {
        Route::put('/admin/applications/{application}', [AdminApplicationController::class, 'update'])
            ->name('admin.applications.update');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';