import React from 'react';
import CallWidget from '../components/CallWidget';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ласкаво просимо до Gadget Service</h2>
          <p className="text-lg mb-6">
            Ми надаємо послуги найвищого рівня для гаджетів та побутової техніки. Швидко, надійно та доступно.
          </p>
          <button className="bg-primary text-white py-2 px-6 rounded-md hover:bg-blue-700 transition">
            <Link to="/about-us">Дізнатися більше</Link>
          </button>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Наші послуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-4">Ремонт телефонів</h3>
              <p className="text-gray-600 mb-4">Експертний ремонт усіх моделей смартфонів, включаючи заміну екрана, проблеми з батареєю та інше.</p>
              <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                Дізнатися більше
              </button>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-4">Ремонт ноутбуків</h3>
              <p className="text-gray-600 mb-4">Швидкий та надійний ремонт усіх типів ноутбуків, включаючи апаратні та програмні проблеми.</p>
              <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                Дізнатися більше
              </button>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-4">Ремонт побутової техніки</h3>
              <p className="text-gray-600 mb-4">Ремонт широкого спектру побутової техніки, включаючи холодильники, пральні машини та інше.</p>
              <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                Дізнатися більше
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Чому обирають нас?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Професійні техніки</h3>
              <p className="text-gray-600">Наші експерти мають багаторічний досвід у ремонті всіх видів гаджетів та побутової техніки.</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Швидке виконання</h3>
              <p className="text-gray-600">Ми надаємо швидкі та ефективні послуги, щоб мінімізувати ваші простої.</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Доступні ціни</h3>
              <p className="text-gray-600">Ми пропонуємо конкурентні ціни без втрати якості наших послуг.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Що кажуть наші клієнти</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <p className="text-gray-600 italic mb-4">
                "Gadget Service врятував мій телефон! Дуже швидке обслуговування і дуже дружній персонал."
              </p>
              <p className="text-right font-semibold">- Джон Д.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <p className="text-gray-600 italic mb-4">
                "Вони швидко відремонтували мій ноутбук. Рекомендую їх усім, хто потребує технічного ремонту."
              </p>
              <p className="text-right font-semibold">- Сара В.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <p className="text-gray-600 italic mb-4">
                "Чудове обслуговування клієнтів і доступні ціни. Я дуже задоволений результатом."
              </p>
              <p className="text-right font-semibold">- Марк Т.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Зв'яжіться з нами</h2>
          <p className="text-lg mb-6">Є питання або потрібна допомога? Зв'яжіться з нами вже сьогодні!</p>
          <button className="bg-primary text-white py-2 px-6 rounded-md hover:bg-blue-700 transition">
            Зв'язатися з нами
          </button>
        </div>
      </section>

      <CallWidget />
    </div>
  );
};

export default Home;
