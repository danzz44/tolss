export interface ToolItem {
  id: string;
  name: string;
  endpoint: string;
  method: 'GET' | 'POST';
  description: string;
  inputs: {
    name: string;
    label: string;
    type: 'text' | 'number' | 'file';
    placeholder?: string;
    defaultValue?: string;
  }[];
  category: 'AI' | 'Random' | 'Search' | 'Tools' | 'Downloader' | 'Maker' | 'News' | 'Stalk';
  mockResponse: Record<string, any> | ((inputs: Record<string, any>) => Record<string, any>);
}

export const API_CATEGORIES = [
  { id: 'all', name: 'Semua Tools' },
  { id: 'AI', name: 'Kecerdasan Buatan (AI)' },
  { id: 'Random', name: 'Data Acak & Hiburan' },
  { id: 'Search', name: 'Mesin Pencari (Search)' },
  { id: 'Tools', name: 'Alat Utilitas (Tools)' },
  { id: 'Downloader', name: 'Unduh Media (Downloader)' },
  { id: 'Maker', name: 'Pembuat Konten (Maker)' },
  { id: 'News', name: 'Berita Terkini (News)' },
  { id: 'Stalk', name: 'Stalking Akun (Stalk)' }
] as const;

export const TOOLS_LIST: ToolItem[] = [
  // --- AI ---
  {
    id: 'ai-aiko',
    name: 'Aiko AI Assistant',
    endpoint: 'https://api.azbry.com/api/ai/aiko',
    method: 'GET',
    description: 'Tanya jawab interaktif dengan Aiko AI, model bahasa cerdas.',
    inputs: [
      { name: 'query', label: 'Pertanyaan / Prompt', type: 'text', placeholder: 'Ketik pertanyaan di sini...', defaultValue: 'Halo Aiko, apa kabar?' }
    ],
    category: 'AI',
    mockResponse: (inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: `Halo! Saya Aiko, asisten virtual pintar Anda. Mengenai pertanyaan Anda "${inputs.query || 'Halo Aiko'}": Saya di sini untuk membantu mempermudah aktivitas coding, belajar, dan hiburan Anda! Web tools ini dirancang dengan kolaborasi epik bersama Danzz.`
    })
  },
  // --- Random ---
  {
    id: 'random-fakta',
    name: 'Fakta Unik Dunia',
    endpoint: 'https://api.azbry.com/api/random/fakta',
    method: 'GET',
    description: 'Dapatkan fakta-fakta unik dan menarik yang ada di dunia secara acak.',
    inputs: [],
    category: 'Random',
    mockResponse: {
      status: true,
      creator: 'Azzbry',
      result: 'Tahukah kamu? Menara Eiffel di Paris bisa tumbuh hingga 15 cm lebih tinggi selama musim panas karena pemuaian termal pada logam besi strukturnya!'
    }
  },
  {
    id: 'random-katakata',
    name: 'Kata-kata Mutiara & Motivasi',
    endpoint: 'https://api.azbry.com/api/random/katakata',
    method: 'GET',
    description: 'Kumpulan kata-kata bijak, motivasi, dan cinta secara acak.',
    inputs: [],
    category: 'Random',
    mockResponse: {
      status: true,
      creator: 'Azzbry',
      result: 'Kesuksesan sejati bukanlah tentang tidak pernah gagal, melainkan bangkit setiap kali kita jatuh. Tetap berjuang bersama Danzz Premium Tools!'
    }
  },
  {
    id: 'random-meme',
    name: 'Meme Lucu Indonesia',
    endpoint: 'https://api.azbry.com/api/random/meme',
    method: 'GET',
    description: 'Dapatkan meme random dari berbagai komunitas lokal untuk hiburan Anda.',
    inputs: [],
    category: 'Random',
    mockResponse: {
      status: true,
      creator: 'Azzbry',
      result: {
        title: 'Ketika build project langsung sukses tanpa error',
        url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60',
        likes: 1250,
        source: 'Instagram/MemeCoding'
      }
    }
  },
  {
    id: 'random-stickerly',
    name: 'Stickerly Finder Random',
    endpoint: 'https://api.azbry.com/api/random/stickerly',
    method: 'GET',
    description: 'Temukan stiker acak langsung dari database Sticker.ly.',
    inputs: [],
    category: 'Random',
    mockResponse: {
      status: true,
      creator: 'Azzbry',
      result: {
        title: 'Meme Lucu WA',
        author: 'StickerDanzz',
        stickerUrl: 'https://api.azbry.com/api/tools/telesticker?url=https://t.me/addstickers/danzzpack',
        totalStickers: 12
      }
    }
  },
  // --- Search ---
  {
    id: 'search-carigrup',
    name: 'Cari Grup WhatsApp',
    endpoint: 'https://api.azbry.com/api/search/carigrup',
    method: 'GET',
    description: 'Cari link grup WhatsApp aktif berdasarkan kata kunci tertentu.',
    inputs: [
      { name: 'query', label: 'Kata Kunci Grup', type: 'text', placeholder: 'Contoh: coding, mabar, anime', defaultValue: 'coding' }
    ],
    category: 'Search',
    mockResponse: (inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: [
        { title: `Grup Belajar ${inputs.query || 'Coding'} Indonesia`, link: 'https://chat.whatsapp.com/DanzzDevBelajarCoding1' },
        { title: `Komunitas ${inputs.query || 'Coding'} Santai`, link: 'https://chat.whatsapp.com/DanzzDevSantaiGabut2' },
        { title: `Danzz Premium Member ${inputs.query || 'Coding'}`, link: 'https://chat.whatsapp.com/DanzzPremiumMemberVip' }
      ]
    })
  },
  {
    id: 'search-dramabox',
    name: 'DramaBox Search',
    endpoint: 'https://api.azbry.com/api/search/dramabox',
    method: 'GET',
    description: 'Cari drama-drama pendek dan viral dari platform DramaBox.',
    inputs: [
      { name: 'query', label: 'Judul Drama', type: 'text', placeholder: 'Contoh: CEO, Pernikahan, Reborn', defaultValue: 'CEO' }
    ],
    category: 'Search',
    mockResponse: (inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: [
        { title: `Kembalinya sang CEO ${inputs.query || ''} Legendaris`, episodes: 80, rating: 9.8, genre: 'Romance/Drama' },
        { title: `Rahasia Tersembunyi Pewaris ${inputs.query || 'Tahta'}`, episodes: 100, rating: 9.5, genre: 'Action/Thriller' }
      ]
    })
  },
  {
    id: 'search-cuaca',
    name: 'Prakiraan Cuaca Indonesia',
    endpoint: 'https://api.azbry.com/api/search/cuaca',
    method: 'GET',
    description: 'Periksa ramalan cuaca terupdate di kota-kota Indonesia.',
    inputs: [
      { name: 'kota', label: 'Nama Kota', type: 'text', placeholder: 'Contoh: Jakarta, Surabaya, Bandung', defaultValue: 'Jakarta' }
    ],
    category: 'Search',
    mockResponse: (inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: {
        kota: inputs.kota || 'Jakarta',
        suhu: '29°C',
        kondisi: 'Cerah Berawan',
        kelembapan: '75%',
        angin: '12 km/jam',
        update: 'Baru saja'
      }
    })
  },
  {
    id: 'search-infogempa',
    name: 'Info Gempa Terkini (BMKG)',
    endpoint: 'https://api.azbry.com/api/search/cuaca',
    method: 'GET',
    description: 'Dapatkan informasi gempa bumi terbaru berkekuatan Magnitudo > 5.0 dari BMKG.',
    inputs: [],
    category: 'Search',
    mockResponse: {
      status: true,
      creator: 'Azzbry',
      result: {
        tanggal: '24 Feb 2026',
        jam: '14:25:30 WIB',
        magnitudo: '5.4 SR',
        kedalaman: '10 km',
        koordinat: '8.45 LS - 110.32 BT',
        lokasi: '84 km BaratDaya GUNUNGKIDUL-DIY',
        potensi: 'Tidak berpotensi tsunami'
      }
    }
  },
  {
    id: 'search-jadwalsholat',
    name: 'Jadwal Sholat Harian',
    endpoint: 'https://api.azbry.com/api/search/jadwalsholat',
    method: 'GET',
    description: 'Periksa jadwal sholat wajib untuk berbagai kota di Indonesia.',
    inputs: [
      { name: 'kota', label: 'Nama Kota', type: 'text', placeholder: 'Contoh: Bandung, Depok, Medan', defaultValue: 'Bandung' }
    ],
    category: 'Search',
    mockResponse: (inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: {
        kota: inputs.kota || 'Bandung',
        tanggal: '2026-02-24',
        shubuh: '04:36',
        terbit: '05:51',
        dzuhur: '12:05',
        ashar: '15:14',
        maghrib: '18:13',
        isya: '19:24'
      }
    })
  },
  {
    id: 'search-ttsearch',
    name: 'TikTok Video Search',
    endpoint: 'https://api.azbry.com/api/search/ttsearch',
    method: 'GET',
    description: 'Cari video di TikTok berdasarkan query atau kata kunci tertentu.',
    inputs: [
      { name: 'query', label: 'Kata Kunci TikTok', type: 'text', placeholder: 'Contoh: jedag jedug, coding aesthetic', defaultValue: 'coding aesthetic' }
    ],
    category: 'Search',
    mockResponse: (inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: [
        { author: 'danzz_dev', title: `Tutor website premium ${inputs.query || ''}`, likes: '24K', views: '200K', music: 'Original Sound - Danzz' },
        { author: 'azzbry_api', title: `Review API super cepat ${inputs.query || ''}`, likes: '12K', views: '110K', music: 'Lofi Vibes - Azzbry' }
      ]
    })
  },
  {
    id: 'search-netflix',
    name: 'Netflix Search Catalog',
    endpoint: 'https://api.azbry.com/api/search/netflix',
    method: 'GET',
    description: 'Cari film, serial TV, dan dokumenter populer di katalog Netflix.',
    inputs: [
      { name: 'query', label: 'Judul Film/Series', type: 'text', placeholder: 'Contoh: Stranger Things, Squid Game', defaultValue: 'Squid Game' }
    ],
    category: 'Search',
    mockResponse: (inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: [
        { title: inputs.query || 'Squid Game', type: 'TV Series', rating: '8.8/10', seasons: '2 Seasons', status: 'Active', coverUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8edd86?w=400' }
      ]
    })
  },
  {
    id: 'search-samehadaku',
    name: 'Samehadaku Anime Search',
    endpoint: 'https://api.azbry.com/api/search/samehadaku',
    method: 'GET',
    description: 'Cari episode anime, movie, dan update terbaru di platform Samehadaku.',
    inputs: [
      { name: 'query', label: 'Judul Anime', type: 'text', placeholder: 'Contoh: Naruto, Solo Leveling', defaultValue: 'Solo Leveling' }
    ],
    category: 'Search',
    mockResponse: (inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: [
        { title: `${inputs.query || 'Solo Leveling'} Episode Terbaru`, type: 'TV', episode: 'Season 2 - Ep 8', status: 'Ongoing', rating: '9.2' }
      ]
    })
  },
  {
    id: 'search-sfile',
    name: 'Sfile Mobi Search',
    endpoint: 'https://api.azbry.com/api/search/sfile',
    method: 'GET',
    description: 'Cari file unduhan seperti APK, Zip, dan Mod yang diunggah di Sfile.mobi.',
    inputs: [
      { name: 'query', label: 'Nama File', type: 'text', placeholder: 'Contoh: Whatsapp Mod, Spotify Premium APK', defaultValue: 'Spotify Premium' }
    ],
    category: 'Search',
    mockResponse: (inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: [
        { name: `${inputs.query || 'Spotify Premium'} v8.9.0 Mod.apk`, size: '28.4 MB', downloads: '14.5K', date: '2026-02-20' },
        { name: `${inputs.query || 'Spotify Premium'} Premium Creator Pack.zip`, size: '105 MB', downloads: '3.2K', date: '2026-02-18' }
      ]
    })
  },
  {
    id: 'search-playstore',
    name: 'PlayStore App Search',
    endpoint: 'https://api.azbry.com/api/search/playstore',
    method: 'GET',
    description: 'Cari rincian aplikasi dan game yang tersedia di Google Play Store.',
    inputs: [
      { name: 'query', label: 'Nama Aplikasi/Game', type: 'text', placeholder: 'Contoh: Mobile Legends, WhatsApp', defaultValue: 'Mobile Legends' }
    ],
    category: 'Search',
    mockResponse: (inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: [
        { name: inputs.query || 'Mobile Legends: Bang Bang', developer: 'Moonton', rating: '4.6 ⭐', installs: '500M+', size: '140MB', link: 'https://play.google.com/store/apps/details?id=com.mobile.legends' }
      ]
    })
  },
  {
    id: 'search-anoboy',
    name: 'Anoboy Anime Search',
    endpoint: 'https://api.azbry.com/api/search/anoboy',
    method: 'GET',
    description: 'Cari dan dapatkan link streaming anime sub Indo dari Anoboy.',
    inputs: [
      { name: 'query', label: 'Judul Anime', type: 'text', placeholder: 'Contoh: One Piece, Bleach', defaultValue: 'One Piece' }
    ],
    category: 'Search',
    mockResponse: (inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: [
        { title: `${inputs.query || 'One Piece'} Episode 1098 Subtitle Indonesia`, link: 'https://anoboy.show/one-piece-ep-1098-sub-indo/' },
        { title: `${inputs.query || 'One Piece'} Movie Red HD`, link: 'https://anoboy.show/one-piece-film-red/' }
      ]
    })
  },
  // --- Tools / Utilities ---
  {
    id: 'tools-wink',
    name: 'Wink HD Enhancer',
    endpoint: 'https://api.azbry.com/api/tools/wink',
    method: 'GET',
    description: 'Tingkatkan kualitas gambar / foto blur menjadi HD berkualitas tinggi.',
    inputs: [
      { name: 'url', label: 'URL Gambar Blur', type: 'text', placeholder: 'https://example.com/blur-image.jpg', defaultValue: 'https://images.unsplash.com/photo-1501183007986-d0d080b147f9?w=300' }
    ],
    category: 'Tools',
    mockResponse: (inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: {
        originalUrl: inputs.url || 'https://images.unsplash.com/photo-1501183007986-d0d080b147f9?w=300',
        enhancedUrl: 'https://images.unsplash.com/photo-1501183007986-d0d080b147f9?w=1080',
        quality: '4K Ultra HD',
        sizeBefore: '45 KB',
        sizeAfter: '1.2 MB'
      }
    })
  },
  {
    id: 'tools-bypass',
    name: 'Bypass Link Shortener',
    endpoint: 'https://api.azbry.com/api/tools/bypass',
    method: 'GET',
    description: 'Bypass / lewati safelink yang ribet langsung ke link tujuan asli.',
    inputs: [
      { name: 'url', label: 'Link Safelink', type: 'text', placeholder: 'https://shrinkme.io/xxxxxx', defaultValue: 'https://shrinkme.io/danzzpass' }
    ],
    category: 'Tools',
    mockResponse: (inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: {
        shortUrl: inputs.url || 'https://shrinkme.io/danzzpass',
        destinationUrl: 'https://akdanzzxsmartgadget.vercel.app/',
        status: 'Bypassed Successfully',
        delaySaved: '15 seconds'
      }
    })
  },
  {
    id: 'tools-tempmail',
    name: 'Temporary Email Generator',
    endpoint: 'https://api.azbry.com/api/tools/tempmail',
    method: 'GET',
    description: 'Hasilkan alamat email sementara sekali pakai untuk registrasi aman.',
    inputs: [],
    category: 'Tools',
    mockResponse: {
      status: true,
      creator: 'Azzbry',
      result: {
        email: 'danzzpremium_temp@azbry.com',
        inbox: [
          { from: 'Google Security', subject: 'Your verification code is 108111', body: 'Please verify your Danzz premium tools account with 108111.' }
        ]
      }
    }
  },
  {
    id: 'tools-translate',
    name: 'Penerjemah Bahasa (Translate)',
    endpoint: 'https://api.azbry.com/api/tools/translate',
    method: 'GET',
    description: 'Terjemahkan teks antar bahasa dengan akurasi tinggi.',
    inputs: [
      { name: 'text', label: 'Teks Asli', type: 'text', placeholder: 'Ketik teks untuk diterjemahkan...', defaultValue: 'Hello, welcome to our Premium Collaborative Web Tools!' },
      { name: 'to', label: 'Bahasa Tujuan (Kode)', type: 'text', placeholder: 'id, en, ja, ko', defaultValue: 'id' }
    ],
    category: 'Tools',
    mockResponse: (inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: {
        original: inputs.text || 'Hello, welcome to our Premium Collaborative Web Tools!',
        translated: 'Halo, selamat datang di Alat Web Kolaboratif Premium kami!',
        sourceLang: 'en',
        targetLang: inputs.to || 'id'
      }
    })
  },
  {
    id: 'tools-telesticker',
    name: 'Telegram Sticker Downloader',
    endpoint: 'https://api.azbry.com/api/tools/telesticker',
    method: 'GET',
    description: 'Download paket stiker dari Telegram menggunakan tautan pack stiker.',
    inputs: [
      { name: 'url', label: 'Link Pack Stiker Telegram', type: 'text', placeholder: 'https://t.me/addstickers/xxx', defaultValue: 'https://t.me/addstickers/danzzpack' }
    ],
    category: 'Tools',
    mockResponse: (_inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: {
        packName: 'danzzpack',
        totalStickers: 15,
        stickers: [
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200',
          'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200'
        ]
      }
    })
  },
  {
    id: 'tools-ssweb',
    name: 'SSWeb Screenshot Tool',
    endpoint: 'https://api.azbry.com/api/tools/ssweb',
    method: 'GET',
    description: 'Ambil tangkapan layar (screenshot) penuh dari halaman website mana saja.',
    inputs: [
      { name: 'url', label: 'URL Website', type: 'text', placeholder: 'https://example.com', defaultValue: 'https://akdanzzxsmartgadget.vercel.app/' }
    ],
    category: 'Tools',
    mockResponse: (inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: {
        targetUrl: inputs.url || 'https://akdanzzxsmartgadget.vercel.app/',
        screenshotUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800',
        timestamp: '2026-02-24 14:26:00'
      }
    })
  },
  {
    id: 'tools-stickerly',
    name: 'Stickerly Search Pack',
    endpoint: 'https://api.azbry.com/api/tools/stickerly',
    method: 'GET',
    description: 'Cari dan unduh ribuan paket stiker dari Sticker.ly berdasarkan query.',
    inputs: [
      { name: 'query', label: 'Kata Kunci Stiker', type: 'text', placeholder: 'lucu, kucing, sad', defaultValue: 'lucu' }
    ],
    category: 'Tools',
    mockResponse: (inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: [
        { title: `Kucing Lucu ${inputs.query || ''}`, author: 'MemeMaker', stickersCount: 20, previewUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200' }
      ]
    })
  },
  // --- Downloader ---
  {
    id: 'download-allinone',
    name: 'All-In-One Media Downloader',
    endpoint: 'https://api.azbry.com/api/download/allinone',
    method: 'GET',
    description: 'Download video/audio dari IG, FB, YT, Twitter, dll secara instan.',
    inputs: [
      { name: 'url', label: 'Link Media Video/Audio', type: 'text', placeholder: 'Masukkan link video sosial media...', defaultValue: 'https://www.instagram.com/p/C39danzz/' }
    ],
    category: 'Downloader',
    mockResponse: (_inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: {
        source: 'Instagram',
        title: 'Video Instagram Kreatif oleh Danzz',
        thumbnail: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=300',
        urls: [
          { quality: '720p HD (Video)', downloadUrl: 'https://example.com/instagram_danzz_720.mp4' },
          { quality: 'Audio Only (M4A)', downloadUrl: 'https://example.com/instagram_danzz_audio.m4a' }
        ]
      }
    })
  },
  {
    id: 'download-applemusic',
    name: 'Apple Music Audio Downloader',
    endpoint: 'https://api.azbry.com/api/download/applemusic',
    method: 'GET',
    description: 'Ekstrak dan unduh file audio berkualitas tinggi langsung dari Apple Music.',
    inputs: [
      { name: 'url', label: 'Link Lagu Apple Music', type: 'text', placeholder: 'https://music.apple.com/...', defaultValue: 'https://music.apple.com/id/album/chill-vibes-danzz' }
    ],
    category: 'Downloader',
    mockResponse: (_inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: {
        title: 'Chill Sunset Beats',
        artist: 'Danzz Beats',
        album: 'Azzbry Collaboration Volume 1',
        duration: '3:45',
        coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400',
        audioUrl: 'https://example.com/apple_music_danzz_premium.mp3'
      }
    })
  },
  {
    id: 'download-douyin',
    name: 'Douyin Video Downloader',
    endpoint: 'https://api.azbry.com/api/downloader/douyin',
    method: 'GET',
    description: 'Unduh video berkualitas HD tanpa watermark dari platform Douyin.',
    inputs: [
      { name: 'url', label: 'Link Video Douyin', type: 'text', placeholder: 'https://v.douyin.com/xxxxx', defaultValue: 'https://v.douyin.com/danzzdouyin' }
    ],
    category: 'Downloader',
    mockResponse: (_inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: {
        title: 'Douyin Trend Video',
        author: 'Chinese_Vibe',
        noWatermarkUrl: 'https://example.com/douyin_no_watermark.mp4',
        cover: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300'
      }
    })
  },
  {
    id: 'download-tiktok',
    name: 'TikTok Video Downloader',
    endpoint: 'https://api.azbry.com/api/download/tiktok',
    method: 'GET',
    description: 'Download video TikTok tanpa watermark / MP3 langsung dengan resolusi tinggi.',
    inputs: [
      { name: 'url', label: 'Tautan / Link TikTok', type: 'text', placeholder: 'https://vt.tiktok.com/xxxxxx', defaultValue: 'https://vt.tiktok.com/danzztiktok' }
    ],
    category: 'Downloader',
    mockResponse: (_inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: {
        id: '1289381293',
        title: 'Bikin Web Tools Epik bareng Azzbry & Danzz',
        author: '@danzz.developer',
        music: 'Chill Synthwave - Danzz',
        stats: { play: '2.5M', likes: '350K', shares: '42K' },
        noWatermarkUrl: 'https://example.com/tiktok_no_watermark.mp4',
        audioUrl: 'https://example.com/tiktok_audio.mp3'
      }
    })
  },
  // --- Maker ---
  {
    id: 'maker-code2img',
    name: 'Code-to-Image Beautifier',
    endpoint: 'https://api.azbry.com/api/maker/code2img',
    method: 'GET',
    description: 'Ubah kode script pemrograman Anda menjadi gambar berlatar aesthetic.',
    inputs: [
      { name: 'code', label: 'Kode Script', type: 'text', placeholder: 'Ketik atau tempel kode...', defaultValue: 'const collab = (dev1, dev2) => {\n  console.log(`${dev1} & ${dev2} Collab Kapan-kapan!`);\n};\ncollab("Danzz", "Azzbry");' },
      { name: 'theme', label: 'Tema Warna', type: 'text', placeholder: 'monokai, dracula, github', defaultValue: 'dracula' }
    ],
    category: 'Maker',
    mockResponse: (inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: {
        theme: inputs.theme || 'dracula',
        imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800',
        width: 1200,
        height: 630,
        format: 'PNG'
      }
    })
  },
  {
    id: 'maker-ttp',
    name: 'TTP (Text To Picture) Generator',
    endpoint: 'https://api.azbry.com/api/maker/ttp',
    method: 'GET',
    description: 'Buat gambar berformat stiker PNG transparan dari baris teks.',
    inputs: [
      { name: 'text', label: 'Teks Gambar', type: 'text', placeholder: 'Tulis teks...', defaultValue: 'Danzz Premium' }
    ],
    category: 'Maker',
    mockResponse: (inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: {
        text: inputs.text || 'Danzz Premium',
        imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300',
        color: 'Cyan-Gradient',
        dimensions: '512x512'
      }
    })
  },
  {
    id: 'maker-tts',
    name: 'TTS (Text To Speech) Reader',
    endpoint: 'https://api.azbry.com/api/maker/tts',
    method: 'GET',
    description: 'Konversi teks tertulis menjadi file suara narator alami.',
    inputs: [
      { name: 'text', label: 'Teks Suara', type: 'text', placeholder: 'Tulis kalimat...', defaultValue: 'Halo kawan, terima kasih kepada Azzbry telah membuat apikey premium dan sederhana ini.' },
      { name: 'lang', label: 'Bahasa (id, en, jp)', type: 'text', placeholder: 'Contoh: id', defaultValue: 'id' }
    ],
    category: 'Maker',
    mockResponse: (inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: {
        text: inputs.text || 'Halo kawan, terima kasih kepada Azzbry.',
        language: inputs.lang || 'id',
        audioUrl: 'https://example.com/tts_generated_voice.mp3',
        fileSize: '412 KB',
        format: 'MP3'
      }
    })
  },
  // --- News ---
  {
    id: 'news-detik',
    name: 'Detik News Feed',
    endpoint: 'https://api.azbry.com/api/news/detik',
    method: 'GET',
    description: 'Dapatkan headlines berita terbaru dari Detik.com secara real-time.',
    inputs: [],
    category: 'News',
    mockResponse: {
      status: true,
      creator: 'Azzbry',
      result: [
        { title: 'Kolaborasi Akbar Web Tools Premium Danzz & Azzbry Gemparkan Dunia Dev', time: '10 menit yang lalu', link: 'https://news.detik.com/danzz-azzbry-collab' },
        { title: 'Tren Investasi Bitcoin & Grafik Menarik Bagi Kaum Gabut nan Santai', time: '1 jam yang lalu', link: 'https://news.detik.com/bitcoin-santai' }
      ]
    }
  },
  {
    id: 'news-kompas',
    name: 'Kompas TV News Feed',
    endpoint: 'https://api.azbry.com/api/news/kompas',
    method: 'GET',
    description: 'Kabar terkini dan video berita terhangat dari Kompas TV.',
    inputs: [],
    category: 'News',
    mockResponse: {
      status: true,
      creator: 'Azzbry',
      result: [
        { title: 'Inovasi Startup: Web Tools Interaktif dengan Keamanan Anti Salin API Key', time: '30 menit yang lalu', link: 'https://kompas.tv/tools-anti-salin' },
        { title: 'Indeks Pasar Finansial Digital Mengalami Kenaikan Signifikan', time: '2 jam yang lalu', link: 'https://kompas.tv/bitcoin-market' }
      ]
    }
  },
  {
    id: 'news-tribun',
    name: 'Tribun News Feed',
    endpoint: 'https://api.azbry.com/api/news/tribun',
    method: 'GET',
    description: 'Berita terpopuler regional dan nasional dari jaringan TribunNews.',
    inputs: [],
    category: 'News',
    mockResponse: {
      status: true,
      creator: 'Azzbry',
      result: [
        { title: 'Review Desain Web Responsif Terbaik: Sangat Nyaman Diakses di HP, Tablet, & Desktop!', time: '15 menit yang lalu', link: 'https://tribun.news/desain-responsif' },
        { title: 'Danzz Developer Buka Pendaftaran Akun Premium dan Toko Online Baru', time: '4 jam yang lalu', link: 'https://tribun.news/danzz-shop' }
      ]
    }
  },
  // --- Stalk ---
  {
    id: 'stalk-youtube',
    name: 'YouTube Channel Stalker',
    endpoint: 'https://api.azbry.com/api/stalk/youtube',
    method: 'GET',
    description: 'Stalking profil & statistik detail kanal YouTube berdasarkan username / handle.',
    inputs: [
      { name: 'username', label: 'Handle YouTube (@...)', type: 'text', placeholder: '@danzz_dev', defaultValue: '@danzz_dev' }
    ],
    category: 'Stalk',
    mockResponse: (inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: {
        name: 'Danzz Developer',
        handle: inputs.username || '@danzz_dev',
        subscribers: '1.2M',
        totalVideos: 420,
        views: '84M',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200',
        joined: '2021-08-10'
      }
    })
  },
  {
    id: 'stalk-roblox',
    name: 'Roblox Profile Stalker',
    endpoint: 'https://api.azbry.com/api/stalk/roblox',
    method: 'GET',
    description: 'Periksa statistik karakter, status keanggotaan, dan lencana Roblox user.',
    inputs: [
      { name: 'username', label: 'Username Roblox', type: 'text', placeholder: 'DanzzPro2026', defaultValue: 'DanzzPro2026' }
    ],
    category: 'Stalk',
    mockResponse: (inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: {
        username: inputs.username || 'DanzzPro2026',
        id: '208101198',
        displayName: 'Danzz_Akdan',
        status: 'Online playing Blox Fruits',
        avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200',
        robuxBalance: '15,000 Robux',
        badges: 24
      }
    })
  },
  {
    id: 'stalk-instagram',
    name: 'Instagram Profile Stalker',
    endpoint: 'https://api.azbry.com/api/stalk/instagram',
    method: 'GET',
    description: 'Dapatkan info detail akun Instagram publik beserta jumlah followers & foto profil HD.',
    inputs: [
      { name: 'username', label: 'Username Instagram', type: 'text', placeholder: 'danzz.akdan', defaultValue: 'danzz.akdan' }
    ],
    category: 'Stalk',
    mockResponse: (inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: {
        username: inputs.username || 'danzz.akdan',
        fullName: 'Akdan Danzz',
        bio: 'Developer | Tech Enthusiast | Collab with Azzbry',
        followers: '85.4K',
        following: 280,
        posts: 120,
        isPrivate: false,
        profilePicUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200'
      }
    })
  },
  {
    id: 'stalk-freefire',
    name: 'Free Fire Player Stalker',
    endpoint: 'https://api.azbry.com/api/stalk/freefire',
    method: 'GET',
    description: 'Temukan nickname, status guild, dan statistik rank dari player Free Fire (FF).',
    inputs: [
      { name: 'userId', label: 'ID Player Free Fire', type: 'text', placeholder: '981011880', defaultValue: '981011880' }
    ],
    category: 'Stalk',
    mockResponse: (inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: {
        id: inputs.userId || '981011880',
        nickname: 'Danzz•Akdan⁰⁸',
        level: 72,
        region: 'Indonesia',
        guild: 'AzzbryDanzzVip',
        rankPoint: '3,850 (Grandmaster)',
        kdRatio: '4.85'
      }
    })
  },
  {
    id: 'stalk-tiktok',
    name: 'TikTok User Stalker',
    endpoint: 'https://api.azbry.com/api/stalk/tiktok',
    method: 'GET',
    description: 'Dapatkan detail followers, likes, bio, dan video terpopuler dari kreator TikTok.',
    inputs: [
      { name: 'username', label: 'Username TikTok', type: 'text', placeholder: 'danzz_dev', defaultValue: 'danzz_dev' }
    ],
    category: 'Stalk',
    mockResponse: (inputs) => ({
      status: true,
      creator: 'Azzbry',
      result: {
        username: inputs.username || 'danzz_dev',
        nickname: 'Danzz Dev',
        followers: '250K',
        following: 120,
        likes: '3.4M',
        bio: 'Bikin codingan seru dan bermanfaat. Partner resmi @azzbry!',
        avatarUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200'
      }
    })
  }
];

