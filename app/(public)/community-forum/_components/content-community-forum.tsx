/* eslint-disable @next/next/no-img-element */
import { getDiscussions } from "@/app/data/discussion/get-discussions";
import { FormInputDialog } from "./form-input-dialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import { cookies } from "next/headers";

export default async function ContentCommunityForum() {
  const cookieStore = await cookies();
  const session = await auth.api.getSession({
    headers: { cookie: cookieStore.toString() },
  });

  const discussions = await getDiscussions();

  const categories = [
    { name: "Umum", color: "bg-slate-200 text-slate-800" },
    { name: "Web Development", color: "bg-green-100 text-green-800" },
    { name: "Desain", color: "bg-purple-100 text-purple-800" },
    { name: "Bisnis", color: "bg-amber-100 text-amber-800" },
    { name: "Marketing", color: "bg-red-100 text-red-800" },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-6">
        {/* Search & Button */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <Input
            type="search"
            placeholder="Cari topik diskusi..."
            className="w-full md:max-w-md p-3 pl-10 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          {session?.user ? (
            <FormInputDialog />
          ) : (
            <Link href="/login">
              <Button>Login Untuk Diskusi</Button>
            </Link>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content */}
          <div className="w-full lg:w-3/4">
            <div className="bg-white rounded-2xl shadow-lg">
              <div className="p-4 border-b border-slate-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Diskusi Terbaru
                </h2>
              </div>
              <div className="divide-y divide-slate-200">
                {discussions.length > 0 ? (
                  discussions.map((d) => (
                    <div
                      key={d.id}
                      className="p-4 flex items-start space-x-4 hover:bg-slate-50 transition-colors">
                      <img
                        src={d.image}
                        alt={d.author}
                        className="w-12 h-12 rounded-full flex-shrink-0"
                      />
                      <div className="flex-grow">
                        <Link
                          href={`/community-forum/${d.id}`}
                          className="font-bold text-lg text-gray-900 hover:text-blue-600">
                          {d.title}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">
                          Oleh{" "}
                          <span className="font-semibold text-gray-700">
                            {d.author}
                          </span>{" "}
                          •{" "}
                          <span
                            className={`inline-block ${d.categoryColor} text-xs font-semibold ml-2 px-2 py-0.5 rounded-full`}>
                            {d.category}
                          </span>
                        </p>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                          <span>💬 {d.replies} dibalas</span>
                          <span>👁️ {d.views} dilihat</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="p-6 text-center text-gray-500">
                    Tidak ada diskusi ditemukan.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-slate-200 pb-3">
                Kategori
              </h3>
              <ul className="space-y-3">
                {categories.map((c) => (
                  <li key={c.name}>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.color}`}>
                      {c.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
