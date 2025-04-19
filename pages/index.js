
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function HomePage() {
  const [tab, setTab] = useState('buyer');
  const [formData, setFormData] = useState({ product: '', quantity: '', price: '', region: '', notes: '' });
  const [sellerForm, setSellerForm] = useState({ matchId: '', invoiceLink: '', trackingInfo: '' });
  const [buyerRequests, setBuyerRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('buyer_requests').select('*').order('created_at', { ascending: false });
      setBuyerRequests(data || []);
    };
    fetchData();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSellerChange = (e) => setSellerForm({ ...sellerForm, [e.target.name]: e.target.value });
  const handleSubmit = async () => await supabase.from('buyer_requests').insert([formData]);
  const handleSellerSubmit = async () => await supabase.from('seller_fulfillments').insert([sellerForm]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-4">CardPlug.io</h1>
      <div className="flex gap-4 mb-6">
        {['buyer', 'seller', 'admin'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded ${tab === t ? 'bg-white text-black' : 'bg-gray-700'}`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === 'buyer' && (
        <div className="space-y-4 max-w-md">
          <h2 className="text-2xl font-semibold">Buyer Request</h2>
          {['product', 'quantity', 'price', 'region', 'notes'].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600"
            />
          ))}
          <button onClick={handleSubmit} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500">
            Submit
          </button>
        </div>
      )}

      {tab === 'seller' && (
        <div className="space-y-4 max-w-md">
          <h2 className="text-2xl font-semibold">Seller Fulfillment</h2>
          {['matchId', 'invoiceLink', 'trackingInfo'].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field}
              onChange={handleSellerChange}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600"
            />
          ))}
          <button onClick={handleSellerSubmit} className="bg-green-600 px-4 py-2 rounded hover:bg-green-500">
            Submit
          </button>
        </div>
      )}

      {tab === 'admin' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Live Buyer Requests</h2>
          {buyerRequests.map((r) => (
            <div key={r.id} className="p-4 bg-gray-800 border border-gray-600 rounded">
              <p className="text-lg font-medium">{r.product} | Qty: {r.quantity} | ${r.price}</p>
              <p className="text-sm text-gray-400">{r.region} - {r.notes}</p>
              <p className="text-xs text-gray-500">{new Date(r.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
