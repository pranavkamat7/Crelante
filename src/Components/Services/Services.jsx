import React from 'react';
import { Code,  TrendingUp, Camera, EditIcon } from 'lucide-react';
import { CgDesignmodo } from 'react-icons/cg';

const Services = () => {
  const services = [
    {
      icon: <Code className="w-12 h-12" />,
      title: 'Web Development',
      description: 'Custom websites built with modern technologies and best practices for optimal performance.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
    icon: <TrendingUp className="w-12 h-12" />,
    title: 'Digital Marketing',
    description: 'Strategies that grow your audience, boost engagement, and drive measurable results online.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: <Camera className="w-12 h-12" />,
    title: 'Photography',
    description: 'Professional photography to capture your brand, products, and stories in stunning visuals.',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    icon: <EditIcon className="w-12 h-12" />,
    title: 'Graphic Editing & Design',
    description: 'Creative designs and visual editing that make your brand stand out across all platforms.',
    color: 'from-green-400 to-teal-500'
  }
  ];

  return (
    <section id="services" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions to bring your digital vision to life
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Icon */}
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Learn More Link */}
              <a
                href="#contact"
                className="inline-flex items-center text-blue-600 font-semibold hover:gap-2 transition-all duration-300"
              >
                Learn More
                <span className="ml-1 group-hover:ml-2 transition-all">→</span>
              </a>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 mb-6">
              We'd love to discuss your project and create a tailored solution for your needs.
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;