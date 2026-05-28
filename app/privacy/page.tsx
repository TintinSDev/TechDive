// app/(public)/privacy/page.tsx

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>

        <div className="prose prose-invert max-w-none text-slate-300 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              1. Introduction
            </h2>
            <p>
              Techdive ("we", "our", or "us") operates the techdive.space
              website (the "Service"). This page informs you of our policies
              regarding the collection, use, and disclosure of personal data
              when you use our Service and the choices you have associated with
              that data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              2. Information Collection and Use
            </h2>
            <p>
              We collect several different types of information for various
              purposes to provide and improve our Service:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Account Information:</strong> Email, name, password
                (hashed), profile data
              </li>
              <li>
                <strong>Usage Data:</strong> Pages visited, time spent, filters
                used, jobs saved
              </li>
              <li>
                <strong>Device Information:</strong> Browser type, IP address,
                operating system
              </li>
              <li>
                <strong>Payment Information:</strong> Processed through Stripe
                or Paystack (we don't store card details)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              3. Use of Data
            </h2>
            <p>Techdive uses the collected data for various purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To provide customer support</li>
              <li>
                To gather analysis or valuable information about our Service
                usage
              </li>
              <li>To send promotional emails (only with your consent)</li>
              <li>To monitor the effectiveness of our recommendations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. Security of Data
            </h2>
            <p>
              The security of your data is important to us but remember that no
              method of transmission over the Internet or method of electronic
              storage is 100% secure. While we strive to use commercially
              acceptable means to protect your personal data, we cannot
              guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              5. Changes to This Privacy Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "effective date" at the top of this Privacy
              Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              6. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at support@techdive.space
            </p>
          </section>
        </div>

        <p className="text-slate-400 text-sm mt-12">Last updated: May 2026</p>
      </div>
    </div>
  );
}
