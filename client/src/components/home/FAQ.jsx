import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Title from './Title';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-green-600 transition-colors group"
      >
        <span className="text-lg font-medium text-slate-800 group-hover:text-green-600 pr-8">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-green-500' : ''}`}
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}
      >
        <p className="text-slate-600 leading-relaxed text-[15px]">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "What makes Resumify different from other builders?",
      answer: "Resumify combines professional design with intelligent AI guidance. We don't just give you a template; we help you craft compelling bullet points and optimize your resume for modern Applicant Tracking Systems (ATS)."
    },
    {
      question: "How does the AI assistance actually work?",
      answer: "Our AI analyzes your job title and descriptions to suggest high-impact keywords and professional phrases. It helps transform basic task descriptions into achievement-oriented statements that catch recruiters' eyes."
    },
    {
      question: "Can I download my resume for free?",
      answer: "Yes, Resumify allows you to build, customize, and export your resume in high-quality PDF format completely for free. No hidden fees or credit card required."
    },
    {
      question: "Are the templates ATS-friendly?",
      answer: "Absolutely. Every template in Resumify is engineered to be easily readable by ATS software. We use clean structures and standard fonts to ensure your resume never gets rejected due to formatting."
    },
    {
      question: "Is my personal data kept secure?",
      answer: "Your privacy is our priority. We use industry-standard encryption to protect your data, and we never share your personal information or resume content with third parties without your consent."
    },
    {
      question: "Can I create multiple resumes for different jobs?",
      answer: "Yes! You can save multiple versions of your resume in your dashboard, allowing you to tailor each one specifically to different roles and industries for better results."
    }
  ];

  return (
    <section className="py-24 px-6 md:px-16 lg:px-24 xl:px-40 bg-white flex flex-col items-center" id="faq">
      


      <Title 
        title="Frequently Asked Questions" 
        description="Everything you need to know about building your perfect resume with Resumify. Can't find what you're looking for? Reach out to our support team."
      />

      <div className="max-w-6xl mx-auto w-full mt-16">
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-0">
          <div className="flex flex-col">
            {faqs.slice(0, 3).map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          <div className="flex flex-col">
            {faqs.slice(3).map((faq, index) => (
              <FAQItem key={index + 3} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
