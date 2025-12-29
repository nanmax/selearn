/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
  ReviewStars,
} from "./animated-cards-stack";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TESTIMONIALS = [
  {
    id: "testimonial-3",
    name: "Budi Santoso",
    profession: "Instruktur Matematika",
    rating: 5,
    description:
      "Sejak bergabung dengan Selearn, saya bisa membagikan ilmu saya ke lebih banyak siswa tanpa batas ruang dan waktu. Rasanya menyenangkan melihat materi saya membantu mereka memahami pelajaran lebih mudah.",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "testimonial-1",
    name: "Aulia Rahma",
    profession: "Instruktur Bahasa Inggris",
    rating: 4.5,
    description:
      "Platform ini memudahkan saya untuk fokus mengajar. Semua sudah terorganisir dengan baik, dari kurikulum sampai interaksi dengan siswa. Sangat membantu perkembangan kelas saya.",
    avatarUrl:
      "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: "testimonial-2",
    name: "Siti Aminah",
    profession: "Instruktur Desain Grafis",
    rating: 5,
    description:
      "Saya suka sekali bagaimana Selearn memberi ruang kreatif untuk mengajar. Materi desain saya bisa lebih interaktif, dan siswa jadi lebih cepat berkembang.",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "testimonial-4",
    name: "Dedi Kurniawan",
    profession: "UI/UX Designer",
    rating: 4.5,
    description:
      "Awalnya saya ragu, tapi ternyata respon siswa sangat positif. Dengan Selearn, saya bisa menjangkau lebih banyak murid yang ingin belajar coding dari dasar.",
    avatarUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
  },
];

const ANIM_IMAGES = [
  "https://img.freepik.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666687.jpg?semt=ais_hybrid&w=740",
  "https://img.freepik.com/free-photo/anime-character-winter_23-2151843507.jpg?semt=ais_hybrid&w=740",
  "https://img.freepik.com/free-photo/anime-character-using-virtual-reality-glasses-metaverse_23-2151568847.jpg?semt=ais_hybrid&w=740",
  "https://img.freepik.com/free-photo/anime-character-using-virtual-reality-glasses-metaverse_23-2151568850.jpg?t=st=1747007259~exp=1747010859~hmac=0f9056951d9ea1c8bf86dd63e33b00ea3a34e3a40575b5ec5b7bd77cfca69ad6&w=996",
  "https://img.freepik.com/free-photo/fantasy-anime-style-scene_23-2151135073.jpg?t=st=1747006767~exp=1747010367~hmac=f744af6af2545a9dcb4f01d78af38e2828b0375243bc3c1dfae391b2db68c09f&w=900",
];

function getSectionClass(theme: string | undefined) {
  return theme === "dark"
    ? "bg-destructive text-secondary px-8 py-12"
    : "bg-accent px-8 py-12";
}

function getReviewStarsClass(theme: string | undefined) {
  return theme === "dark" ? "text-primary" : "text-teal-500";
}

function getTextClass(theme: string | undefined) {
  return theme === "dark" ? "text-primary-foreground" : "";
}

function getAvatarClass(theme: string | undefined) {
  return theme === "dark"
    ? "!size-12 border border-stone-700"
    : "!size-12 border border-stone-300";
}

function getCardVariant(theme: string | undefined) {
  return theme === "dark" ? "dark" : "light";
}

export function TestimonialsInstrutors() {
  const { theme } = useTheme();

  return (
    <section className={getSectionClass(theme)}>
      <div>
        <h3 className="text-center text-4xl font-semibold">
          Apa Kata Instructors Kami?
        </h3>
        <p className="mx-auto mt-2 max-w-lg text-center text-sm">
          Dengarkan pengalaman nyata dari para instructor yang telah bergabung
          bersama <span className="font-semibold text-primary">Selearn</span>{" "}
          dan mulai membagikan ilmu mereka kepada ribuan pelajar.
        </p>
      </div>
      <ContainerScroll className="container h-[300vh] ">
        <div className="sticky left-0 top-0 h-svh w-full py-12">
          <CardsContainer className="mx-auto size-full h-[450px] w-[350px]">
            {TESTIMONIALS.map((testimonial, index) => (
              <CardTransformed
                arrayLength={TESTIMONIALS.length}
                key={testimonial.id}
                variant={getCardVariant(theme)}
                index={index + 2}
                role="article"
                aria-labelledby={`card-${testimonial.id}-title`}
                aria-describedby={`card-${testimonial.id}-content`}>
                <div className="flex flex-col items-center space-y-4 text-center">
                  <ReviewStars
                    className={getReviewStarsClass(theme)}
                    rating={testimonial.rating}
                  />
                  <div
                    className={`mx-auto w-4/5 text-lg ${getTextClass(theme)}`}>
                    <blockquote cite="#">{testimonial.description}</blockquote>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar className={getAvatarClass(theme)}>
                    <AvatarImage
                      src={testimonial.avatarUrl}
                      alt={`Portrait of ${testimonial.name}`}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="block text-lg font-semibold tracking-tight md:text-xl">
                      {testimonial.name}
                    </span>
                    <span className="block text-sm text-muted-foreground ">
                      {testimonial.profession}
                    </span>
                  </div>
                </div>
              </CardTransformed>
            ))}
          </CardsContainer>
        </div>
      </ContainerScroll>
    </section>
  );
}

