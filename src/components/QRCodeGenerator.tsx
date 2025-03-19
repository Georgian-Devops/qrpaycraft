import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import AmountInput from '@/components/AmountInput';
import PaymentStatus, { PaymentStatusType } from '@/components/PaymentStatus';
import { 
  generateBitcoinQR, 
  formatBitcoinAmount, 
  DEFAULT_BITCOIN_ADDRESS,
  formatUSDAmount,
  convertBitcoinToUSD
} from '@/utils/qrUtils';
import { cn } from '@/lib/utils';

interface QRCodeGeneratorProps {
  className?: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ className }) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState<number>(0.001);
  const [address, setAddress] = useState<string>(DEFAULT_BITCOIN_ADDRESS);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [status, setStatus] = useState<PaymentStatusType>('pending');
  const [confirmations, setConfirmations] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (!address || isLoading) return;
    
    const generateQR = async () => {
      setIsGenerating(true);
      try {
        const qrCode = await generateBitcoinQR(address, amount);
        setQrCodeUrl(qrCode);
      } catch (error) {
        console.error('Error generating QR code:', error);
        toast({
          title: "Error",
          description: "Failed to generate QR code. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsGenerating(false);
      }
    };
    
    generateQR();
  }, [address, amount, isLoading, toast]);
  
  const simulatePayment = () => {
    if (status === 'confirmed' || status === 'failed') {
      setStatus('pending');
      setConfirmations(0);
      return;
    }
    
    if (status === 'pending') {
      setStatus('processing');
      setConfirmations(1);
      
      const interval = setInterval(() => {
        setConfirmations(prev => {
          const next = prev + 1;
          if (next >= 6) {
            clearInterval(interval);
            setStatus('confirmed');
            toast({
              title: "Payment Confirmed",
              description: "Your Bitcoin payment has been successfully confirmed!",
            });
            
            return 6;
          }
          return next;
        });
      }, 2000);
      
      return;
    }
  };
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address Copied",
      description: "Bitcoin address copied to clipboard.",
    });
  };
  
  const handleCopyAmount = () => {
    navigator.clipboard.writeText(amount.toString());
    toast({
      title: "Amount Copied",
      description: "Bitcoin amount copied to clipboard.",
    });
  };
  
  const handleRefresh = () => {
    setIsLoading(true);
    setStatus('pending');
    setConfirmations(0);
    setTimeout(() => setIsLoading(false), 500);
  };

  const usdAmount = convertBitcoinToUSD(amount);
  const formattedUsdAmount = formatUSDAmount(usdAmount);

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <Card className="glass border-none overflow-hidden shadow-glass transition-all duration-300 animate-scale-in">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center justify-between">
            Bitcoin Payment
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
              <span className="sr-only">Refresh</span>
            </Button>
          </CardTitle>
          <CardDescription>
            Generate and scan QR code to make a Bitcoin payment
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-300 border-l-blue-200 border-r-blue-400 rounded-full animate-spin" />
              <p className="text-sm text-gray-500 animate-pulse">Initializing payment...</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center space-y-4">
                {qrCodeUrl ? (
                  <div 
                    className="p-3 bg-white rounded-lg shadow-sm border border-slate-100 cursor-pointer transform transition-all duration-300 hover:scale-105"
                    onClick={simulatePayment}
                  >
                    <img 
                      src={qrCodeUrl} 
                      alt="Bitcoin Payment QR Code" 
                      className="w-48 h-48 transition-opacity duration-300" 
                      style={{ opacity: isGenerating ? 0.5 : 1 }}
                    />
                    {isGenerating && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 border-4 border-t-blue-500 border-b-blue-300 border-l-blue-200 border-r-blue-400 rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-48 h-48 bg-slate-100 rounded-lg animate-pulse flex items-center justify-center">
                    <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                )}
                <p className="text-xs text-gray-500">{status !== 'confirmed' ? 'Click the QR code to simulate payment' : 'Payment completed'}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="btc-address" className="text-sm font-medium">
                      Bitcoin Address
                    </Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={handleCopyAddress}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                      </svg>
                      <span className="sr-only">Copy address</span>
                    </Button>
                  </div>
                  <div className="relative">
                    <Input
                      id="btc-address"
                      value={address}
                      readOnly
                      className="w-full pr-10 font-mono text-xs sm:text-sm truncate backdrop-blur-sm bg-white/60 border border-slate-200 rounded-md"
                    />
                  </div>
                </div>
                
                <div className="col-span-2">
                  <AmountInput
                    value={amount}
                    onChange={setAmount}
                  />
                </div>
                
                <div className="col-span-2 pt-4">
                  <PaymentStatus
                    status={status}
                    confirmations={confirmations}
                  />
                </div>
              </div>
            </>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4 pt-2">
          <Separator />
          <div className="w-full flex items-center justify-between text-sm">
            <div className="text-gray-500">
              <div>Total: {formatBitcoinAmount(amount)} BTC</div>
              <div className="text-xs">≈ {formattedUsdAmount} USD</div>
            </div>
            {status === 'confirmed' ? (
              <Button
                size="sm"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 animate-scale-in"
                onClick={handleRefresh}
              >
                New Payment
              </Button>
            ) : (
              <span className="text-xs flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1 text-blue-500">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Secure Payment
              </span>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QRCodeGenerator;
