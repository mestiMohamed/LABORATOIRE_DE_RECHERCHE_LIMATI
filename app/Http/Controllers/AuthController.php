<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log; // 👈 Import ajouté

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $data = $request->validated();

        // Tentative de connexion pour admin
        if (Auth::guard('admin')->attempt($data)) {
            $admin = Auth::guard('admin')->user();
            $token = $admin->createToken('main')->plainTextToken;
            return response()->json([
                'user' => [
                    'id' => $admin->id,
                    'firstname' => $admin->firstname,
                    'lastname' => $admin->lastname,
                    'email' => $admin->email,
                    'image' => $admin->image ? asset('storage/' . $admin->image) : null,
                ],
                'token' => $token,
                'role' => 'admin',
            ]);
        }

        // Vérification utilisateur "web"
        if (Auth::guard('web')->attempt($data)) {
            $user = Auth::guard('web')->user();

            // 🔒 Blocage si le compte est désactivé
            if (!$user->is_active) {
                Auth::guard('web')->logout(); // Important pour être sûr
                return response()->json([
                    'message' => 'Votre compte est désactivé. Veuillez contacter l\'administrateur.'
                ], 403); // Code HTTP 403 = accès interdit
            }

            $token = $user->createToken('main')->plainTextToken;
            return response()->json([
                'user' => $user,
                'token' => $token,
                'role' => 'user',
            ]);
        }

        return response([
            'message' => 'Email ou mot de passe incorrect.'
        ], 422);
    }





    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('users', 'public');
            Log::debug('Image stockée:', ['path' => $imagePath]);
        }

        // Création de l'utilisateur avec tous les champs
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'image' => $imagePath,
            'date_of_birth' => $data['date_of_birth'],
            'gender' => $data['gender'],
            'address' => $data['address'],
            'blood_type' => $data['blood_type'] ?? null, // Champ optionnel
            'phone' => $data['phone'],
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'image' => $user->image ? asset('storage/' . $user->image) : null,
                'date_of_birth' => $user->date_of_birth,
                'gender' => $user->gender,
                'address' => $user->address,
                'blood_type' => $user->blood_type,
                'phone' => $user->phone,
            ],
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
