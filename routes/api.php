<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChercheurController;
use App\Http\Controllers\EquipeController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ProjteDeRecherchecontroller;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\UserController;
use App\Models\ProjetDeRecherche;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function() {
    Route::get('logout',[AuthController::class,'logout']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    //Route::apiResource('/users',UserController::class);
});


Route::prefix('admin')->group(function () {
    Route::apiResource('events', EventController::class);
});
Route::prefix('admin')->group(function () {
    Route::apiResource('users', ChercheurController::class);
});
Route::prefix('admin')->group(function () {
    Route::apiResource('equipes', EquipeController::class);
});
Route::prefix('admin')->group(function () {
    Route::apiResource('projets', ProjteDeRecherchecontroller::class);
});
Route::prefix('admin')->group(function () {
    Route::apiResource('publications', PublicationController::class);
});

Route::patch('/admin/users/{id}/toggle-active', [\App\Http\Controllers\ChercheurController::class, 'toggleActive']);



Route::get('admin/users', [ChercheurController::class, 'index']);
Route::post('/login',[AuthController::class,'login']);
Route::post('/register',[AuthController::class,'register']);


