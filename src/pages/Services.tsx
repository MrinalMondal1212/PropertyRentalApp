// import React from 'react'

import { Home, Key, Shield, Clock, MapPin, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate()
  const services = [
    {
      title: "Premium Property Search",
      description: "Access an exclusive portfolio of luxury villas, modern apartments, and cozy bungalows tailored to your lifestyle.",
      icon: <Home className="w-10 h-10 text-blue-500" />,
    },
    {
      title: "Secure Online Booking",
      description: "Our encrypted payment gateway ensures your transactions for high-value rentals are always safe and private.",
      icon: <CreditCard className="w-10 h-10 text-emerald-500" />,
    },
    {
      title: "Verified Listings",
      description: "We perform rigorous quality checks on every property to ensure the photos match the reality of the space.",
      icon: <Shield className="w-10 h-10 text-indigo-500" />,
    },
    {
      title: "24/7 Concierge Support",
      description: "From check-in to check-out, our dedicated team is available around the clock to assist with any requests.",
      icon: <Clock className="w-10 h-10 text-orange-500" />,
    },
    {
      title: "Virtual Tours",
      description: "Take a high-definition 3D walkthrough of our bungalows and villas from the comfort of your home.",
      icon: <MapPin className="w-10 h-10 text-rose-500" />,
    },
    {
      title: "Property Management",
      description: "Own a villa? We handle everything from marketing and guest screening to maintenance and cleaning.",
      icon: <Key className="w-10 h-10 text-amber-500" />,
    },
  ];

  return (
    <section className="bg-gray-50 py-20 mt-[100px] px-4">
      <div className="max-w-7xl mx-auto ">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">What We Offer</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Our Premium Services
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We provide a complete ecosystem for property rentals, ensuring a smooth 
            experience for both travelers and property owners.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300 group"
            >
              <div className="mb-6 inline-block p-4 bg-gray-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-blue-600 rounded-3xl p-10 md:p-16 text-center text-white">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to find your next stay?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Browse our collection of villas, apartments, and bungalows today.
          </p>
          <button onClick={()=> navigate("/properties")} className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
            Explore Properties
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;