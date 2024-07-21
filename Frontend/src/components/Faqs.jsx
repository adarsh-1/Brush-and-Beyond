import React, { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'; // Import icons from react-icons library

const FAQ = () => {
  const faqs = [
    {
      question: 'What is Brush & Beyond?',
      answer: 'Brush & Beyond is a digital platform that fosters creativity and connects artists, art buyers, educators, and enthusiasts from around the world.',
    },
    {
      question: 'How can artists benefit from Brush & Beyond?',
      answer: 'Artists can showcase their work, gain visibility, connect with art buyers, access educational resources, and grow their careers through Brush & Beyond.',
    },
    {
      question: 'What services does Brush & Beyond offer?',
      answer: 'Brush & Beyond offers artist portfolios, an online marketplace, community forums, educational resources, and transparent transaction processes.',
    },
    {
      question: 'How can art buyers benefit from Brush & Beyond?',
      answer: 'Art buyers can discover diverse artwork, connect directly with artists, and find pieces that align with their preferences and budget.',
    },
    {
      question: 'Is Brush & Beyond only for professional artists?',
      answer: 'No, Brush & Beyond welcomes artists of all levels, including emerging talents seeking to showcase their work.',
    },
    {
      question: 'How does Brush & Beyond support art education?',
      answer: 'Brush & Beyond collaborates with educational institutions, nonprofits, and art organizations to offer workshops, tutorials, and resources that support artistic development.',
    },
  ];

  // State to track which FAQ items are expanded
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const toggleFAQ = (index) => {
    if (expandedIndex === index) {
      // Clicked on an already expanded FAQ, so collapse it
      setExpandedIndex(-1);
    } else {
      // Clicked on a different FAQ, expand it
      setExpandedIndex(index);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="container mx-auto py-10 px-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>
        <div className="divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={index} className="py-4">
              <button
                className="flex items-center justify-between font-medium text-left w-full text-gray-800 hover:text-blue-600 focus:outline-none focus:text-blue-600"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                {/* Render collapse icon based on expanded state */}
                {expandedIndex === index ? <BsChevronUp /> : <BsChevronDown />}
              </button>
              {expandedIndex === index && (
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              )}
           </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;