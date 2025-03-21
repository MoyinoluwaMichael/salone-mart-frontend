import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

type AlertType = 'error' | 'success' | 'info' | 'warning';

interface AlertProps {
  type: AlertType;
  message: string;
  onClose?: () => void;
}

const Alert = ({ type, message, onClose }: AlertProps) => {
  const getAlertStyles = () => {
    switch (type) {
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-700',
          icon: <AlertCircle size={16} className="mr-2 flex-shrink-0" />
        };
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-700',
          icon: <CheckCircle size={16} className="mr-2 flex-shrink-0" />
        };
      case 'info':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-700',
          icon: <Info size={16} className="mr-2 flex-shrink-0" />
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-700',
          icon: <Info size={16} className="mr-2 flex-shrink-0" />
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-700',
          icon: <Info size={16} className="mr-2 flex-shrink-0" />
        };
    }
  };

  const styles = getAlertStyles();

  return (
      <div className={`mb-4 p-3 ${styles.bg} border ${styles.border} rounded-lg flex items-center ${styles.text} text-sm`}>
        {styles.icon}
        <span className="flex-1">{message}</span>
        {onClose && (
            <button
                onClick={onClose}
                className="ml-2 text-gray-400 hover:text-gray-600"
            >
              <XCircle size={16} />
            </button>
        )}
      </div>
  );
};

export default Alert;
