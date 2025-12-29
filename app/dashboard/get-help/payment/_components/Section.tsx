import React from "react";

export default function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="space-y-2 scroll-mt-24">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-primary">
        {title}
      </h2>
      <div className="text-gray-700 text-base leading-relaxed">{children}</div>
    </section>
  );
}
