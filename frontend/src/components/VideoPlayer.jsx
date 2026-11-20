import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from 'lucide-react';

const VideoPlayer = ({
  src,
  title,
  subtitle,
  badge,
  autoPlay = false,
  loop = true,
  muted: initialMuted = true,
  className = '',
  aspectRatio = 'aspect-video',
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(initialMuted);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    }
  };

  const handleRestart = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden bg-black shadow-xl group border border-gray-200/20 ${className}`}>
      <div className={`relative ${aspectRatio} w-full overflow-hidden cursor-pointer`} onClick={togglePlay}>
        <video
          ref={videoRef}
          src={src}
          loop={loop}
          muted={isMuted}
          autoPlay={autoPlay}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => !loop && setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-cover"
        />

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--navy)]/80 text-white backdrop-blur-md border border-white/20 shadow-md">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              {badge}
            </span>
          </div>
        )}

        {/* Center Play/Pause Overlay Button */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${
            isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          }`}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="w-16 h-16 rounded-full bg-[var(--electric-blue)] hover:bg-blue-400 text-[var(--navy)] flex items-center justify-center shadow-xl transform transition-transform hover:scale-110 active:scale-95"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause size={28} className="fill-current" /> : <Play size={28} className="ml-1 fill-current" />}
          </button>
        </div>

        {/* Bottom Control Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 z-10 flex flex-col gap-2">
          {/* Progress bar */}
          <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[var(--electric-blue)] h-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="hover:text-[var(--electric-blue)] transition-colors p-1"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                className="hover:text-[var(--electric-blue)] transition-colors p-1"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <button
                type="button"
                onClick={handleRestart}
                className="hover:text-[var(--electric-blue)] transition-colors p-1"
                title="Restart"
              >
                <RotateCcw size={14} />
              </button>
              {(title || subtitle) && (
                <div className="hidden sm:block text-left">
                  {title && <p className="font-bold text-white text-xs truncate max-w-xs">{title}</p>}
                  {subtitle && <p className="text-[10px] text-gray-300 truncate max-w-xs">{subtitle}</p>}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleFullscreen}
                className="hover:text-[var(--electric-blue)] transition-colors p-1"
                title="Fullscreen"
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Card Content beneath the video */}
      {(title || subtitle) && (
        <div className="p-4 bg-white border-t border-gray-100">
          {title && <h4 className="font-bold text-[var(--navy)] text-base">{title}</h4>}
          {subtitle && <p className="text-gray-600 text-xs mt-1 leading-relaxed">{subtitle}</p>}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
