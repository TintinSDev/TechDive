import { galada } from "@/app/lib/fonts";
import Link from "next/link";

export const Footer = () => (
  <footer className="bg-gray-900 text-white mt-20">
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="font-bold mb-4">Techdive</h3>
          <p className="text-gray-400">Find your next remote tech job.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="/jobs">Browse Jobs</a>
            </li>
            <li>
              <a href="/pricing">Pricing</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#">Privacy</a>
            </li>
            <li>
              <a href="#">Terms</a>
            </li>
          </ul>
        </div>
      </div>
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
