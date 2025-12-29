import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const cloudinaryForm = new FormData();
    cloudinaryForm.append("file", file);
    cloudinaryForm.append("upload_preset", env.CLOUDINARY_UPLOAD_PRESET);
    cloudinaryForm.append("folder", "profile-pictures");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: cloudinaryForm,
      }
    );

    const data = await response.json();

    if (!data.secure_url) {
      console.error("Cloudinary response:", data);
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    return NextResponse.json({ url: data.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
