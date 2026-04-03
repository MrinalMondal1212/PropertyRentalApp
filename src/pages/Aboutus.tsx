// import React from 'react'

import { Eye, ShieldCheck, Target, Users } from "lucide-react";

const Aboutus = () => {
  const goals = [
    {
      title: "Our Mission",
      description:
        "To simplify the luxury rental experience by providing a seamless platform where finding your dream villa or bungalow is as easy as a single click.",
      icon: <Target className="w-8 h-8 text-blue-600" />,
      bgColor: "bg-blue-50",
    },
    {
      title: "Our Vision",
      description:
        "To become the global standard for premium stays, known for our hand-picked property selection and unwavering commitment to guest satisfaction.",
      icon: <Eye className="w-8 h-8 text-purple-600" />,
      bgColor: "bg-purple-50",
    },
  ];

  const values = [
    {
      title: "Verified Listings",
      desc: "Every apartment and villa is physically inspected to ensure it meets our quality standards.",
      icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
    },
    {
      title: "Community First",
      desc: "We build lasting relationships between property owners and travelers through transparent communication.",
      icon: <Users className="w-6 h-6 text-orange-600" />,
    },
  ];
  return (
    <div className=" mt-[140px]  mb-[150px]">
      <div className="w-[1600px]  text-white rounded-[40px] flex items-center  justify-center mx-auto h-[500px] bg-[url('/images/aboutus.png')] bg-cover bg-center">
        <div className="w-[800px]">
          <h1 className="text-[80px] font-bold">
            About <span className="text-[#E7A837]">Us</span>
          </h1>
          <p>
            Figma ipsum component variant main layer. Text main arrange bold
            layer. Main export device create outline ellipse auto. Plugin create
            rotate stroke align star style edit mask
          </p>
        </div>
      </div>
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Purpose
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We aren't just a booking site; we are your partners in finding the
              perfect space to create lasting memories.
            </p>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {goals.map((goal, index) => (
              <div
                key={index}
                className={`${goal.bgColor} p-8 rounded-2xl transition-transform hover:-translate-y-1 duration-300`}
              >
                <div className="mb-4">{goal.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {goal.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {goal.description}
                </p>
              </div>
            ))}
          </div>

          {/* Core Values / Goals */}
          <div className="border-t border-gray-100 pt-16">
            <h3 className="text-xl font-semibold text-center mb-[45px] text-gray-800">
              Our Core Values
            </h3>
            <div className="grid sm:grid-cols-2 gap-12">
              {values.map((value, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">{value.icon}</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      {value.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aboutus;
