import { Hero } from "@/components/hero"
import { Benefits } from "@/components/benefits"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
