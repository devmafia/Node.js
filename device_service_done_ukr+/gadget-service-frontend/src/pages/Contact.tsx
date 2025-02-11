// Contact.tsx

import React from 'react';
import ContactForm from '../components/ContactForm';
import CallWidget from '../components/CallWidget';

const Contact: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">Get in Touch with Us</h2>
      <p className="text-lg mb-6 text-center">If you have any questions or need help with your gadgets, feel free to reach out to us. We are here to help!</p>

      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-4">Send us a Message</h3>
        <ContactForm />
      </section>

      <section className="bg-gray-100 p-6 rounded-lg shadow-lg mb-10">
        <h3 className="text-2xl font-semibold mb-4">Our Contact Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-lg font-bold">Phone</h4>
            <p>+1 234 567 890</p>
          </div>
          <div>
            <h4 className="text-lg font-bold">Email</h4>
            <p>support@gadgetservice.com</p>
          </div>
          <div>
            <h4 className="text-lg font-bold">Location</h4>
            <p>123 Tech Street, Cityville</p>
          </div>
          <div>
            <h4 className="text-lg font-bold">Working Hours</h4>
            <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-4">Visit Us</h3>
        <iframe
          title="Our Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151!2d144.9559!3d-37.817209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z37KwNDgnNTMuOSJTIDE0NMKwNTcnMjEuNiJF!5e0!3m2!1sen!2sus!4v1630909088295!5m2!1sen!2sus"
          width="100%"
          height="300"
          allowFullScreen
          loading="lazy"
          className="rounded-lg shadow-lg"
        />
      </section>

      <CallWidget />
    </div>
  );
};

export default Contact;
