
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingCart,
  Truck,
  ShieldCheck,
} from "lucide-react";

import { useCart } from "@/app/context/cart-context";
import { formatAED } from "../../lib/formate-price";

export default function CartPage() {
  const {
    items,
    subtotal,
    deliveryFee,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (items.length === 0) return;

    // Checkout submission will be connected to the order system next.
    alert("Your cart is ready. Order submission is not connected yet.");
  };

  return (
    <main className="min-h-screen bg-[#080d20] px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-[1200px]">

        {/* HEADER */}
        <div className="mb-8">
          <Link
            href="/products"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">
              <ShoppingBag size={25} />
            </div>

            <div>
              <h1 className="text-3xl font-black">Shopping Cart</h1>
              <p className="mt-1 text-sm text-gray-400">
                Review your products before checkout
              </p>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          /* EMPTY CART */
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#111832] px-5 text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-purple-500/10">
              <ShoppingCart size={38} className="text-purple-400" />
            </div>

            <h2 className="text-2xl font-bold">Your Cart Is Empty</h2>

            <p className="mt-2 max-w-sm text-sm text-gray-400">
              You haven't added any products to your cart yet.
              Explore our collection and find your favorite products.
            </p>

            <Link
              href="/products"
              className="mt-7 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 px-8 py-3 font-bold text-white shadow-lg shadow-purple-900/30 transition hover:scale-105"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[1.5fr_1fr]">

            {/* CART ITEMS */}
            <section className="space-y-4">

              <div className="rounded-2xl border border-white/10 bg-[#111832] p-5">
                <h2 className="mb-5 text-lg font-bold">
                  Cart Items ({items.reduce((sum, item) => sum + item.quantity, 0)})
                </h2>

                <div className="space-y-5">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex flex-col gap-4 border-b border-white/10 pb-5 last:border-0 last:pb-0 sm:flex-row"
                    >
                      <div className="flex min-w-0 flex-1 gap-4">
                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-purple-500/20 bg-[#080d20]">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="line-clamp-2 font-bold text-white">
                            {item.product.name}
                          </h3>

                          <p className="mt-2 text-sm font-bold text-orange-400">
                            {formatAED(item.product.salePrice)}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            Available: {item.product.stock}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-between">
                        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#080d20] p-1">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item.product.id)}
                            disabled={item.quantity <= 1}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-purple-600 disabled:opacity-40"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={15} />
                          </button>

                          <span className="min-w-5 text-center text-sm font-bold">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => increaseQuantity(item.product.id)}
                            disabled={item.quantity >= item.product.stock}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-purple-600 disabled:opacity-40"
                            aria-label="Increase quantity"
                          >
                            <Plus size={15} />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-bold text-white">
                            {formatAED(item.product.salePrice * item.quantity)}
                          </span>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id)}
                            className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                            aria-label="Remove product"
                            title="Remove product"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TRUST INFORMATION */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111832] p-4">
                  <Truck className="shrink-0 text-purple-400" size={23} />
                  <div>
                    <p className="text-xs font-bold text-white">Delivery</p>
                    <p className="mt-1 text-[11px] text-gray-400">UAE Delivery</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111832] p-4">
                  <ShieldCheck className="shrink-0 text-green-400" size={23} />
                  <div>
                    <p className="text-xs font-bold text-white">Secure Order</p>
                    <p className="mt-1 text-[11px] text-gray-400">Cash on Delivery</p>
                  </div>
                </div>
              </div>
            </section>

            {/* CHECKOUT */}
            <aside className="space-y-5">

              {/* ORDER SUMMARY */}
              <div className="rounded-2xl border border-purple-500/30 bg-[#111832] p-5">
                <h2 className="mb-5 text-lg font-bold">Order Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>{formatAED(subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-gray-300">
                    <span>Delivery Fee</span>
                    <span>{formatAED(deliveryFee)}</span>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between text-base font-black">
                      <span>Total</span>
                      <span className="text-orange-400">
                        {formatAED(total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CUSTOMER DETAILS */}
              <form
                onSubmit={handleCheckout}
                className="rounded-2xl border border-white/10 bg-[#111832] p-5"
              >
                <h2 className="mb-5 text-lg font-bold">
                  Delivery Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={customer.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="w-full rounded-xl border border-white/10 bg-[#080d20] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={customer.phone}
                      onChange={handleChange}
                      placeholder="+971 5X XXX XXXX"
                      required
                      className="w-full rounded-xl border border-white/10 bg-[#080d20] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                      Full Address *
                    </label>
                    <textarea
                      name="address"
                      value={customer.address}
                      onChange={(e) =>
                        setCustomer({ ...customer, address: e.target.value })
                      }
                      placeholder="Building, street, area, city..."
                      rows={3}
                      required
                      className="w-full resize-none rounded-xl border border-white/10 bg-[#080d20] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={customer.notes}
                      onChange={(e) =>
                        setCustomer({ ...customer, notes: e.target.value })
                      }
                      placeholder="Any special instructions..."
                      rows={2}
                      className="w-full resize-none rounded-xl border border-white/10 bg-[#080d20] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-purple-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 px-5 py-4 font-black text-white shadow-lg shadow-purple-900/30 transition hover:scale-[1.02] hover:shadow-purple-500/20"
                >
                  Place COD Order · {formatAED(total)}
                </button>

                <p className="mt-3 text-center text-xs text-gray-400">
                  Pay when your order is delivered.
                </p>
              </form>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