export const AwardsVariant = () => {
  return (
    <section className="bg-accent px-8 py-12">
      <div>
        <h2 className="text-center text-4xl font-semibold">Recognitions</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          consequatur reprehenderit.
        </p>
      </div>
      <ContainerScroll className="container h-[300vh] ">
        <div className="sticky left-0 top-0 h-svh w-full py-12">
          <CardsContainer className="mx-auto size-full h-72 w-[440px]">
            <CardTransformed
              className="items-start justify-evenly border-none bg-blue-600/80  text-secondary backdrop-blur-md"
              arrayLength={TESTIMONIALS.length}
              index={1}>
              <div className="flex flex-col items-start justify-start space-y-4 ">
                <div className="flex size-16 items-center justify-center  rounded-sm bg-secondary/50 text-2xl">
                  🏆
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-wide">Awwwards</h4>
                  <h3 className="text-2xl font-bold">Site of the Day</h3>
                </div>
              </div>
              <p className=" text-secondary/80">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellendus consequatur reprehenderit.
              </p>
            </CardTransformed>

            <CardTransformed
              className="items-start justify-evenly border-none bg-orange-600/80 text-secondary backdrop-blur-md"
              arrayLength={TESTIMONIALS.length}
              index={2}>
              <div className="flex flex-col items-start justify-start space-y-4 ">
                <div className="flex size-16 items-center justify-center  rounded-sm bg-secondary/50 text-2xl">
                  🚀
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-wide">
                    Performance
                  </h4>
                  <h3 className="text-2xl font-bold">100% Performance Score</h3>
                </div>
              </div>
              <p className=" text-secondary/80">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellendus consequatur reprehenderit.
              </p>
            </CardTransformed>
            <CardTransformed
              className="items-start justify-evenly border-none bg-cyan-600/80 text-secondary backdrop-blur-md"
              arrayLength={TESTIMONIALS.length}
              index={3}>
              <div className="flex flex-col items-start justify-start space-y-4 ">
                <div className="flex size-16 items-center justify-center  rounded-sm bg-secondary/50 text-2xl">
                  🎯
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-wide">
                    CSS awaaards
                  </h4>
                  <h3 className="text-2xl font-bold">Honorable Mention</h3>
                </div>
              </div>
              <p className=" text-secondary/80">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellendus consequatur reprehenderit.
              </p>
            </CardTransformed>
            <CardTransformed
              className="items-start justify-evenly border-none bg-violet-600/80 text-secondary backdrop-blur-md"
              arrayLength={TESTIMONIALS.length}
              index={4}>
              <div className="flex flex-col items-start justify-start space-y-4 ">
                <div className="flex size-16 items-center justify-center  rounded-sm bg-secondary/50 text-2xl">
                  🎖
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-wide">awaaards</h4>
                  <h4 className="text-2xl font-bold">Most Creative Design</h4>
                </div>
              </div>
              <p className=" text-secondary/80">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellendus consequatur reprehenderit.
              </p>
            </CardTransformed>
          </CardsContainer>
        </div>
      </ContainerScroll>
    </section>
  );
};

export const ImagesVariant = () => {
  return (
    <section className=" bg-slate-900 px-8 py-12">
      <div>
        <h2 className="text-center text-4xl font-semibold">
          Try our AI Fantázomai
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          consequatur reprehenderit.
        </p>
      </div>
      <ContainerScroll className="container h-[300vh] ">
        <div className="sticky left-0 top-0 h-svh w-full py-12">
          <CardsContainer className="mx-auto size-full h-[420px] w-[320px]">
            {ANIM_IMAGES.map((imageUrl, index) => (
              <CardTransformed
                arrayLength={ANIM_IMAGES.length}
                key={index}
                index={index + 2}
                variant={"dark"}
                className="overflow-hidden !rounded-sm !p-0">
                <img
                  src={imageUrl}
                  alt="anime"
                  className="size-full object-cover"
                  width={"100%"}
                  height={"100%"}
                />
              </CardTransformed>
            ))}
          </CardsContainer>
        </div>
      </ContainerScroll>
    </section>
  );
};
