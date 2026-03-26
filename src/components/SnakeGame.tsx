import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const SPEED = 150;

export const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Check if food is on snake body
      const onSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!onSnake) break;
    }
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood({ x: 5, y: 5 });
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
  };

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check collision with self
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          setIsPaused(p => !p);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (!gameOver && !isPaused) {
      gameLoopRef.current = setInterval(moveSnake, SPEED);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [moveSnake, gameOver, isPaused]);

  return (
    <div className="flex flex-col items-start gap-6">
      <div className="flex justify-between w-full max-w-[400px] px-0">
        <div className="text-glitch-cyan font-pixel text-[10px] glitch-text" data-text={`DATA: ${score}`}>
          DATA: {score}
        </div>
        <button 
          onClick={() => setIsPaused(!isPaused)}
          className="text-glitch-magenta font-pixel text-[10px] hover:bg-glitch-magenta hover:text-black p-1"
        >
          {isPaused ? '[RESUME]' : '[HALT]'}
        </button>
      </div>

      <div 
        className="relative bg-black border-4 border-glitch-cyan shadow-[12px_12px_0px_#ff00ff]"
        style={{ 
          width: GRID_SIZE * 20, 
          height: GRID_SIZE * 20,
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
        }}
      >
        {/* Snake */}
        {snake.map((segment, i) => (
          <div 
            key={i}
            className={`absolute ${i === 0 ? 'bg-glitch-cyan z-10' : 'bg-glitch-cyan/40'}`}
            style={{
              width: 20,
              height: 20,
              left: segment.x * 20,
              top: segment.y * 20,
              boxShadow: i === 0 ? '0 0 10px #00ffff' : 'none',
              border: '1px solid black'
            }}
          />
        ))}

        {/* Food */}
        <div 
          className="absolute bg-glitch-magenta animate-ping"
          style={{
            width: 20,
            height: 20,
            left: food.x * 20,
            top: food.y * 20,
            boxShadow: '0 0 20px #ff00ff'
          }}
        />

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-20">
            <h2 className="text-glitch-magenta font-pixel text-xl mb-4 glitch-text" data-text="FATAL_ERROR">FATAL_ERROR</h2>
            <p className="text-glitch-yellow text-[8px] mb-6">CORE_DUMP: {score}</p>
            <button 
              onClick={resetGame}
              className="px-6 py-2 bg-glitch-cyan text-black font-pixel text-[10px] hover:bg-glitch-yellow transition-colors"
            >
              REBOOT
            </button>
          </div>
        )}

        {/* Start/Pause Overlay */}
        {isPaused && !gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20">
            <button 
              onClick={() => setIsPaused(false)}
              className="px-6 py-2 border-4 border-glitch-magenta text-glitch-magenta font-pixel text-[10px] hover:bg-glitch-magenta hover:text-black transition-all"
            >
              {score === 0 ? 'INIT_SEQUENCE' : 'RESUME_PROCESS'}
            </button>
            <p className="text-glitch-yellow text-[6px] mt-4 uppercase tracking-widest">AWAITING_INPUT...</p>
          </div>
        )}
      </div>
    </div>
  );
};
