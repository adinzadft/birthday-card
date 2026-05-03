'use client';
import { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';

export default function BirthdayPage() {
  // Stage: 0(Hero), 1(WordSearch), 2(Tebak), 3(KejarKado), 4(Reward)
  const [stage, setStage] = useState<number>(0);

  const wordRef = useRef<HTMLElement | null>(null);
  const guessRef = useRef<HTMLElement | null>(null);
  const catchRef = useRef<HTMLElement | null>(null);
  const rewardRef = useRef<HTMLElement | null>(null);

  // 1. TAMBAHKAN REF UNTUK AUDIO DI SINI
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const startValidasi = () => {
    setStage(1);
    scrollTo(wordRef);

    // 2. TAMBAHKAN PERINTAH PLAY AUDIO DI SINI
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.log("Audio ditahan browser:", err));
    }
  };

  return (
    <div className="bg-pink-50 min-h-screen font-sans text-slate-700 overflow-x-hidden selection:bg-rose-200">

      {/* 3. TAMBAHKAN TAG AUDIO DI DALAM DIV UTAMA */}
      <audio ref={audioRef} src="/bgm.mp3" loop />
      
      {/* SECTION 1: HERO BANNER */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-lg animate-fade-in-up flex flex-col items-center">
          <img 
            src="https://i.pinimg.com/originals/5b/0b/e7/5b0be74b4a170c804adff57682adc0af.gif" 
            alt="Cute Cat" 
            className="w-32 h-32 mb-6 animate-float"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-400">
            Selamat Ulang Tahun.
          </h1>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed text-center">
            Hari ini ulang tahunmu kan, seingetku dulu aku pernah ngomong bakal ngucapin ultah ke kamu. Jadi ini ya, semoga kamu diberi kemudahan dalam hal apapun :)
          </p>
          <button 
            onClick={startValidasi}
            className="bg-rose-400 hover:bg-rose-500 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 animate-bounce mt-4"
          >
            Geser ke bawah ya 👇
          </button>
        </div>
      </section>

      {/* SECTION 2: CARI KATA (TAHAP 1) */}
      {stage >= 1 && (
        <section ref={wordRef} className="min-h-screen flex flex-col items-center justify-center p-6 text-center border-t border-pink-100">
          <div className="max-w-md w-full bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pink-50 animate-fade-in justify-center items-center flex flex-col">
            <img 
            src="https://i.pinimg.com/originals/2e/3d/d2/2e3dd24f01e6e6930c85d6bd58c50cd4.gif" 
            alt="Cute Cat" 
            className="w-32 h-32 mb-6 animate-float"
          />
            <p className="text-slate-500 mb-6">
              Nanti ada kado di akhir tapi harus ngelewatin challenge dulu ya. HAVE FUN !!!<br></br> Coba cari kata <strong>HAPPY</strong>, <strong>BIRTHDAY</strong>, dan <strong>REFI</strong> di bawah ini dulu ya. Tap hurufnya!
            </p>
            <WordSearch 
              onWin={() => {
                setStage(2);
                scrollTo(guessRef);
              }} 
            />
          </div>
        </section>
      )}

      {/* SECTION 3: TEBAK ANGKA (TAHAP 2) */}
      {stage >= 2 && (
        <section ref={guessRef} className="min-h-screen flex flex-col items-center justify-center p-6 text-center border-t border-pink-100">
          <div className="max-w-md w-full bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pink-50 animate-fade-in justify-center items-center flex flex-col">
            <img 
            src="https://i.pinimg.com/originals/f8/a2/c6/f8a2c66d3ef1dc18f490cc63eb448970.gif" 
            alt="Cute Cat" 
            className="w-32 h-32 mb-6 animate-float"
          />
            <p className="text-slate-500 mb-8">
              Umur kamu sekarang udah 19 kan ya(seingetku, maaf kalo salah hehe). kalo gitu, coba tebak angka antara <b>1 sampai 19</b>. 
            </p>
            <NumberGuessing 
              onWin={() => {
                setStage(3);
                scrollTo(catchRef);
              }} 
            />
          </div>
        </section>
      )}

      {/* SECTION 4: KEJAR KADO (TAHAP 3) */}
      {stage >= 3 && (
        <section ref={catchRef} className="min-h-screen flex flex-col items-center justify-center p-6 text-center border-t border-pink-100">
          <div className="max-w-md w-full bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-pink-50 animate-fade-in justify-center items-center flex flex-col">
            <img 
            src="https://i.pinimg.com/originals/06/f2/34/06f234e2a9755034727503b797d57130.gif" 
            alt="Cute Cat" 
            className="w-32 h-32 mb-6 animate-float"
          />
          
            <p className="text-slate-500 mb-6">
              Keren ketebak lagi. Oke, ini kadonya. <b>Tangkap yang benerr !!!</b> 🎁
            </p>
            <CatchTheGift 
              onWin={() => {
                setStage(4);
                scrollTo(rewardRef);
              }} 
            />
          </div>
        </section>
      )}

      {/* SECTION 5: REWARD */}
      {stage >= 4 && (
        <section ref={rewardRef} className="min-h-screen flex flex-col items-center justify-center p-6 text-center border-t border-pink-100 relative">
          <Confetti recycle={false} numberOfPieces={400} colors={['#fb7185', '#fda4af', '#fecdd3', '#cbd5e1']} />
          <div className="max-w-md w-full animate-fade-in-up flex flex-col items-center">
            <img 
              src="https://i.pinimg.com/originals/5d/ca/ac/5dcaac4f881e17f521eccc0f700d65d6.gif" 
              alt="Cheering Cat" 
              className="w-32 h-32 mb-4 animate-float"
            />
            <h2 className="text-3xl font-bold text-pink-900 mb-4">
              Hehe, kali ini beneran.
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Gak seberapa sih, tapi semoga suka. Sekali lagi, Happy Birthday. Jangan lupa buka hadiahnya ya.
            </p>

            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              GOOD LUCK FOR EVERYTHING YOU DO, AND MAY ALL YOUR WISHES COME TRUE.
            </p>
            
            <a 
              href="https://www.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-rose-200 text-center"
            >
              Buka Kado
            </a> 
          </div>
        </section>
      )}
    </div>
  );
}

