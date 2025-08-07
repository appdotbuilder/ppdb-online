<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateApplicationStatusRequest;
use App\Models\Application;

class AdminApplicationController extends Controller
{
    /**
     * Update application status (admin only).
     */
    public function update(UpdateApplicationStatusRequest $request, Application $application)
    {
        $application->update([
            'status' => $request->validated()['status']
        ]);

        return redirect()->back()
            ->with('success', 'Status pendaftaran berhasil diperbarui.');
    }
}