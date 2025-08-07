<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->isApplicant();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'student_name' => 'required|string|max:255',
            'birth_date' => 'required|date|before:today',
            'full_address' => 'required|string',
            'previous_school' => 'required|string|max:255',
            'parent_name' => 'required|string|max:255',
            'parent_contact' => 'required|string|max:20',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'student_name.required' => 'Nama lengkap siswa wajib diisi.',
            'birth_date.required' => 'Tanggal lahir wajib diisi.',
            'birth_date.date' => 'Tanggal lahir harus berupa tanggal yang valid.',
            'birth_date.before' => 'Tanggal lahir harus sebelum hari ini.',
            'full_address.required' => 'Alamat lengkap wajib diisi.',
            'previous_school.required' => 'Asal sekolah wajib diisi.',
            'parent_name.required' => 'Nama orang tua/wali wajib diisi.',
            'parent_contact.required' => 'Nomor kontak orang tua/wali wajib diisi.',
        ];
    }
}