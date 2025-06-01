<?php

use App\Http\Controllers\AdminStatsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChercheurController;
use App\Http\Controllers\EquipeController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ProjteDeRecherchecontroller;
use App\Http\Controllers\PublicationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('logout', [AuthController::class, 'logout']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/me/publications', [PublicationController::class, 'getMyPublications']);
    Route::get('/me/projets', [ProjteDeRecherchecontroller::class, 'getMyProject']);




    //Route::apiResource('/users',UserController::class);
});

Route::prefix('equipe')->middleware('auth:sanctum')->group(function () {
    Route::get('/members', [EquipeController::class, 'getMembers']);
    Route::get('/publications', [EquipeController::class, 'getPublications']);
    Route::get('/projets', [EquipeController::class, 'getProjets']);
});


Route::prefix('admin')->group(function () {
    Route::apiResource('events', EventController::class)->where(['event' => '[0-9]+']);
});
Route::prefix('admin')->group(function () {
    Route::apiResource('users', ChercheurController::class);
});
Route::prefix('admin')->group(function () {
    Route::apiResource('equipes', EquipeController::class)->where(['equipe' => '[0-9]+']);
});
Route::prefix('admin')->group(function () {
    Route::apiResource('projets', ProjteDeRecherchecontroller::class)->where(['projet' => '[0-9]+']);
});
Route::prefix('admin')->group(function () {
    Route::apiResource('publications', PublicationController::class)->where(['publication' => '[0-9]+']);
});

Route::patch('/admin/users/{id}/toggle-active', [\App\Http\Controllers\ChercheurController::class, 'toggleActive']);



Route::get('admin/users', [ChercheurController::class, 'index']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);


//ziada fo9 xba3A

Route::get('/events-by-type', [EventController::class, 'eventsByType']);
//Route::get('chercheurs/count', [AdminStatsController::class, 'countChercheurs']);

Route::group(['prefix' => 'admin', 'middleware' => ['auth:sanctum']], function () {
    // Routes pour les statistiques
    Route::get('chercheurs/count', [AdminStatsController::class, 'countChercheurs']);
    Route::get('projets/count', [AdminStatsController::class, 'countProjets']);
    Route::get('events/count', [AdminStatsController::class, 'countEvents']);
    Route::get('publications/count', [AdminStatsController::class, 'countPublications']);
});

Route::get('/admin/events-by-month', [EventController::class, 'eventsPerMonth']);
Route::get('/admin/par-type', [ProjteDeRecherchecontroller::class, 'parType']);

