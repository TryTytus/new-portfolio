import { useRef, useEffect } from 'react';

export default function CyberMatrixBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas to full window size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();

        // Matrix characters - katakana + latin + numerals
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'.split('');

        const fontSize = 14;
        let columns = canvas.width / fontSize;

        // Array to store the vertical drops (y-coordinates) for each column
        let drops: number[] = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        // Draw function
        const draw = () => {
            // Translucent black background to create fading trail effect
            ctx.fillStyle = 'rgba(2, 6, 23, 0.05)'; // Using Tailwind's slate-950/900 colorish with opacity
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Green text
            ctx.fillStyle = '#22C55E'; // Tailwind's green-500
            ctx.font = `${fontSize}px "Space Grotesk", monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Random character
                const text = characters[Math.floor(Math.random() * characters.length)];

                // X coordinate = column * font size
                // Y coordinate = drops[i] * font size
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reset drop to top if it's off screen and randomly
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                // Move drop down
                drops[i]++;
            }
        };

        // Handle window resize
        window.addEventListener('resize', () => {
            resizeCanvas();
            columns = canvas.width / fontSize;
            drops = [];
            for (let x = 0; x < columns; x++) {
                drops[x] = 1;
            }
        });

        // Loop
        const interval = setInterval(draw, 33); // ~30fps

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 bg-background-dark pointer-events-none opacity-40"
        />
    );
}
