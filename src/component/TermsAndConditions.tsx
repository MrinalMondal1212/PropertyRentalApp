// import React from 'react';

const TermsAndConditions = () => {


  return (
    <div className="max-w-6xl mt-[120px] mx-auto px-4 py-12 flex flex-col md:flex-row gap-12">
 
      {/* Main Content */}
      <main className="flex-1 text-gray-700 leading-relaxed">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: April 1, 2026</p>

        <section id="introduction" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
          <p>
            Welcome to our Rental Platform. By accessing our website and booking any **Villa, Apartment, or Bungalow**, 
            you agree to be bound by these Terms and Conditions. Please read them carefully before making a reservation.
          </p>
        </section>

        <section id="eligibility" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. User Eligibility</h2>
          <p>
            You must be at least 18 years of age to book a property. By using this site, you warrant that you possess 
            the legal authority to create a binding legal obligation.
          </p>
        </section>

        <section id="bookings" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Bookings & Payments</h2>
          <ul className="list-disc ml-5 space-y-2">
            <li>A valid payment method is required to secure a booking.</li>
            <li>For luxury villas, a **Security Deposit** may be held 24 hours prior to check-in.</li>
            <li>All prices listed include applicable taxes unless stated otherwise.</li>
          </ul>
        </section>

        <section id="cancellation" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Cancellation Policy</h2>
          <p>
            Cancellations made 14 days prior to the check-in date will receive a 100% refund. 
            Cancellations made within 7 days are subject to a 50% cancellation fee. No-shows will be charged the full amount.
          </p>
        </section>

        <section id="property-rules" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Property Rules</h2>
          <p className="mb-4">Guests agree to adhere to the specific rules of the rented property:</p>
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
            <ul className="space-y-2 italic text-sm">
              <li>• No loud parties or events in residential bungalows.</li>
              <li>• Smoking is strictly prohibited inside apartments.</li>
              <li>• Maximum occupancy limits must be respected at all times.</li>
            </ul>
          </div>
        </section>

        <section id="liability" className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Limitation of Liability</h2>
          <p>
            We act as a facilitator between property owners and guests. We are not responsible for any personal 
            accidents, theft, or damages that occur during your stay at the listed properties.
          </p>
        </section>

        <footer className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            If you have any questions regarding these terms, please contact our legal team at support@rentalplatform.com.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default TermsAndConditions;