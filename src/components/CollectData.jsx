import React from 'react'

const CollectData = ({ active = false, onClose }) => {
  if (!active) {
    return (
      <section className="relative w-full min-h-screen bg-[#0d1117] text-white flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Tell us about you</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
              <input id="name" type="text" className="w-full border-b border-gray-500 bg-transparent focus:outline-none focus:border-white py-2 transition-colors" />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
              <input id="email" type="email" className="w-full border-b border-gray-500 bg-transparent focus:outline-none focus:border-white py-2 transition-colors" />
            </div>
            <div>
              <button type="submit" className="w-full py-3 px-6 bg-[#1e242d] hover:bg-[#0d1117] rounded-xl shadow-md text-white font-semibold text-lg transition-transform transform hover:scale-95">Submit</button>
            </div>
          </form>
        </div>
      </section>
    )
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 fade-in-overlay'>
      <button
        type="button"
        onClick={() => onClose && onClose()}
        className="absolute top-5 right-5 z-20 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center border border-white/20"
        aria-label="Close"
      >
        ×
      </button>
      <div className="relative min-h-[60vh] w-full max-w-md mx-4 flex items-center justify-center bg-[#0d1117] text-white px-6 py-8 rounded-xl shadow-lg">
        <form className="w-full space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
            <input type="text" id="name" className="w-full border-b border-gray-500 bg-transparent focus:outline-none focus:border-white py-2 transition-colors" />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
            <input type="email" id="email" className="w-full border-b border-gray-500 bg-transparent focus:outline-none focus:border-white py-2 transition-colors" />
          </div>
          <div>
            <button type="submit" className="w-full py-3 px-6 bg-[#1e242d] hover:bg-[#0d1117] rounded-xl shadow-md text-white font-semibold text-lg transition-transform transform hover:scale-95">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CollectData;
