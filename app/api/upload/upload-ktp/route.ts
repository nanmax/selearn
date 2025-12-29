import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import { NextResponse } from "next/server";
import { env } from "@/lib/env";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME!,
  api_key: env.CLOUDINARY_API_KEY!,
  api_secret: env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      console.error("No file received");
      return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "ktp" }, (error?: UploadApiErrorResponse, result?: UploadApiResponse) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else if (result) {
            resolve(result);
          } else {
            reject(new Error("Unknown upload error"));
          }
        })
        .end(buffer);
    });

    console.log("Upload success:", result.secure_url);

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      message: "Upload berhasil",
    });
  } catch (error) {
    console.error("Upload route error:", error);
    return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 });
  }
}
