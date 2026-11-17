
"use client";

import { useState } from "react";
import {
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  Phone,
} from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const whatsappNumber = "971566323742";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text = encodeURIComponent(
      `Hello UAE IPTV Team!\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.open(
      `https://wa.me/${whatsappNumber}?text=${text}`,
      "_blank"
    );
  };

  return (
    <main className="bg-white">

      {/* Hero */}
      <section className="bg-[#10152b] px-4 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <span className="rounded-full bg-orange-500/20 px-4 py-2 text-sm font-semibold text-orange-400">
            CONTACT US
          </span>

          <h1 className="mt-6 text-4xl font-bold md:text-5xl">
            We’re Here to <span className="text-orange-400">Help You</span>
          </h1>

          <p className="mt-5 text-gray-300">
            Have questions about our IPTV boxes or subscription plans?
            Get in touch with our team. We’ll be happy to help.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-gray-100 p-7 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <MessageCircle size={28} />
            </div>
            <h3 className="mt-5 text-xl font-bold text-gray-900">
              WhatsApp
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Chat with our support team.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block font-semibold text-green-600 hover:underline"
            >
              Chat on WhatsApp →
            </a>
          </div>

          <div className="rounded-2xl border border-gray-100 p-7 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
              <Mail size={28} />
            </div>
            <h3 className="mt-5 text-xl font-bold text-gray-900">
              Email Us
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Send us your questions anytime.
            </p>
            <a
              href="mailto:uaeiptvbox@gmail.com"
              className="mt-5 inline-block font-semibold text-orange-500 hover:underline"
            >
              Send an Email →
            </a>
          </div>

          <div className="rounded-2xl border border-gray-100 p-7 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <MapPin size={28} />
            </div>
            <h3 className="mt-5 text-xl font-bold text-gray-900">
              Our Location
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Dubai, United Arab Emirates
            </p>
            <span className="mt-5 inline-block font-semibold text-blue-600">
              UAE Support
            </span>
          </div>

        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-gray-50 px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">

          <div className="flex flex-col justify-center">
            <span className="font-semibold text-orange-500">
              GET IN TOUCH
            </span>

            <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Let’s Talk About Your IPTV Needs
            </h2>

            <p className="mt-5 leading-7 text-gray-500">
              Looking for an IPTV box or subscription plan?
              Send us a message and our team will assist you
              with product information and enquiries.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">
                  Customer Support
                </h4>
                <p className="text-sm text-gray-500">
                  Contact us through WhatsApp anytime.
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-green-600 shadow-sm">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">
                  WhatsApp Support
                </h4>
                <p className="text-sm text-gray-500">
                  Fast and convenient communication.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg md:p-9">
            <h3 className="text-2xl font-bold text-gray-900">
              Send Us a Message
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Fill out the form to start a WhatsApp enquiry.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Your Name
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Your Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-4 font-bold text-white transition hover:bg-green-700"
              >
                <Send size={19} />
                Send via WhatsApp
              </button>

            </form>
          </div>

        </div>
      </section>

    </main>
  );
}
