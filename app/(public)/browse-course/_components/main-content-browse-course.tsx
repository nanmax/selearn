/* eslint-disable @next/next/no-img-element */
import { Input } from "@/components/ui/input";
import React from "react";

const MainContentBrowseCourse = () => {
  return (
    <main>
      <section className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Jelajahi Ribuan Kursus Unggulan
          </h1>
          <p className="text-lg md:text-xl max-w-3xl text-gray-600">
            Temukan kursus yang tepat untuk meningkatkan keterampilan dan
            mencapai tujuan karir Anda, diajar oleh para ahli industri.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-8 lg:gap-12">
          <aside className="w-full lg:w-1/4">
            <div className="sticky top-28 space-y-8">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Cari kursus..."
                  className="w-full p-3 pl-10 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">Kategori</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <Input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />{" "}
                    <span className="ml-2 text-gray-700">Web Development</span>
                  </label>
                  <label className="flex items-center">
                    <Input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />{" "}
                    <span className="ml-2 text-gray-700">Desain</span>
                  </label>
                  <label className="flex items-center">
                    <Input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />{" "}
                    <span className="ml-2 text-gray-700">Bisnis</span>
                  </label>
                  <label className="flex items-center">
                    <Input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />{" "}
                    <span className="ml-2 text-gray-700">Pemasaran</span>
                  </label>
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Lihat semua
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">Tingkat</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <Input
                      type="radio"
                      name="level"
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />{" "}
                    <span className="ml-2 text-gray-700">Semua Tingkat</span>
                  </label>
                  <label className="flex items-center">
                    <Input
                      type="radio"
                      name="level"
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />{" "}
                    <span className="ml-2 text-gray-700">Pemula</span>
                  </label>
                  <label className="flex items-center">
                    <Input
                      type="radio"
                      name="level"
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />{" "}
                    <span className="ml-2 text-gray-700">Menengah</span>
                  </label>
                  <label className="flex items-center">
                    <Input
                      type="radio"
                      name="level"
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />{" "}
                    <span className="ml-2 text-gray-700">Mahir</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">Harga</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <Input
                      type="radio"
                      name="price"
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />{" "}
                    <span className="ml-2 text-gray-700">Semua</span>
                  </label>
                  <label className="flex items-center">
                    <Input
                      type="radio"
                      name="price"
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />{" "}
                    <span className="ml-2 text-gray-700">Berbayar</span>
                  </label>
                  <label className="flex items-center">
                    <Input
                      type="radio"
                      name="price"
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />{" "}
                    <span className="ml-2 text-gray-700">Gratis</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Menampilkan <span className="font-bold">12</span> dari{" "}
                <span className="font-bold">128</span> kursus
              </p>
              <select className="rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 text-sm">
                <option>Urutkan: Paling Populer</option>
                <option>Urutkan: Peringkat Tertinggi</option>
                <option>Urutkan: Terbaru</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2 flex flex-col group">
                <img
                  src="https://placehold.co/600x400/3b82f6/ffffff?text=Web+Dev"
                  alt="Course thumbnail"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <span className="text-xs font-semibold text-blue-600 mb-1">
                    Web Development
                  </span>
                  <h3 className="font-bold text-gray-900 mb-2 flex-grow">
                    The Complete 2025 Web Development Bootcamp
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>4.8</span>
                    <div className="flex text-yellow-400 ml-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    </div>
                    <span className="ml-2">(1,250)</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <p className="text-lg font-bold text-gray-900">
                      Rp 249.000
                    </p>
                    <a
                      href="#"
                      className="text-sm font-semibold text-blue-600 hover:text-blue-800">
                      Lihat Detail
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2 flex flex-col group relative">
                <div className="absolute top-0 left-0 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-br-lg z-10">
                  PALING LARIS
                </div>
                <img
                  src="https://placehold.co/600x400/8b5cf6/ffffff?text=UI/UX"
                  alt="Course thumbnail"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <span className="text-xs font-semibold text-purple-600 mb-1">
                    Desain
                  </span>
                  <h3 className="font-bold text-gray-900 mb-2 flex-grow">
                    UI/UX Design Essentials: From Figma to Framer
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>4.9</span>
                    <div className="flex text-yellow-400 ml-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    </div>
                    <span className="ml-2">(3,410)</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <p className="text-lg font-bold text-gray-900">
                      Rp 329.000
                    </p>
                    <a
                      href="#"
                      className="text-sm font-semibold text-blue-600 hover:text-blue-800">
                      Lihat Detail
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-2">
                <a
                  href="#"
                  className="px-4 py-2 text-gray-500 bg-white rounded-lg hover:bg-slate-100 border border-slate-200">
                  &larr;
                </a>
                <a
                  href="#"
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg border border-blue-600">
                  1
                </a>
                <a
                  href="#"
                  className="px-4 py-2 text-gray-700 bg-white rounded-lg hover:bg-slate-100 border border-slate-200">
                  2
                </a>
                <a
                  href="#"
                  className="px-4 py-2 text-gray-700 bg-white rounded-lg hover:bg-slate-100 border border-slate-200">
                  3
                </a>
                <a
                  href="#"
                  className="px-4 py-2 text-gray-700 bg-white rounded-lg hover:bg-slate-100 border border-slate-200">
                  &rarr;
                </a>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainContentBrowseCourse;
