import React from 'react';
import CallWidget from '../components/CallWidget';

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <section className="mb-12">
        <h2 className="text-4xl font-bold mb-6">Про нас</h2>

        <p className="mb-6 text-lg">
          Gadget Service прагне надавати високоякісні послуги ремонту та обслуговування ваших гаджетів та побутової техніки. Наша команда досвідчених професіоналів присвячена забезпеченню найкращого стану ваших пристроїв.
        </p>
        <p className="mb-6 text-lg">
          Наша місія — забезпечити виняткове обслуговування з акцентом на задоволення клієнтів. Ми використовуємо новітні технології та методики для досягнення найкращих результатів.
        </p>
      </section>

      <section className="mb-12 bg-gray-100 p-6 rounded-lg">
        <h3 className="text-3xl font-semibold mb-4">Наша місія та бачення</h3>
        <p className="text-lg mb-4">
          У Gadget Service наша місія — надати швидкі, надійні та доступні рішення для ремонту всіх типів гаджетів. Наше бачення — стати провідним постачальником послуг у сфері ремонту технологій, постійно перевершуючи очікування клієнтів.
        </p>
        <p className="text-lg">
          Ми прагнемо використовувати новітні технології та методології, щоб наші послуги були найкращими на ринку.
        </p>
      </section>

      <section className="mb-12">
        <h3 className="text-3xl font-semibold mb-6">Чому обрати нас?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition">
            <h4 className="text-2xl font-bold mb-2">Досвідчені техніки</h4>
            <p className="text-gray-600">
              Наша команда складається з висококваліфікованих техніків з багаторічним досвідом у цій галузі. Жоден пристрій не є занадто складним для нас.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition">
            <h4 className="text-2xl font-bold mb-2">Швидке обслуговування</h4>
            <p className="text-gray-600">
              Ми розуміємо важливість часу. Саме тому ми надаємо швидкі та ефективні послуги ремонту без компромісів у якості.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition">
            <h4 className="text-2xl font-bold mb-2">Конкурентоспроможні ціни</h4>
            <p className="text-gray-600">
              Ми пропонуємо конкурентоспроможні ціни на всі наші послуги, забезпечуючи вам найкраще співвідношення ціни та якості.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-3xl font-semibold mb-6">Познайомтесь з нашою командою</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <img src="/images/team-member1.jpg" alt="Член команди 1" className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h4 className="text-xl font-bold">Джон Доу</h4>
            <p className="text-gray-600">Головний технік</p>
          </div>
          <div className="text-center">
            <img src="/images/team-member2.jpg" alt="Член команди 2" className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h4 className="text-xl font-bold">Джейн Сміт</h4>
            <p className="text-gray-600">Підтримка клієнтів</p>
          </div>
          <div className="text-center">
            <img src="/images/team-member3.jpg" alt="Член команди 3" className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h4 className="text-xl font-bold">Майкл Браун</h4>
            <p className="text-gray-600">Спеціаліст з ремонту</p>
          </div>
          <div className="text-center">
            <img src="/images/team-member4.jpg" alt="Член команди 4" className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h4 className="text-xl font-bold">Емілі Вайт</h4>
            <p className="text-gray-600">Менеджер з логістики</p>
          </div>
        </div>
      </section>

      <section className="mb-12 bg-gray-100 p-6 rounded-lg">
        <h3 className="text-3xl font-semibold mb-4">Технології, які ми використовуємо</h3>
        <p className="text-lg mb-4">
          Ми використовуємо передові інструменти та технології для діагностики та ремонту пристроїв, забезпечуючи точність і якість. Від новітніх діагностичних інструментів до високоякісних запасних частин, ми прагнемо до досконалості на кожному етапі.
        </p>
        <div className="flex justify-center space-x-4">
          <img src="/images/tech1.png" alt="Технологія 1" className="h-16" />
          <img src="/images/tech2.png" alt="Технологія 2" className="h-16" />
          <img src="/images/tech3.png" alt="Технологія 3" className="h-16" />
        </div>
      </section>

      <CallWidget />
    </div>
  );
};

export default AboutUs;
