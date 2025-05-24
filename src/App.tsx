import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

// Home component
function Home() {
  return (
    <div className="max-w-md mx-auto p-4 min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h1 className="text-2xl font-bold text-primary-500 mb-4">WHS App</h1>
        <p className="text-gray-600 mb-4">
          Welcome to the Workplace Health and Safety app.
        </p>
        <div className="space-y-2">
          <div className="text-sm text-gray-500">test</div>
        </div>
        
        {/* test colours */}
        <div className="mt-6 space-y-2">
          <div className="bg-primary-500 text-white p-2 rounded text-center"> test</div>
          <div className="bg-danger-500 text-white p-2 rounded text-center"> test</div>
          <div className="bg-warning-500 text-white p-2 rounded text-center"> test</div>
          <div className="bg-success-500 text-white p-2 rounded text-center"> test</div>
        </div>
      </div>
    </div>
  );
}

export default App;