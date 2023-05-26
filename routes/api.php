<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Models\User;
use Illuminate\Support\Facades\Log;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'monip'
], function ($router) {

    Route::post("/ip", function() {

        $user_agent = $_SERVER['HTTP_USER_AGENT'];
        $clientIP = request()->ip();

        Log::info("[MonIP] - Le service a été solliciter pour obtenir une adresse IP.");
        
        return response()->json($clientIP);

    });

});