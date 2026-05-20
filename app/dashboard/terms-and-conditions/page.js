const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div 
            className="px-6 py-12 sm:px-12 text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-3">
              Terms & Conditions
            </h1>
            <p className="text-gray-500 text-sm">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Please read these terms carefully before using our services
            </p>
          </div>
          
          {/* Content */}
          <div className="px-6 py-8 sm:px-12 sm:py-10 space-y-8">
            {/* Introduction */}
            <section className="space-y-3">
              <h2 
                className="text-2xl font-semibold text-gray-800 border-l-4 pl-4"
                style={{ borderLeftColor: '#2c5f8d' }}
              >
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. 
                If you do not agree to abide by these terms, please do not use this site. These terms may be updated from time to time 
                without prior notice, and your continued use constitutes acceptance of any changes.
              </p>
            </section>

            {/* Services */}
            <section className="space-y-3">
              <h2 
                className="text-2xl font-semibold text-gray-800 border-l-4 pl-4"
                style={{ borderLeftColor: '#2c5f8d' }}
              >
                2. Description of Services
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our platform provides various digital services including but not limited to content delivery, user accounts, 
                and interactive features. We reserve the right to modify, suspend, or discontinue any service at any time 
                without liability.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Account creation and management</li>
                <li>Content access and downloads</li>
                <li>User-generated content submission</li>
                <li>Communication features</li>
              </ul>
            </section>

            {/* User Obligations */}
            <section className="space-y-3">
              <h2 
                className="text-2xl font-semibold text-gray-800 border-l-4 pl-4"
                style={{ borderLeftColor: '#2c5f8d' }}
              >
                3. User Responsibilities
              </h2>
              <p className="text-gray-600 leading-relaxed">
                As a user of our platform, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Not use the service for any illegal or unauthorized purpose</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="space-y-3">
              <h2 
                className="text-2xl font-semibold text-gray-800 border-l-4 pl-4"
                style={{ borderLeftColor: '#2c5f8d' }}
              >
                4. Intellectual Property Rights
              </h2>
              <p className="text-gray-600 leading-relaxed">
                All content, features, and functionality on this site, including text, graphics, logos, icons, and software, 
                are the exclusive property of our company and are protected by international copyright, trademark, and other 
                intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without 
                explicit written consent.
              </p>
            </section>

            {/* Payments and Refunds */}
            <section className="space-y-3">
              <h2 
                className="text-2xl font-semibold text-gray-800 border-l-4 pl-4"
                style={{ borderLeftColor: '#2c5f8d' }}
              >
                5. Payments & Refund Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                For paid services, all payments are processed securely through third-party payment gateways. 
                Subscription fees are billed in advance and are non-refundable except as required by law. 
                We reserve the right to change pricing with 30 days' notice.
              </p>
              <div 
                className="border-l-4 p-4 rounded-r-lg mt-3"
                style={{ backgroundColor: '#e8f0f7', borderLeftColor: '#2c5f8d' }}
              >
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Note:</span> Refund requests must be submitted within 14 days of purchase 
                  and will be evaluated on a case-by-case basis.
                </p>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="space-y-3">
              <h2 
                className="text-2xl font-semibold text-gray-800 border-l-4 pl-4"
                style={{ borderLeftColor: '#2c5f8d' }}
              >
                6. Limitation of Liability
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                or other intangible losses, resulting from your access to or use of our services.
              </p>
            </section>

            {/* Termination */}
            <section className="space-y-3">
              <h2 
                className="text-2xl font-semibold text-gray-800 border-l-4 pl-4"
                style={{ borderLeftColor: '#2c5f8d' }}
              >
                7. Account Termination
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to suspend or terminate your account and access to services at our sole discretion, 
                without notice, for conduct that violates these terms or is harmful to other users or our platform. 
                You may delete your account at any time through your account settings.
              </p>
            </section>

            {/* Governing Law */}
            <section className="space-y-3">
              <h2 
                className="text-2xl font-semibold text-gray-800 border-l-4 pl-4"
                style={{ borderLeftColor: '#2c5f8d' }}
              >
                8. Governing Law
              </h2>
              <p className="text-gray-600 leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], 
                without regard to its conflict of law provisions. Any legal action or proceeding relating to your 
                access to or use of the services shall be instituted exclusively in the courts of [Your City/State].
              </p>
            </section>

            {/* Contact Information */}
            <section className="space-y-3">
              <h2 
                className="text-2xl font-semibold text-gray-800 border-l-4 pl-4"
                style={{ borderLeftColor: '#2c5f8d' }}
              >
                9. Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <ul className="text-gray-600 space-y-1 ml-4">
                <li>📧 Email: legal@yourcompany.com</li>
                <li>📞 Phone: +1 (555) 123-4567</li>
                <li>📍 Address: 123 Business Ave, Suite 100, City, State 12345</li>
              </ul>
            </section>

            {/* Acceptance Button */}
            <div className="pt-6 border-t border-gray-200 text-center">
              <button 
                className="text-white font-semibold py-3 px-8 rounded-lg transition duration-200 transform hover:scale-105 shadow-md hover:opacity-90"
                style={{ backgroundColor: '#2c5f8d' }}
              >
                I Agree to the Terms & Conditions
              </button>
              <p className="text-gray-500 text-sm mt-4">
                By clicking "I Agree", you acknowledge that you have read and understood these terms.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          <p className="mt-1">
            <a href="#" className="hover:underline" style={{ color: '#2c5f8d' }}>Privacy Policy</a> • 
            <a href="#" className="hover:underline ml-2" style={{ color: '#2c5f8d' }}>Cookie Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;