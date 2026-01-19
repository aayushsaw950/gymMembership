import React from 'react'

const Hero = () => {
  return (
    <section className='relative min-h-screen'>
        {/* backgroundImage */}
        <div className='absolute inset-0 bg-cover bg-center' style={{ backgroundImage: "url('pexels-leonmart-1552249.jpg')" }}></div>
           {/* Overlay */}
           <div className="absolute inset-0 z-10 bg-black/50" />
           {/* content */}
           <div className="relative z-20 min-h-screen flex items-center">
                <div className="max-w-7xl mx-auto px-4 text-white text-left">
                
                <p className="uppercase tracking-widest text-sm text-gray-300">
                        Transform your body
                    </p>
                
                </div>
             </div>
        

    </section>
  )
}

export default Hero