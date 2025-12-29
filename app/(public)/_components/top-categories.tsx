import { ServiceCard } from "./animated-card";

const TopCategories = () => {
  const categories = [
    {
      title: "Art & Design",
      href: "/services/gamification",
      imgSrc: "../images/design.png",
      imgAlt: "Art & Design",
      variant: "purple",
    },
    {
      title: "Development",
      href: "/services/design",
      imgSrc: "../images/development.png",
      imgAlt: "Development",
      variant: "gray",
    },
    {
      title: "Business",
      href: "/services/analytics",
      imgSrc:
        "../images/business.png",
      imgAlt: "Business",
      variant: "blue",
    },
    {
      title: "Finance",
      href: "/services/content",
      imgSrc:
        "../images/finance.png",
      imgAlt: "Finance",
      variant: "green",
    },
    {
      title: "Marketing",
      href: "/services/gamification",
      imgSrc:
        "../images/marketing.png",
      imgAlt: "Marketing",
      variant: "red",
    },
    {
      title: "Photography",
      href: "/services/design",
      imgSrc:
        "../images/photography.png",
      imgAlt: "Photography",
      variant: "brown",
    },
    {
      title: "Data Science",
      href: "/services/analytics",
      imgSrc:
        "../images/data-science.png",
      imgAlt: "Data Science",
      variant: "navy",
    },
    {
      title: "Teaching & Academics",
      href: "/services/content",
      imgSrc:
        "../images/academics.png",
      imgAlt: "Teaching & Academics",
      variant: "orange",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <ServiceCard
            key={category.title}
            title={category.title}
            href={category.href}
            imgSrc={category.imgSrc}
            imgAlt={category.imgAlt}
            variant={category.variant as "red" | "default" | "gray" | "blue"}
            className="min-h-[180px] shadow-[0_15px_25px_-10px_rgba(0,0,0,0.25)]"
          />
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
