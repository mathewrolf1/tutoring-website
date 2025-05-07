import { useEffect } from "react";
import { useState } from "react";

export const LoadingScreen = ({ onComplete }) => {
    const [text, setText] = useState("");
    const fullText = "Find your perfect tutor today";

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setText(fullText.substring(0, index));
            index++;

            if (index > fullText.length) {
                clearInterval(interval);
                
                setTimeout(() => {
                    onComplete();
                }, 1000);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 bg-white text-black flex flex-col items-center justify-center">
            <div className="fixed top-50 text-2xl md:text-7xl mb-6 bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent leading-right">
                {text} <span className="animate-blink ml-1 text-orange-300"> | </span>
            </div>
            <img src="eled.png" alt="Eled Tutoring" className="fixed top-80 w-70 h-70 border-black border-2"/>
            <div className="w-[200px] h-[4px] bg-black rounded relative overflow-hidden">
                <div className="w-[40%] h-full bg-yellow-500 shadow-[0_0_15px_#3b82f6] animate-loading-bar">
                </div>
            </div>
        </div>
    );
};

