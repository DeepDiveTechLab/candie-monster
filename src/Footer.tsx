import { VIDEOS } from "./lib";
import { PingPongVideo } from "./PingPongVideo";
import { CandieLogo } from "./ui";

export function Footer() {
  return (
    <footer className="bg-black overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-[400px]">
        <div className="relative w-full md:w-1/2 h-[300px] md:h-auto overflow-hidden">
          <PingPongVideo
            src={VIDEOS.footer}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-between p-10 sm:p-16">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <CandieLogo size={18} className="text-white/70" />
              <span className="text-[15px] font-medium text-white/70 tracking-tight">
                candie.monster
              </span>
            </div>
            <p className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed max-w-sm">
              The next evolution of human-machine interaction. Built for those
              who refuse to be limited by biology alone.
            </p>
          </div>

          <p className="text-white/25 text-[12px] mt-12">
            © 2026 candie.monster. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
