<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateChercheurRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $this->route('user')->id,

            'password' => 'sometimes|nullable|string|min:8|confirmed',
            'date_of_birth' => 'sometimes|date',
            'gender' => 'sometimes|in:m,f',
            'address' => 'sometimes|string|max:255',
            'blood_type' => 'sometimes|nullable|string|in:O-,O+,A+,A-,B+,B-,AB+,AB-',
            'phone' => 'sometimes|string|max:20',
            'image' => 'sometimes|nullable|image|mimes:jpeg,png,jpg|max:5120',
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], 422));
    }
}
