import React from 'react';

const PlatformInAction: React.FC = () => {
  return (
    <section className="w-full bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl text-center">
        
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Platform in Action
          </h2>
          <p className="text-lg text-gray-600">
            See how SourcingXPress transforms the recruitment experience
          </p>
        </div>

        {/* Video Container */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black">
          {/* aspect-video is a Tailwind utility that enforces a 16:9 ratio.
            This ensures the video is responsive and never looks stretched.
          */}
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/HuHC6_u-5n4"
              title="SourcingXPress Demo V.3"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PlatformInAction;