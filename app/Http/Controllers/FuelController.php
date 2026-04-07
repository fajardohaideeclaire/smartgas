<?php
 
namespace App\Http\Controllers;
 
use App\Models\FuelEntry;
use Illuminate\Http\Request;
use Inertia\Inertia;
 
class FuelController extends Controller
{
	public function index()
	{
    	$entries = auth()->user()
            ->fuelEntries()
        	->latest()
        	->get();
 
    	return Inertia::render('Dashboard', [
        	'entries' => $entries,
    	]);
	}
 
	public function store(Request $request)
	{
        $request->validate([
            'station_name'	=> 'required|string|max:255',
            'fuel_type'   	=> 'required|in:Diesel,Unleaded,Premium',
            'price_per_liter' => 'required|numeric|min:0.01',
    	]);
 
        auth()->user()->fuelEntries()->create(
            $request->only('station_name', 'fuel_type', 'price_per_liter')
    	);
 
    	return redirect()->back();
	}
 
	public function destroy(FuelEntry $fuelEntry)
	{
        $fuelEntry->delete();
    	return redirect()->back();
	}
}
