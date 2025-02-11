// CallModal.tsx

import React, { useState } from 'react';
import axios from 'axios';
// import { sendCallRequestToTelegram } from '../services/telegramBot';

interface CallModalProps {
  closeModal: () => void;
}

const CallModal: React.FC<CallModalProps> = ({ closeModal }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone) {
      setError('Будь ласка, заповніть всі поля');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.post('http://localhost:5000/api/call-requests/create', {
        name,
        phone,
      });
      alert("Запит на дзвінок був надісланий")

      //await sendCallRequestToTelegram(name, phone);

      closeModal();
    } catch (err) {
      setError('Щось пішло не так, спробуйте знову.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Request a Call</h2>
        <input
          type="text"
          placeholder="Ім'я"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-2 rounded-md"
        />
        <input
          type="tel"
          placeholder="Номер телефону"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 w-full mb-2 rounded-md"
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="bg-gray-300 text-black py-2 px-4 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-primary text-white py-2 px-4 rounded-md"
            disabled={loading}
          >
            {loading ? 'Надсилання...' : 'Відправити'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallModal;
