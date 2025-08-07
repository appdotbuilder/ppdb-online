<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreApplicationRequest;
use App\Http\Requests\UpdateApplicationRequest;
use App\Http\Requests\UpdateApplicationStatusRequest;
use App\Models\Application;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the applications (for admin).
     */
    public function index()
    {
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Unauthorized');
        }

        $applications = Application::with('user')
            ->latest()
            ->paginate(10);
        
        return Inertia::render('admin/applications/index', [
            'applications' => $applications
        ]);
    }

    /**
     * Show the form for creating a new application.
     */
    public function create()
    {
        if (!auth()->user()->isApplicant()) {
            abort(403, 'Unauthorized');
        }

        // Check if user already has an application
        if (auth()->user()->application) {
            return redirect()->route('applications.show', auth()->user()->application);
        }

        return Inertia::render('applications/create');
    }

    /**
     * Store a newly created application.
     */
    public function store(StoreApplicationRequest $request)
    {
        // Check if user already has an application
        if (auth()->user()->application) {
            return redirect()->route('applications.show', auth()->user()->application)
                ->with('error', 'Anda sudah memiliki pendaftaran.');
        }

        $application = Application::create([
            'user_id' => auth()->id(),
            ...$request->validated()
        ]);

        return redirect()->route('applications.show', $application)
            ->with('success', 'Pendaftaran berhasil disimpan.');
    }

    /**
     * Display the specified application.
     */
    public function show(Application $application)
    {
        // Check authorization
        if (auth()->user()->isApplicant() && $application->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        $application->load('user');

        if (auth()->user()->isAdmin()) {
            return Inertia::render('admin/applications/show', [
                'application' => $application
            ]);
        }

        return Inertia::render('applications/show', [
            'application' => $application
        ]);
    }

    /**
     * Show the form for editing the application.
     */
    public function edit(Application $application)
    {
        if (!auth()->user()->isApplicant() || $application->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        // Don't allow editing if already accepted or rejected
        if (in_array($application->status, ['accepted', 'rejected'])) {
            return redirect()->route('applications.show', $application)
                ->with('error', 'Pendaftaran yang sudah diproses tidak dapat diubah.');
        }

        return Inertia::render('applications/edit', [
            'application' => $application
        ]);
    }

    /**
     * Update the application.
     */
    public function update(UpdateApplicationRequest $request, Application $application)
    {
        if ($application->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        // Don't allow editing if already accepted or rejected
        if (in_array($application->status, ['accepted', 'rejected'])) {
            return redirect()->route('applications.show', $application)
                ->with('error', 'Pendaftaran yang sudah diproses tidak dapat diubah.');
        }

        $application->update($request->validated());

        return redirect()->route('applications.show', $application)
            ->with('success', 'Pendaftaran berhasil diperbarui.');
    }




}