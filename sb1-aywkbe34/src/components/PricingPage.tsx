import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Check, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { BackButton, Footer, WhatsAppButton } from './common';
import { useTheme } from '../contexts/ThemeContext';

const PricingPage: React.FC = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    plan: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('¡Gracias por tu interés! Estaremos contactando pronto contigo.');
    setFormData({ name: '', email: '', phone: '', plan: '' });
  };

  const plans = [
    {
      name: 'Básico',
      price: 'Lps. 1,500',
      period: '/mes',
      features: [
        'Hasta 1,000 mensajes por mes',
        'Soporte básico',
        'API de WhatsApp',
        'Panel de control',
      ],
      yearlyPrice: 'Lps. 12,000',
      yearlyPeriod: '/año',
      recommended: false
    },
    {
      name: 'Profesional',
      price: 'Lps. 2,500',
      period: '/mes',
      features: [
        'Hasta 5,000 mensajes por mes',
        'Soporte prioritario',
        'API de WhatsApp',
        'Panel de control avanzado',
        'Análisis de datos',
        'Múltiples usuarios'
      ],
      yearlyPrice: 'Lps. 25,000',
      yearlyPeriod: '/año',
      recommended: true
    },
    {
      name: 'Empresarial',
      price: 'Lps. 5,000',
      period: '/mes',
      features: [
        'Mensajes ilimitados',
        'Soporte 24/7',
        'API de WhatsApp',
        'Panel de control premium',
        'Análisis avanzado',
        'Usuarios ilimitados',
        'Integración personalizada'
      ],
      yearlyPrice: 'Lps. 50,000',
      yearlyPeriod: '/año',
      recommended: false
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <nav className={`border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} p-4`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BackButton />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Planes y Precios</h1>
          </div>
          <img 
            src={isDark 
              ? "https://www.unitec.edu/res/img/logo-unitec-blanco.webp?v=1.0.1"
              : "https://upload.wikimedia.org/wikipedia/commons/8/8d/CEUTEC_HONDURAS.png"}
            alt="Logo"
            className="h-8 w-auto"
          />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Planes diseñados para tu negocio
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Elige el plan que mejor se adapte a tus necesidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 ${
                plan.recommended
                  ? isDark
                    ? 'bg-blue-900 border-2 border-blue-500'
                    : 'bg-blue-50 border-2 border-blue-500'
                  : isDark
                  ? 'bg-gray-800'
                  : 'bg-white'
              } ${isDark ? 'shadow-xl' : 'shadow-lg'}`}
            >
              {plan.recommended && (
                <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-blue-600 bg-blue-100 dark:text-blue-100 dark:bg-blue-900 mb-4">
                  Recomendado
                </span>
              )}
              <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
              <div className="mb-6">
                <span className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className={`w-5 h-5 mr-2 ${
                      plan.recommended ? 'text-blue-500' : isDark ? 'text-gray-300' : 'text-gray-600'
                    }`} />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setFormData(prev => ({ ...prev, plan: plan.name }))}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.recommended
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : isDark
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Comenzar ahora
              </button>
              <p className={`text-center mt-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                o {plan.yearlyPrice}{plan.yearlyPeriod}
              </p>
            </div>
          ))}
        </div>

        <div className={`max-w-2xl mx-auto rounded-2xl p-8 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        } shadow-lg`}>
          <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            ¿Interesado en nuestros servicios?
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Nombre completo
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                className={`w-full px-4 py-2 rounded-lg ${
                  isDark
                    ? 'bg-gray-700 text-white border-gray-600'
                    : 'bg-gray-50 text-gray-900 border-gray-300'
                } focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Correo electrónico
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                className={`w-full px-4 py-2 rounded-lg ${
                  isDark
                    ? 'bg-gray-700 text-white border-gray-600'
                    : 'bg-gray-50 text-gray-900 border-gray-300'
                } focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Teléfono
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                required
                className={`w-full px-4 py-2 rounded-lg ${
                  isDark
                    ? 'bg-gray-700 text-white border-gray-600'
                    : 'bg-gray-50 text-gray-900 border-gray-300'
                } focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              Solicitar información
            </button>
          </form>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default PricingPage;