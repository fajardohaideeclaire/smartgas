<?php

use App\Http\Controllers\FuelController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('/login');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [FuelController::class, 'index'])
         ->name('dashboard');
    Route::post('/fuel-entries', [FuelController::class, 'store'])
         ->name('fuel.store');
    Route::delete('/fuel-entries/{fuelEntry}', [FuelController::class, 'destroy'])
         ->name('fuel.destroy');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
