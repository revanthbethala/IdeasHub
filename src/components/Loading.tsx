
function Loading() {
  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="flex justify-center space-x-2 mb-4">
            <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0s]"></span>
            <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0.5s]"></span>
            <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0.7s]"></span>
          </div>
          <h2 className="text-lg font-semibold text-gray-700">
            Loading, please wait...
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Loading;
