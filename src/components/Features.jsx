import React from 'react';

const Features = () => {
  const features = [
    { icon: "🛡️", title: "Original Products", desc: "100% Genuine auto parts directly from top OEM manufacturers." },
    { icon: "⚡", title: "Fast Delivery", desc: "Same day dispatch for orders placed before 2 PM local time." },
    { icon: "🔄", title: "90 Days Return", desc: "Not the right fit? Return it easily within 90 days of purchase." },
    { icon: "💬", title: "24/7 Support", desc: "Our auto experts are here to help you find the right parts." }
  ];

  return (
    <section className="py-16 bg-white border-y border-slate-200 mt-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-6 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="text-4xl mb-4">{feat.icon}</div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{feat.title}</h3>
              <p className="text-sm text-slate-500">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;