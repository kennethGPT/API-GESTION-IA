import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, LogOut, Sun, Moon, Users, CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { BackButton, Footer, WhatsAppButton } from './common';
import { hasPermission } from '../lib/permissions';

function WelcomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-gray-100'} transition-colors duration-200`}>
      <nav className={`border-b ${isDark ? 'border-gray-700 bg-black/20' : 'border-gray-200 bg-white/90'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <BackButton />
              <img 
                src={isDark 
                  ? "https://www.unitec.edu/res/img/logo-unitec-blanco.webp?v=1.0.1"
                  : "https://upload.wikimedia.org/wikipedia/commons/8/8d/CEUTEC_HONDURAS.png"}
                alt="CEUTEC Logo" 
                className="h-8 w-auto"
              />
              <span className={`ml-2 text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Honduras IA 2025
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${
                  isDark 
                    ? 'bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{user?.email}</span>
              <button
                onClick={logout} 
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isDark 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Bienvenido a Honduras IA 2025
          </h1>
          <p className={`text-xl mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Tu asistente inteligente para el desarrollo y más allá.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div 
              onClick={() => navigate('/chat')}
              className={`p-6 rounded-xl cursor-pointer transition-colors ${
                isDark 
                  ? 'bg-white/5 hover:bg-white/10' 
                  : 'bg-white hover:bg-gray-50 shadow-lg'
              }`}
            >
              <MessageSquare className="w-8 h-8 text-blue-400 mb-4 mx-auto" />
              <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Iniciar Chat
              </h2>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Comienza una conversación con tu asistente IA
              </p>
            </div>
            
            {hasPermission(user?.username, 'bulk-messaging') && (
              <div 
                onClick={() => navigate('/bulk-message')}
                className={`p-6 rounded-xl cursor-pointer transition-colors ${
                  isDark 
                    ? 'bg-white/5 hover:bg-white/10' 
                    : 'bg-white hover:bg-gray-50 shadow-lg'
                }`}
              >
                <Users className="w-8 h-8 text-green-400 mb-4 mx-auto" />
                <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Mensajería Masiva
                </h2>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  Envía mensajes a múltiples contactos
                </p>
              </div>
            )}
            
            <div 
              onClick={() => navigate('/pricing')}
              className={`p-6 rounded-xl cursor-pointer transition-colors ${
                isDark 
                  ? 'bg-white/5 hover:bg-white/10' 
                  : 'bg-white hover:bg-gray-50 shadow-lg'
              }`}
            >
              <CreditCard className="w-8 h-8 text-purple-400 mb-4 mx-auto" />
              <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Planes y Precios
              </h2>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Conoce nuestros planes y servicios
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default WelcomePage;