// --- KOMPONEN LOGIKA GAME ---

function WordSearch({ onWin }: { onWin: () => void }) {
  const [grid, setGrid] = useState<string[][]>([]);
  const [validCoords, setValidCoords] = useState<string[]>([]);
  const [found, setFound] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string | null>(null);

  // Algoritma untuk mengacak posisi kata saat komponen dimuat (refresh)
  useEffect(() => {
    const size = 8;
    // Buat grid kosong 8x8
    const newGrid = Array(size).fill(null).map(() => Array(size).fill(''));
    const newValidCoords: string[] = [];
    const words = ["HAPPY", "BIRTHDAY", "REFI"];

    // Fungsi cek apakah kata bisa ditaruh tanpa nabrak batas atau nabrak huruf beda
    const canPlace = (word: string, r: number, c: number, dir: string) => {
      if (dir === 'H' && c + word.length > size) return false;
      if (dir === 'V' && r + word.length > size) return false;
      
      for (let i = 0; i < word.length; i++) {
        const currR = dir === 'V' ? r + i : r;
        const currC = dir === 'H' ? c + i : c;
        if (newGrid[currR][currC] !== '' && newGrid[currR][currC] !== word[i]) {
          return false;
        }
      }
      return true;
    };

    // Proses peletakan setiap kata secara acak
    words.forEach(word => {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 100) {
        // Random arah: H (Horizontal/Mendatar) atau V (Vertical/Menurun)
        const dir = Math.random() < 0.5 ? 'H' : 'V';
        const r = Math.floor(Math.random() * size);
        const c = Math.floor(Math.random() * size);

        if (canPlace(word, r, c, dir)) {
          for (let i = 0; i < word.length; i++) {
            const currR = dir === 'V' ? r + i : r;
            const currC = dir === 'H' ? c + i : c;
            newGrid[currR][currC] = word[i];
            
            const coord = `${currR}-${currC}`;
            if (!newValidCoords.includes(coord)) {
              newValidCoords.push(coord);
            }
          }
          placed = true;
        }
        attempts++;
      }
    });

    // Isi sisa grid yang masih kosong dengan huruf acak
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (newGrid[r][c] === '') {
          newGrid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
      }
    }

    setGrid(newGrid);
    setValidCoords(newValidCoords);
  }, []);

  const handleTap = (r: number, c: number) => {
    const key = `${r}-${c}`;
    if (validCoords.includes(key)) {
      if (!found.includes(key)) {
        const newFound = [...found, key];
        setFound(newFound);
        if (newFound.length === validCoords.length) {
          setTimeout(onWin, 800);
        }
      }
    } else {
      setWrong(key);
      setTimeout(() => setWrong(null), 300);
    }
  };

  // Mencegah error render sebelum grid selesai dibuat
  if (grid.length === 0) return <div className="text-pink-400 font-medium">Menyusun huruf...</div>;

  return (
    <div className="flex flex-col items-center w-full animate-fade-in">
      <div className="grid grid-cols-8 gap-1 sm:gap-2 w-full max-w-[320px] bg-slate-50 p-2 rounded-xl border-2 border-pink-100">
        {grid.map((row, r) => row.map((letter, c) => {
          const key = `${r}-${c}`;
          const isFound = found.includes(key);
          const isWrong = wrong === key;
          return (
            <button
              key={key}
              onClick={() => handleTap(r, c)}
              className={`aspect-square flex items-center justify-center rounded-md text-sm sm:text-lg font-bold transition-all duration-200
                ${isFound ? 'bg-pink-500 text-white scale-105 shadow-md' : 
                  isWrong ? 'bg-red-400 text-white' : 
                  'bg-white text-slate-600 border border-slate-200 active:scale-95'}`}
            >
              {letter}
            </button>
          );
        }))}
      </div>
      <div className="text-xs font-bold mt-6 bg-pink-100 text-pink-700 px-4 py-2 rounded-full">
        Ketemu: {found.length} / {validCoords.length} huruf
      </div>
    </div>
  );
}

