import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FormBuilder from '../components/FormBuilder';
import { ArrowLeft } from 'lucide-react';

const FormBuilderPage = () => {
  const navigate = useNavigate();

  const handleComplete = (data: any) => {
    // Navigate to the editor for the newly created shop
    // Note: The /api/generate-site-form needs to return the shop ID or we use the slug
    // For now, let's navigate to dashboard after success
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-bg-base">
      <Navbar />
      
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-text-light/60 hover:text-white mb-8 font-bold transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-4">
            Likh Kar <span className="text-accent-haldi">Banao</span>
          </h1>
          <p className="text-text-light/60 font-bold text-lg">Ek simple form bhariye aur apni dukan online kijiye.</p>
        </div>

        <FormBuilder onComplete={handleComplete} />
      </div>

      <Footer />
    </div>
  );
};

export default FormBuilderPage;
