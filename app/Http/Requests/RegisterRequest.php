<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|min:2',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed',
            'image' => 'nullable|image|mimes:jpeg,png,jpg',
            'date_of_birth' => 'required',
            'gender' => 'required',
            'address' => 'required',
            'blood_type' => 'required',
            'phone' => 'required',
        ];
    }
}
