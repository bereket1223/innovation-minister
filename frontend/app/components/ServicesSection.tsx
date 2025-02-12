'use client';

import { useState } from 'react';

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(null);
  const [activeOption, setActiveOption] = useState(null);

  const services = [
    { 
      title: 'Service 1', 
      description: 'Description of Service 1', 
      image: '/path/to/image1.jpg',
      options: [
        { 
          title: 'Option 1.1', 
          description: 'Detailed explanation for option 1.1', 
          image: '/path/to/option1.1.jpg',
          moreInfo: 'Additional information for Option 1.1...',
        },
        { 
          title: 'Option 1.2', 
          description: 'Detailed explanation for option 1.2', 
          image: '/path/to/option1.2.jpg',
          moreInfo: 'Additional information for Option 1.2...',
        },
        // Add 8 more options
      ]
    },
    { 
      title: 'Service 2', 
      description: 'Description of Service 2', 
      image: '/path/to/image2.jpg',
      options: [
        { 
          title: 'Option 2.1', 
          description: 'Detailed explanation for option 2.1', 
          image: '/path/to/option2.1.jpg',
          moreInfo: 'Additional information for Option 2.1...',
        },
        { 
          title: 'Option 2.2', 
          description: 'Detailed explanation for option 2.2', 
          image: '/path/to/option2.2.jpg',
          moreInfo: 'Additional information for Option 2.2...',
        },
        // Add 8 more options
      ]
    },
    { 
      title: 'Service 3', 
      description: 'Description of Service 3', 
      image: '/path/to/image3.jpg',
      options: [
        { 
          title: 'Option 3.1', 
          description: 'Detailed explanation for option 3.1', 
          image: '/path/to/option3.1.jpg',
          moreInfo: 'Additional information for Option 3.1...',
        },
        { 
          title: 'Option 3.2', 
          description: 'Detailed explanation for option 3.2', 
          image: '/path/to/option3.2.jpg',
          moreInfo: 'Additional information for Option 3.2...',
        },
        // Add 8 more options
      ]
    },
  ];

  return (
    <section id="services" className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
              <img src={service.image} alt={service.title} className="w-full h-48 object-cover rounded-md" />
              <h3 className="text-xl font-semibold text-gray-900 mt-4">{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
              <button 
                className="mt-4 text-blue-500 hover:text-blue-700 transition-colors"
                onClick={() => setActiveService(activeService === index ? null : index)}
              >
                {activeService === index ? 'Show Less' : 'Read More'}
              </button>
              {activeService === index && (
                <div className="mt-6 space-y-4">
                  {service.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="bg-gray-50 p-6 rounded-lg shadow-md transition-all transform hover:scale-105 duration-300">
                      <img src={option.image} alt={option.title} className="w-full h-32 object-cover rounded-md shadow-sm" />
                      <h4 className="text-lg font-semibold text-gray-900 mt-4">{option.title}</h4>
                      <p className="mt-2 text-gray-600">{option.description}</p>
                      <button 
                        className="mt-4 text-blue-500 hover:text-blue-700 transition-colors"
                        onClick={() => setActiveOption(activeOption === optionIndex ? null : optionIndex)}
                      >
                        {activeOption === optionIndex ? 'Show Less' : 'Read More'}
                      </button>
                      {activeOption === optionIndex && (
                        <div className="mt-4 text-gray-600">
                          <p>{option.moreInfo}</p>
                          <button 
                            className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                            onClick={() => window.location.href = '/login'}  // Redirect to login page
                          >
                            Register Your Knowledge
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
