<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $data = $request->validated();

        if (Auth::guard('admin')->attempt($data)) {
            $admin = Auth::guard('admin')->user();
            $token = $admin->createToken('main')->plainTextToken;
            return response()->json([
                'user' => $admin,
                'token' => $token,
                'role' => 'admin',
            ]);
        }

        if (Auth::guard('web')->attempt($data)) {
            $user = Auth::guard('web')->user();
            $token = $user->createToken('main')->plainTextToken;
            return response()->json([
                'user' => $user,
                'token' => $token,
                'role' => 'user',
            ]);
        }

        return response([
            'message' => 'Email or password incorrect.'
        ], 422);
    }




    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
            'role' => 'user',
        ]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        $user->currentAccessToken()->delete();

        return response('', 204);
    }
}
