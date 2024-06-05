import React from 'react';

function MainPage() {
  return (
    <div className='h-auto md:h-[500px] w-screen bg-background-grey flex flex-col md:flex-row'>
      {/* left side */}
      <div className='flex flex-col justify-center items-start p-8 md:w-1/2'>
        <div className='text-sky-400 text-3xl md:text-4xl font-bold ml-0 md:ml-16'>
          <p>"Charge Easy - Simplify</p>
          <p>Your EV Charging Journey."</p>
        </div>

        <div className='text-white mt-6 md:mt-12 text-xl md:text-2xl ml-0 md:ml-20'>
          <p>"Find, Use & Pay for Charging</p>
          <p className='ml-0 md:ml-10'> Stations Effortlessly."</p>
        </div>
        <div className='mt-10 md:mt-16 flex flex-col md:flex-row ml-0 md:ml-20 space-y-4 md:space-y-0 md:space-x-4'>
          <button className='h-10 w-36 bg-green-500 rounded-xl text-white font-semibold transition-transform transform hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400'>
            Find Your Charger
          </button>
          <button className='h-10 w-36 bg-green-500 rounded-xl text-white font-semibold transition-transform transform hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400'>
            Sign In / Sign Up
          </button>
        </div>
      </div>
      
      {/* right side */}
      <div className='flex justify-center items-center md:w-1/2'>
        <img src="/mainImage.png" alt='Hero image' className='w-full h-3/4 object-cover'/>
      </div>
    </div>
  );
}

export default MainPage;
