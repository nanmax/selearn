import { notFound } from "next/navigation";
import { CategoryPageClient } from "../_components/CategoryPageClient";
import { getCoursesByCategorySlug } from "../../actions/get-course-categories";

export const dynamic = "force-dynamic";

const categoryDescriptions: Record<string, string> = {
  development:
    "The Development category is designed for learners who want to master the art and science of building digital products. From web and mobile app development to advanced software engineering, this category covers programming languages, frameworks, and tools used by industry professionals. Whether you’re just starting out or already an experienced developer, you’ll gain the skills to create scalable applications, automate processes, and innovate in today’s fast-paced tech world.",
  business:
    "The Business category provides practical knowledge and strategies for entrepreneurs, managers, and professionals who want to excel in leadership and organizational growth. Courses in this area focus on entrepreneurship, business strategy, project management, and leadership skills. You’ll learn how to develop business models, manage teams effectively, analyze markets, and build sustainable growth for startups as well as established companies.",
  "finance-accounting":
    "Finance & Accounting is a comprehensive category for anyone who wants to understand the language of money and business performance. Here you’ll explore topics such as financial reporting, investment strategies, taxation, and corporate finance. These courses will help you master the principles of managing personal finances, analyzing company balance sheets, and making informed investment decisions to achieve financial stability and business success.",
  "it-software":
    "The IT & Software category focuses on building strong foundations in technology infrastructure, cybersecurity, and software systems. You’ll learn how computer networks function, how to secure systems from cyber threats, and how to use different software solutions to solve business challenges. This category is ideal for aspiring IT professionals, system administrators, and anyone interested in staying ahead in the rapidly evolving tech landscape.",
  "office-productivity":
    "Office Productivity courses are designed to help professionals work smarter, not harder. This category includes training on essential workplace tools such as Microsoft Office, Google Workspace, and other business applications. You’ll discover techniques for improving workflow efficiency, organizing projects, automating tasks, and collaborating effectively in team environments. These skills are essential for anyone aiming to boost their performance in the modern workplace.",
  "personal-development":
    "Personal Development courses empower you to unlock your potential and grow in all aspects of life. Topics range from communication skills, time management, and emotional intelligence to goal setting, self-confidence, and career planning. This category is about investing in yourself, building habits that support success, and gaining the mindset needed to overcome challenges and thrive personally and professionally.",
  design:
    "The Design category is perfect for creative minds who want to bring ideas to life visually. You’ll explore courses on graphic design, UI/UX design, animation, and creative tools like Adobe Creative Suite and Figma. These courses will help you master design principles, improve your creative process, and produce work that is both visually stunning and user-friendly. Ideal for aspiring designers and professionals who want to sharpen their skills in the creative industry.",
  marketing:
    "Marketing is the engine that drives business growth, and this category covers everything from traditional strategies to modern digital marketing. You’ll learn about branding, content creation, SEO, social media campaigns, and data-driven advertising. Whether you want to build a personal brand, promote a small business, or run global marketing campaigns, these courses will give you the tools and strategies to connect with audiences and achieve measurable results.",
  "health-and-fitness":
    "The Health & Fitness category is dedicated to helping you improve your physical and mental well-being. Courses include topics such as exercise programs, nutrition planning, mental health awareness, and lifestyle improvements. You’ll learn how to build sustainable fitness routines, maintain a balanced diet, and cultivate habits that support long-term health. Perfect for anyone seeking to live a healthier, stronger, and more fulfilling life.",
  music:
    "The Music category inspires learners to discover or refine their musical talent. Whether you’re a beginner learning an instrument, a vocalist improving your technique, or a producer exploring digital music creation, you’ll find a variety of courses to suit your interests. You’ll dive into music theory, composition, sound production, and performance skills, helping you turn your passion for music into a professional skill or a lifelong hobby.",
  "teaching-academics":
    "Teaching & Academics is focused on empowering educators and lifelong learners with the tools to excel in education. This category includes courses on teaching methodologies, classroom management, academic research, and subject-specific instruction. Whether you’re a teacher aiming to inspire students, a researcher deepening your knowledge, or a learner expanding academic expertise, these courses provide structured guidance for success in the world of education.",
};

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.category;

  const { categoryName, courses } = await getCoursesByCategorySlug(slug);

  if (!categoryName) notFound();

  const description =
    categoryDescriptions[slug] || "Explore our courses in this category.";

  return (
    <CategoryPageClient
      courses={courses}
      categoryName={categoryName}
      description={description}
    />
  );
}
