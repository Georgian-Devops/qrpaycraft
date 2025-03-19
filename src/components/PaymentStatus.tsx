
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from '@/lib/utils';

export type PaymentStatusType = 'pending' | 'processing' | 'confirmed' | 'failed';

interface PaymentStatusProps {
  status: PaymentStatusType;
  confirmations?: number;
  className?: string;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({
  status,
  confirmations = 0,
  className
}) => {
  const statusConfig = {
    pending: {
      label: 'Waiting for Payment',
      color: 'bg-amber-500',
      textColor: 'text-amber-500',
      borderColor: 'border-amber-500',
      icon: '⏳',
      progress: 0
    },
    processing: {
      label: 'Processing',
      color: 'bg-blue-500',
      textColor: 'text-blue-500',
      borderColor: 'border-blue-500',
      icon: '🔄',
      progress: 33
    },
    confirmed: {
      label: 'Confirmed',
      color: 'bg-green-500',
      textColor: 'text-green-500',
      borderColor: 'border-green-500',
      icon: '✓',
      progress: 100
    },
    failed: {
      label: 'Failed',
      color: 'bg-red-500',
      textColor: 'text-red-500',
      borderColor: 'border-red-500',
      icon: '✗',
      progress: 100
    }
  };

  const config = statusConfig[status];

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <Badge 
          variant="outline" 
          className={cn(
            "px-3 py-1 transition-all duration-300 animate-pulse-slow", 
            config.borderColor,
            config.textColor
          )}
        >
          <span className="mr-1">{config.icon}</span>
          {config.label}
        </Badge>
        
        {(status === 'processing' || status === 'confirmed') && (
          <span className="text-sm text-gray-500 animate-fade-in">
            {confirmations} confirmation{confirmations !== 1 ? 's' : ''}
          </span>
        )}
      </div>
      
      <Progress 
        value={config.progress} 
        className="h-1.5 transition-all duration-700 ease-in-out"
      />
      
      {status === 'pending' && (
        <p className="text-xs text-gray-500 animate-fade-in">
          Waiting for the transaction to be detected on the network...
        </p>
      )}
      
      {status === 'processing' && (
        <p className="text-xs text-gray-500 animate-fade-in">
          Transaction detected. Waiting for {6 - confirmations} more confirmation{6 - confirmations !== 1 ? 's' : ''}.
        </p>
      )}
      
      {status === 'confirmed' && (
        <p className="text-xs text-green-500 font-medium animate-fade-in">
          Payment successfully confirmed!
        </p>
      )}
      
      {status === 'failed' && (
        <p className="text-xs text-red-500 animate-fade-in">
          Transaction failed. Please try again or contact support.
        </p>
      )}
    </div>
  );
};

export default PaymentStatus;
