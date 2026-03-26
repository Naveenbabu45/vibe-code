import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-start justify-center p-4 md:p-8 lg:pl-24 relative overflow-hidden bg-black selection:bg-glitch-magenta selection:text-black">
      <div className="crt-overlay" />
      <div className="scanline" />
      
      <motion.header 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12 z-10"
      >
        <h1 
          className="text-4xl md:text-6xl font-pixel font-bold tracking-tighter mb-2 glitch-text text-glitch-cyan"
          data-text="SYSTEM_SNAKE"
        >
          SYSTEM_SNAKE
        </h1>
        <div className="h-2 w-48 bg-glitch-magenta shadow-[4px_4px_0px_#ffff00]" />
      </motion.header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="hidden lg:flex lg:col-span-3 flex-col gap-8"
        >
          <div className="bg-black border-4 border-glitch-magenta p-6 shadow-[8px_8px_0px_#00ffff]">
            <h3 className="text-glitch-yellow text-xs mb-4">PROTOCOL_INFO</h3>
            <ul className="text-glitch-cyan text-[10px] space-y-3 leading-relaxed">
              <li>{'>'} INPUT: ARROW_KEYS</li>
              <li>{'>'} TARGET: DATA_ORBS</li>
              <li>{'>'} AVOID: SELF_COLLISION</li>
            </ul>
          </div>
          
          <div className="bg-black border-4 border-glitch-cyan p-6 shadow-[8px_8px_0px_#ff00ff]">
            <h3 className="text-glitch-yellow text-xs mb-4">KERNEL_STATUS</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-glitch-magenta text-[10px]">LATENCY</span>
                <span className="text-glitch-cyan text-[10px]">ERR_NULL</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-glitch-magenta text-[10px]">UPTIME</span>
                <span className="text-glitch-cyan text-[10px]">INF_LOOP</span>
              </div>
              <div className="w-full bg-zinc-900 h-4 border-2 border-glitch-yellow">
                <div className="bg-glitch-magenta h-full w-[66%] animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-6 flex justify-start"
        >
          <SnakeGame />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-3 flex flex-col items-start gap-8"
        >
          <MusicPlayer />
          
          <div className="hidden lg:block">
            <p className="text-glitch-yellow text-[8px] leading-loose">
              BUILD_772058163289<br />
              AUTH: NAVEEN_78811<br />
              STATUS: UNSTABLE
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="mt-12 lg:hidden text-glitch-magenta text-[8px] tracking-widest">
        [!] CONNECTION_INTERRUPTED [!]
      </footer>
    </div>
  );
}
