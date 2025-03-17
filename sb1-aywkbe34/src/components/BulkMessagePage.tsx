import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Send, Upload, FileText, Image, Video, X, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { BackButton, Footer, WhatsAppButton } from './common';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { hasPermission } from '../lib/permissions';

interface MessageLog {
  id: string;
  timestamp: string;
  recipients: number;
  status: 'success' | 'error';
  message: string;
}

const BulkMessagePage: React.FC = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = React.useState('');
  const [numbers, setNumbers] = React.useState('');
  const [schedule, setSchedule] = React.useState('');
  const [files, setFiles] = React.useState<File[]>([]);
  const [logs, setLogs] = React.useState<MessageLog[]>([
    {
      id: '1',
      timestamp: '2025-03-11 10:30',
      recipients: 50,
      status: 'success',
      message: 'Campaña enviada exitosamente'
    },
    {
      id: '2',
      timestamp: '2025-03-11 11:15',
      recipients: 25,
      status: 'error',
      message: '3 números inválidos detectados'
    }
  ]);

  // Check permissions
  React.useEffect(() => {
    if (!hasPermission(user?.username, 'bulk-messaging')) {
      toast.error('No tienes permisos para acceder a esta función');
      navigate('/welcome');
    }
  }, [user, navigate]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/pdf': ['.pdf'],
      'video/*': ['.mp4', '.mov']
    },
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    }
  });

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!message.trim() && files.length === 0) {
      toast.error('Por favor ingresa un mensaje o adjunta archivos');
      return;
    }

    if (!numbers.trim()) {
      toast.error('Por favor ingresa al menos un número de teléfono');
      return;
    }

    // Simulate sending
    toast.loading('Enviando mensajes...', { duration: 2000 });
    
    setTimeout(() => {
      const phoneNumbers = numbers.split('\n').filter(n => n.trim());
      const newLog: MessageLog = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleString(),
        recipients: phoneNumbers.length,
        status: Math.random() > 0.2 ? 'success' : 'error',
        message: `Mensajes enviados: ${phoneNumbers.length}`
      };
      
      setLogs([newLog, ...logs]);
      toast.success('Mensajes enviados exitosamente');
      
      // Clear form
      setMessage('');
      setNumbers('');
      setSchedule('');
      setFiles([]);
    }, 2000);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image className="w-5 h-5" />;
    if (file.type === 'application/pdf') return <FileText className="w-5 h-5" />;
    if (file.type.startsWith('video/')) return <Video className="w-5 h-5" />;
    return <FileText className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className={`border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} p-4`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BackButton />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Mensajería Masiva</h1>
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

      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Mensaje</h2>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe tu mensaje aquí..."
                className="w-full h-40 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              
              {/* File Upload */}
              <div className="space-y-4">
                <div {...getRootProps()} className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                  <input {...getInputProps()} />
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400 dark:text-gray-500" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Arrastra archivos aquí o haz clic para seleccionar
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Soporta: imágenes, PDF, videos
                  </p>
                </div>

                {files.length > 0 && (
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-2">
                          {getFileIcon(file)}
                          <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                            {file.name}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Variables Disponibles</h2>
                <div className="space-y-2">
                  <button className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md text-sm">
                    {'{nombre}'}
                  </button>
                  <button className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md text-sm ml-2">
                    {'{empresa}'}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Destinatarios</h2>
              <textarea
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
                placeholder="Ingresa los números de WhatsApp (uno por línea)"
                className="w-full h-40 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Programar Envío</h2>
                <input
                  type="datetime-local"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button 
              onClick={() => {
                toast('Vista previa no disponible en este momento', {
                  icon: '👀',
                });
              }}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Vista Previa
            </button>
            <button 
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Mensajes</span>
            </button>
          </div>
        </div>

        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Historial de Envíos</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 text-gray-600 dark:text-gray-400">Fecha</th>
                  <th className="pb-3 text-gray-600 dark:text-gray-400">Destinatarios</th>
                  <th className="pb-3 text-gray-600 dark:text-gray-400">Estado</th>
                  <th className="pb-3 text-gray-600 dark:text-gray-400">Mensaje</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 text-gray-900 dark:text-white">{log.timestamp}</td>
                    <td className="py-3 text-gray-900 dark:text-white">{log.recipients} contactos</td>
                    <td className="py-3">
                      <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm ${
                        log.status === 'success'
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                          : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                      }`}>
                        {log.status === 'success' ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <AlertCircle className="w-4 h-4" />
                        )}
                        <span>{log.status === 'success' ? 'Completado' : 'Error'}</span>
                      </span>
                    </td>
                    <td className="py-3 text-gray-900 dark:text-white">{log.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default BulkMessagePage;