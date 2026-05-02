import React from 'react';
import { Scale, FileText, Car, CreditCard, ShieldAlert, AlertCircle } from 'lucide-react';

const Terms = () => {
  const lastUpdated = "May 2, 2026";

  const sections = [
    {
      id: "agreement",
      icon: <FileText size={20} />,
      title: "1. Agreement to Terms",
      content: (
        <>
          <p className="mb-4">
            By accessing or using the BILTEK Auto Parts website, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, you are prohibited from using our site and services.
          </p>
          <p>
            These terms apply to all visitors, users, buyers, and others who access or use the Service. We reserve the right to update or modify these terms at any time without prior notice.
          </p>
        </>
      )
    },
    {
      id: "fitment",
      icon: <Car size={20} />,
      title: "2. Part Fitment & Compatibility",
      content: (
        <>
          <p className="mb-4">
            While we strive to provide accurate fitment data and compatibility charts, it is ultimately the <strong>buyer's responsibility</strong> to verify that the part ordered is correct for their specific vehicle make, model, year, and engine type.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>We recommend providing your Vehicle Identification Number (VIN) for highly technical parts.</li>
            <li>BILTEK is not liable for damage caused by the installation of incorrect parts.</li>
            <li>If you are unsure about fitment, please consult our customer support or a certified mechanic before purchasing.</li>
          </ul>
        </>
      )
    },
    {
      id: "pricing",
      icon: <CreditCard size={20} />,
      title: "3. Pricing & Payments",
      content: (
        <>
          <p className="mb-4">
            All prices listed on the website are in Indian Rupees (INR) and are inclusive of standard GST unless otherwise stated. Shipping costs are calculated at checkout.
          </p>
          <p className="mb-4">
            We reserve the right to refuse or cancel any order placed for a product listed at the incorrect price due to typographical errors or system glitches. If your credit card/UPI has already been charged, we will immediately issue a full refund.
          </p>
        </>
      )
    },
    {
      id: "liability",
      icon: <ShieldAlert size={20} />,
      title: "4. Limitation of Liability",
      content: (
        <>
          <p className="mb-4">
            BILTEK shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our products or services. 
          </p>
          <p>
            This includes, but is not limited to, damages for loss of profits, vehicle damage, personal injury, or labor costs incurred for the installation or removal of parts, even if we have been advised of the possibility of such damages.
          </p>
        </>
      )
    },
    {
      id: "warranty",
      icon: <AlertCircle size={20} />,
      title: "5. Warranties",
      content: (
        <>
          <p className="mb-4">
            Most parts sold by BILTEK are covered by the original manufacturer's warranty. BILTEK itself does not provide any implicit or explicit warranties on the products, apart from our standard Return Policy.
          </p>
          <p>
            Warranties are voided if the part is modified, used for racing/off-roading (unless specifically designed for it), or improperly installed by an uncertified mechanic.
          </p>
        </>
      )
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-20 selection:bg-blue-200">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Scale size={32} strokeWidth={2} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Terms & Conditions</h1>
          <p className="text-slate-500 font-medium">
            Please read these terms carefully before using our services.
          </p>
          <p className="text-sm font-bold text-slate-400 mt-4 uppercase tracking-widest">
            Last Updated: {lastUpdated}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* Left Sidebar Navigation (Sticky on Desktop) */}
          <div className="w-full lg:w-1/3 flex-shrink-0">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm sticky top-32">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 px-4">Contents</h3>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <a 
                    key={section.id} 
                    href={`#${section.id}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 font-bold hover:bg-blue-50 hover:text-blue-600 transition-colors"
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
                  Welcome to BILTEK Auto Parts. We provide our services to you subject to the notices, terms, and conditions set forth in this agreement. By shopping with us, you accept these conditions.
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
                <div className="mt-12 bg-blue-50 rounded-2xl p-8 border border-blue-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Questions about our Terms?</h3>
                  <p className="text-slate-600 mb-4">
                    If you have any questions or concerns regarding these terms and conditions, please don't hesitate to reach out to our legal and support team.
                  </p>
                  <a href="mailto:legal@biltek.com" className="inline-flex font-bold text-blue-600 hover:text-blue-800 transition-colors">
                    legal@biltek.com &rarr;
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Terms;