import React from 'react'

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Your privacy is important to us. This policy explains how SROMS collects, uses, and protects your information.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: December 2024
          </p>
        </div>

        {/* Content */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8 sm:px-10">

            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-blue-200 pb-2">
                1. Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to SROMS ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our laptop selling services.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-blue-200 pb-2">
                2. Information We Collect
              </h2>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Personal Information</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We may collect personal information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2 ml-4">
                <li>Name, email address, and contact information</li>
                <li>Billing and shipping addresses</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Account credentials and preferences</li>
                <li>Customer service communications</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Automatically Collected Information</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                When you visit our website, we automatically collect certain information:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2 ml-4">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referral sources</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-blue-200 pb-2">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Process and fulfill your laptop orders</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send order confirmations and shipping updates</li>
                <li>Improve our website and services</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Prevent fraud and ensure security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-blue-200 pb-2">
                4. Information Sharing and Disclosure
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Service Providers:</strong> With trusted third-party service providers who help us operate our business (payment processors, shipping companies, etc.)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>Consent:</strong> With your explicit consent</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-blue-200 pb-2">
                5. Data Security
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2 ml-4">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure payment processing through certified providers</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and employee training</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-blue-200 pb-2">
                6. Your Rights
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Request transfer of your data</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Restriction:</strong> Request limitation of processing</li>
              </ul>
              <p className="text-gray-700 mt-4 leading-relaxed">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-blue-200 pb-2">
                7. Cookies and Tracking Technologies
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings. Some features may not function properly without cookies.
              </p>
            </section>

            {/* Third-Party Links */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-blue-200 pb-2">
                8. Third-Party Links and Services
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any personal information.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-blue-200 pb-2">
                9. Children's Privacy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.
              </p>
            </section>

            {/* Changes to Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-blue-200 pb-2">
                10. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-blue-200 pb-2">
                11. Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-700">
                  <strong>SROMS</strong><br />
                  Email: privacy@sroms.com<br />
                  Phone: +92-XXX-XXXXXXX<br />
                  Address: [Your Business Address], Pakistan
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>This privacy policy is effective as of December 2024 and will remain in effect except with respect to any changes in its provisions in the future.</p>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage
