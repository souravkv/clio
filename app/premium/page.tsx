'use client'

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Space_Grotesk } from 'next/font/google';
import Image from 'next/image';
import toast from 'react-hot-toast';
import qrcode from '../../assets/qrcode1.png'
import { useRouter } from 'next/navigation';

// Initialize Space_Grotesk font
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
});

const subscriptionOptions = [
  {
    name: 'Clio Free',
    price: 'Free',
    features: [
      'Limited options',
      'Basic support',
    ],
    gradient: 'from-blue-400 to-indigo-500'
  },
  {
    name: 'Clio X',
    price: 'Monthly  - ₹99/-',
    features: [
      'College helper integration',
      'CGPA tracking',
      'Previous year papers access',
      'CA marks management',
      'Semester planning tools',
      'Clip private chat option',
      'Graph schedule',
      'Alarm system',
    ],
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    name: 'Clio XX',
    price: 'Monthly-₹299/-',
    features: [
      'One-on-one mentor program',
      'Better theme selection',
      'Overall help and support',
    ],
    gradient: 'from-orange-400 to-red-500'
  },
];

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: string;
  tier: string;
}

const PaymentModal = ({ isOpen, onClose, price, tier }: PaymentModalProps) => {
  const [userName, setUserName] = useState('');
  
  const handleConfirmPayment = () => {
    if (!userName.trim()) {
      toast.error('Please enter your name for confirmation');
      return;
    }
    
    toast.success('Payment verification in process. Please wait 1-2 days.', {
      duration: 5000,
      position: 'top-right',
    });
    onClose();
    setUserName('');
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-[100] bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.95 }}
        transition={{ 
          type: "spring",
          damping: 25,
          stiffness: 200
        }}
        className="bg-gradient-to-b from-[#20124d] via-[#1a0f3c] to-[#150c2e] p-6 rounded-xl 
          max-w-md w-full mx-4 border border-violet-700/30 relative z-[101] shadow-2xl"
      >
        <h3 className={`${spaceGrotesk.className} text-2xl font-semibold mb-4 text-center
          bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-blue-300`}>
          Pay {price} for {tier}
        </h3>
        
        <div className="relative w-full aspect-square h-64 mb-6">
          <Image
            src={qrcode}
            alt="Payment QR Code"
            fill
            className="object-contain rounded-lg"
          />
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name for confirmation"
            className="w-full p-3 rounded-lg bg-[#1a0f3c]/50 border border-violet-700/30 
              focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all
              placeholder:text-violet-300/30 text-violet-100"
          />
          
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleConfirmPayment}
              className="flex-1 relative group overflow-hidden rounded-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-blue-600 to-violet-600 
                opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="relative block py-3 px-4 font-semibold text-white text-center">
                Confirm Payment
              </span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="flex-1 bg-[#1a0f3c]/50 hover:bg-[#1a0f3c]/70 text-violet-300 py-3 px-4 rounded-lg
                transition-colors duration-200 border border-violet-700/30"
            >
              Cancel
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function PremiumPage() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    price: string;
    tier: string;
  }>({
    isOpen: false,
    price: '',
    tier: ''
  });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      transition: {
        type: "spring",
        mass: 0.6
      }
    },
    hover: {
      height: 64,
      width: 64,
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      mixBlendMode: "difference" as const,
    }
  };

  const handleSubscriptionClick = (option: typeof subscriptionOptions[0]) => {
    if (option.price === 'Free') {
      router.push('/'); // Navigate to home page
    } else {
      setModalData({
        isOpen: true,
        price: option.price,
        tier: option.name
      });
    }
  };

  return (
    <div className="relative min-h-screen p-8 overflow-hidden bg-gradient-to-br from-zinc-900 to-black">
      <motion.button
        onClick={() => router.push('/')}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed top-6 right-6 z-[95] group"
      >
        <div className="relative">
          {/* Animated background rings */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 blur-lg 
            group-hover:blur-xl transition-all duration-300 opacity-40 group-hover:opacity-60 animate-pulse" />
          
          {/* Main button background */}
          <div className="relative px-5 py-2.5 rounded-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 
            border border-zinc-700/50 group-hover:border-violet-500/50 transition-all duration-300
            overflow-hidden">
            
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 
              group-hover:opacity-20 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000" />
            
            {/* Text and icon container */}
            <div className="flex items-center gap-2 relative">
              {/* Animated arrow */}
              <motion.svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                initial={{ x: 0 }}
                animate={{ x: [-2, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1
                }}
                className="text-violet-400 group-hover:text-violet-300 transition-colors"
              >
                <path 
                  d="M6.5 3L2 8L6.5 13M2.5 8H14" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </motion.svg>
              
              {/* Text with gradient */}
              <span className="text-sm font-medium bg-gradient-to-r from-violet-400 to-blue-400 
                bg-clip-text text-transparent group-hover:from-violet-300 group-hover:to-blue-300">
                Back 
              </span>
            </div>
            
            {/* Particle effects on hover */}
            <div className="absolute inset-0 -z-10">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{
                    scale: [0, 1.5],
                    opacity: [0.5, 0],
                    x: [0, (i - 1) * 30],
                    y: [0, (i % 2 === 0 ? -1 : 1) * 30]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeOut"
                  }}
                  className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full 
                    bg-violet-400/50"
                />
              ))}
            </div>
          </div>
        </div>
      </motion.button>
      
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-white rounded-full pointer-events-none mix-blend-difference z-[90]"
        variants={variants}
        animate={cursorVariant}
      />
      
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${spaceGrotesk.className} text-6xl font-bold text-center mb-12 
          bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-400
          animate-gradient-x bg-300% p-2 tracking-tight`}
      >
        Choose Your Subscription
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {subscriptionOptions.map((option, index) => (
          <motion.div
            key={option.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
            className={`relative group rounded-xl p-6 backdrop-blur-xl
              bg-gradient-to-br from-zinc-800/50 to-zinc-900/50
              border ${option.price === 'Free' ? 'border-zinc-700/50' : 
                option.name === 'Clio X' ? 'border-pink-700/30' : 
                option.name === 'Clio XX' ? 'border-violet-700/30' : 'border-zinc-700/50'}
              shadow-xl hover:shadow-2xl 
              ${option.price !== 'Free' ? 'hover:shadow-lg' : ''}
              ${option.name === 'Clio X' ? 'hover:shadow-pink-500/20' : ''}
              ${option.name === 'Clio XX' ? 'hover:shadow-violet-500/20' : ''}
              transition-all duration-300`}
          >
            {option.price !== 'Free' && (
              <div className={`absolute inset-0 rounded-xl blur-xl transition-opacity duration-300
                ${option.name === 'Clio X' ? 'bg-gradient-to-r from-pink-500 to-rose-500 opacity-20 group-hover:opacity-40' : 
                option.name === 'Clio XX' ? 'bg-gradient-to-r from-orange-500 to-red-500 opacity-20 group-hover:opacity-40' : ''}`} 
              />
            )}

            <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 
              rounded-xl bg-gradient-to-r ${option.gradient} pointer-events-none`} 
            />
            
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <h2 className={`text-2xl font-bold text-center mb-4 bg-gradient-to-r 
                ${option.gradient} bg-clip-text text-transparent`}
              >
                {option.name}
              </h2>
              <p className="text-3xl font-bold text-center text-white mb-6">{option.price}</p>
              <ul className="space-y-3 mb-6">
                {option.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + idx * 0.1 }}
                    className="flex items-center text-zinc-300"
                  >
                    <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </motion.li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSubscriptionClick(option)}
                className={`w-full z-60 py-3 px-6 rounded-lg font-semibold text-white
                  bg-gradient-to-r ${option.gradient}
                  transform transition-all duration-300
                  hover:shadow-lg hover:brightness-110
                  ${option.name === 'Clio XX' ? 'relative group overflow-hidden' : ''}`}
              >
                {option.name === 'Clio XX' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 
                    opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300 animate-pulse" />
                )}
                <span className="relative z-10">
                  {option.price === 'Free' ? 'Continue with Free Trial' : 'Pay now !'}
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 overflow-hidden w-full relative">
        {/* Dark background box */}
        <div className="absolute inset-0 bg-zinc-950/90" />

        {/* Banner content */}
        <div className="relative flex py-4">
          <motion.div
            animate={{
              x: -2000
            }}
            transition={{
              x: {
                duration: 30,
                ease: "linear",
              },
            }}
            className={`${spaceGrotesk.className} flex whitespace-nowrap text-lg font-medium
              bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-400
              tracking-tight shrink-0`}
          >
            Support Me by Subscribing • Support Me by Subscribing • Support Me by Subscribing • 
            Support Me by Subscribing • Support Me by Subscribing • Support Me by Subscribing
          </motion.div>
        </div>
      </div>

      <PaymentModal
        isOpen={modalData.isOpen}
        onClose={() => setModalData(prev => ({ ...prev, isOpen: false }))}
        price={modalData.price}
        tier={modalData.tier}
      />
    </div>
  );
}