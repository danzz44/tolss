import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Cpu, 
  Database, 
  Activity, 
  Smartphone, 
  Shield, 
  Lock, 
  Search, 
  Sliders, 
  Play, 
  Pause, 
  Music, 
  TrendingUp, 
  Share2, 
  ThumbsUp, 
  MessageSquare, 
  PlusCircle, 
  ShoppingBag, 
  ExternalLink, 
  Award, 
  UserCheck, 
  AlertTriangle, 
  Code, 
  Send, 
  RefreshCw, 
  Volume2, 
  Zap, 
  Server,
  KeyRound,
  FileText
} from 'lucide-react';
import { TOOLS_LIST, ToolItem, PRESET_PROJECTS, SocialProject, API_CATEGORIES } from './data/apiData';

// User structure
interface UserProfile {
  username: string;
  email: string;
  isPremium: boolean;
  isAdmin: boolean;
  coins: number;
  points: number;
  registeredAt: string;
}

export default function App() {
  // Navigation & Tab States
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tools' | 'showcase' | 'shop' | 'leaderboard' | 'server' | 'statistik' | 'admin'>('dashboard');
  
  // Auth States
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  
  // Simulated API Loading and authentication delay toggles
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [simulateSlowAuth, setSimulateSlowAuth] = useState(true); // Toggle to simulate "LOADING USER PASSWORD TRUE FALSE"
  
  // Custom API Key display
  const premiumApiKey = 'azb-prem-danzz-081011-x992b8c91';
  
  // Music Player Widget state (for chill/gabut people!)
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [musicVolume, setMusicVolume] = useState(60);
  const playlist = [
    { title: 'Danzz Chill Lofi Sunset', artist: 'Danzz Beats', duration: '3:20' },
    { title: 'Azzbry Collaboration Vibe', artist: 'Azzbry x Danzz', duration: '4:15' },
    { title: 'Bitcoin Midnight Relax', artist: 'Lo-Fi Chillout', duration: '2:50' },
    { title: 'Coding Without Errors', artist: 'Synthwave Dev', duration: '5:02' }
  ];
  
  // Bitcoin Price Widget state
  const [btcPrice, setBtcPrice] = useState(68450);
  const [btcTrend, setBtcTrend] = useState<'up' | 'down'>('up');
  const [btcHistory, setBtcHistory] = useState<number[]>([68100, 68250, 68180, 68300, 68420, 68450]);

  // Tools Panel States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTool, setSelectedTool] = useState<ToolItem>(TOOLS_LIST[0]);
  const [toolInputs, setToolInputs] = useState<Record<string, any>>({});
  const [toolLoading, setToolLoading] = useState(false);
  const [toolResponse, setToolResponse] = useState<any>(null);
  const [toolError, setToolError] = useState<string | null>(null);
  const [apiUrlExecuted, setApiUrlExecuted] = useState<string>('');
  
  // QRIS Generation state specifically
  const [qrisUrlInput, setQrisUrlInput] = useState('https://akdanzzxsmartgadget.vercel.app/');
  const [qrisNominal, setQrisNominal] = useState(10000);
  const [qrisFile, setQrisFile] = useState<File | null>(null);
  const [qrisFilePreview, setQrisFilePreview] = useState<string | null>(null);
  const [qrisResult, setQrisResult] = useState<string | null>(null);
  const [qrisLoading, setQrisLoading] = useState(false);

  // Social Project Showcase state
  const [projects, setProjects] = useState<SocialProject[]>(PRESET_PROJECTS);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectUrl, setNewProjectUrl] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeComments, setActiveComments] = useState<Record<string, string>>({});

  // Shop state
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);
  const [shopStatusMessage, setShopStatusMessage] = useState<string | null>(null);
  const [shopItems] = useState([
    { id: 'vip-plan', name: 'VIP Premium Access Key', desc: 'Membuka semua API dengan limit tanpa batas dan respon ultra cepat.', price: 150, category: 'ApiKey' },
    { id: 'custom-bot', name: 'Custom Automated Bot Script', desc: 'Script bot Telegram/WhatsApp yang terintegrasi dengan API Azzbry.', price: 200, category: 'Script' },
    { id: 'unlimited-ai', name: 'Aiko AI Unlimited Key', desc: 'Akses khusus model Aiko AI v2 yang bisa memecahkan soal kompleks.', price: 100, category: 'Access' },
    { id: 'qris-premium', name: 'QRIS Generator Premium API', desc: 'Integrasi generator QRIS instan dengan notifikasi webhook.', price: 120, category: 'Tools' }
  ]);

  // Statistics tracker state (changes live as tools are clicked!)
  const [statHits, setStatHits] = useState(2548);
  const [statSuccess, setStatSuccess] = useState(2496);
  const [statErrors, setStatErrors] = useState(52);
  const [liveHitsList, setLiveHitsList] = useState<{ id: string; toolName: string; time: string; status: 'success' | 'error' }[]>([
    { id: '1', toolName: 'Aiko AI Assistant', time: '14:28:12', status: 'success' },
    { id: '2', toolName: 'TikTok Video Downloader', time: '14:27:45', status: 'success' },
    { id: '3', toolName: 'Wink HD Enhancer', time: '14:26:10', status: 'success' }
  ]);

  // Leaderboard data
  const leaderboardUsers = [
    { name: 'DANZZ', hits: 5820, projects: 5, points: 1250, badge: '👑 OWNER', isVIP: true },
    { name: 'Azzbry', hits: 4980, projects: 2, points: 1100, badge: '🛠️ API DEVELOPER', isVIP: true },
    { name: 'Rian_Dev', hits: 820, projects: 3, points: 450, badge: '✨ LEGEND', isVIP: true },
    { name: 'Siti_Aisyah', hits: 620, projects: 1, points: 300, badge: '🔥 GOLD', isVIP: false },
    { name: 'BudiCoding', hits: 340, projects: 0, points: 180, badge: '⚡ BRONZE', isVIP: false },
    { name: 'RicoGamer', hits: 120, projects: 1, points: 90, badge: '⭐ NEWBIE', isVIP: false }
  ];
  const [leaderboardSearch, setLeaderboardSearch] = useState('');

  // Admin settings state
  const [adminAnnouncement, setAdminAnnouncement] = useState('Selamat datang di platform Web Tools premium kami! Terima kasih kepada Azzbry atas support apikey premium dan sederhana ini.');
  const [adminSimulatedCpu, setAdminSimulatedCpu] = useState(38);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [mockBackupRunning, setMockBackupRunning] = useState(false);

  // Live Server Logs Simulation
  const [serverLogs, setServerLogs] = useState<string[]>([
    '[SYSTEM] Server initialized successfully on port 8080.',
    '[MONITOR] CPU load stable at 38% - RAM usage 2.4GB / 8GB.',
    '[DB] PostgreSQL connected - Pool size: 25 active.',
    '[API] Registered 38 routes for Azzbry premium tools.',
  ]);

  // Real-time server simulator tick
  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate live bitcoin price changes
      setBtcPrice(prev => {
        const change = Math.floor(Math.random() * 80) - 38;
        const nextPrice = prev + change;
        setBtcTrend(change >= 0 ? 'up' : 'down');
        setBtcHistory(hist => [...hist.slice(1), nextPrice]);
        return nextPrice;
      });

      // Simulate live server logs
      const methods = ['GET', 'POST', 'PUT'];
      const paths = [
        '/api/ai/aiko',
        '/api/random/katakata',
        '/api/download/tiktok',
        '/api/tools/wink',
        '/api/stalk/instagram',
        '/api/search/cuaca',
        '/api/maker/code2img'
      ];
      const randomMethod = methods[Math.floor(Math.random() * methods.length)];
      const randomPath = paths[Math.floor(Math.random() * paths.length)];
      const randomStatus = Math.random() > 0.05 ? 200 : 500;
      const responseTime = Math.floor(Math.random() * 150) + 20;
      
      const newLog = `[${randomMethod}] ${randomPath} - ${randomStatus} OK (${responseTime}ms)`;
      setServerLogs(prev => [...prev.slice(-30), newLog]);

      // Update simulated CPU load
      setAdminSimulatedCpu(prev => {
        const delta = Math.floor(Math.random() * 8) - 4;
        const newCpu = Math.max(10, Math.min(95, prev + delta));
        return newCpu;
      });

    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Sync inputs when selected tool changes
  useEffect(() => {
    const defaultVals: Record<string, any> = {};
    selectedTool.inputs.forEach(input => {
      defaultVals[input.name] = input.defaultValue || '';
    });
    setToolInputs(defaultVals);
    setToolResponse(null);
    setToolError(null);
    setApiUrlExecuted('');
  }, [selectedTool]);

  // Execute Simulated / Actual API request
  const executeApi = async () => {
    setToolLoading(true);
    setToolError(null);
    setToolResponse(null);

    // Compute executed API URL
    const params = new URLSearchParams();
    Object.keys(toolInputs).forEach(key => {
      params.append(key, toolInputs[key]);
    });
    
    // Simulate user selection protection on API Key
    params.append('apikey', premiumApiKey);
    const fullUrl = `${selectedTool.endpoint}?${params.toString()}`;
    setApiUrlExecuted(fullUrl);

    // Add log to server logs & statistics
    setStatHits(prev => prev + 1);
    setLiveHitsList(prev => [
      { id: Date.now().toString(), toolName: selectedTool.name, time: new Date().toLocaleTimeString(), status: 'success' },
      ...prev.slice(0, 4)
    ]);

    // Simulated network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      // Evaluate Response
      let resData;
      if (typeof selectedTool.mockResponse === 'function') {
        resData = selectedTool.mockResponse(toolInputs);
      } else {
        resData = selectedTool.mockResponse;
      }
      setToolResponse(resData);
      setStatSuccess(prev => prev + 1);
    } catch (err: any) {
      setToolError('Gagal memproses request API. Silakan coba beberapa saat lagi.');
      setStatErrors(prev => prev + 1);
    } finally {
      setToolLoading(false);
    }
  };

  // QRIS Image upload handler
  const handleQrisFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setQrisFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrisFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Run QRIS Generator
  const generateQris = async (mode: 'url' | 'file') => {
    setQrisLoading(true);
    setQrisResult(null);
    await new Promise(resolve => setTimeout(resolve, 1200));

    if (mode === 'url') {
      setQrisResult(`https://api.azbry.com/api/tools/qrisgen?url=${encodeURIComponent(qrisUrlInput)}&nominal=${qrisNominal}`);
    } else {
      // For mock POST image, we generate a highly detailed mock QRIS image response
      setQrisResult(`https://api.azbry.com/api/tools/qrisgen?nominal=${qrisNominal}&source=uploaded_file`);
    }
    setQrisLoading(false);
    
    // Log hit
    setStatHits(prev => prev + 1);
    setStatSuccess(prev => prev + 1);
  };

  // Handle Simulated Google Auth
  const handleGoogleAuth = async () => {
    setIsLoadingAuth(true);
    setAuthError('');
    
    // Simulate loading depending on user configuration: LOADING USER PASSWORD TRUE FALSE
    const delay = simulateSlowAuth ? 2500 : 500;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Create profile
    const fakeGoogleUser: UserProfile = {
      username: 'Google_Dev_Danzz',
      email: 'danzz.collaborator@gmail.com',
      isPremium: false,
      isAdmin: false,
      coins: 50,
      points: 20,
      registeredAt: new Date().toLocaleDateString('id-ID')
    };

    setUser(fakeGoogleUser);
    setIsLoadingAuth(false);
    setAuthSuccess('Berhasil mendaftar menggunakan Akun Google!');
    setTimeout(() => {
      setShowAuthModal(false);
      setAuthSuccess('');
    }, 1500);
  };

  // Handle Login & Register manually
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingAuth(true);
    setAuthError('');
    setAuthSuccess('');

    const delay = simulateSlowAuth ? 2000 : 400;
    await new Promise(resolve => setTimeout(resolve, delay));

    if (authMode === 'login') {
      // CHECK ADMIN CREDENTIALS: USER DANZZ PW akdan081011
      if (loginUsername === 'DANZZ' && loginPassword === 'akdan081011') {
        const adminProfile: UserProfile = {
          username: 'DANZZ',
          email: 'danzz.owner@premium-tools.com',
          isPremium: true,
          isAdmin: true,
          coins: 9999,
          points: 5000,
          registeredAt: '08/10/2011'
        };
        setUser(adminProfile);
        setAuthSuccess('Selamat datang Kembali, OWNER DANZZ! Akses Admin Terbuka.');
      } else if (loginUsername.trim() && loginPassword.trim()) {
        const stdProfile: UserProfile = {
          username: loginUsername,
          email: `${loginUsername.toLowerCase()}@premium.com`,
          isPremium: false,
          isAdmin: false,
          coins: 50,
          points: 10,
          registeredAt: new Date().toLocaleDateString('id-ID')
        };
        setUser(stdProfile);
        setAuthSuccess('Berhasil masuk! Selamat menikmati layanan.');
      } else {
        setAuthError('Username dan password tidak boleh kosong.');
        setIsLoadingAuth(false);
        return;
      }
    } else {
      // Register Mode
      if (!regUsername || !regEmail || !regPassword) {
        setAuthError('Harap lengkapi semua kolom pendaftaran.');
        setIsLoadingAuth(false);
        return;
      }
      
      const newProfile: UserProfile = {
        username: regUsername,
        email: regEmail,
        isPremium: false,
        isAdmin: regUsername === 'DANZZ', // Safe check
        coins: 50, // Initial balance
        points: 0,
        registeredAt: new Date().toLocaleDateString('id-ID')
      };
      setUser(newProfile);
      setAuthSuccess('Akun berhasil dibuat! Bonus 50 Danzz Coins telah ditambahkan.');
    }

    setIsLoadingAuth(false);
    setTimeout(() => {
      setShowAuthModal(false);
      setAuthSuccess('');
    }, 1500);
  };

  // Sign out
  const handleSignOut = () => {
    setUser(null);
    if (activeTab === 'admin') {
      setActiveTab('dashboard');
    }
  };

  // Handle Social Like
  const handleProjectLike = (projId: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setProjects(prev => prev.map(p => {
      if (p.id === projId) {
        const alreadyLiked = p.likedBy.includes(user.username);
        const nextLikedBy = alreadyLiked 
          ? p.likedBy.filter(u => u !== user.username)
          : [...p.likedBy, user.username];
        
        return {
          ...p,
          likes: alreadyLiked ? p.likes - 1 : p.likes + 1,
          likedBy: nextLikedBy
        };
      }
      return p;
    }));
  };

  // Handle Social Comment
  const handleAddComment = (projId: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    const commentText = activeComments[projId];
    if (!commentText || !commentText.trim()) return;

    setProjects(prev => prev.map(p => {
      if (p.id === projId) {
        return {
          ...p,
          comments: [
            ...p.comments,
            {
              user: user.username,
              text: commentText,
              date: new Date().toISOString().split('T')[0]
            }
          ]
        };
      }
      return p;
    }));

    setActiveComments(prev => ({
      ...prev,
      [projId]: ''
    }));
  };

  // Handle Uploading custom project
  const handleUploadProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!newProjectName || !newProjectUrl || !newProjectDesc) {
      alert('Tolong isi semua field project!');
      return;
    }

    const newProj: SocialProject = {
      id: Date.now().toString(),
      name: newProjectName,
      url: newProjectUrl,
      description: newProjectDesc,
      author: user.username,
      likes: 0,
      likedBy: [],
      comments: [],
      isVercelProject: newProjectUrl.includes('vercel.app')
    };

    setProjects(prev => [newProj, ...prev]);
    
    // Add user points
    if (user) {
      setUser(prev => prev ? { ...prev, points: prev.points + 50 } : null);
    }

    // Reset fields & Close modal
    setNewProjectName('');
    setNewProjectUrl('');
    setNewProjectDesc('');
    setShowUploadModal(false);
  };

  // Buy Shop Item
  const handleBuyShopItem = (item: typeof shopItems[0]) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (user.coins < item.price) {
      setShopStatusMessage(`Koin tidak cukup! Harga ${item.name} adalah ${item.price} koin.`);
      setTimeout(() => setShopStatusMessage(null), 3000);
      return;
    }

    // Deduct coins & Add item
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        coins: prev.coins - item.price,
        isPremium: item.id === 'vip-plan' ? true : prev.isPremium
      };
    });

    setPurchasedItems(prev => [...prev, item.id]);
    setShopStatusMessage(`Pembelian sukses! ${item.name} telah diaktifkan ke akun Anda.`);
    setTimeout(() => setShopStatusMessage(null), 4500);
  };

  // Filter tools list based on selection and query
  const filteredTools = TOOLS_LIST.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.endpoint.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-sky-50 text-slate-800 flex flex-col font-sans">
      
      {/* 1. AZZBRY ACKNOWLEDGEMENT TOP BANNER (As requested) */}
      <div className="bg-sky-500 text-white font-semibold text-center py-3.5 px-4 shadow-sm border-b border-sky-400 text-xs sm:text-sm tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <Zap className="h-4 w-4 animate-bounce text-yellow-300" />
          <span className="leading-snug select-none">
            💡 APIKEY INI ADALAH APIKEY PREMIUM DAN SEDERHANA. TERIMAKASIH KEPADA AZZBRY TELAH BIKIN APIKEY. MAKASIH YAK BTW COLLAB LAGI YAK KAPAN-KAPAN!
          </span>
        </div>
      </div>

      {/* 2. HEADER NAVBAR */}
      <header className="bg-white border-b border-sky-100 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-sky-400 to-sky-600 flex items-center justify-center text-white shadow-md shadow-sky-200">
              <Sliders className="h-5.5 w-5.5" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-sky-600 to-sky-500 bg-clip-text text-transparent leading-none">
                DANZZ PREMIUM
              </h1>
              <span className="text-[10px] text-sky-500 font-medium tracking-wider uppercase">
                Web Tools Suite
              </span>
            </div>
          </div>

          {/* User Profile Bar / Auth Buttons */}
          <div className="flex items-center gap-3">
            
            {user ? (
              <div className="flex items-center gap-2 sm:gap-4 bg-sky-100/60 border border-sky-200/50 p-1.5 pr-3 rounded-full">
                <div className="h-8.5 w-8.5 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-sm shadow-inner">
                  {user.username.substring(0, 2).toUpperCase()}
                </div>
                
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-semibold text-slate-800 flex items-center gap-1">
                    {user.username}
                    {user.isAdmin && <span className="bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">OWNER</span>}
                    {user.isPremium && <span className="bg-amber-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">VIP</span>}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    💰 {user.coins} Koin | ⭐ {user.points} Poin
                  </span>
                </div>

                <button 
                  onClick={handleSignOut}
                  className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 rounded-md hover:bg-red-50 transition-colors"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
                  className="text-sm font-semibold text-sky-600 hover:text-sky-700 px-4 py-2 rounded-full hover:bg-sky-50 transition-all"
                >
                  Masuk
                </button>
                <button
                  onClick={() => { setAuthMode('register'); setShowAuthModal(true); }}
                  className="text-sm font-bold bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-full shadow-sm hover:shadow-md transition-all"
                >
                  Daftar
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 3. MAIN WORKSPACE CONTAINER */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row gap-6">
        
        {/* SIDEBAR NAVIGATION - Optimized for Tablet, Mobile & Desktop */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white border border-sky-100 rounded-2xl p-4 shadow-sm sticky top-22">
            <h3 className="text-xs font-bold text-sky-500/80 uppercase tracking-wider px-3 mb-3">
              Menu Navigasi
            </h3>
            
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-sky-50 hover:text-sky-600'
                }`}
              >
                <Smartphone className="h-4.5 w-4.5" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('tools')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'tools'
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-sky-50 hover:text-sky-600'
                }`}
              >
                <Sliders className="h-4.5 w-4.5" />
                <span>API Tools Panel</span>
              </button>

              <button
                onClick={() => setActiveTab('showcase')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'showcase'
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-sky-50 hover:text-sky-600'
                }`}
              >
                <Share2 className="h-4.5 w-4.5" />
                <span>Social Project</span>
              </button>

              <button
                onClick={() => setActiveTab('shop')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'shop'
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-sky-50 hover:text-sky-600'
                }`}
              >
                <ShoppingBag className="h-4.5 w-4.5" />
                <span>Toko Premium</span>
              </button>

              <button
                onClick={() => setActiveTab('leaderboard')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'leaderboard'
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-sky-50 hover:text-sky-600'
                }`}
              >
                <Award className="h-4.5 w-4.5" />
                <span>Leaderboard</span>
              </button>

              <button
                onClick={() => setActiveTab('server')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'server'
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-sky-50 hover:text-sky-600'
                }`}
              >
                <Server className="h-4.5 w-4.5" />
                <span>Server & Monitor</span>
              </button>

              <button
                onClick={() => setActiveTab('statistik')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'statistik'
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-sky-50 hover:text-sky-600'
                }`}
              >
                <Activity className="h-4.5 w-4.5" />
                <span>Statistik Penggunaan</span>
              </button>

              {user?.isAdmin && (
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold border border-red-100 transition-all ${
                    activeTab === 'admin'
                      ? 'bg-red-500 text-white'
                      : 'text-red-600 hover:bg-red-50'
                  }`}
                >
                  <Shield className="h-4.5 w-4.5" />
                  <span>Admin Panel</span>
                </button>
              )}
            </nav>

            {/* Simulated server status sidebar widget */}
            <div className="mt-6 pt-4 border-t border-sky-50">
              <div className="bg-sky-50 rounded-xl p-3 border border-sky-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">
                    Status Server
                  </span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Uptime</span>
                    <span className="font-medium text-slate-700">99.98%</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Latency</span>
                    <span className="font-medium text-slate-700">32ms</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </aside>

        {/* MAIN PANEL CONTENT VIEW */}
        <main className="flex-1 min-w-0">
          
          {/* TAB: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Premium Welcome Banner */}
              <div className="bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
                <div className="absolute right-0 bottom-0 top-0 opacity-15 pointer-events-none">
                  <Terminal className="h-64 w-64 translate-x-12 translate-y-12" />
                </div>
                
                <div className="relative z-10 max-w-lg space-y-4">
                  <span className="bg-white/20 text-white font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                    🚀 Premium Web Tools
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Halo, {user ? user.username : 'Kawan Santai'}!
                  </h2>
                  <p className="text-sky-50 text-sm leading-relaxed">
                    Sambut hari santaimu dengan kumpulan API premium kami yang siap membantumu melakukan scraping, stalking, download media, hingga coding otomatis.
                  </p>
                  
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button 
                      onClick={() => setActiveTab('tools')} 
                      className="bg-white text-sky-600 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-sky-50 transition-all cursor-pointer"
                    >
                      Mulai Coba Tools
                    </button>
                    <button 
                      onClick={() => setActiveTab('showcase')}
                      className="bg-sky-600/30 border border-white/30 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-sky-600/40 transition-all cursor-pointer"
                    >
                      Pamerkan Project
                    </button>
                  </div>
                </div>
              </div>

              {/* SECURE API KEY DISPLAY: BIKIN KAN APIKEY NYA GABISA DISALIN */}
              <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <KeyRound className="h-5 w-5 text-sky-500" />
                      <h3 className="font-bold text-slate-800">
                        Kunci API Premium (ApiKey) Anda
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500">
                      ApiKey premium terintegrasi otomatis untuk request API Anda. Demi alasan keamanan, penyalinan dibatasi secara ketat.
                    </p>
                  </div>
                  
                  <span className="bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    ANTI-COPY ACTIVE
                  </span>
                </div>

                <div className="mt-4 bg-sky-50 border border-sky-200/60 p-4 rounded-xl flex items-center justify-between gap-4">
                  {/* Non-copyable container */}
                  <div className="font-mono text-sm tracking-wide text-slate-700 no-select-apikey select-none flex-1 truncate pointer-events-none relative">
                    <span className="text-slate-400">apikey: </span>
                    <span className="blur-xs select-none">azb-prem-danzz-081011-x992b8c91</span>
                    <div className="absolute inset-0 bg-transparent" /> {/* Protective overlay to block touch events */}
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      disabled
                      title="Penyalinan dinonaktifkan oleh developer" 
                      className="bg-slate-200 text-slate-400 text-xs px-3.5 py-1.5 rounded-lg cursor-not-allowed flex items-center gap-1 font-semibold"
                    >
                      <Lock className="h-3 w-3" />
                      Salin Dinonaktifkan
                    </button>
                  </div>
                </div>

                <p className="mt-2 text-[10px] text-slate-400 italic">
                  * Catatan: Sistem memblokir drag-select dan clipboard API untuk mencegah kebocoran apikey premium ini.
                </p>
              </div>

              {/* TWO CHILL / GABUT WIDGETS SIDE BY SIDE */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* WIDGET 1: CHILL MUSIC PLAYER (Khusus orang santai dan gabut) */}
                <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-sky-100 rounded-lg text-sky-600">
                          <Music className="h-4.5 w-4.5 animate-pulse" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">
                            Chill & Gabut Music Player
                          </h4>
                          <span className="text-[10px] text-slate-500">
                            Khusus buat nemenin santai
                          </span>
                        </div>
                      </div>
                      <Volume2 className="h-4 w-4 text-slate-400" />
                    </div>

                    <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-3 flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-sky-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                        CD
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">
                          {playlist[currentTrack].title}
                        </p>
                        <p className="text-[10px] text-slate-500 truncate">
                          {playlist[currentTrack].artist}
                        </p>
                      </div>
                      <span className="text-[10px] font-mono text-sky-600">
                        {playlist[currentTrack].duration}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-sky-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setCurrentTrack(prev => (prev === 0 ? playlist.length - 1 : prev - 1))}
                        className="p-1.5 rounded-lg hover:bg-sky-50 text-slate-600 text-xs font-semibold"
                      >
                        Prev
                      </button>
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-2 rounded-full bg-sky-500 hover:bg-sky-600 text-white shadow-sm"
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-[1px]" />}
                      </button>
                      <button 
                        onClick={() => setCurrentTrack(prev => (prev === playlist.length - 1 ? 0 : prev + 1))}
                        className="p-1.5 rounded-lg hover:bg-sky-50 text-slate-600 text-xs font-semibold"
                      >
                        Next
                      </button>
                    </div>

                    {/* Simple volume slider */}
                    <div className="flex items-center gap-2 w-28">
                      <span className="text-[9px] text-slate-400">Vol</span>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={musicVolume} 
                        onChange={(e) => setMusicVolume(Number(e.target.value))}
                        className="h-1 bg-sky-100 rounded-lg appearance-none cursor-pointer accent-sky-500 flex-1"
                      />
                    </div>
                  </div>
                </div>

                {/* WIDGET 2: CRYPTO BITCOIN PRICE TRACKER (Grafik bagus buat mantau santai) */}
                <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-amber-50 rounded-lg text-amber-500">
                          <TrendingUp className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">
                            Bitcoin Price Tracker
                          </h4>
                          <span className="text-[10px] text-slate-500">
                            Update harga BTC/USD real-time
                          </span>
                        </div>
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${btcTrend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {btcTrend === 'up' ? '▲ Naik' : '▼ Turun'}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold tracking-tight text-slate-800">
                        ${btcPrice.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-500">USD</span>
                    </div>

                    {/* Beautiful SVG Sparkline Graph */}
                    <div className="h-16 pt-2">
                      <svg viewBox="0 0 100 30" className="w-full h-full" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="btcGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        {/* Area */}
                        <path
                          d={`M 0 30 L 0 ${30 - (btcHistory[0] - 68000) / 10} L 20 ${30 - (btcHistory[1] - 68000) / 10} L 40 ${30 - (btcHistory[2] - 68000) / 10} L 60 ${30 - (btcHistory[3] - 68000) / 10} L 80 ${30 - (btcHistory[4] - 68000) / 10} L 100 ${30 - (btcHistory[5] - 68000) / 10} L 100 30 Z`}
                          fill="url(#btcGradient)"
                        />
                        {/* Line */}
                        <path
                          d={`M 0 ${30 - (btcHistory[0] - 68000) / 10} L 20 ${30 - (btcHistory[1] - 68000) / 10} L 40 ${30 - (btcHistory[2] - 68000) / 10} L 60 ${30 - (btcHistory[3] - 68000) / 10} L 80 ${30 - (btcHistory[4] - 68000) / 10} L 100 ${30 - (btcHistory[5] - 68000) / 10}`}
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <p className="text-[9px] text-slate-400 text-right mt-2">
                    * Simpan energi sambil nikmati musik & trading santai.
                  </p>
                </div>

              </div>

              {/* Announcements Section */}
              <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-sm">
                <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-sky-500" />
                  Pengumuman & Update Sistem
                </h4>
                <div className="border-l-4 border-sky-400 bg-sky-50/40 p-4 rounded-r-xl">
                  <p className="text-xs leading-relaxed text-slate-600">
                    {adminAnnouncement}
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* TAB: TOOLS PANEL */}
          {activeTab === 'tools' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Category & Tools List (Left Column) */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Search & Category Filter */}
                <div className="bg-white border border-sky-100 rounded-2xl p-4 shadow-sm space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="Cari tools..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-sky-50/50 border border-sky-100 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>

                  <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
                    {API_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-all ${
                          selectedCategory === cat.id
                            ? 'bg-sky-500 text-white'
                            : 'bg-sky-50 text-slate-600 hover:bg-sky-100'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filtered Tools List Card */}
                <div className="bg-white border border-sky-100 rounded-2xl shadow-sm overflow-hidden">
                  <div className="bg-sky-50 px-4 py-3 border-b border-sky-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-600">
                      Daftar Tool ({filteredTools.length})
                    </span>
                  </div>

                  <div className="divide-y divide-sky-50 max-h-[500px] overflow-y-auto">
                    {filteredTools.map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() => setSelectedTool(tool)}
                        className={`w-full text-left px-4 py-3 flex items-start justify-between gap-3 transition-colors ${
                          selectedTool.id === tool.id ? 'bg-sky-50/60' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="min-w-0 space-y-1">
                          <p className="text-xs font-bold text-slate-800 truncate">
                            {tool.name}
                          </p>
                          <p className="text-[10px] text-slate-500 line-clamp-1">
                            {tool.description}
                          </p>
                        </div>
                        <span className="flex-shrink-0 text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-sky-100 text-sky-700">
                          {tool.category}
                        </span>
                      </button>
                    ))}

                    {filteredTools.length === 0 && (
                      <div className="p-8 text-center text-xs text-slate-400">
                        Tidak ada tools yang cocok dengan pencarian Anda.
                      </div>
                    )}
                  </div>
                </div>

                {/* SPECIAL QRIS GENERATION TOOL SECTION */}
                <div className="bg-white border border-sky-100 rounded-2xl p-4 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 border-b border-sky-50 pb-2">
                    <Sliders className="h-4.5 w-4.5 text-sky-500" />
                    <h4 className="font-bold text-slate-800 text-xs">
                      QRIS Dynamic Generator Tool
                    </h4>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">
                        URL Tujuan QRIS
                      </label>
                      <input 
                        type="text" 
                        value={qrisUrlInput} 
                        onChange={(e) => setQrisUrlInput(e.target.value)}
                        className="w-full bg-sky-50/50 border border-sky-100 rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-sky-400"
                        placeholder="https://..."
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">
                        Nominal Rupiah (Rp)
                      </label>
                      <input 
                        type="number" 
                        value={qrisNominal} 
                        onChange={(e) => setQrisNominal(Number(e.target.value))}
                        className="w-full bg-sky-50/50 border border-sky-100 rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-sky-400"
                        placeholder="Contoh: 10000"
                      />
                    </div>

                    {/* QRIS File Upload Mock */}
                    <div className="border-t border-dashed border-sky-100 pt-3">
                      <span className="block text-[10px] font-bold text-slate-500 mb-1">
                        Upload Gambar QRIS (Alternatif POST)
                      </span>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleQrisFileChange}
                        className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 w-full"
                      />
                      
                      {qrisFilePreview && (
                        <div className="mt-2 relative h-20 w-20 rounded-lg border border-sky-200 overflow-hidden bg-slate-50">
                          <img src={qrisFilePreview} alt="QRIS upload preview" className="h-full w-full object-contain" />
                          <button 
                            onClick={() => { setQrisFile(null); setQrisFilePreview(null); }}
                            className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5 text-[8px] font-bold"
                          >
                            ✖
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => generateQris('url')}
                        disabled={qrisLoading}
                        className="flex-1 bg-sky-500 hover:bg-sky-600 text-white text-[10px] font-bold py-2 px-3 rounded-lg shadow-sm transition-all"
                      >
                        Generate URL
                      </button>
                      <button
                        onClick={() => generateQris('file')}
                        disabled={qrisLoading || !qrisFile}
                        className="flex-1 bg-teal-500 hover:bg-teal-600 text-white text-[10px] font-bold py-2 px-3 rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Upload & Gen
                      </button>
                    </div>
                  </div>

                  {/* QRIS Result Display */}
                  {qrisResult && (
                    <div className="bg-sky-50 border border-sky-200 p-3 rounded-xl space-y-2.5 text-center">
                      <span className="text-[10px] font-bold text-teal-700 block">
                        QRIS Berhasil Digenerate!
                      </span>
                      <div className="mx-auto h-32 w-32 bg-white border border-slate-200 p-1.5 rounded-lg">
                        {/* We use a beautiful styled QR code mock representation */}
                        <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-800 to-slate-900 p-2 flex flex-col justify-between items-center text-white rounded text-[8px] font-bold">
                          <div className="flex justify-between w-full"><span>■ ■</span><span>■ ■</span></div>
                          <span className="text-[6px] tracking-wide text-cyan-300">QRIS NOMINAL: Rp{qrisNominal}</span>
                          <div className="flex justify-between w-full"><span>■ ■</span><span>■ ■</span></div>
                        </div>
                      </div>
                      <code className="block text-[8px] text-slate-500 break-all select-all select-none">
                        {qrisResult}
                      </code>
                    </div>
                  )}

                  {qrisLoading && (
                    <div className="text-center py-4 text-xs text-sky-600 flex items-center justify-center gap-1.5">
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      Membuat QRIS dinamis...
                    </div>
                  )}
                </div>

              </div>

              {/* Tool Execution Interface (Right Column) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Active Tool Details */}
                <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-sm space-y-4">
                  
                  <div className="flex items-start justify-between gap-4 border-b border-sky-50 pb-3">
                    <div className="space-y-1">
                      <span className="bg-sky-100 text-sky-700 text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                        {selectedTool.category}
                      </span>
                      <h3 className="font-extrabold text-slate-800 text-base">
                        {selectedTool.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {selectedTool.description}
                      </p>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <span className="text-[9px] font-bold text-slate-400 block uppercase">
                        Endpoint URL
                      </span>
                      <code className="text-[10px] text-sky-600 bg-sky-50 px-2 py-1 rounded-md max-w-[200px] truncate block select-none">
                        {selectedTool.endpoint.replace('https://api.azbry.com', '')}
                      </code>
                    </div>
                  </div>

                  {/* Tool Dynamic Inputs */}
                  {selectedTool.inputs.length > 0 ? (
                    <div className="space-y-3">
                      {selectedTool.inputs.map((input) => (
                        <div key={input.name} className="space-y-1">
                          <label className="block text-xs font-bold text-slate-600">
                            {input.label}
                          </label>
                          <input
                            type={input.type === 'number' ? 'number' : 'text'}
                            value={toolInputs[input.name] || ''}
                            onChange={(e) => setToolInputs({ ...toolInputs, [input.name]: e.target.value })}
                            className="w-full bg-sky-50/50 border border-sky-100 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400"
                            placeholder={input.placeholder}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center text-xs text-slate-500">
                      Tool ini tidak memerlukan parameter input tambahan. Siap dijalankan!
                    </div>
                  )}

                  {/* Execution button */}
                  <div className="pt-2">
                    <button
                      onClick={executeApi}
                      disabled={toolLoading}
                      className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs py-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                    >
                      {toolLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Memproses Request Premium API...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Jalankan API Request
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* API Request & Response Display Container */}
                {apiUrlExecuted && (
                  <div className="bg-white border border-sky-100 rounded-2xl overflow-hidden shadow-sm">
                    
                    {/* Header */}
                    <div className="bg-sky-50 px-4 py-3 border-b border-sky-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4 text-sky-600" />
                        <span className="text-xs font-bold text-sky-700">
                          JSON API Response
                        </span>
                      </div>
                      
                      <span className="text-[10px] bg-sky-100 text-sky-700 px-2 py-0.5 rounded font-bold uppercase select-none">
                        GET 200 OK
                      </span>
                    </div>

                    {/* Masked Executed URL */}
                    <div className="bg-slate-50 border-b border-sky-100 p-3 select-none pointer-events-none">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">
                        Executed Api Query (ApiKey Protected):
                      </span>
                      <code className="text-[10px] text-slate-600 break-all select-none no-select-apikey font-mono">
                        {apiUrlExecuted.split('&apikey=')[0]}&apikey=azb-prem-danzz-••••••••
                      </code>
                    </div>

                    {/* Output Code box */}
                    <div className="p-4 bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto max-h-96 relative">
                      <div className="absolute top-2 right-2 select-none pointer-events-none">
                        <span className="bg-slate-800 text-slate-400 text-[8px] font-bold py-1 px-2 rounded border border-slate-700">
                          SECURE PREVIEW
                        </span>
                      </div>

                      {toolLoading ? (
                        <div className="text-center py-8 text-slate-500">
                          Loading data...
                        </div>
                      ) : toolResponse ? (
                        <pre className="no-select-apikey select-none pointer-events-none">
                          {JSON.stringify(toolResponse, null, 2)}
                        </pre>
                      ) : toolError ? (
                        <div className="text-red-400">
                          {toolError}
                        </div>
                      ) : (
                        <div className="text-slate-500 text-center py-4">
                          Jalankan request untuk memuat respon API.
                        </div>
                      )}
                    </div>

                    {/* Warning Footer info */}
                    <div className="bg-amber-50 px-4 py-2 text-[10px] text-amber-700 font-medium border-t border-amber-100 flex items-center gap-1.5 select-none">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
                      <span>
                        Pemberitahuan Keamanan: Penyalinan output API yang mengandung data autentik premium ditangguhkan demi perlindungan akun Anda.
                      </span>
                    </div>

                  </div>
                )}

              </div>

            </div>
          )}

          {/* TAB: SOCIAL PROJECT SHOWCASE */}
          {activeTab === 'showcase' && (
            <div className="space-y-6">
              
              {/* Header Title with Upload Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-sky-100 rounded-2xl p-5 shadow-sm">
                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold text-slate-800">
                    Project Pameran & Showcase
                  </h3>
                  <p className="text-xs text-slate-500">
                    Pamerkan dan bagikan hasil karya coding Anda di hadapan komunitas premium layaknya sosial media.
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    if (!user) {
                      setShowAuthModal(true);
                    } else {
                      setShowUploadModal(true);
                    }
                  }}
                  className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer self-start sm:self-center"
                >
                  <PlusCircle className="h-4.5 w-4.5" />
                  Pamerkan Project Anda
                </button>
              </div>

              {/* Feed of Projects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-white border border-sky-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4">
                    
                    {/* Project Header */}
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700">
                          {proj.isVercelProject ? 'Vercel App' : 'Custom Project'}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          oleh: <span className="font-bold text-sky-600">@{proj.author}</span>
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h4 className="font-extrabold text-slate-800 text-base leading-snug">
                          {proj.name}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed min-h-[40px]">
                          {proj.description}
                        </p>
                      </div>
                    </div>

                    {/* Project preview placeholder image */}
                    <div className="h-32 rounded-2xl overflow-hidden bg-sky-50 border border-sky-100 relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10" />
                      <div className="absolute bottom-2.5 left-3 right-3 z-20 flex items-center justify-between text-white">
                        <code className="text-[9px] bg-slate-800/80 px-2 py-0.5 rounded truncate max-w-[170px]">
                          {proj.url.replace('https://', '')}
                        </code>
                        <a 
                          href={proj.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="bg-sky-500 hover:bg-sky-600 text-white rounded-lg p-1 transition-all shadow-sm"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                      <img 
                        src={proj.id === 'danzz-smart-gadget' ? 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500' : proj.id === 'omega-prime' ? 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500' : proj.description.includes('music') ? 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500' : 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500'} 
                        alt={proj.name} 
                        className="h-full w-full object-cover" 
                      />
                    </div>

                    {/* Interaction Buttons (Like, Comments count) */}
                    <div className="border-t border-sky-50 pt-4 space-y-3.5">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => handleProjectLike(proj.id)}
                          className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                            user && proj.likedBy.includes(user.username)
                              ? 'bg-sky-500 text-white shadow-xs'
                              : 'bg-sky-50 text-slate-600 hover:bg-sky-100'
                          }`}
                        >
                          <ThumbsUp className="h-3.5 w-3.5" />
                          <span>{proj.likes} Suka</span>
                        </button>

                        <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold">
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>{proj.comments.length} Komentar</span>
                        </div>
                      </div>

                      {/* Comments list inside showcase card */}
                      {proj.comments.length > 0 && (
                        <div className="bg-sky-50/60 rounded-2xl p-3 max-h-32 overflow-y-auto space-y-2 border border-sky-100/50">
                          {proj.comments.map((comment, index) => (
                            <div key={index} className="text-[10px] space-y-0.5">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-sky-600">@{comment.user}</span>
                                <span className="text-slate-400">{comment.date}</span>
                              </div>
                              <p className="text-slate-600 leading-normal">{comment.text}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Comment Input */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Tulis tanggapan Anda..."
                          value={activeComments[proj.id] || ''}
                          onChange={(e) => setActiveComments({ ...activeComments, [proj.id]: e.target.value })}
                          className="flex-1 bg-sky-50/50 border border-sky-100 rounded-xl px-3 py-2 text-[10px] focus:outline-none focus:ring-1 focus:ring-sky-400"
                        />
                        <button
                          onClick={() => handleAddComment(proj.id)}
                          className="bg-sky-500 hover:bg-sky-600 text-white rounded-xl px-3 py-2 text-[10px] font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
                        >
                          Kirim
                        </button>
                      </div>

                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB: SHOP (TOKO PREMIUM) */}
          {activeTab === 'shop' && (
            <div className="space-y-6">
              
              {/* Authenticated Check Screen */}
              {!user ? (
                <div className="bg-white border border-sky-100 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-6 shadow-sm">
                  <div className="h-16 w-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <Lock className="h-8 w-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-800">
                      Toko Premium Terkunci!
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Silakan daftar atau login terlebih dahulu untuk mengakses Toko Premium. Kumpulkan koin virtual Anda untuk ditukarkan dengan lisensi premium khusus.
                    </p>
                  </div>

                  <button
                    onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
                    className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs py-3 px-8 rounded-xl shadow-md transition-all"
                  >
                    Masuk Sekarang
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  
                  {/* Shop Intro Header */}
                  <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-lg font-extrabold text-slate-800">
                        Toko Premium Suite
                      </h3>
                      <p className="text-xs text-slate-500">
                        Tukarkan Danzz Coin yang Anda miliki dengan berbagai lisensi apikey premium, script bot, dan fitur otomatis.
                      </p>
                    </div>

                    <div className="bg-sky-50 border border-sky-200 py-2 px-4 rounded-xl flex items-center gap-2">
                      <span className="text-xs text-slate-500">Koin Anda:</span>
                      <span className="font-extrabold text-sky-600 text-sm">💰 {user.coins} Koin</span>
                    </div>
                  </div>

                  {/* Status Alerts */}
                  {shopStatusMessage && (
                    <div className="bg-teal-50 border border-teal-200 text-teal-800 p-4 rounded-xl text-xs font-bold text-center">
                      {shopStatusMessage}
                    </div>
                  )}

                  {/* Grid of Items */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {shopItems.map((item) => {
                      const isOwned = purchasedItems.includes(item.id) || (item.id === 'vip-plan' && user.isPremium);
                      return (
                        <div key={item.id} className="bg-white border border-sky-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4">
                          
                          <div className="space-y-2.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[8px] font-extrabold uppercase px-2 py-0.5 rounded bg-sky-50 text-sky-700">
                                {item.category}
                              </span>
                              
                              <span className="text-xs font-bold text-sky-600">
                                💰 {item.price} Koin
                              </span>
                            </div>

                            <h4 className="font-extrabold text-slate-800 text-sm leading-snug">
                              {item.name}
                            </h4>
                            
                            <p className="text-xs text-slate-500 leading-normal min-h-[40px]">
                              {item.desc}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-sky-50">
                            {isOwned ? (
                              <button
                                disabled
                                className="w-full bg-slate-100 text-slate-400 font-bold text-xs py-2.5 rounded-xl cursor-not-allowed flex items-center justify-center gap-1.5"
                              >
                                <UserCheck className="h-4 w-4" />
                                Anda Sudah Memilikinya
                              </button>
                            ) : (
                              <button
                                onClick={() => handleBuyShopItem(item)}
                                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <ShoppingBag className="h-3.5 w-3.5" />
                                Beli Sekarang
                              </button>
                            )}
                          </div>

                        </div>
                      );
                    })}
                  </div>

                </div>
              )}

            </div>
          )}

          {/* TAB: LEADERBOARD */}
          {activeTab === 'leaderboard' && (
            <div className="bg-white border border-sky-100 rounded-3xl p-6 shadow-sm space-y-6">
              
              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-slate-800">
                  Leaderboard / Papan Peringkat
                </h3>
                <p className="text-xs text-slate-500">
                  Daftar kontributor project dan pemakai API premium paling aktif di ekosistem Danzz.
                </p>
              </div>

              {/* Search Bar for Leaderboard */}
              <div className="relative">
                <Search className="absolute left-3.5 top-3 h-4.5 w-4.5 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Cari user dalam leaderboard..."
                  value={leaderboardSearch}
                  onChange={(e) => setLeaderboardSearch(e.target.value)}
                  className="w-full bg-sky-50/50 border border-sky-100 rounded-xl py-2.5 pl-11 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              {/* Table */}
              <div className="border border-sky-100 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-sky-50 text-sky-700 font-bold border-b border-sky-100">
                      <th className="p-3 pl-4">Posisi</th>
                      <th className="p-3">Username</th>
                      <th className="p-3">Total Project</th>
                      <th className="p-3">API Hits</th>
                      <th className="p-3">Koin Poin</th>
                      <th className="p-3 pr-4">Badge Kelas</th>
                    </tr>
                  </thead>
                  
                  <tbody className="divide-y divide-sky-50">
                    {leaderboardUsers
                      .filter(u => u.name.toLowerCase().includes(leaderboardSearch.toLowerCase()))
                      .map((lUser, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-3 pl-4 font-bold text-slate-400">
                            #{idx + 1}
                          </td>
                          <td className="p-3 font-semibold text-slate-800 flex items-center gap-1.5">
                            {lUser.name}
                            {lUser.isVIP && <span className="bg-amber-100 border border-amber-200 text-amber-700 text-[8px] font-extrabold px-1.5 py-0.5 rounded">VIP</span>}
                          </td>
                          <td className="p-3 text-slate-500 font-medium">
                            {lUser.projects} Proyek
                          </td>
                          <td className="p-3 text-slate-500 font-medium">
                            {lUser.hits.toLocaleString()} hits
                          </td>
                          <td className="p-3 text-sky-600 font-extrabold">
                            ⭐ {lUser.points}
                          </td>
                          <td className="p-3 pr-4">
                            <span className="bg-sky-50 border border-sky-200 text-sky-700 text-[9px] font-extrabold px-2.5 py-1 rounded-full">
                              {lUser.badge}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB: SERVER & MONITOR */}
          {activeTab === 'server' && (
            <div className="space-y-6">
              
              <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-sm">
                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold text-slate-800">
                    Status Server & Monitor
                  </h3>
                  <p className="text-xs text-slate-500">
                    Pantau kinerja server API Azzbry secara real-time termasuk log request dari pengguna global.
                  </p>
                </div>
              </div>

              {/* Diagnostic grid stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Stat Card CPU */}
                <div className="bg-white border border-sky-100 rounded-2xl p-4 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Simulated CPU Load
                    </span>
                    <Cpu className="h-4 w-4 text-sky-500" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold tracking-tight text-slate-800">
                      {adminSimulatedCpu}%
                    </span>
                    <span className="text-[10px] text-slate-500">8 Core CPU</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-1000 ${
                        adminSimulatedCpu > 80 ? 'bg-red-500' : adminSimulatedCpu > 60 ? 'bg-amber-500' : 'bg-sky-500'
                      }`}
                      style={{ width: `${adminSimulatedCpu}%` }}
                    />
                  </div>
                </div>

                {/* Stat Card RAM */}
                <div className="bg-white border border-sky-100 rounded-2xl p-4 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Memory Usage
                    </span>
                    <Database className="h-4 w-4 text-sky-500" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold tracking-tight text-slate-800">
                      2.48 GB
                    </span>
                    <span className="text-[10px] text-slate-500">/ 8.00 GB</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="bg-sky-500 h-1.5 rounded-full" style={{ width: '31%' }} />
                  </div>
                </div>

                {/* Stat Card Storage */}
                <div className="bg-white border border-sky-100 rounded-2xl p-4 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Storage Utilized
                    </span>
                    <Sliders className="h-4 w-4 text-sky-500" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold tracking-tight text-slate-800">
                      48.2 GB
                    </span>
                    <span className="text-[10px] text-slate-500">/ 120 GB</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="bg-sky-500 h-1.5 rounded-full" style={{ width: '40%' }} />
                  </div>
                </div>

              </div>

              {/* Real-time scrolling logs console */}
              <div className="bg-slate-950 text-emerald-400 font-mono text-xs p-5 rounded-2xl shadow-lg border border-slate-900 space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      Live Api Logs Console
                    </span>
                  </div>
                  
                  <span className="text-[8px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
                    REALTIME STREAM
                  </span>
                </div>

                <div className="max-h-72 overflow-y-auto space-y-1.5">
                  {serverLogs.map((log, index) => (
                    <div key={index} className="leading-relaxed">
                      <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span> {log}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB: STATISTIK */}
          {activeTab === 'statistik' && (
            <div className="space-y-6">
              
              <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-sm">
                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold text-slate-800">
                    Statistik & Metrik Penggunaan
                  </h3>
                  <p className="text-xs text-slate-500">
                    Grafik visual performa request API yang terintegrasi di platform Danzz Premium.
                  </p>
                </div>
              </div>

              {/* Total metrics cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-sm space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Total API Hits
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold tracking-tight text-sky-600">
                      {statHits.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold">↑ 12% minggu ini</span>
                  </div>
                </div>

                <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-sm space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Success Rate
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold tracking-tight text-teal-600">
                      {statSuccess.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">99.1% Berhasil</span>
                  </div>
                </div>

                <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-sm space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Failed / Errors
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold tracking-tight text-red-500">
                      {statErrors.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">0.9% Error rate</span>
                  </div>
                </div>

              </div>

              {/* Responsive SVG Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* SVG Chart 1: API Hits per Hour (Line Chart) */}
                <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-sky-50 pb-2">
                    <h4 className="font-bold text-slate-800 text-sm">
                      Distribusi Hits per Jam
                    </h4>
                    <span className="text-[10px] text-slate-400">Terakhir diperbarui 2 menit yang lalu</span>
                  </div>

                  <div className="h-56 flex items-end justify-between gap-1 pt-4">
                    {/* Visualizing bar chart using clean Tailwind and custom items */}
                    {[
                      { label: '08:00', val: 60 },
                      { label: '10:00', val: 80 },
                      { label: '12:00', val: 40 },
                      { label: '14:00', val: 95 },
                      { label: '16:00', val: 70 },
                      { label: '18:00', val: 85 },
                      { label: '20:00', val: 90 },
                    ].map((item, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                        <div 
                          className="w-full bg-gradient-to-t from-sky-400 to-sky-500 rounded-t-lg transition-all duration-1000 shadow-sm"
                          style={{ height: `${item.val}%` }}
                        />
                        <span className="text-[9px] font-bold text-slate-400 tracking-tight whitespace-nowrap">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SVG Chart 2: Category Distribution (Pie Chart Simulation) */}
                <div className="bg-white border border-sky-100 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-sky-50 pb-2">
                    <h4 className="font-bold text-slate-800 text-sm">
                      Kategori Paling Sering Diakses
                    </h4>
                    <span className="text-[10px] text-slate-400">Total 8 Kategori</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-around gap-6 pt-2">
                    {/* SVG Pie Chart Mock */}
                    <div className="h-36 w-36 relative flex items-center justify-center">
                      <svg viewBox="0 0 36 36" className="h-full w-full transform -rotate-90">
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e0f2fe" strokeWidth="3" />
                        
                        {/* Segment 1: AI (40%) */}
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#0ea5e9" strokeWidth="3.2" strokeDasharray="40 60" strokeDashoffset="0" />
                        
                        {/* Segment 2: Downloader (30%) */}
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#14b8a6" strokeWidth="3.2" strokeDasharray="30 70" strokeDashoffset="-40" />
                        
                        {/* Segment 3: Stalk (20%) */}
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="3.2" strokeDasharray="20 80" strokeDashoffset="-70" />
                        
                        {/* Segment 4: Random (10%) */}
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ef4444" strokeWidth="3.2" strokeDasharray="10 90" strokeDashoffset="-90" />
                      </svg>

                      <div className="absolute flex flex-col items-center">
                        <span className="text-xs font-extrabold text-slate-700">AI</span>
                        <span className="text-[9px] text-slate-500">40% Hits</span>
                      </div>
                    </div>

                    {/* Chart Legend */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-sky-500" />
                        <span className="text-[10px] font-bold text-slate-600">AI & Assistant (40%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-teal-500" />
                        <span className="text-[10px] font-bold text-slate-600">Downloader Media (30%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-amber-500" />
                        <span className="text-[10px] font-bold text-slate-600">Stalking Profile (20%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <span className="text-[10px] font-bold text-slate-600">Random Entertainment (10%)</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* Riwayat Hit API Terbaru */}
              <div className="bg-white border border-sky-100 rounded-3xl p-5 shadow-sm space-y-4">
                <h4 className="font-extrabold text-slate-800 text-sm border-b border-sky-50 pb-2">
                  Riwayat Hit API Terkini
                </h4>
                <div className="divide-y divide-sky-50">
                  {liveHitsList.map((hit) => (
                    <div key={hit.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${hit.status === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        <span className="font-semibold text-slate-800">{hit.toolName}</span>
                      </div>
                      <div className="flex items-center gap-4 text-slate-400">
                        <span>{hit.time}</span>
                        <span className="bg-sky-50 border border-sky-100 text-sky-700 text-[8px] font-bold px-1.5 py-0.5 rounded">
                          SUCCESS
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB: ADMIN PANEL */}
          {activeTab === 'admin' && user?.isAdmin && (
            <div className="space-y-6">
              
              <div className="bg-white border border-red-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-red-50 rounded-xl text-red-500">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-lg leading-none">
                      Dashboard Owner & Admin
                    </h3>
                    <span className="text-xs text-red-500 font-bold uppercase tracking-wider">
                      AKDAN OWNER ACCESS
                    </span>
                  </div>
                </div>
              </div>

              {/* Admin settings controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Customize global announcement banner */}
                <div className="bg-white border border-sky-100 rounded-3xl p-5 shadow-sm space-y-4">
                  <h4 className="font-extrabold text-slate-800 text-sm border-b border-sky-50 pb-2">
                    Kelola Pengumuman Global
                  </h4>
                  
                  <div className="space-y-3">
                    <textarea
                      value={adminAnnouncement}
                      onChange={(e) => setAdminAnnouncement(e.target.value)}
                      rows={3}
                      className="w-full bg-sky-50/50 border border-sky-100 rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-sky-400"
                      placeholder="Ubah pengumuman di sini..."
                    />
                    
                    <button
                      onClick={() => alert('Pengumuman global berhasil diupdate!')}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold text-xs py-2 px-4 rounded-xl shadow-xs transition-all w-full"
                    >
                      Update Pengumuman
                    </button>
                  </div>
                </div>

                {/* System Controls */}
                <div className="bg-white border border-sky-100 rounded-3xl p-5 shadow-sm space-y-4">
                  <h4 className="font-extrabold text-slate-800 text-sm border-b border-sky-50 pb-2">
                    Kontrol Keamanan & Backup
                  </h4>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-slate-700">Mode Pemeliharaan (Maintenance)</span>
                        <p className="text-[10px] text-slate-500">Blokir akses publik sementara waktu</p>
                      </div>
                      
                      <button 
                        onClick={() => setIsMaintenanceMode(!isMaintenanceMode)}
                        className={`text-xs px-4 py-1.5 rounded-lg font-bold transition-all ${
                          isMaintenanceMode ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {isMaintenanceMode ? 'AKTIF' : 'NONAKTIF'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between border-t border-sky-50 pt-3">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-slate-700">Backup Database Sistem</span>
                        <p className="text-[10px] text-slate-500">Kompres log dan simpan ke Cloud Storage</p>
                      </div>

                      <button 
                        onClick={async () => {
                          setMockBackupRunning(true);
                          await new Promise(resolve => setTimeout(resolve, 2000));
                          setMockBackupRunning(false);
                          alert('Database berhasil di-backup secara aman!');
                        }}
                        disabled={mockBackupRunning}
                        className="bg-sky-500 hover:bg-sky-600 text-white text-xs px-4 py-1.5 rounded-lg font-bold shadow-xs hover:shadow-md transition-all disabled:opacity-50"
                      >
                        {mockBackupRunning ? 'Proses...' : 'Mulai Backup'}
                      </button>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

        </main>

      </div>

      {/* 4. FOOTER CREDITS */}
      <footer className="bg-white border-t border-sky-100 py-6 px-4 text-center mt-auto">
        <div className="max-w-7xl mx-auto space-y-2">
          <p className="text-xs text-slate-400">
            © 2026 Danzz Premium Tools. Built with passion and code.
          </p>
          <p className="text-[10px] text-slate-400 font-bold select-none">
            Powered by Azbry API Collaboration • Danzz Smart Gadget & Omega Prime
          </p>
        </div>
      </footer>

      {/* 5. MODAL: LOGIN / REGISTER */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-sky-100 rounded-3xl w-full max-w-md p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
            
            {/* Header info */}
            <div className="text-center space-y-1.5">
              <h3 className="text-lg font-extrabold text-slate-800">
                {authMode === 'login' ? 'Masuk ke Akun Danzz' : 'Daftar Akun Baru'}
              </h3>
              <p className="text-xs text-slate-500">
                Nikmati akses premium dan coins melimpah untuk test tools.
              </p>
            </div>

            {/* Error & Success Alert */}
            {authError && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-xl text-xs font-bold text-center">
                {authError}
              </div>
            )}
            {authSuccess && (
              <div className="bg-teal-50 border border-teal-200 text-teal-800 p-3 rounded-xl text-xs font-bold text-center">
                {authSuccess}
              </div>
            )}

            {/* Auth forms */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              
              {authMode === 'register' && (
                <>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-600">Username</label>
                    <input 
                      type="text" 
                      required
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      className="w-full bg-sky-50/50 border border-sky-100 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400"
                      placeholder="Masukkan username..."
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-600">Alamat Email</label>
                    <input 
                      type="email" 
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full bg-sky-50/50 border border-sky-100 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400"
                      placeholder="danzz.developer@example.com"
                    />
                  </div>
                </>
              )}

              {authMode === 'login' && (
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-600">Username</label>
                  <input 
                    type="text" 
                    required
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    className="w-full bg-sky-50/50 border border-sky-100 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400"
                    placeholder="Masukkan username Anda..."
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-600">Kata Sandi (Password)</label>
                <input 
                  type="password" 
                  required
                  value={authMode === 'login' ? loginPassword : regPassword}
                  onChange={(e) => authMode === 'login' ? setLoginPassword(e.target.value) : setRegPassword(e.target.value)}
                  className="w-full bg-sky-50/50 border border-sky-100 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="Masukkan kata sandi..."
                />
              </div>

              {/* Simulated slow loading configuration: LOADING USER PASSWORD TRUE FALSE */}
              <div className="flex items-center justify-between border-t border-sky-50 pt-3">
                <span className="text-[10px] text-slate-500 font-semibold">Simulasi Delay Keamanan Akun (2s)</span>
                
                <button
                  type="button"
                  onClick={() => setSimulateSlowAuth(!simulateSlowAuth)}
                  className={`text-[9px] px-2 py-1 rounded font-bold border transition-colors ${
                    simulateSlowAuth ? 'bg-sky-500 text-white border-sky-600' : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {simulateSlowAuth ? 'AKTIF (True)' : 'MATI (False)'}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoadingAuth}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs py-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isLoadingAuth ? (
                  <>
                    <RefreshCw className="h-4.5 w-4.5 animate-spin" />
                    Menyinkronkan Akun...
                  </>
                ) : (
                  authMode === 'login' ? 'Masuk Sekarang' : 'Daftar Akun Baru'
                )}
              </button>

            </form>

            {/* REGISTER EMAIL GOOGLE EMULATOR */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-sky-100"></div>
              <span className="flex-shrink mx-4 text-[9px] font-bold text-slate-400 uppercase">Atau Daftar Dengan</span>
              <div className="flex-grow border-t border-sky-100"></div>
            </div>

            <button
              onClick={handleGoogleAuth}
              disabled={isLoadingAuth}
              className="w-full border border-sky-200 hover:bg-sky-50 text-slate-600 font-bold text-xs py-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.285-6.887 4.285-4.832 0-8.68-3.766-8.68-8.4s3.848-8.4 8.68-8.4c2.253 0 4.195.836 5.673 2.215l3.228-3.228C18.665.922 15.688 0 12.24 0 5.48 0 0 5.48 0 12.24s5.48 12.24 12.24 12.24c7.04 0 12.24-4.935 12.24-12.24 0-.82-.075-1.605-.215-2.315h-12.025z"
                />
              </svg>
              Google Account Sign-Up
            </button>

            {/* Toggle Mode */}
            <div className="text-center pt-2">
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="text-[10px] text-sky-500 font-bold hover:underline"
              >
                {authMode === 'login' ? 'Belum punya akun? Daftar gratis' : 'Sudah memiliki akun? Masuk'}
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-3.5 right-3.5 text-slate-400 hover:text-slate-600"
            >
              ✖
            </button>

          </div>
        </div>
      )}

      {/* 6. MODAL: UPLOAD NEW PROJECT TO SOCIAL FEED */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-sky-100 rounded-3xl w-full max-w-md p-6 sm:p-8 space-y-6 shadow-xl relative">
            
            <div className="text-center space-y-1.5">
              <h3 className="text-lg font-extrabold text-slate-800">
                Pamerkan Project Anda
              </h3>
              <p className="text-xs text-slate-500">
                Bagikan link project Vercel atau web aplikasi Anda untuk mendapatkan reward 50 poin!
              </p>
            </div>

            <form onSubmit={handleUploadProject} className="space-y-4">
              
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-600">Nama Project</label>
                <input 
                  type="text" 
                  required
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full bg-sky-50/50 border border-sky-100 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="Contoh: My Bitcoin & Lofi Player"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-600">Tautan / Link Website (Vercel/GitHub)</label>
                <input 
                  type="url" 
                  required
                  value={newProjectUrl}
                  onChange={(e) => setNewProjectUrl(e.target.value)}
                  className="w-full bg-sky-50/50 border border-sky-100 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-600">Deskripsi Project (Jelas & Informatif)</label>
                <textarea
                  required
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  rows={3}
                  className="w-full bg-sky-50/50 border border-sky-100 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="Tuliskan deskripsi lengkap dari website yang dipamerkan..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Pamerkan Sekarang 🚀
              </button>

            </form>

            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-3.5 right-3.5 text-slate-400 hover:text-slate-600"
            >
              ✖
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