function NumberGuessing({ onWin }: { onWin: () => void }) {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('Berapa angkanya?');
  const [won, setWon] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0); 

  useEffect(() => {
    const min = Math.ceil(1);
    const max = Math.floor(19);
    const nilai_rand = Math.floor(Math.random() * (max - min + 1) + min);
    setTargetNumber(nilai_rand);
  }, []);

  const handleGuess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (won) return;
    const numGuess = parseInt(guess);
    if (isNaN(numGuess)) return;
    setAttempts((prev) => prev + 1);
    if (numGuess === targetNumber) {
      setMessage('Benar!');
      setWon(true);
      setTimeout(onWin, 800);
    } else if (numGuess > 19) {
      setMessage('kurang dari 19 ya angkanya');
    } else if (numGuess < targetNumber) {
      setMessage('Kurang gede dikit...');
    } else {
      setMessage('Kegedean, turunin!');
    }
    setGuess('');
  };

  return (
    <form onSubmit={handleGuess} className="flex flex-col gap-4 w-full">
      <div className="bg-pink-50 text-pink-700 px-4 py-3 rounded-xl text-sm font-medium w-full text-center">
        {message}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          disabled={won}
          className="w-full sm:flex-1 border-2 border-pink-100 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-300 bg-slate-50 transition-colors text-center text-lg"
          placeholder="..."
        />
        <button 
          type="submit"
          disabled={won}
          className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 disabled:bg-pink-300 text-white font-semibold py-3 px-8 rounded-xl transition-colors shadow-sm"
        >
          Tebak
        </button>
      </div>
      <div className="text-xs text-slate-400 font-medium text-center">
        Jumlah tebakan: {attempts}
      </div>
    </form>
  );
}

function CatchTheGift({ onWin }: { onWin: () => void }) {
  const [clicks, setClicks] = useState<number>(0);
  const [position, setPosition] = useState({ top: '50%', left: '50%' });
  const MAX_CLICKS = 10;

  const moveButton = () => {
    if (clicks >= MAX_CLICKS - 1) {
      onWin();
      return;
    }
    const randomTop = Math.floor(Math.random() * 70) + 15; 
    const randomLeft = Math.floor(Math.random() * 70) + 15; 
    setPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
    setClicks((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center w-full">
      
      <div className="relative w-full h-64 bg-slate-50 rounded-2xl border-2 border-dashed border-pink-200 overflow-hidden">
        <button
          type="button"
          onClick={moveButton}
          onMouseEnter={moveButton}
          style={{ top: position.top, left: position.left, transform: 'translate(-50%, -50%)', position: 'absolute' }}
          className="text-5xl transition-all duration-300 ease-out hover:scale-110 drop-shadow-sm"
        >
          🎁
        </button>
      </div>
    </div>
  );
}