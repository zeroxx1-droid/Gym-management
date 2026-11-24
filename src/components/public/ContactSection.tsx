"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setEmail("");
      setMessage("");
      alert("Inquiry received! A Black Square strength consultant will reach out via WhatsApp / Email.");
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-900 border-t border-dark-800">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-lime-400 font-bold text-xs uppercase tracking-widest">
            Visit The Iron Temple
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            LOCATION & <span className="text-lime-400">HOURS</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Drop by for a private facility walkthrough or connect directly with our front desk staff.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Facility Location Details */}
          <div className="bg-dark-950 border border-dark-700/80 rounded-3xl p-8 shadow-card flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-lime-500/10 border border-lime-500/30 text-lime-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Facility Address</h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    404 Obsidian Way, Industrial Iron District, Suite 100
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    Dedicated member parking & bicycle racks available.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-lime-500/10 border border-lime-500/30 text-lime-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Operating Hours</h4>
                  <p className="text-xs text-lime-400 font-bold mt-1">
                    24/7 Biometric QR Turnstile Gate Access
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Staffed Front Desk: Mon – Fri: 5:30 AM – 10:00 PM | Sat – Sun: 7:00 AM – 8:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-lime-500/10 border border-lime-500/30 text-lime-400 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Direct WhatsApp Concierge</h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    Instant replies regarding memberships, guest passes, and trainer bookings.
                  </p>
                  <a
                    href="https://wa.me/15552345678?text=Hello%20Black%20Square%20Gym%20Desk!%20I%20would%20like%20to%20inquire%20about%20a%20membership."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-lime-400 hover:text-lime-300 mt-2"
                  >
                    <span>Chat on WhatsApp (+1 555-234-5678)</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Simulated Interactive Map Plate */}
            <div className="h-44 bg-dark-900 border border-dark-700/80 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-grid-pattern opacity-30" />
              <div className="w-9 h-9 bg-lime-500 text-black rounded-full flex items-center justify-center font-bold shadow-neon mb-2">
                ■
              </div>
              <p className="text-xs font-bold text-white z-10">
                Black Square Gym Headquarters
              </p>
              <p className="text-[10px] text-zinc-500 z-10 font-mono">
                Lat 37.7749° N, Lon 122.4194° W
              </p>
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <div className="bg-dark-950 border border-dark-700/80 rounded-3xl p-8 shadow-card flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-white tracking-tight mb-1">
                Drop Us A Message
              </h3>
              <p className="text-xs text-zinc-400 mb-6">
                Fill out the quick form below and our team will get back to you within 2 business hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Your Name *
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="e.g. Jason Brooks"
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Email Address *
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                    placeholder="jason@company.com"
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Questions / Goals *
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    placeholder="Tell us what you want to achieve or what tier you're considering..."
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500 text-xs"
                  />
                </div>

                <Button
                  type="submit"
                  variant="lime"
                  size="md"
                  isLoading={submitted}
                  leftIcon={submitted ? <CheckCircle2 className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                  className="w-full text-xs font-bold"
                >
                  {submitted ? "Message Sent!" : "Send Inquiry"}
                </Button>
              </form>
            </div>

            <div className="pt-4 mt-6 border-t border-dark-800 text-[11px] text-zinc-500 text-center">
              Strict privacy pledge: We never share your contact details.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
