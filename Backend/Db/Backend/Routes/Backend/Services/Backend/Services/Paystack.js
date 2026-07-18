const axios = require('axios');
const paystack = axios.create({ baseURL: 'https://api.paystack.co', headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } });
exports.initializePayment = async (email, amount, reference) => {
  const r = await paystack.post('/transaction/initialize', { email, amount: amount*100, reference, currency: 'NGN' });
  return r.data.data;
};
exports.verifyPayment = async (ref) => {
  const r = await paystack.get(`/transaction/verify/${ref}`);
  return r.data.data;
};
exports.transfer = async (amount, account_number, bank_code) => {
  try{
    const rec = await paystack.post('/transferrecipient', { type: 'nuban', name: 'Artisan', account_number, bank_code, currency: 'NGN' });
    const tr = await paystack.post('/transfer', { source: 'balance', amount: amount*100, recipient: rec.data.data.recipient_code });
    return tr.data.data;
  }catch(e){ console.log(e.response?.data); throw e; }
};
