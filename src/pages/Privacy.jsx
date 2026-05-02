import React from 'react';
import { Lock, Database, UserCheck, Share2, Cookie, ShieldCheck, Mail } from 'lucide-react';

const Privacy = () => {
  const lastUpdated = "May 2, 2026";

  const sections = [
    {
      id: "collection",
      icon: <Database size={20} />,
      title: "1. Information We Collect",
      content: (
        <>
          <p className="mb-4">
            When you visit BILTEK Auto Parts, we collect certain information about your device, your interaction with the site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li><strong>Personal Info:</strong> Name, billing address, shipping address, email, and phone number.</li>
            <li><strong>Vehicle Info:</strong> Vehicle Identification Number (VIN), make, model, and year (to ensure accurate part fitment).</li>
            <li><strong>Payment Info:</strong> Credit card numbers, UPI details (processed securely via encrypted payment gateways; we do not store full card numbers).</li>
          </ul>
        </>
      )
    },
    {
      id: "usage",
      icon: <UserCheck size={20} />,
      title: "2. How We Use Your Data",
      content: (
        <>
          <p className="mb-4">
            We use your personal information to provide our services to you, which includes: offering products for sale, processing payments, shipping and fulfillment of your order, and keeping you up to date on new products, services, and offers.
          </p>
          <p>
            Your vehicle data is strictly used to power our "Smart Fitment" engine, ensuring you only see auto parts that are 100% compatible with your car.
          </p>
        </>
      )
    },
    {
      id: "sharing",
      icon: <Share2 size={20} />,
      title: "3. Sharing Personal Information",
      content: (
        <>
          <p className="mb-4">
            We share your Personal Information with trusted service providers to help us provide our services and fulfill our contracts with you. We <strong>never</strong> sell your personal data to third-party marketing agencies.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li><strong>Logistics:</strong> We share your address and phone number with courier partners (e.g., BlueDart, Delhivery) to deliver your parts.</li>
            <li><strong>Payments:</strong> Secure gateways like Razorpay or Stripe process your payments.</li>
            <li><strong>Legal Compliance:</strong> We may share information to comply with applicable laws and regulations, or to respond to a lawful request for information we receive.</li>
          </ul>
        </>
      )
    },
    {
      id: "cookies",
      icon: <Cookie size={20} />,
      title: "4. Cookies & Tracking",
      content: (
        <>
          <p className="mb-4">
            A cookie is a small amount of information that’s downloaded to your computer or device when you visit our Site. We use a number of different cookies, including functional, performance, advertising, and social media or content cookies.
          </p>
          <p>
            Cookies make your browsing experience better by allowing the website to remember your actions and preferences (such as login and region selection). You can control and manage cookies through your browser settings.
          </p>
        </>
      )
    },
    {
      id: "security",
      icon: <ShieldCheck size={20} />,
      title: "5. Data Security",
      content: (
        <>
          <p className="mb-4">
            We implement top-tier security measures to maintain the safety of your personal information. All sensitive/credit information supplied is transmitted via Secure Socket Layer (SSL) technology and then encrypted into our Payment gateway providers' database.
          </p>
          <p>
            Access to this data is strictly limited to authorized personnel who are required to keep the information confidential.
          </p>
        </>
      )
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-20 selection:bg-blue-200">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-100 rounded-full blur-3xl -z-10"></div>
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-100">
            <Lock size={32} strokeWidth={2} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-slate-500 font-medium text-lg">
            Your privacy is our priority. Learn how we protect your data.
          </p>
          <p className="text-sm font-bold text-slate-400 mt-4 uppercase tracking-widest">
            Last Updated: {lastUpdated}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* Left Sidebar Navigation (Sticky on Desktop) */}
          <div className="w-full lg:w-1/3 flex-shrink-0">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm sticky top-32">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 px-4">Privacy Sections</h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <a 
                    key={section.id} 
                    href={`#${section.id}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 font-bold hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                  >
                    <span className="text-slate-400">{section.icon}</span>
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-200">
              
              <div className="prose prose-slate max-w-none">
                <p className="text-lg text-slate-600 font-medium mb-10 leading-relaxed">
                  At BILTEK, we are committed to protecting the privacy and security of our customers and site visitors. This Privacy Policy outlines how your personal information is collected, used, and shared when you visit or make a purchase from our platform.
                </p>

                <div className="space-y-12">
                  {sections.map((section) => (
                    <div key={section.id} id={section.id} className="scroll-mt-32">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-500 border border-slate-100">
                          {section.icon}
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 m-0">{section.title}</h2>
                      </div>
                      <div className="text-slate-600 font-medium leading-relaxed">
                        {section.content}
                      </div>
                      <hr className="mt-12 border-slate-100" />
                    </div>
                  ))}
                </div>

                {/* Contact Section at the bottom */}
                <div className="mt-12 bg-emerald-50 rounded-2xl p-8 border border-emerald-100 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-sm">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Data Privacy Inquiries</h3>
                    <p className="text-slate-600 mb-2">
                      If you would like to access, correct, amend or delete any personal information we have about you, register a complaint, or simply want more information, contact our Privacy Compliance Officer.
                    </p>
                    <a href="mailto:privacy@biltek.com" className="inline-flex font-bold text-emerald-600 hover:text-emerald-800 transition-colors">
                      privacy@biltek.com &rarr;
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Privacy;