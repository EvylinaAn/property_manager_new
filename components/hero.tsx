/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button"
import { CheckCircle, Shield, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-muted/50 to-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Maximize Your Property Returns with <span className="text-primary">Zero Hassle</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-[600px]">
                Partner with us for guaranteed rent, professional property management, and complete peace of mind. We
                handle everything so you do not have to.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="#contact">Schedule a Meeting</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#benefits">Learn More</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">Guaranteed Rent</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium">Full Insurance</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-medium">Market Rates</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8">
              <div className="h-full w-full rounded-xl bg-background shadow-2xl flex items-center justify-center overflow-hidden">
                <Image
                  alt="Property transformation - before and after renovation"
                  src="/Room_before_and_after-min.png"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover rounded-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
