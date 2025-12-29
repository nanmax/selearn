import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4 md:p-8">
      <Card className="max-w-lg w-full text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <ShoppingCart className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Fitur Keranjang Belum Tersedia</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Saat ini Anda dapat langsung membeli kursus dari halaman detail kursus.
            Fitur keranjang belanja akan segera hadir!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/courses">
              <Button className="w-full sm:w-auto">
                Jelajahi Kursus
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/dashboard/my-course">
              <Button variant="outline" className="w-full sm:w-auto">
                Kursus Saya
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
