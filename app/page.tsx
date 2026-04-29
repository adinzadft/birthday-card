'use client';
import { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';

export default function BirthdayPage() {
  // State untuk mengunci/membuka section (0: Hero, 1: Tebak, 2: Kejar, 3: Reward)
  const [stage, setStage] = useState(0);

  // Referensi untuk smooth scrolling
  const guessRef = useRef(null);
  const catchRef = useRef(null);
  const rewardRef = useRef(null);

  // Fungsi untuk scroll otomatis
  const scrollTo = (ref) => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const startValidasi = () => {
    setStage(1);
    scrollTo(guessRef);
  };

  return (
    <div className="bg-pink-50 min-h-screen font-sans text-slate-700 overflow-x-hidden selection:bg-rose-200">
      
      {/* SECTION 1: HERO BANNER */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-lg animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-900 mb-6">
            Selamat Ulang Tahun.
          </h1>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            Dulu aku pernah bilang mau ngasih ucapan pas kamu ultah, dan janji tetaplah janji. Semoga di usia yang baru ini, kamu selalu sehat, bahagia, dan semua hal baik selalu ngikutin kamu.
          </p>
          <button 
            onClick={startValidasi}
            className="bg-rose-400 hover:bg-rose-500 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Geser ke bawah ya 👇
          </button>
        </div>
      </section>

      {/* SECTION 2: TEBAK ANGKA */}
      {stage >= 1 && (
        <section ref={guessRef} className="min-h-screen flex flex-col items-center justify-center p-6 text-center border-t border-pink-100">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-pink-50 animate-fade-in">
            <h2 className="text-2xl font-semibold text-pink-800 mb-4">Ada Sedikit Kado</h2>
            <p className="text-slate-500 mb-8">
              Buat jajan. Tapi... main tebak-tebakan angka dulu ya (1-100). Coba tebak aku mikir angka berapa?
            </p>
            <NumberGuessing 
              onWin={() => {
                setStage(2);
                scrollTo(catchRef);
              }} 
            />
          </div>
        </section>
      )}

      {/* SECTION 3: KEJAR KADO */}
      {stage >= 2 && (
        <section ref={catchRef} className="min-h-screen flex flex-col items-center justify-center p-6 text-center border-t border-pink-100">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-pink-50 animate-fade-in">
            <h2 className="text-2xl font-semibold text-pink-800 mb-4">Wah, Beneran Ketebak!</h2>
            <p className="text-slate-500 mb-8">
              Oke, ini kadonya. Silakan diambil... kalau bisa tangkap ya! 🎁
            </p>
            <CatchTheGift 
              onWin={() => {
                setStage(3);
                scrollTo(rewardRef);
              }} 
            />
          </div>
        </section>
      )}

      {/* SECTION 4: REWARD */}
      {stage >= 3 && (
        <section ref={rewardRef} className="min-h-screen flex flex-col items-center justify-center p-6 text-center border-t border-pink-100 relative">
          <Confetti recycle={false} numberOfPieces={400} colors={['#fb7185', '#fda4af', '#fecdd3', '#cbd5e1']} />
          <div className="max-w-md w-full animate-fade-in-up">
            <div className="text-6xl mb-6 drop-shadow-md">🎉</div>
            <h2 className="text-3xl font-bold text-pink-900 mb-4">
              Akhirnya ketangkap juga!
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Gak seberapa, tapi semoga bisa bikin kamu senyum hari ini. Jangan lupa diklaim ya. Sekali lagi, selamat ulang tahun.
            </p>
            
            {/* Tombol Testing (Ganti tag button ke tag <a> kalau sudah mau di-deploy) */}
            <button 
              onClick={() => alert('Ini nanti diganti jadi link Dana Kaget ya!')}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-rose-200"
            >
              Buka Kado
            </button>
            
            {/* 
              CONTOH KODE ASLI UNTUK DANA KAGET (Hapus komentar saat deploy):
              <a 
                href="LINK_DANA_KAGET" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-rose-200"
              >
                Buka Kado
              </a> 
            */}
          </div>
        </section>
      )}
    </div>
  );
}

// --- KOMPONEN LOGIKA GAME ---

function NumberGuessing({ onWin }) {
  const [targetNumber, setTargetNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('Masukkan tebakanmu');
  const [won, setWon] = useState(false);

  useEffect(() => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
  }, []);

  const handleGuess = (e) => {
    e.preventDefault();
    if (won) return;

    const numGuess = parseInt(guess);
    if (isNaN(numGuess)) {
      setMessage('Harus angka ya.');
      return;
    }

    if (numGuess === targetNumber) {
      setMessage('Benar!');
      setWon(true);
      setTimeout(onWin, 800); // Jeda sedikit biar dia baca tulisan 'Benar!'
    } else if (numGuess < targetNumber) {
      setMessage('Masih kurang gede nih angkanya.');
    } else {
      setMessage('Kebesaran, coba turunin dikit.');
    }
    setGuess('');
  };

  return (
    <form onSubmit={handleGuess} className="flex flex-col gap-4">
      <div className="bg-pink-50 text-pink-700 px-4 py-3 rounded-xl text-sm font-medium">
        {message}
      </div>
      <div className="flex gap-2">
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          disabled={won}
          className="flex-1 border-2 border-pink-100 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-300 bg-slate-50 transition-colors"
          placeholder="..."
        />
        <button 
          type="submit"
          disabled={won}
          className="bg-pink-600 hover:bg-pink-700 disabled:bg-pink-300 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
        >
          Tebak
        </button>
      </div>
    </form>
  );
}

function CatchTheGift({ onWin }) {
  const [clicks, setClicks] = useState(0);
  const [position, setPosition] = useState({ top: '50%', left: '50%' });

  const moveButton = () => {
    if (clicks >= 10) {
      onWin();
      return;
    }
    const randomTop = Math.floor(Math.random() * 70) + 15; 
    const randomLeft = Math.floor(Math.random() * 70) + 15; 
    
    setPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
    setClicks((prev) => prev + 1);
  };

  return (
    <div className="relative w-full h-64 bg-slate-50 rounded-2xl border-2 border-dashed border-pink-200 overflow-hidden">
      <button
        onClick={moveButton}
        onMouseEnter={moveButton}
        style={{ top: position.top, left: position.left, transform: 'translate(-50%, -50%)', position: 'absolute' }}
        className="text-5xl transition-all duration-300 ease-out hover:scale-110 drop-shadow-sm"
      >
        🎁
      </button>
    </div>
  );
}