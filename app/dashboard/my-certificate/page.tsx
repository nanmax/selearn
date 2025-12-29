import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUserCertificates } from "@/app/data/certificate/get-user-certificate";
import MyCertificateClient from "./_components/MyCertificateClient";
import { getContinueCourse } from "@/app/data/user/get-continue-course";
import ContinueCardCourse from "../_components/continue-card-course";
import { EmptyState } from "@/components/general/EmptyState";

export default async function MyCertificatePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }
  const [certificates, continueCourse] = await Promise.all([
    getUserCertificates(),
    getContinueCourse(),
  ]);

  return (
    <>
      <MyCertificateClient certificates={certificates} />
      {continueCourse?.Course ? (
        <ContinueCardCourse data={continueCourse} />
      ) : (
        <EmptyState
          title="Belum ada kursus yang sedang kamu ikuti"
          description="Mulai belajar sekarang dan lanjutkan progresmu di sini!"
          buttonText="Lihat Kursus"
          href="/courses"
        />
      )}
    </>
  );
}
