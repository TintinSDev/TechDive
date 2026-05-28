// app/(public)/cookies/page.tsx

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Cookie Policy</h1>

        <div className="prose prose-invert max-w-none text-slate-300 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small pieces of data stored on your device when you
              visit a website. They help websites remember information about
              you, such as your login status or preferences. Cookies can be
              either session-based (deleted when you close your browser) or
              persistent (stored for a set period or until manually deleted).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              2. Cookies We Use
            </h2>

            <h3 className="text-xl font-semibold text-slate-200 mb-3">
              Essential Cookies
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>
                <strong>auth_token:</strong> Stores your authentication token
                for secure login. This cookie is necessary to keep you logged
                in.
              </li>
              <li>
                <strong>Session cookies:</strong> Help us manage your session
                and protect against unauthorized access.
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-200 mb-3">
              Analytics Cookies
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>
                <strong>Vercel Analytics:</strong> Tracks page views and
                performance metrics to help us improve the site.
              </li>
              <li>
                <strong>Google Analytics:</strong> Measures user engagement and
                behavior patterns (if enabled).
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-200 mb-3">
              Functional Cookies
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Preference cookies:</strong> Remember your language,
                theme, and filter preferences.
              </li>
              <li>
                <strong>Search history:</strong> Store your recent job searches
                locally on your device.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              3. Cookie Duration
            </h2>
            <p>
              <strong>auth_token:</strong> Expires after 7 days (can be
              configured)
            </p>
            <p>
              <strong>Session cookies:</strong> Deleted when you close your
              browser
            </p>
            <p>
              <strong>Persistent cookies:</strong> Stored for the duration
              specified in the cookie (typically 30-365 days)
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. Managing Your Cookies
            </h2>
            <p>You can control cookies through your browser settings:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Most browsers allow you to refuse cookies or alert you when
                cookies are being sent
              </li>
              <li>
                You can delete cookies that have been stored on your device
              </li>
              <li>
                However, disabling essential cookies may affect your ability to
                use Techdive
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              5. Third-Party Cookies
            </h2>
            <p>
              Techdive may use third-party services (like Vercel, Google
              Analytics, and Stripe) that may set their own cookies. We
              recommend reviewing their privacy policies:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <a
                  href="https://vercel.com/privacy"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Vercel Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://policies.google.com/privacy"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Google Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://stripe.com/privacy"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Stripe Privacy Policy
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              6. Changes to This Cookie Policy
            </h2>
            <p>
              We may update this Cookie Policy periodically. We will notify you
              of significant changes by posting the updated policy on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              7. Contact Us
            </h2>
            <p>
              If you have questions about our use of cookies, please contact us
              at support@techdive.space
            </p>
          </section>
        </div>

        <p className="text-slate-400 text-sm mt-12">Last updated: May 2026</p>
      </div>
    </div>
  );
}
