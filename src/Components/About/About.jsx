import React from 'react';
import { Users, Target, Award } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Expert Team',
      description: 'Skilled professionals dedicated to excellence'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Goal Focused',
      description: 'Results-driven approach to every project'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Quality First',
      description: 'Premium solutions that exceed expectations'
    }
  ];

  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 md:order-1">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Who We Are
            </h2>
            
            <p className="text-lg text-gray-600 mb-4">
              We're a team of passionate developers and designers dedicated to creating exceptional digital experiences. With years of experience and a commitment to excellence, we transform ideas into reality.
            </p>
            
            <p className="text-lg text-gray-600 mb-8">
              Our mission is to empower businesses with cutting-edge web solutions that drive growth and success in the digital age.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="text-blue-600 mb-2">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image/Graphic */}
          <div className="order-1 md:order-2 relative">
            <div className="aspect-square bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl transform hover:rotate-3 transition-transform duration-500 relative overflow-hidden">
              {/* Decorative Circles */}
              <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/20 rounded-full blur-xl"></div>
              
              {/* Stats Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl font-bold mb-2">3+</div>
                  <div className="text-xl">Years of Excellence</div>
                </div>
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  ✓
                </div>
                <div>
                  <div className="font-bold text-gray-900">Trusted by 50+ Clients</div>
                  <div className="text-sm text-gray-600">All Goa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;