import  { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "What types of properties are available for rent?",
      answer: "We specialize in premium listings including luxury villas with private pools, modern city apartments, and spacious bungalows perfect for families."
    },
    {
      question: "How do I verify the availability of a villa or bungalow?",
      answer: "Availability is updated in real-time. Simply select your desired dates on the property page to see if the listing is open for booking."
    },
    {
      question: "Are there different booking terms for apartments versus villas?",
      answer: "Generally, apartments offer more flexible short-term stays, while villas and bungalows may require a minimum stay of 3-5 nights during peak seasons."
    },
    {
      question: "Is maintenance included in the rental price?",
      answer: "Yes, all our rentals include standard maintenance and cleaning services before you move in. For long-term villa rentals, pool and garden care are also covered."
    },
    {
      question: "Can I schedule a virtual tour before booking?",
      answer: "Absolutely! Many of our premium bungalows and villas offer 3D virtual tours or video walkthroughs directly on the listing page."
    }
  ];

  const toggleAccordion = (index:any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto mt-[120px] py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Property Rental FAQ
      </h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
          >
            <button
              className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition-colors"
              onClick={() => toggleAccordion(index)}
            >
              <span className="font-medium text-gray-700">{item.question}</span>
              {activeIndex === index ? (
                <ChevronUp className="w-5 h-5 text-blue-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                activeIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-5 border-t border-gray-100 text-gray-600 bg-gray-50">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;