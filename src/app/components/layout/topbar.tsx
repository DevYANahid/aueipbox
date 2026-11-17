
import { Headphones, MapPin, MessageCircle } from "lucide-react";

export default function Topbar() {
  return (
    <div className="bg-[#080d20] border-b border-white/10 text-white">
      <div className="max-w-[1440px] mx-auto px-5 py-2 flex flex-wrap justify-between items-center gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-5">
          <span className="flex items-center gap-2">
            <MapPin size={14} className="text-purple-400" />
            UAE
          </span>
          <span className="text-white/30">|</span>
          <span>Premium IPTV Solutions</span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="hidden sm:inline">25,000+ Live TV Channels</span>
        </div>

        <div className="flex items-center gap-5">
          <span className="flex items-center gap-2">
            <Headphones size={15} />
            24/7 Support
          </span>
          <a
            href="https://wa.me/0971566323742"
            className="flex items-center gap-2 text-green-400"
          >
            <MessageCircle size={15} />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
