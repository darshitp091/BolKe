import React from 'react';

const AnnouncementBar = () => {
  const text = "🎙 Abhi FREE mein try karo — koi coding nahi, koi English nahi ✦ Sirf bolne se ban jaayegi aapki dukan ki website ✦ Hindi, Marathi, Tamil, Gujarati — aapki boli mein kaam karta hai ✦ ";

  return (
    <div className="announcement-bar fixed top-0 left-0 w-full h-[36px] bg-accent-saffron text-white font-display text-[0.8rem] font-semibold tracking-wide overflow-hidden flex items-center z-[100]">
      <div className="marquee-track flex whitespace-nowrap animate-marquee gap-12">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
};

export default AnnouncementBar;
