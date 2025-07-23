import Link from "next/link"
import { Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between m-auto">
        <Link href="/" className="flex items-center space-x-2">
          <Building2 className="h-6 w-6" />
          <span className="font-bold text-xl">PropertyPartner</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#benefits" className="text-sm font-medium hover:text-primary transition-colors">
            Benefits
          </Link>
          <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        <Button asChild>
          <Link href="#contact">Get In Touch</Link>
        </Button>
      </div>
    </header>
  )
}
