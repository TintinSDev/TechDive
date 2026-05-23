import { galada } from "@/app/lib/fonts";
import Link from "next/link";

export const Footer = () => (
  <footer className="bg-gray-900 text-white mt-20">
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div>
          <h3 className="font-bold mb-4">Techdive</h3>
          <p className="text-gray-400">Remote jobs, delivered daily.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="/jobs" className="hover:text-white transition">
                Browse Jobs
              </a>
            </li>
            <li>
              <a href="/pricing" className="hover:text-white transition">
                Pricing
              </a>
            </li>
            <li>
              <a href="/recruiters" className="hover:text-white transition">
                For Recruiters
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="/about" className="hover:text-white transition">
                About
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-white transition">
                Blog
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="/privacy" className="hover:text-white transition">
                Privacy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-white transition">
                Terms
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* <div>
        <h4 className="text-white font-semibold mb-4">Follow</h4>
        <ul className="space-y-2 text-sm text-slate-400">
          <li>
            <a href="#" className="hover:text-white transition">
              Twitter
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-white transition">
              GitHub
            </a>
          </li>
        </ul>
      </div> */}
      <div className="text-center text-gray-400 pt-8 border-t border-gray-800">
        <p>
          Copyright © {new Date().getFullYear()},{" "}
          <Link href={"/"} className={`${galada.className} text-primary`}>
            Martin Maina.
          </Link>{" "}
          All Rights Reserved
        </p>
      </div>
    </div>
  </footer>
);
