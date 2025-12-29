"use server";

import { prisma } from "@/lib/db";
import { RegisterInstructorSchema } from "../_schemas/register-instructor";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { InstructorFormData } from "../page";

const REFERRAL_BONUS_POINTS = 50000; // 50.000 poin = Rp 50.000

export async function registerInstructorAction(formData: InstructorFormData) {
  try {
    const validated = RegisterInstructorSchema.parse(formData);

    // Validasi kode referral jika diisi
    let referrerUser = null;
    if (validated.referralCode) {
      referrerUser = await prisma.user.findUnique({
        where: { referralCode: validated.referralCode },
      });

      if (!referrerUser) {
        return {
          success: false,
          message: "Kode referral tidak valid. Silakan periksa kembali atau kosongkan field tersebut."
        };
      }
    }

    // Buat pendaftaran instruktur
    const instructor = await prisma.registerInstructor.create({
      data: {
        name: validated.name,
        email: validated.email,
        profession: validated.profession,
        industry: validated.industry,
        linkedinAccount: validated.linkedinAccount,
        bio: validated.bio,
        numberKTP: validated.numberKTP,
        ktpImageUrl: validated.ktpImageUrl || "",
        referralCode: validated.referralCode || null,
      },
    });

    // Jika ada referrer yang valid, berikan bonus poin
    if (referrerUser) {
      await prisma.$transaction([
        // Update poin user yang mereferensikan
        prisma.user.update({
          where: { id: referrerUser.id },
          data: { points: { increment: REFERRAL_BONUS_POINTS } },
        }),
        // Catat transaksi poin
        prisma.pointTransaction.create({
          data: {
            userId: referrerUser.id,
            amount: REFERRAL_BONUS_POINTS,
            type: "REFERRAL_BONUS",
            description: `Bonus referral dari pendaftaran instruktur: ${validated.name}`,
            referenceId: instructor.id,
          },
        }),
      ]);
    }

    revalidatePath("/");
    return {
      success: true,
      message: referrerUser
        ? "Pendaftaran instructor berhasil dikirim. Kode referral valid!"
        : "Pendaftaran instructor berhasil dikirim.",
      data: instructor
    };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { success: false, message: "Validasi gagal", errors: err.issues.map(e => e.message) };
    }
    console.error("Register Instructor Error:", err);
    return { success: false, message: "Terjadi kesalahan pada server" };
  }
}
