
import QRCode from 'qrcode';

/**
 * Generates a Bitcoin payment QR code with the specified amount
 * 
 * @param address The Bitcoin address to receive payment
 * @param amount The amount in BTC
 * @param options Additional QR code options
 * @returns A Promise that resolves to a data URL for the QR code
 */
export const generateBitcoinQR = async (
  address: string, 
  amount: number,
  options: QRCode.QRCodeToDataURLOptions = {}
): Promise<string> => {
  try {
    // Format the Bitcoin URI according to BIP-0021
    const bitcoinURI = `bitcoin:${address}?amount=${amount}`;
    
    // Default QR code options for optimal scanning
    const defaultOptions: QRCode.QRCodeToDataURLOptions = {
      margin: 1,
      width: 300,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'H', // High error correction for better readability
      ...options
    };
    
    // Generate QR code as data URL
    return await QRCode.toDataURL(bitcoinURI, defaultOptions);
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

/**
 * Format a number as a Bitcoin amount with appropriate decimal places
 */
export const formatBitcoinAmount = (amount: number): string => {
  // Display up to 8 decimal places (1 satoshi precision)
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 8
  });
};

/**
 * Sample Bitcoin addresses for testing
 */
export const sampleAddresses = [
  '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', // Satoshi's address
  '3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd',
  'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4',
];

/**
 * Get a random Bitcoin address from sample list (for demo purposes)
 */
export const getRandomBitcoinAddress = (): string => {
  const index = Math.floor(Math.random() * sampleAddresses.length);
  return sampleAddresses[index];
};
