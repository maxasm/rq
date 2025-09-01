'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Brain, Target, Shield, Users, Zap, X, Trophy, Star, Cpu, BarChart3, Sparkles, Wallet, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { SignInButton, SignOutButton, useUser, UserButton } from '@clerk/nextjs';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState('politics');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showAIExplanation, setShowAIExplanation] = useState(false);
  const [showMarketsPopup, setShowMarketsPopup] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showHowToPopup, setShowHowToPopup] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState<{[key: number]: boolean}>({});
  const [recentTrades, setRecentTrades] = useState([
    { id: 1, title: 'Tesla Q4 Earnings', profit: 680, timestamp: Date.now() - 3600000 },
    { id: 2, title: 'Bitcoin $100K', profit: 320, timestamp: Date.now() - 10800000 },
    { id: 3, title: 'UEFA Champions League', profit: 245, timestamp: Date.now() - 21600000 },
    { id: 4, title: 'Apple iPhone Sales', profit: -95, timestamp: Date.now() - 43200000 },
    { id: 5, title: 'Marvel Movie', profit: 180, timestamp: Date.now() - 86400000 },
    { id: 6, title: 'Netflix Subscriber Growth', profit: 420, timestamp: Date.now() - 172800000 }
  ]);
  const [portfolioData, setPortfolioData] = useState([
    { time: Date.now() - 16 * 60000, value: 1000, profit: 0 },
    { time: Date.now() - 15 * 60000, value: 1150, profit: 150 },
    { time: Date.now() - 14 * 60000, value: 950, profit: -50 },
    { time: Date.now() - 13 * 60000, value: 1320, profit: 320 },
    { time: Date.now() - 12 * 60000, value: 1800, profit: 800 },
    { time: Date.now() - 11 * 60000, value: 2200, profit: 1200 },
    { time: Date.now() - 10 * 60000, value: 1950, profit: 950 },
    { time: Date.now() - 9 * 60000, value: 2650, profit: 1650 },
    { time: Date.now() - 8 * 60000, value: 3100, profit: 2100 },
    { time: Date.now() - 7 * 60000, value: 2800, profit: 1800 },
    { time: Date.now() - 6 * 60000, value: 3500, profit: 2500 },
    { time: Date.now() - 5 * 60000, value: 4200, profit: 3200 },
    { time: Date.now() - 4 * 60000, value: 3800, profit: 2800 },
    { time: Date.now() - 3 * 60000, value: 4500, profit: 3500 },
    { time: Date.now() - 2 * 60000, value: 4100, profit: 3100 },
    { time: Date.now() - 1 * 60000, value: 3700, profit: 2700 },
    { time: Date.now(), value: 4200, profit: 3200 }
  ]);

  const currentBalance = portfolioData[portfolioData.length - 1]?.value || 4200;
  const totalProfit = portfolioData[portfolioData.length - 1]?.profit || 3200;
  const profitPercentage = ((totalProfit / 1000) * 100).toFixed(1);

  // Helper function to format timestamp to relative time
  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 60) {
      return minutes <= 1 ? 'Just now' : `${minutes} minutes ago`;
    } else if (hours < 24) {
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else {
      return days === 1 ? '1 day ago' : `${days} days ago`;
    }
  };

  // Live chart animation - add new data points every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPortfolioData(prevData => {
        const lastValue = prevData[prevData.length - 1]?.value || 4200;
        // Simulate realistic price movements (±1% to ±5%)
        const changePercent = (Math.random() - 0.5) * 0.1; // -5% to +5%
        let newValue = lastValue * (1 + changePercent);
        // Ensure value stays within 900-5000 range
        newValue = Math.max(900, Math.min(5000, newValue));
        const newProfit = newValue - 1000;
        
        const newDataPoint = {
          time: Date.now(),
          value: Math.round(newValue),
          profit: Math.round(newProfit)
        };

        // Keep only last 30 data points for better performance and smoother updates
        const updatedData = [...prevData, newDataPoint];
        return updatedData.length > 30 ? updatedData.slice(-30) : updatedData;
      });
    }, 3000); // Update every 3 seconds for smoother movement

    return () => clearInterval(interval);
  }, []);

  // Dynamic recent trades animation - chaotic updates
  useEffect(() => {
    const tradeNames = [
      'Tesla Q4 Earnings', 'Bitcoin $100K', 'UEFA Champions League', 'Apple iPhone Sales',
      'Marvel Movie', 'Netflix Subscriber Growth', 'Google AI Breakthrough', 'Amazon Prime Day',
      'Meta VR Launch', 'NVIDIA Stock Split', 'OpenAI GPT-5', 'SpaceX Launch',
      'Microsoft Azure', 'Twitter Rebranding', 'TikTok Ban Vote', 'Zoom Earnings',
      'Shopify Black Friday', 'PayPal Crypto', 'Uber Autonomous', 'Airbnb Expansion'
    ];

    const interval = setInterval(() => {
      setRecentTrades(prevTrades => {
        // Randomly update 1-3 trades
        const numUpdates = Math.floor(Math.random() * 3) + 1;
        let updatedTrades = [...prevTrades];
        
        for (let i = 0; i < numUpdates; i++) {
          const randomIndex = Math.floor(Math.random() * updatedTrades.length);
          const trade = updatedTrades[randomIndex];
          
          // Sometimes add a completely new trade
          if (Math.random() < 0.3) {
            const newTrade = {
              id: Date.now() + Math.random(),
              title: tradeNames[Math.floor(Math.random() * tradeNames.length)],
              profit: Math.floor((Math.random() - 0.3) * 800), // -240 to +560 range
              timestamp: Date.now() - Math.floor(Math.random() * 7200000) // 0-2 hours ago
            };
            updatedTrades = [newTrade, ...updatedTrades.slice(0, 5)];
          } else {
            // Update existing trade profit (simulate price changes)
            const volatility = (Math.random() - 0.5) * 0.4; // ±20% change
            const newProfit = Math.floor(trade.profit * (1 + volatility));
            updatedTrades[randomIndex] = {
              ...trade,
              profit: newProfit,
              timestamp: trade.timestamp + Math.floor(Math.random() * 300000) // Add up to 5 minutes
            };
          }
        }
        
        return updatedTrades;
      });
    }, 2000 + Math.random() * 3000); // Random interval between 2-5 seconds

    return () => clearInterval(interval);
  }, []);

  const marketCategories = [
    { id: 'politics', name: 'Politics', icon: Users },
    { id: 'crypto', name: 'Crypto', icon: TrendingUp },
    { id: 'entertainment', name: 'Entertainment', icon: Zap },
  ];

  const topTraders = [
    {
      rank: 1,
      name: 'Samuel Kiprotich',
      location: 'Nairobi',
      profit: 'KSh 2.8M',
      winRate: '87%',
      trades: 342,
      specialty: 'Politics & Crypto',
      avatar: '🏆'
    },
    {
      rank: 2,
      name: 'Grace Wanjiku',
      location: 'Mombasa',
      profit: 'KSh 2.1M',
      winRate: '82%',
      trades: 298,
      specialty: 'Entertainment',
      avatar: '⭐'
    },
    {
      rank: 3,
      name: 'David Ochieng',
      location: 'Kisumu',
      profit: 'KSh 1.9M',
      winRate: '79%',
      trades: 267,
      specialty: 'Crypto Markets',
      avatar: '💎'
    },
    {
      rank: 4,
      name: 'Faith Nyambura',
      location: 'Nakuru',
      profit: 'KSh 1.7M',
      winRate: '76%',
      trades: 234,
      specialty: 'Political Events',
      avatar: '🚀'
    },
    {
      rank: 5,
      name: 'John Mwangi',
      location: 'Eldoret',
      profit: 'KSh 1.5M',
      winRate: '74%',
      trades: 189,
      specialty: 'Sports & Politics',
      avatar: '⚡'
    },
    {
      rank: 6,
      name: 'Mary Akinyi',
      location: 'Thika',
      profit: 'KSh 1.3M',
      winRate: '71%',
      trades: 156,
      specialty: 'Crypto & Tech',
      avatar: '🔥'
    },
    {
      rank: 7,
      name: 'Peter Kamau',
      location: 'Meru',
      profit: 'KSh 1.1M',
      winRate: '68%',
      trades: 143,
      specialty: 'Entertainment',
      avatar: '💫'
    },
    {
      rank: 8,
      name: 'Catherine Chebet',
      location: 'Kitale',
      profit: 'KSh 980K',
      winRate: '65%',
      trades: 127,
      specialty: 'Political Analysis',
      avatar: '🎯'
    },
    {
      rank: 9,
      name: 'Michael Otieno',
      location: 'Machakos',
      profit: 'KSh 850K',
      winRate: '63%',
      trades: 112,
      specialty: 'Mixed Markets',
      avatar: '🌟'
    },
    {
      rank: 10,
      name: 'Rose Wambui',
      location: 'Nyeri',
      profit: 'KSh 720K',
      winRate: '61%',
      trades: 98,
      specialty: 'Crypto Trends',
      avatar: '💰'
    }
  ];

  const allMarkets = {
    politics: [
      {
        title: 'Ruto Re-election 2027',
        description: 'Presidential election outcome',
        odds: { yes: 1.95, no: 1.95 },
        volume: 'KSh 5.2M'
      },
      {
        title: 'Raila Odinga AU Commission Chair',
        description: 'African Union leadership position',
        odds: { yes: 1.65, no: 2.35 },
        volume: 'KSh 3.1M'
      },
      {
        title: 'Kenya General Election 2027',
        description: 'Will turnout exceed 70%?',
        odds: { yes: 2.10, no: 1.80 },
        volume: 'KSh 2.8M'
      }
    ],
    crypto: [
      {
        title: 'Bitcoin to reach $100K by 2025',
        description: 'Cryptocurrency price prediction',
        odds: { yes: 2.25, no: 1.75 },
        volume: 'KSh 1.8M'
      },
      {
        title: 'Ethereum to flip Bitcoin',
        description: 'ETH market cap > BTC by 2026',
        odds: { yes: 3.50, no: 1.30 },
        volume: 'KSh 950K'
      },
      {
        title: 'Dogecoin to reach $1',
        description: 'DOGE price target by end of 2025',
        odds: { yes: 4.20, no: 1.25 },
        volume: 'KSh 1.2M'
      }
    ],
    entertainment: [
      {
        title: 'Black Panther 3 Release',
        description: 'Marvel announces BP3 in 2025',
        odds: { yes: 1.45, no: 2.75 },
        volume: 'KSh 890K'
      },
      {
        title: 'Burna Boy Grammy Win 2025',
        description: 'Best Global Music Album',
        odds: { yes: 2.80, no: 1.50 },
        volume: 'KSh 1.5M'
      },
      {
        title: 'Squid Game Season 3',
        description: 'Netflix confirms by mid-2025',
        odds: { yes: 1.75, no: 2.15 },
        volume: 'KSh 2.1M'
      }
    ]
  };

  const featuredMarkets = allMarkets[activeTab as keyof typeof allMarkets] || allMarkets.politics;

  // Initialize and randomly update online status
  useEffect(() => {
    // Initialize random online status for all traders
    const initialStatus: {[key: number]: boolean} = {};
    topTraders.forEach(trader => {
      initialStatus[trader.rank] = Math.random() > 0.3; // 70% chance of being online initially
    });
    setOnlineStatus(initialStatus);

    // Update status randomly every 3-8 seconds
    const interval = setInterval(() => {
      setOnlineStatus(prev => {
        const newStatus = { ...prev };
        const randomTrader = topTraders[Math.floor(Math.random() * topTraders.length)];
        newStatus[randomTrader.rank] = Math.random() > 0.4; // 60% chance of being online
        return newStatus;
      });
    }, Math.random() * 5000 + 3000); // Random interval between 3-8 seconds

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // topTraders is a constant array, safe to omit from dependencies

  // Dashboard Component for signed-in users
  const DashboardView = () => (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Polymarket Ke</h1>
              <span className="text-amber-400 text-sm font-medium">Dashboard</span>
            </div>
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex space-x-6">
                <button 
                  onClick={() => setShowMarketsPopup(true)}
                  className="text-gray-300 hover:text-amber-400 font-medium cursor-pointer transition-colors"
                >
                  Markets
                </button>
                <button 
                  onClick={() => setShowHowToPopup(true)}
                  className="text-gray-300 hover:text-amber-400 font-medium cursor-pointer transition-colors"
                >
                  How to Deposit/Withdraw
                </button>
              </nav>
              <div className="flex items-center space-x-4">
                <span className="text-gray-300 text-sm">Welcome, {user?.firstName || 'User'}!</span>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 cursor-pointer hover:ring-2 hover:ring-amber-400 transition-all"
                    }
                  }}
                />
                <SignOutButton>
                  <button className="btn-secondary cursor-pointer hover:bg-gray-600 transition-colors">
                    Sign Out
                  </button>
                </SignOutButton>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Action Buttons */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Portfolio Dashboard</h2>
            <p className="text-gray-400 mt-1">Track your AI trading performance</p>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={() => setShowDepositModal(true)}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors"
            >
              <ArrowUpCircle className="w-5 h-5" />
              <span>Deposit</span>
            </button>
            <button 
              onClick={() => setShowWithdrawModal(true)}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors"
            >
              <ArrowDownCircle className="w-5 h-5" />
              <span>Withdraw</span>
            </button>
          </div>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Balance</p>
                <p className="text-2xl font-bold text-white">KSh {currentBalance.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-amber-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Profit</p>
                <p className="text-2xl font-bold text-green-400">+KSh {totalProfit.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Return Rate</p>
                <p className="text-2xl font-bold text-amber-400">+{profitPercentage}%</p>
              </div>
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-amber-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Chart */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-white">Portfolio Value Over Time</h3>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 text-sm">Current:</span>
                  <span className="text-white font-semibold">KSh {currentBalance.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 text-sm">Change:</span>
                  <span className={`text-sm font-semibold ${
                    portfolioData.length > 1 && 
                    portfolioData[portfolioData.length - 1].value > portfolioData[portfolioData.length - 2].value 
                      ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {portfolioData.length > 1 ? (
                      portfolioData[portfolioData.length - 1].value > portfolioData[portfolioData.length - 2].value ? '↗' : '↘'
                    ) : '→'} 
                    {portfolioData.length > 1 ? 
                      Math.abs(portfolioData[portfolioData.length - 1].value - portfolioData[portfolioData.length - 2].value).toLocaleString() 
                      : '0'
                    }
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-xs text-gray-400">Last Update</div>
                <div className="text-sm text-gray-300">
                  {new Date().toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false 
                  })}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Live Trading</span>
              </div>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart 
                data={portfolioData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="time" 
                  stroke="#9ca3af"
                  fontSize={12}
                  type="number"
                  scale="time"
                  domain={['dataMin', 'dataMax']}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: false 
                    });
                  }}
                />
                <YAxis 
                  stroke="#9ca3af"
                  fontSize={12}
                  domain={['dataMin - 1000', 'dataMax + 1000']}
                  tickFormatter={(value) => `KSh ${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                  formatter={(value: number, name: string) => [
                    `KSh ${value.toLocaleString()}`,
                    name === 'value' ? 'Portfolio Value' : name
                  ]}
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    });
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Trading Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Active AI Strategies</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">Political Markets</span>
                </div>
                <span className="text-green-400 text-sm">+12.3%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">Crypto Markets</span>
                </div>
                <span className="text-green-400 text-sm">+8.7%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">Entertainment</span>
                </div>
                <span className="text-green-400 text-sm">+15.2%</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentTrades.map((trade) => (
                <div key={trade.id} className="flex items-center justify-between transition-all duration-300 hover:bg-gray-700/30 rounded-lg p-2 -m-2">
                  <div>
                    <p className="text-gray-300 text-sm">AI Trade: {trade.title}</p>
                    <p className="text-gray-500 text-xs">{formatTimeAgo(trade.timestamp)}</p>
                  </div>
                  <span className={`text-sm font-medium transition-colors duration-200 ${
                    trade.profit >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {trade.profit >= 0 ? '+' : ''}KSh {trade.profit.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Show Dashboard for signed-in users, Landing Page for others */}
      {isSignedIn ? (
        <DashboardView />
      ) : (
        <>
          {/* Header */}
          <header className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Polymarket Ke</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => setShowMarketsPopup(true)}
                className="text-gray-300 hover:text-amber-400 font-medium cursor-pointer transition-colors"
              >
                Markets
              </button>
              <button 
                onClick={() => setShowHowToPopup(true)}
                className="text-gray-300 hover:text-amber-400 font-medium cursor-pointer transition-colors"
              >
                How to Deposit/Withdraw
              </button>
              <button 
                onClick={() => setShowLeaderboard(true)}
                className="text-gray-300 hover:text-amber-400 font-medium cursor-pointer transition-colors"
              >
                Leaderboard
              </button>
              <a href="#" className="text-gray-300 hover:text-amber-400 font-medium">About</a>
            </nav>
            <div className="flex items-center space-x-4">
              {!isLoaded ? (
                // Loading state
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-8 bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-24 h-8 bg-gray-700 rounded animate-pulse"></div>
                </div>
              ) : isSignedIn ? (
                // Signed in state
                <div className="flex items-center space-x-4">
                  <span className="text-gray-300 text-sm">Welcome, {user?.firstName || 'User'}!</span>
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8 cursor-pointer hover:ring-2 hover:ring-amber-400 transition-all"
                      }
                    }}
                  />
                  <SignOutButton>
                    <button className="btn-secondary cursor-pointer hover:bg-gray-600 transition-colors">
                      Sign Out
                    </button>
                  </SignOutButton>
                </div>
              ) : (
                // Signed out state
                <div className="flex items-center space-x-4">
                  <SignInButton mode="modal">
                    <button className="btn-secondary cursor-pointer hover:bg-gray-600 transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignInButton mode="modal">
                    <button className="btn-primary cursor-pointer hover:bg-amber-600 transition-colors">
                      Get Started
                    </button>
                  </SignInButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-400 to-amber-600 text-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Kenya&apos;s Premier AI-Powered Trading Platform
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Place smart trades with our advanced AI assistant. Powered by the world&apos;s best AI models, 
            our platform helps you make informed decisions making you make up to 500% in 30 days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gray-900 text-amber-400 hover:bg-gray-800 font-semibold py-3 px-8 rounded-lg text-lg transition-colors">
              Let AI Trade for Me
            </button>
            <button 
              onClick={() => setShowAIExplanation(true)}
              className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-amber-400 font-semibold py-3 px-8 rounded-lg text-lg transition-colors"
            >
              Learn How AI Works
            </button>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Powered by Advanced AI Technology
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our AI analyzes thousands of data points to help you make smarter trading decisions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-amber-400" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-white">Smart Analysis</h4>
              <p className="text-gray-300">
                AI processes real-time data, historical trends, and market sentiment to provide intelligent trading recommendations.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-amber-400" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-white">Multi-Trade Strategy</h4>
              <p className="text-gray-300">
                Our AI automatically places trades across multiple outcomes to diversify risk and maximize winning potential.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-amber-400" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-white">Risk Management</h4>
              <p className="text-gray-300">
                Advanced algorithms monitor your portfolio and adjust strategies to protect your investments while maximizing returns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Markets */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Featured Markets</h3>
            <p className="text-lg text-gray-300">Popular trading opportunities with high activity</p>
          </div>

          {/* Market Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {marketCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === category.id
                      ? 'bg-amber-500 text-black'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Market Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {featuredMarkets.map((market, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-white">{market.title}</h4>
                    <p className="text-gray-300 text-sm">{market.description}</p>
                  </div>
                  <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                    {market.volume}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 font-semibold py-3 px-4 rounded-lg transition-colors border border-amber-500/30">
                    Yes {market.odds.yes}
                  </button>
                  <button className="bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold py-3 px-4 rounded-lg transition-colors border border-red-500/30">
                    No {market.odds.no}
                  </button>
                </div>
                
                <button className="w-full btn-primary">
                  Let AI Trade for Me
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-amber-600 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-amber-900">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">KSh 100M+</div>
              <div className="text-amber-900">Total Volume</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">78%</div>
              <div className="text-amber-900">AI Win Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500%</div>
              <div className="text-amber-900">Max Win Increase</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Polymarket Ke</h3>
              </div>
              <p className="text-gray-400">
                Kenya&apos;s premier AI-powered trading platform. Trade smart, win more.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-amber-400">How it Works</a></li>
                <li><a href="#" className="hover:text-amber-400">AI Technology</a></li>
                <li><a href="#" className="hover:text-amber-400">Security</a></li>
                <li><a href="#" className="hover:text-amber-400">Fees</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Markets</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-amber-400">Sports</a></li>
                <li><a href="#" className="hover:text-amber-400">Politics</a></li>
                <li><a href="#" className="hover:text-amber-400">Cryptocurrency</a></li>
                <li><a href="#" className="hover:text-amber-400">Entertainment</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-amber-400">Help Center</a></li>
                <li><a href="#" className="hover:text-amber-400">Contact Us</a></li>
                <li><a href="#" className="hover:text-amber-400">Terms of Service</a></li>
                <li><a href="#" className="hover:text-amber-400">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Polymarket Ke. All rights reserved. Powered by advanced AI technology.</p>
          </div>
        </div>
      </footer>

      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <Trophy className="w-6 h-6 text-amber-400" />
                <h2 className="text-2xl font-bold text-white">Top Traders in Kenya</h2>
              </div>
              <button
                onClick={() => setShowLeaderboard(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid gap-4">
                {topTraders.map((trader) => (
                  <div key={trader.rank} className="card flex items-center justify-between hover:border-amber-500/50">
                    <div className="flex items-center space-x-4">
                      <div className="relative flex items-center justify-center w-12 h-12 bg-amber-500/20 rounded-full">
                        <span className="text-2xl">{trader.avatar}</span>
                        <div 
                          className={`absolute -bottom-1 -right-1 ${
                            onlineStatus[trader.rank] ? 'online-dot' : 'offline-dot'
                          }`}
                        />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-semibold text-white">#{trader.rank}</span>
                          <h3 className="text-lg font-semibold text-white">{trader.name}</h3>
                          {onlineStatus[trader.rank] && (
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                              Online
                            </span>
                          )}
                          {trader.rank <= 3 && (
                            <Star className="w-4 h-4 text-amber-400 fill-current" />
                          )}
                        </div>
                        <p className="text-gray-300 text-sm">{trader.location} • {trader.specialty}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-amber-400">{trader.profit}</div>
                      <div className="text-sm text-gray-300">
                        {trader.winRate} win rate • {trader.trades} trades
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Brain className="w-5 h-5 text-amber-400" />
                  <h3 className="font-semibold text-white">AI-Powered Success</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  All top traders use our AI assistant to maximize their returns. Join them and let AI trade for you!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Explanation Modal */}
      {showAIExplanation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <Brain className="w-6 h-6 text-amber-400" />
                <h2 className="text-2xl font-bold text-white">How Our AI Trading System Works</h2>
              </div>
              <button
                onClick={() => setShowAIExplanation(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Hero Section */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Fully Automated AI Trading
                </h3>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                  Our advanced AI system handles everything for you. Just deposit funds and watch your portfolio grow while you sleep.
                </p>
              </div>

              {/* AI Models Section */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="card">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Cpu className="w-5 h-5 text-green-400" />
                    </div>
                    <h4 className="text-xl font-semibold text-white">OpenAI GPT-4</h4>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Our primary AI model, fine-tuned specifically for Kenyan markets and trading patterns.
                  </p>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Analyzes political sentiment</li>
                    <li>• Processes news and social media</li>
                    <li>• Predicts market movements</li>
                    <li>• Optimizes trade timing</li>
                  </ul>
                </div>

                <div className="card">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Brain className="w-5 h-5 text-purple-400" />
                    </div>
                    <h4 className="text-xl font-semibold text-white">Claude 3.5 Sonnet</h4>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Our secondary AI model that provides risk assessment and portfolio balancing.
                  </p>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Risk management analysis</li>
                    <li>• Portfolio diversification</li>
                    <li>• Market correlation detection</li>
                    <li>• Loss prevention strategies</li>
                  </ul>
                </div>
              </div>

              {/* How It Works */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 text-amber-400 mr-2" />
                  Complete Automation Process
                </h4>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h5 className="font-semibold text-white">Market Analysis</h5>
                      <p className="text-gray-300 text-sm">
                        AI continuously monitors thousands of data sources including news, social media, economic indicators, and historical patterns.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h5 className="font-semibold text-white">Multi-Position Strategy</h5>
                      <p className="text-gray-300 text-sm">
                        The AI places multiple trades across different outcomes to maximize winning probability and minimize risk exposure.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h5 className="font-semibold text-white">Real-Time Adjustments</h5>
                      <p className="text-gray-300 text-sm">
                        As market conditions change, the AI automatically adjusts positions, closes losing trades, and opens new opportunities.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h5 className="font-semibold text-white">Profit Optimization</h5>
                      <p className="text-gray-300 text-sm">
                        The system automatically takes profits at optimal times and reinvests gains into new high-probability opportunities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="bg-amber-500/10 rounded-lg p-6 border border-amber-500/20">
                <h4 className="text-xl font-semibold text-white mb-4">Why Our AI Outperforms Human Traders</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Processes 1000x more data than humans</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">No emotional trading decisions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">24/7 market monitoring</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Instant execution and adjustments</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Advanced risk management</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">Continuous learning and improvement</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center mt-8">
                <button 
                  onClick={() => setShowAIExplanation(false)}
                  className="btn-primary text-lg px-8 py-3"
                >
                  Start AI Trading Now
                </button>
                <p className="text-gray-400 text-sm mt-2">
                  Join thousands of Kenyans already earning with AI
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Markets Popup */}
      {showMarketsPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">AI Trading Markets</h3>
                <button 
                  onClick={() => setShowMarketsPopup(false)}
                  className="text-gray-400 hover:text-white cursor-pointer transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-gray-300 mb-6">
                Our AI system actively trades across these markets to maximize your returns. Each market is carefully selected based on liquidity, volatility, and profit potential.
              </p>

              {/* Market Categories */}
              <div className="space-y-6">
                {marketCategories.map((category) => {
                  const IconComponent = category.icon;
                  const markets = allMarkets[category.id as keyof typeof allMarkets];
                  
                  return (
                    <div key={category.id} className="bg-gray-700/50 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="text-xl font-semibold text-white">{category.name}</h4>
                      </div>
                      
                      <div className="grid gap-4">
                        {markets.map((market, index) => (
                          <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h5 className="font-semibold text-white">{market.title}</h5>
                                <p className="text-gray-400 text-sm">{market.description}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-amber-400 font-semibold">{market.volume}</div>
                                <div className="text-gray-400 text-xs">Volume</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex space-x-4">
                                <div className="text-center">
                                  <div className="text-green-400 font-semibold">{market.odds.yes}</div>
                                  <div className="text-gray-400 text-xs">Yes</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-red-400 font-semibold">{market.odds.no}</div>
                                  <div className="text-gray-400 text-xs">No</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-green-400 text-xs font-medium">AI Active</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* AI Trading Info */}
              <div className="mt-8 bg-amber-500/10 rounded-lg p-6 border border-amber-500/20">
                <h4 className="text-lg font-semibold text-white mb-3">How AI Trading Works</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain className="w-4 h-4 text-amber-400" />
                      <span className="font-medium">Smart Analysis</span>
                    </div>
                    <p>AI analyzes market trends, news, and social sentiment in real-time</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="w-4 h-4 text-amber-400" />
                      <span className="font-medium">Precise Timing</span>
                    </div>
                    <p>Executes trades at optimal moments for maximum profit potential</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-4 h-4 text-amber-400" />
                      <span className="font-medium">Risk Management</span>
                    </div>
                    <p>Automatically manages risk and protects your investment</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span className="font-medium">24/7 Trading</span>
                    </div>
                    <p>Never misses an opportunity, trades around the clock</p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center mt-6">
                {isSignedIn ? (
                  <button className="btn-primary text-lg px-8 py-3 cursor-pointer">
                    Start AI Trading
                  </button>
                ) : (
                  <div className="space-y-2">
                    <SignInButton mode="modal">
                      <button className="btn-primary text-lg px-8 py-3 cursor-pointer">
                        Sign Up to Start Trading
                      </button>
                    </SignInButton>
                    <p className="text-gray-400 text-sm">
                      Join thousands of Kenyans earning with AI
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
          </>
        )}

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Deposit Funds</h3>
              <button 
                onClick={() => setShowDepositModal(false)}
                className="text-gray-400 hover:text-white cursor-pointer transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Amount (KSh)</label>
                <input 
                  type="number" 
                  placeholder="Enter amount"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Payment Method</label>
                <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400">
                  <option>M-Pesa</option>
                  <option>Bank Transfer</option>
                  <option>Airtel Money</option>
                </select>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <button 
                  onClick={() => setShowDepositModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium cursor-pointer transition-colors">
                  Deposit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Withdraw Funds</h3>
              <button 
                onClick={() => setShowWithdrawModal(false)}
                className="text-gray-400 hover:text-white cursor-pointer transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* 7-Day Trading Period Warning */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Shield className="w-5 h-5 text-yellow-400 mt-0.5" />
                </div>
                <div>
                  <h4 className="text-yellow-300 font-semibold text-sm mb-1">Trading Period Restriction</h4>
                  <p className="text-yellow-200 text-sm leading-relaxed">
                    Withdrawals are not available until you complete a 7-day trading period. This policy helps ensure account security and prevents fraudulent activities.
                  </p>
                  <p className="text-yellow-300 text-xs mt-2 font-medium">
                    Time remaining: 5 days, 14 hours
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 opacity-50 pointer-events-none">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Amount (KSh)</label>
                <input 
                  type="number" 
                  placeholder="Enter amount"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  disabled
                />
                <p className="text-gray-400 text-xs mt-1">Available: KSh {currentBalance.toLocaleString()}</p>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Withdrawal Method</label>
                <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400" disabled>
                  <option>M-Pesa</option>
                  <option>Bank Transfer</option>
                  <option>Airtel Money</option>
                </select>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <button 
                  onClick={() => setShowWithdrawModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button 
                  className="flex-1 px-4 py-3 bg-gray-500 text-gray-400 rounded-lg font-medium cursor-not-allowed transition-colors"
                  disabled
                >
                  Withdraw (Locked)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* How to Deposit/Withdraw Popup */}
      {showHowToPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">How to Deposit & Withdraw</h3>
                <button 
                  onClick={() => setShowHowToPopup(false)}
                  className="text-gray-400 hover:text-white cursor-pointer transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-8">
                {/* Platform Currency Info */}
                <div className="bg-amber-500/10 rounded-lg p-6 border border-amber-500/20">
                  <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                    <Brain className="w-5 h-5 text-amber-400 mr-2" />
                    Platform Currency
                  </h4>
                  <p className="text-gray-300 mb-3">
                    Polymarket Ke trades exclusively in <strong className="text-amber-400">USDC (USD Coin)</strong>, a stable cryptocurrency pegged to the US Dollar. This ensures stable trading without volatility concerns.
                  </p>
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <p className="text-gray-300 text-sm">
                      <strong>Why USDC?</strong> USDC provides price stability, fast transactions, and seamless integration with global prediction markets while protecting your funds from cryptocurrency volatility.
                    </p>
                  </div>
                </div>

                {/* Deposit Methods */}
                <div className="bg-gray-700/30 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <ArrowUpCircle className="w-5 h-5 text-green-400 mr-2" />
                    Deposit Methods
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Crypto Wallet Method */}
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-600">
                      <h5 className="font-semibold text-white mb-3 flex items-center">
                        <Wallet className="w-4 h-4 text-blue-400 mr-2" />
                        Direct Crypto Wallet
                      </h5>
                      <p className="text-gray-300 text-sm mb-3">
                        Advanced users can deposit USDC directly to our platform wallet using Coinbase or any compatible crypto wallet.
                      </p>
                      <div className="bg-gray-700 rounded p-3 mb-3">
                        <p className="text-gray-400 text-xs mb-1">Platform USDC Wallet Address:</p>
                        <p className="text-amber-400 text-sm font-mono break-all">
                          0x742d35Cc6634C0532925a3b8D4C2C3c8b4C2C3c8
                        </p>
                      </div>
                      <p className="text-gray-400 text-xs">
                        <strong>Network:</strong> Ethereum (ERC-20) or Polygon (MATIC)
                      </p>
                    </div>

                    {/* M-Pesa Method */}
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-600">
                      <h5 className="font-semibold text-white mb-3 flex items-center">
                        <Users className="w-4 h-4 text-green-400 mr-2" />
                        M-Pesa via Verified Exchangers
                      </h5>
                      <p className="text-gray-300 text-sm mb-3">
                        <strong>Recommended for beginners:</strong> Our verified exchangers accept Kenyan Shillings via M-Pesa and automatically load your account with USDC.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-green-400">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                          <span>Instant KSh to USDC conversion</span>
                        </div>
                        <div className="flex items-center text-green-400">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                          <span>Balance updates in 10 minutes</span>
                        </div>
                        <div className="flex items-center text-green-400">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                          <span>No crypto knowledge required</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Withdrawal Process */}
                <div className="bg-gray-700/30 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <ArrowDownCircle className="w-5 h-5 text-blue-400 mr-2" />
                    Withdrawal Process
                  </h4>
                  
                  <div className="bg-gray-800 rounded-lg p-5 border border-gray-600">
                    <h5 className="font-semibold text-white mb-3">Automated M-Pesa Withdrawals</h5>
                    <p className="text-gray-300 text-sm mb-4">
                      Withdrawals are fully automated and processed directly to your M-Pesa account. Our system converts your USDC balance to Kenyan Shillings at current market rates.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-2">1</div>
                        <p className="text-gray-300">Request withdrawal from dashboard</p>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-2">2</div>
                        <p className="text-gray-300">USDC automatically converted to KSh</p>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-2">3</div>
                        <p className="text-gray-300">Funds sent to your M-Pesa instantly</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Limits */}
                <div className="bg-red-500/10 rounded-lg p-6 border border-red-500/20">
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Shield className="w-5 h-5 text-red-400 mr-2" />
                    Account Limits & Requirements
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-white mb-3">Beginner Account Limits</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Minimum Deposit:</span>
                          <span className="text-red-400 font-semibold">KSh 1,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Maximum Deposit:</span>
                          <span className="text-red-400 font-semibold">KSh 5,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Daily Withdrawal:</span>
                          <span className="text-red-400 font-semibold">KSh 10,000</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-white mb-3">Verified Account Benefits</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-green-400">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                          <span>Increased deposit limits</span>
                        </div>
                        <div className="flex items-center text-green-400">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                          <span>Higher withdrawal limits</span>
                        </div>
                        <div className="flex items-center text-green-400">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                          <span>Priority customer support</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">
                        Complete KYC verification to unlock higher limits
                      </p>
                    </div>
                  </div>
                </div>

                {/* Support Information */}
                <div className="bg-gray-700/30 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Users className="w-5 h-5 text-amber-400 mr-2" />
                    Need Help? We&apos;re Here 24/7
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                      <h5 className="font-semibold text-white mb-2">Email Support</h5>
                      <p className="text-gray-300 text-sm mb-2">
                        For detailed inquiries or account issues
                      </p>
                      <a 
                        href="mailto:support@polymarketkenya.com" 
                        className="text-amber-400 hover:text-amber-300 text-sm font-medium cursor-pointer transition-colors"
                      >
                        support@polymarketkenya.com
                      </a>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                      <h5 className="font-semibold text-white mb-2">Live Chat Support</h5>
                      <p className="text-gray-300 text-sm mb-2">
                        Instant help via our chat bubble
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-sm font-medium">Response time: &lt;30 seconds</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Disclaimer */}
                <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
                  <p className="text-yellow-300 text-sm">
                    <strong>Important:</strong> All deposits and withdrawals are processed through our verified exchange partners for security and compliance. Your funds are always protected and insured. Trading involves risk - only deposit what you can afford to lose.
                  </p>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                  <button 
                    onClick={() => setShowHowToPopup(false)}
                    className="btn-primary text-lg px-8 py-3 cursor-pointer"
                  >
                    Got it, Let&apos;s Start Trading!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
