import React from 'react';
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
   return (
    <section className="w-full relative overflow-hidden py-12 bg-[rgba(30,32,50,0.92)] border-t-2 border-t-[var(--accent-blue)] shadow-lg backdrop-blur-xl mt-12">
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent-blue)] to-transparent blur-sm opacity-70 pointer-events-none" />
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap gap-y-8 justify-between items-start">
          <div className="w-full md:w-1/3 flex flex-col gap-4 items-start mb-8 md:mb-0">
            <Logo width="120px" />
            <p className="text-base text-[var(--accent-blue)] font-sans mt-2">
              &copy; {new Date().getFullYear()} DevUI. All Rights Reserved.
            </p>
            <div className="flex gap-3 mt-2">
              {/* Social icons placeholder */}
              <span className="w-8 h-8 rounded-full bg-[var(--accent-blue)] opacity-30 flex items-center justify-center text-white font-bold">F</span>
              <span className="w-8 h-8 rounded-full bg-[var(--accent-blue)] opacity-30 flex items-center justify-center text-white font-bold">T</span>
              <span className="w-8 h-8 rounded-full bg-[var(--accent-blue)] opacity-30 flex items-center justify-center text-white font-bold">I</span>
            </div>
          </div>
          <div className="w-full md:w-2/3 flex flex-wrap gap-8 justify-end">
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase text-[var(--accent-pink)] font-sans tracking-widest">Company</h3>
              <ul className="space-y-2">
                <li><Link className="text-base font-medium text-[var(--accent-blue)] hover:text-[var(--accent-pink)] transition-all duration-300 font-sans" to="/">Features</Link></li>
                <li><Link className="text-base font-medium text-[var(--accent-blue)] hover:text-[var(--accent-pink)] transition-all duration-300 font-sans" to="/">Pricing</Link></li>
                <li><Link className="text-base font-medium text-[var(--accent-blue)] hover:text-[var(--accent-pink)] transition-all duration-300 font-sans" to="/">Affiliate Program</Link></li>
                <li><Link className="text-base font-medium text-[var(--accent-blue)] hover:text-[var(--accent-pink)] transition-all duration-300 font-sans" to="/">Press Kit</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase text-[var(--accent-pink)] font-sans tracking-widest">Support</h3>
              <ul className="space-y-2">
                <li><Link className="text-base font-medium text-[var(--accent-blue)] hover:text-[var(--accent-pink)] transition-all duration-300 font-sans" to="/">Account</Link></li>
                <li><Link className="text-base font-medium text-[var(--accent-blue)] hover:text-[var(--accent-pink)] transition-all duration-300 font-sans" to="/">Help</Link></li>
                <li><Link className="text-base font-medium text-[var(--accent-blue)] hover:text-[var(--accent-pink)] transition-all duration-300 font-sans" to="/">Contact Us</Link></li>
                <li><Link className="text-base font-medium text-[var(--accent-blue)] hover:text-[var(--accent-pink)] transition-all duration-300 font-sans" to="/">Customer Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase text-[var(--accent-pink)] font-sans tracking-widest">Legals</h3>
              <ul className="space-y-2">
                <li><Link className="text-base font-medium text-[var(--accent-blue)] hover:text-[var(--accent-pink)] transition-all duration-300 font-sans" to="/">Terms &amp; Conditions</Link></li>
                <li><Link className="text-base font-medium text-[var(--accent-blue)] hover:text-[var(--accent-pink)] transition-all duration-300 font-sans" to="/">Privacy Policy</Link></li>
                <li><Link className="text-base font-medium text-[var(--accent-blue)] hover:text-[var(--accent-pink)] transition-all duration-300 font-sans" to="/">Licensing</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer;