import { useState, useRef, useEffect } from "react";

export const Video: React.FC<{ second: number; src: string; elementKey?: string }> = ({ second, src, elementKey }) => {
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
            videoRef.current.play().catch(e => console.debug(e));
        }
    }, [isPlaying]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch(e => console.debug(e));
        }
    }, [src]);

    return (
        <video ref={videoRef} onEnded={handleVideoEnd} muted key={elementKey}>
            <source src={src} type="video/mp4" />
        </video>
    );
};
