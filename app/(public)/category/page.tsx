import Link from "next/link";
import { slugify } from "@/lib/utils";
import { getCourseCategories } from "../actions/get-course-categories";

export const dynamic = "force-dynamic";

export default async function CategoryPage() {
  const categoryNames = await getCourseCategories();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Course Categories
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {categoryNames.map((name) => (
          <Link
            key={name}
            href={`/category/${slugify(name)}`}
            className="p-6 border rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-center">{name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
