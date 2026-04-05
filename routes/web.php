<?php
 
use App\Http\Controllers\FuelController;
use Illuminate\Support\Facades\Route;
 
Route::get('/', function () {
	return view('welcome');
});
 
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [FuelController::class, 'index'])
         ->name('dashboard');
    Route::post('/fuel-entries', [FuelController::class, 'store'])
         ->name('fuel.store');
    Route::delete('/fuel-entries/{fuelEntry}', [FuelController::class, 'destroy'])
         ->name('fuel.destroy');
});
 
require __DIR__.'/auth.php';
