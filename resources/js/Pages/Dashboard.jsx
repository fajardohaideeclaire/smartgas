import { useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, entries = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        station_name: '',
        fuel_type: 'Unleaded',
        price_per_liter: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('fuel.store'), { onSuccess: () => reset() });
    }

    function handleDelete(id) {
        if (confirm('Delete this entry?')) {
            router.delete(route('fuel.destroy', id));
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold text-gray-800">
                    SmartGas — Fuel Price Tracker
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-10 max-w-4xl mx-auto px-4">

                <div className="bg-white rounded-xl shadow p-6 mb-8">
                    <h3 className="text-lg font-semibold mb-4">Log a Fuel Price</h3>
                    <form onSubmit={submit}
                          className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Station Name
                            </label>
                            <input
                                type="text"
                                value={data.station_name}
                                onChange={e => setData('station_name', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm"
                                placeholder="e.g. Petron EDSA"
                            />
                            {errors.station_name && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.station_name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Fuel Type
                            </label>
                            <select
                                value={data.fuel_type}
                                onChange={e => setData('fuel_type', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm"
                            >
                                <option>Unleaded</option>
                                <option>Diesel</option>
                                <option>Premium</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Price per Liter (&#8369;)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={data.price_per_liter}
                                onChange={e => setData('price_per_liter', e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm"
                                placeholder="e.g. 68.50"
                            />
                            {errors.price_per_liter && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.price_per_liter}
                                </p>
                            )}
                        </div>

                        <div className="sm:col-span-3">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg
                                           text-sm font-medium hover:bg-blue-700
                                           disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Log Entry'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Price History</h3>

                    {entries.length === 0 ? (
                        <p className="text-gray-400 text-sm">
                            No entries yet. Log your first price above!
                        </p>
                    ) : (
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left border-b text-gray-500">
                                    <th className="pb-2">Station</th>
                                    <th className="pb-2">Fuel Type</th>
                                    <th className="pb-2">Price/L</th>
                                    <th className="pb-2">Date</th>
                                    <th className="pb-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {entries.map(entry => (
                                    <tr key={entry.id}
                                        className="border-b last:border-0">
                                        <td className="py-2">{entry.station_name}</td>
                                        <td className="py-2">{entry.fuel_type}</td>
                                        <td className={`py-2 font-semibold ${
                                            parseFloat(entry.price_per_liter) > 90
                                                ? 'text-red-600'
                                                : 'text-green-600'
                                        }`}>
                                            &#8369;{parseFloat(entry.price_per_liter).toFixed(2)}
                                        </td>
                                        <td className="py-2 text-gray-400">
                                            {new Date(entry.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="py-2">
                                            <button
                                                onClick={() => handleDelete(entry.id)}
                                                className="text-red-400 hover:text-red-600 text-xs"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
