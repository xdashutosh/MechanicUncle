import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Wrench, CreditCard, Calendar, Phone } from 'lucide-react';

const Faq = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);

  const faqCategories = [
    {
      category: 'Services',
      icon: Wrench,
      questions: [
        {
          q: 'What services does Mechanic Uncle provide?',
          a: 'We offer comprehensive car services including periodic maintenance, AC service, denting & painting, car detailing, battery replacement, tire services, and emergency roadside assistance. Our skilled technicians use manufacturer-recommended procedures and genuine spare parts.'
        },
        {
          q: 'Do you provide doorstep service?',
          a: 'Yes! We offer free pick-up and drop-off service for your convenience. You can schedule a pick-up time that works for you, and we\'ll return your car in pristine condition.'
        },
        {
          q: 'How much can I save compared to authorized service centers?',
          a: 'With Mechanic Uncle, you save up to 40% compared to authorized service centers and multi-brand workshops, thanks to our efficient operations, bulk procurement, and no overhead costs.'
        },
        {
          q: 'Do you use genuine spare parts?',
          a: 'Absolutely! We use only genuine and certified spare parts. We procure parts directly from manufacturers and authorized distributors to ensure quality and warranty coverage.'
        }
      ]
    },
    {
      category: 'Booking',
      icon: Calendar,
      questions: [
        {
          q: 'How do I book a service?',
          a: 'Booking is simple: Select your car\'s make, model, and fuel type, choose the service you need, pick your preferred time slot, and you\'re done! You can book via our website, mobile app, or call us directly.'
        },
        {
          q: 'Can I reschedule my booking?',
          a: 'Yes, you can reschedule your booking anytime before the service date. Simply contact our customer support or use the app to modify your appointment.'
        },
        {
          q: 'How far in advance should I book?',
          a: 'We recommend booking at least 24 hours in advance to ensure slot availability. However, we do accommodate same-day bookings based on availability.'
        }
      ]
    },
    {
      category: 'Payments',
      icon: CreditCard,
      questions: [
        {
          q: 'When do I need to pay?',
          a: 'Payment is required after the service is completed and your car is inspected. We\'ll send you a detailed invoice before delivery. You can also choose to prepay if you prefer.'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major payment methods including credit/debit cards, UPI, net banking, digital wallets, and cash. Choose whatever is most convenient for you.'
        },
        {
          q: 'Is there a warranty on services?',
          a: 'Yes! All our services come with a warranty period. The warranty duration varies by service type and is clearly mentioned in your invoice.'
        }
      ]
    },
    {
      category: 'Support',
      icon: Phone,
      questions: [
        {
          q: 'How can I track my service progress?',
          a: 'Our customer representative provides real-time updates throughout the service process. You\'ll receive notifications at each stage, from pick-up to delivery.'
        },
        {
          q: 'What if I\'m not satisfied with the service?',
          a: 'Customer satisfaction is our priority. If you\'re not satisfied, contact us immediately. We\'ll review your concerns and take corrective action at no additional cost.'
        },
        {
          q: 'How can I contact customer support?',
          a: 'You can reach us via phone, WhatsApp, email, or through our app\'s chat feature. Our support team is available from 8 AM to 8 PM, 7 days a week.'
        }
      ]
    }
  ];

  const allQuestions = faqCategories.flatMap((cat, catIndex) =>
    cat.questions.map((q, qIndex) => ({
      ...q,
      category: cat.category,
      icon: cat.icon,
      globalIndex: `${catIndex}-${qIndex}`
    }))
  );

  const filteredQuestions = searchTerm
    ? allQuestions.filter(
        item =>
          item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.a.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allQuestions;

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-24 from-slate-50 via-blue-50 to-slate-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-blue-100 mb-8"
          >
            Find answers to common questions about our services
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
            />
          </motion.div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {!searchTerm ? (
          // Category View
          <div className="space-y-8">
            {faqCategories.map((category, catIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-600 text-white p-2 rounded-lg">
                    <category.icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {category.category}
                  </h2>
                </div>

                <div className="space-y-3">
                  {category.questions.map((item, qIndex) => {
                    const globalIndex = `${catIndex}-${qIndex}`;
                    const isActive = activeIndex === globalIndex;

                    return (
                      <motion.div
                        key={qIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: qIndex * 0.05 }}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <button
                          onClick={() => toggleQuestion(globalIndex)}
                          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-gray-800 pr-4">
                            {item.q}
                          </span>
                          <motion.div
                            animate={{ rotate: isActive ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="px-6 pb-4 text-gray-600 border-t border-gray-100 pt-4">
                                {item.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // Search Results View
          <div className="space-y-3">
            {filteredQuestions.length > 0 ? (
              <>
                <p className="text-gray-600 mb-4">
                  Found {filteredQuestions.length} result{filteredQuestions.length !== 1 ? 's' : ''}
                </p>
                {filteredQuestions.map((item, index) => {
                  const isActive = activeIndex === item.globalIndex;
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.globalIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <button
                        onClick={() => toggleQuestion(item.globalIndex)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1 pr-4">
                          <Icon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <div>
                            <span className="text-xs text-blue-600 font-medium uppercase tracking-wide">
                              {item.category}
                            </span>
                            <p className="font-semibold text-gray-800">
                              {item.q}
                            </p>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: isActive ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-4 text-gray-600 border-t border-gray-100 pt-4">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No results found
                </h3>
                <p className="text-gray-500">
                  Try different keywords or browse categories above
                </p>
              </motion.div>
            )}
          </div>
        )}

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
          <p className="text-blue-100 mb-6">
            Our support team is here to help you 7 days a week
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Chat with us
            </button>
            <button className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
              Call Support
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Faq;