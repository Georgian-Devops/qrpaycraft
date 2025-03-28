
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  formatBitcoinAmount, 
  convertBitcoinToUSD, 
  formatUSDAmount, 
  BITCOIN_USD_RATE 
} from '@/utils/qrUtils';
import { cn } from '@/lib/utils';

interface AmountInputProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChange,
  className
}) => {
  const [inputValue, setInputValue] = useState<string>(value.toString());
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  
  // Predefined amount options for quick selection
  const amountPresets = [0.0001, 0.001, 0.01, 0.1];
  
  // USD preset amounts
  const usdPresets = [5, 15, 100];
  
  // Format value when it changes externally
  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Validate and update the actual value
    const parsedValue = parseFloat(newValue);
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setIsInvalid(false);
      onChange(parsedValue);
    } else {
      setIsInvalid(true);
    }
  };

  const handleSliderChange = (newValue: number[]) => {
    // Slider returns an array, take the first value
    const value = newValue[0];
    setInputValue(value.toString());
    onChange(value);
    setIsInvalid(false);
  };

  const handlePresetClick = (amount: number) => {
    setInputValue(amount.toString());
    onChange(amount);
    setIsInvalid(false);
  };

  // Handle USD preset button clicks
  const handleUsdPresetClick = (usdAmount: number) => {
    // Convert USD to BTC using the exchange rate
    const btcAmount = usdAmount / BITCOIN_USD_RATE;
    const roundedBtcAmount = parseFloat(btcAmount.toFixed(8)); // Round to 8 decimal places (satoshi precision)
    setInputValue(roundedBtcAmount.toString());
    onChange(roundedBtcAmount);
    setIsInvalid(false);
  };

  // Calculate USD equivalent
  const usdAmount = convertBitcoinToUSD(parseFloat(inputValue) || 0);
  const formattedUsdAmount = formatUSDAmount(usdAmount);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <Label htmlFor="amount" className="text-sm font-medium">
          Amount (BTC)
        </Label>
        <div className="relative">
          <Input
            id="amount"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className={cn(
              "pr-16 transition-all duration-300 backdrop-blur-sm bg-white/60 border border-slate-200",
              isInvalid ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500",
              "rounded-md shadow-sm"
            )}
            placeholder="Enter amount in BTC"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-sm text-gray-500">
            BTC
          </div>
        </div>
        <div className="flex justify-between items-center">
          {isInvalid ? (
            <p className="text-red-500 text-xs mt-1 animate-slide-up">
              Please enter a valid number
            </p>
          ) : (
            <p className="text-slate-600 text-xs mt-1">
              ≈ {formattedUsdAmount} USD
            </p>
          )}
        </div>
      </div>

      <div className="py-2">
        <Slider
          value={[parseFloat(inputValue) || 0]}
          min={0}
          max={1}
          step={0.0001}
          onValueChange={handleSliderChange}
          className="my-6"
        />
        <div className="flex justify-between text-xs text-gray-500 px-1">
          <span>0 BTC</span>
          <span>1 BTC</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-2">
          {amountPresets.map((amount) => (
            <Button
              key={amount}
              variant="outline"
              size="sm"
              onClick={() => handlePresetClick(amount)}
              className="animate-hover backdrop-blur-sm bg-white/60 border border-slate-200 hover:bg-slate-100 transition-all"
            >
              {formatBitcoinAmount(amount)} BTC
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {usdPresets.map((amount) => (
            <Button
              key={amount}
              variant="outline"
              size="sm"
              onClick={() => handleUsdPresetClick(amount)}
              className="animate-hover backdrop-blur-sm bg-white/60 border border-slate-200 hover:bg-slate-100 transition-all"
            >
              ${amount}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleUsdPresetClick(500)}
            className="animate-hover backdrop-blur-sm bg-white/60 border border-slate-200 hover:bg-slate-100 transition-all"
          >
            $500
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AmountInput;
