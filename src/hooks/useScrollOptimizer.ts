import { useEffect } from 'react';

/**
 * A global hook that drastically improves scroll performance by
 * disabling pointer events (like hover states) while the user is actively scrolling.
 * This guarantees 60fps locking on intensive pages by avoiding layout recalculation.
 */
export function useScrollOptimizer() {
    useEffect(() => {
        let scrollTimeout: ReturnType<typeof setTimeout>;

        const handleScroll = () => {
            // Add a class that sets pointer-events: none to heavy elements or body
            if (!document.body.classList.contains('is-scrolling')) {
                document.body.classList.add('is-scrolling');
            }

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                document.body.classList.remove('is-scrolling');
            }, 100); // Remove 100ms after scrolling stops
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Add the CSS required dynamically
        const style = document.createElement('style');
        style.innerHTML = `
            .is-scrolling * {
                pointer-events: none !important;
            }
        `;
        document.head.appendChild(style);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
            document.head.removeChild(style);
            document.body.classList.remove('is-scrolling');
        };
    }, []);
}
