import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Wrench, Users, Calendar, PoundSterling, FileText, Phone, Home } from "lucide-react"

const benefits = [
  {
    icon: PoundSterling,
    title: "Guaranteed Monthly Rent",
    description:
      "Receive your rent payment every month, regardless of occupancy. No more chasing tenants or dealing with late payments.",
  },
  {
    icon: Wrench,
    title: "All Repairs & Maintenance",
    description:
      "We handle all property repairs and maintenance issues. From minor fixes to major renovations, we've got it covered.",
  },
  {
    icon: Users,
    title: "Tenant Dispute Resolution",
    description:
      "We manage all tenant relationships and resolve any disputes. You'll never need to deal with difficult tenants again.",
  },
  {
    icon: Shield,
    title: "Comprehensive Insurance",
    description:
      "Full property insurance coverage including contents, liability, and rent guarantee insurance for complete protection.",
  },
  {
    icon: Calendar,
    title: "Long-Term Contracts",
    description:
      "Secure 3-5 year agreements providing stable, predictable income with built-in rent reviews and increases.",
  },
  {
    icon: FileText,
    title: "Legal Compliance",
    description:
      "We ensure full compliance with all landlord regulations, safety certificates, and legal requirements.",
  },
  {
    icon: Phone,
    title: "24/7 Property Management",
    description: "Round-the-clock support for any property issues. We're always available when problems arise.",
  },
  {
    icon: Home,
    title: "Property Improvements",
    description:
      "We invest in property improvements and upgrades, potentially increasing your property's long-term value.",
  },
]

export function Benefits() {
  return (
    <section id="benefits" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">Why Landlords Choose Us</h2>
          <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
            Transform your property investment into a truly passive income stream with our comprehensive management
            service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <benefit.icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">{benefit.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
