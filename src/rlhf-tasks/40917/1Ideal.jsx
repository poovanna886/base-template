import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for periodic table elements
const elements = [
    {
      number: 1,
      name: 'Hydrogen',
      symbol: 'H',
      mass: 1.00794,
      type: 'unknown'
    },
    {
      number: 2,
      name: 'Helium',
      symbol: 'He',
      mass: 4.002602,
      type: 'noble'
    },
    // More elements...
];


function ElementCard({ element }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="m-2 w-28 sm:w-36 lg:w-40 cursor-pointer transition-transform transform hover:scale-105 shadow-lg rounded-lg hover:shadow-xl border border-gray-200">
          <CardHeader className="p-2 bg-gray-100 rounded-t-lg">
            <CardTitle className="text-sm sm:text-base lg:text-lg text-center text-gray-800">{element.symbol}</CardTitle>
            <p className="text-xs sm:text-sm text-center text-gray-600">{element.name}</p>
          </CardHeader>
          <CardContent className="text-center p-2">
            <p className="text-xs sm:text-sm lg:text-base">#{element.number}</p>
            <p className="text-xs sm:text-sm lg:text-base">Mass: {element.mass}</p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-lg p-6 bg-white rounded-lg shadow-2xl transition-all transform duration-300 ease-in-out scale-100 border border-gray-300">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle className="text-2xl font-bold text-gray-900">{element.name} <span className="text-xl text-gray-500">({element.symbol})</span></DialogTitle>
        </DialogHeader>
        <div className="p-4 space-y-4 text-lg text-gray-700">
          <p className="flex items-center">
            <strong className="w-24">Number:</strong> 
            <span>{element.number}</span>
          </p>
          <p className="flex items-center">
            <strong className="w-24">Mass:</strong> 
            <span>{element.mass}</span>
          </p>
          <p className="flex items-center">
            <strong className="w-24">Type:</strong> 
            <span className="capitalize">{element.type.replace(/-/g, ' ')}</span>
          </p>
        </div>
        <div className="flex justify-end mt-6">
          <button 
            onClick={() => setIsOpen(false)} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function PeriodicTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayElements, setDisplayElements] = useState(elements);

  useEffect(() => {
    const results = elements.filter(element => 
      element.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayElements(results);
  }, [searchTerm]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Periodic Table</h1>
      <Input 
        placeholder="Search for an element..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full sm:w-1/2 mx-auto p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-center">
        {displayElements.map((element, idx) => (
          <ElementCard key={idx} element={element} />
        ))}
      </div>
    </div>
  );
}
