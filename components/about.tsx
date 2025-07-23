import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Users, Building, TrendingUp } from "lucide-react"

const stats = [
  { icon: Building, value: "150+", label: "Properties Managed" },
  { icon: Users, value: "500+", label: "Happy Tenants" },
  { icon: Award, value: "5+", label: "Years Experience" },
  { icon: TrendingUp, value: "98%", label: "Occupancy Rate" },
]

export function About() {
  return (
    <section id="about" className="py-20">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="w-fit">
                About PropertyPartner
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold">Your Trusted Property Management Partner</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We specialize in rent-to-rent arrangements that benefit both landlords and tenants. Our experienced team
                has been transforming property investments into truly passive income streams for over 5 years.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Our Approach</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>Thorough property assessment and market analysis</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>Professional tenant screening and selection process</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>Proactive maintenance and property care</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>Transparent communication and regular updates</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center space-y-2">
                      <stat.icon className="h-8 w-8 mx-auto text-primary" />
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <CardContent className="p-0">
                <h3 className="font-semibold mb-3">Our Guarantee</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We&apos;re so confident in our service that we offer a 30-day satisfaction guarantee. If you&apos;re not
                  completely satisfied with our management in the first month, we&apos;ll work with you to make it right or
                  part ways amicably.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
