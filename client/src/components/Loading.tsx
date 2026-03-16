const Loading = () => {
  return (
    <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-white z-50">
      
      
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-teal-500 border-r-teal-400 border-b-transparent border-l-transparent animate-spin"></div>
        
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse"></div>
        </div>
      </div>

    
      <div className="mt-6 flex flex-col items-center gap-1">
        <p className="text-gray-800 font-semibold text-base tracking-wide">
          Please wait...
        </p>
        <p className="text-gray-400 text-sm">Loading your content</p>
      </div>

     
      <div className="flex gap-1.5 mt-4">
        <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
        <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
        <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
      </div>

    </div>
  );
};

export default Loading;