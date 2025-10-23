
import { Calendar, TrendingUp, Users, Award, ArrowRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const stats = [
    { label: 'Active Athletes', value: '248', icon: Users, color: 'text-primary' },
    { label: 'Appointments Today', value: '12', icon: Calendar, color: 'text-secondary' },
    { label: 'Recovery Rate', value: '94%', icon: TrendingUp, color: 'text-accent' },
    { label: 'Success Stories', value: '1,247', icon: Award, color: 'text-success' },
  ];

  const features = [
    {
      title: 'Injury Assessment',
      description: 'Comprehensive evaluation and diagnosis of sports-related injuries',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
    },
    {
      title: 'Recovery Programs',
      description: 'Personalized rehabilitation plans tailored to each athlete',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop',
    },
    {
      title: 'Performance Tracking',
      description: 'Monitor progress and optimize athletic performance',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1920&h=1080&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 gradient-hero"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Elite Sports Medicine Care
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
              Advanced treatment and rehabilitation for athletes at every level
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup">
                <button className="px-8 py-3 bg-card text-foreground rounded-lg font-semibold hover:shadow-lg transition-all">
                  Book Appointment
                </button>
              </Link>
              <button className="px-8 py-3 bg-primary-foreground/10 text-primary-foreground border-2 border-primary-foreground/20 rounded-lg font-semibold hover:bg-primary-foreground/20 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <Icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive Care Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From injury prevention to peak performance, we provide complete sports medicine services
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all">
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${feature.image})` }}
                ></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <button className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <Activity className="h-16 w-16 text-primary-foreground mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Optimize Your Performance?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of athletes who trust us with their sports medicine needs
          </p>
          <Link to="/signup">
            <button className="px-8 py-4 bg-card text-foreground rounded-lg font-semibold text-lg hover:shadow-xl transition-all">
              Get Started Today
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}