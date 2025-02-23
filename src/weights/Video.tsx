import { useState, useRef, useEffect } from "react";

export const Video: React.FC<{ second: number; src: string; keey?: string }> = ({ second, src, keey }) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleVideoEnd = () => {
        setIsPlaying(false);
        setTimeout(() => {
            setIsPlaying(true);
        }, second * 1000);
    };

    useEffect(() => {
        if (isPlaying && videoRef.current) {
            videoRef.current.play().catch((error) => {
                console.log("Autoplay error, ", error);
            });
        }
    }, [isPlaying]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch((error) => {
                console.log("Autoplay error, ", error);
            });
        }
    }, [src]);

    return (
        <video ref={videoRef} onEnded={handleVideoEnd} muted key={keey}>
            <source src={src} type="video/mp4" />
        </video>
    );
};
