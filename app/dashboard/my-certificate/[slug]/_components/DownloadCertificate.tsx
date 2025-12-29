"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function DownloadCertificate() {
  const handleDownload = async () => {
    const certificate = document.getElementById("certificate");
    if (!certificate) {
      alert("Certificate not found!");
      return;
    }

    window.scrollTo(0, 0);

    const buttonContainer = document.getElementById("download-btn");
    if (buttonContainer) buttonContainer.style.display = "none";

    try {
      const canvas = await html2canvas(certificate, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        onclone: (doc) => {
          const cloned = doc.getElementById("certificate");
          if (cloned) {
            cloned.style.transform = "scale(1)";
            cloned.style.background = "#ffffff";
            cloned.style.overflow = "visible";

            cloned.querySelectorAll("*").forEach((el) => {
              const elem = el as HTMLElement;
              const bg = window.getComputedStyle(elem).backgroundImage;
              if (bg.includes("gradient") || bg.includes("lab(") || bg.includes("oklab(")) {
                elem.style.backgroundImage = "none";
                elem.style.backgroundColor = "#ffffff";
              }
            });
          }
        },
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("certificate.pdf");
    } catch (err) {
      console.error("❌ Error generate PDF:", err);
      alert("Gagal membuat PDF. Coba lagi.");
    } finally {
      if (buttonContainer) buttonContainer.style.display = "block";
    }
  };

  return (
    <div id="download-btn" className="mt-10 text-center print:hidden">
      <Button
        onClick={handleDownload}
        className="bg-primary text-white font-semibold px-6 sm:px-8 py-3 rounded-lg shadow-md hover:bg-primary/90 transition-all flex items-center gap-2 mx-auto"
      >
        <Printer className="w-5 h-5" />
        <span>Download PDF</span>
      </Button>
    </div>
  );
}
