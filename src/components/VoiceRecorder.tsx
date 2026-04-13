import { useAuth } from '../context/AuthContext';
import { MOCK_SHOPS, generateMockFromText } from '../services/mockData';

interface VoiceRecorderProps {
  onComplete: (data: any) => void;
}

const VoiceRecorder = ({ onComplete }: VoiceRecorderProps) => {
  const { token } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [processingStep, setProcessingStep] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        processAudio(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setError(null);

      // --- HACKATHON WOW FACTOR: Real-time keyword detection ---
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'hi-IN'; // Support Hindi/English detection
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result: any) => result.transcript)
            .join('');
          
          // Seed the mock generator with what the user is actually saying!
          (window as any).lastTranscript = transcript;
        };
        recognition.start();
        (window as any).recognition = recognition;
      }
    } catch (err) {
      setError("Microphone access nahi mila. Please settings check karein.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      if ((window as any).recognition) (window as any).recognition.stop();
    }
  };

  const processAudio = async (blob: Blob) => {
    setIsProcessing(true);
    setProcessingStep(0);
    
    // Demo Mock Steps
    const steps = [
      "Awaaz pehchan raha hoon...",
      "Dukan ki details nikaal raha hoon...",
      "Premium design taiyar ho raha hai...",
      "WhatsApp integration set kar raha hoon...",
      "Aapki dukan online ho rahi hai!"
    ];

    for (let i = 0; i < steps.length; i++) {
      setProcessingStep(i);
      await new Promise(r => setTimeout(r, 1200));
    }

    // In prototype, we use the detect logic to pick a shop based on voice input
    // (In demo, the user can say "Clothing boutique" and it will show the right one)
    const transcript = (window as any).lastTranscript || "";
    const mockShop = generateMockFromText(transcript);
    
    setResult({
      success: true,
      slug: mockShop.slug,
      details: mockShop,
      url: `/s/${mockShop.slug}`
    });
    setIsProcessing(false);
  };

  const reset = () => {
    setAudioBlob(null);
    setResult(null);
    setError(null);
    setIsRecording(false);
    setIsProcessing(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-bg-surface/50 backdrop-blur-xl rounded-[2.5rem] border border-border-dark shadow-2xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-accent-saffron/5 pointer-events-none"></div>
      
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div 
            key="recorder"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-10 text-center"
          >
            <h3 className="text-2xl font-display font-black text-white mb-4">Abhi Boliye</h3>
            <p className="text-text-light/60 mb-10 font-bold">
              "Mera naam Ramesh hai. Meri mithai ki dukan hai Jaipur mein..."
            </p>

            <div className="relative flex items-center justify-center mb-12">
              {isRecording && (
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute w-32 h-32 bg-accent-saffron rounded-full"
                />
              )}
              
              <button 
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isProcessing}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-2xl relative z-10 ${
                  isRecording 
                    ? "bg-danger text-white hover:scale-95" 
                    : "bg-accent-saffron text-bg-base hover:scale-110 hover:bg-accent-gold"
                } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isProcessing ? (
                  <Loader2 className="animate-spin" size={40} />
                ) : isRecording ? (
                  <Square size={40} fill="currentColor" />
                ) : (
                  <Mic size={40} />
                )}
              </button>
            </div>

            {isRecording && (
              <div className="flex gap-1.5 justify-center mb-8">
                {[1, 2, 3, 4, 5].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ height: [8, 24, 8] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                    className="w-1.5 bg-accent-saffron rounded-full"
                  />
                ))}
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-danger font-bold justify-center mb-6 bg-danger/10 p-4 rounded-2xl border border-danger/20">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <p className="text-sm text-text-light/60 font-bold mb-2 h-6">
              {isProcessing && [
                "Awaaz pehchan raha hoon...",
                "Dukan ki details nikaal raha hoon...",
                "Premium design taiyar ho raha hai...",
                "WhatsApp integration set kar raha hoon...",
                "Aapki dukan online ho rahi hai!"
              ][processingStep]}
            </p>

            <p className="text-xs text-text-light/40 font-black uppercase tracking-widest">
              {isProcessing ? "AI Magic ho raha hai..." : isRecording ? "Sun raha hoon..." : "Button dabaiye aur boliye"}
            </p>
          </motion.div>
        ) : (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 text-center"
          >
            <div className="w-20 h-20 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-6 border border-success/30">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-3xl font-display font-black text-white mb-2">Website Ready!</h3>
            <p className="text-text-light/60 mb-8 font-bold">Aapki dukan online ho gayi hai.</p>
            
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 mb-8 text-left">
              <div className="text-xs font-black text-accent-saffron uppercase tracking-widest mb-2">Shop Details</div>
              <div className="text-white font-bold text-lg mb-1">{result.details.name}</div>
              <div className="text-text-light/60 text-sm">{result.details.category} • {result.details.location}</div>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-accent-haldi font-mono text-sm">{result.slug}.bolke.in</span>
                <a 
                  href={result.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-white hover:text-accent-saffron transition-colors"
                >
                  <ArrowRight size={20} />
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={reset}
                className="flex-1 py-4 rounded-2xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCcw size={18} />
                Phir se Boliye
              </button>
              <button 
                onClick={() => onComplete(result)}
                className="flex-1 py-4 rounded-2xl bg-accent-saffron text-bg-base font-black hover:bg-accent-gold transition-all shadow-xl shadow-accent-saffron/20"
              >
                Dashboard Jayein
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceRecorder;
