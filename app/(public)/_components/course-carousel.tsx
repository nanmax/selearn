import { SparkItem, SparksCarousel } from "./spark-carousel";

const sparksData: SparkItem[] = [
  {
    id: 1,
    thumbnail:
      "https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q3J5cHRvfGVufDB8fDB8fHww?q=80&w=280&h=160&fit=crop",
    title: "Web Developer Course: Learn by building",
    level: "Beginner",
    price: 120000,
    instructor: {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
  },
  {
    id: 2,
    thumbnail:
      "https://plus.unsplash.com/premium_photo-1661284836545-3a6ec65fcffc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHdvcmt8ZW58MHx8MHx8fDA%3D",
    title: "Digital Marketing: Grow your audience",
    level: "Intermediate",
    price: 220000,
    instructor: {
      name: "Andrew Spark",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
  },
  {
    id: 3,
    thumbnail:
      "https://images.unsplash.com/photo-1696960181433-68ca79ac8149?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRlY2lzaW9ufGVufDB8fDB8fHww",
    title: "Photography Basics: Capture the moment",
    level: "Expert",
    price: 180000,
    instructor: {
      name: "Lisa Tran",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  },
  {
    id: 4,
    thumbnail:
      "https://images.unsplash.com/photo-1695390837115-408e49a2041e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3Rha2V8ZW58MHx8MHx8fDA%3D",
    title: "Finance 101: Managing your money",
    level: "Beginner",
    price: 120000,
    instructor: {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
  },
  {
    id: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=280&h=160&fit=crop",
    title: "Testing Course: Ensure quality software",
    level: "Intermediate",
    price: 220000,
    instructor: {
      name: "Andrew Spark",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
  },
  {
    id: 6,
    thumbnail:
      "https://images.unsplash.com/photo-1534951009808-766178b47a4f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZpbmFuY2V8ZW58MHx8MHx8fDA%3D",
    title: "Administration Office: Organizational skills",
    level: "Expert",
    price: 180000,
    instructor: {
      name: "Lisa Tran",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  },
];

const CarouselCourse = () => {
  return (
    <div className="w-full bg-background">
      <SparksCarousel
        title="Top Kursus Pilihan"
        subtitle="Kursus terbaik yang dipilih untuk Anda"
        items={sparksData}
      />
    </div>
  );
};

export default CarouselCourse;