export interface SocialProject {
  id: string;
  name: string;
  url: string;
  description: string;
  author: string;
  likes: number;
  comments: { user: string; text: string; date: string }[];
  likedBy: string[]; // List of usernames who liked this
  isVercelProject?: boolean;
}

export const PRESET_PROJECTS: SocialProject[] = [
  {
    id: 'danzz-smart-gadget',
    name: 'DANZZ Smart Gadget Music & Crypto',
    url: 'https://akdanzzxsmartgadget.vercel.app/',
    description: 'WEB MUSIC DAN BITCOIN GRAFIK YANG BAGUS KHUSUS BUAT ORANG SANTAI DAN GABUT',
    author: 'DANZZ',
    likes: 85,
    likedBy: [],
    comments: [
      { user: 'Azzbry', text: 'Keren abis grafik bitcoinnya! Bikin makin santai buat mantau market.', date: '2026-02-23' },
      { user: 'SobatGabut', text: 'Pas banget didengerin sambil santai sore, lagunya asik!', date: '2026-02-24' }
    ],
    isVercelProject: true
  },
  {
    id: 'omega-prime',
    name: 'Omega 54 Prime Vibe',
    url: 'https://oemga54prime.vercel.app/',
    description: 'WEB INI BAGUS BUAT MAIN DAN BAGUS BUAT ORANG YANG GADA KEPENTINGAN',
    author: 'OmegaDev',
    likes: 62,
    likedBy: [],
    comments: [
      { user: 'Danzz', text: 'Beneran cocok buat orang gabut wkwk. Gameplay simple tapi adiktif!', date: '2026-02-23' },
      { user: 'CoderJunior', text: 'Sangat menghibur di kala pusing coding!', date: '2026-02-24' }
    ],
    isVercelProject: true
  }
];
