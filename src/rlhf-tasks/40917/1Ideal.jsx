import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
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
  {
    number: 3,
    name: 'Lithium',
    symbol: 'Li',
    mass: 6.941,
    type: 'alkali-metal'
  },
  {
    number: 4,
    name: 'Beryllium',
    symbol: 'Be',
    mass: 9.012182,
    type: 'alkaline-earth-metal'
  },
  {
    number: 5,
    name: 'Boron',
    symbol: 'B',
    mass: 10.811,
    type: 'other-non-metal'
  },
  {
    number: 6,
    name: 'Carbon',
    symbol: 'C',
    mass: 12.0107,
    type: 'other-non-metal'
  },
  {
    number: 7,
    name: 'Nitrogen',
    symbol: 'N',
    mass: 14.0067,
    type: 'other-non-metal'
  },
  {
    number: 8,
    name: 'Oxygen',
    symbol: 'O',
    mass: 15.9994,
    type: 'other-non-metal'
  },
  {
    number: 9,
    name: 'Flourine',
    symbol: 'F',
    mass: 18.9984032,
    type: 'other-non-metal'
  },
  {
    number: 10,
    name: 'Neon',
    symbol: 'Ne',
    mass: 20.1797,
    type: 'noble'
  },
  {
    number: 11,
    name: 'Sodium',
    symbol: 'Na',
    mass: 22.98976928,
    type: 'alkali-metal'
  },
  {
    number: 12,
    name: 'Magnesium',
    symbol: 'Mg',
    mass: 24.3050,
    type: 'alkaline-earth-metal'
  },
  {
    number: 13,
    name: 'Aluminium',
    symbol: 'Al',
    mass: 26.9815386,
    type: 'poor-metal'
  },
  {
    number: 14,
    name: 'Silicon',
    symbol: 'Si',
    mass: 28.0855,
    type: 'other-non-metal'
  },
  {
    number: 15,
    name: 'Phosphorus',
    symbol: 'P',
    mass: 30.973762,
    type: 'other-non-metal'
  },
  {
    number: 16,
    name: 'Sulfur',
    symbol: 'S',
    mass: 32.065,
    type: 'other-non-metal'
  },
  {
    number: 17,
    name: 'Chlorine',
    symbol: 'Cl',
    mass: 35.453,
    type: 'other-non-metal'
  },
  {
    number: 18,
    name: 'Argon',
    symbol: 'Ar',
    mass: 39.948,
    type: 'noble'
  },
  {
    number: 19,
    name: 'Potassium',
    symbol: 'K',
    mass: 39.0983,
    type: 'alkali-metal'
  },
  {
    number: 20,
    name: 'Calcium',
    symbol: 'Ca',
    mass: 40.078,
    type: 'alkaline-earth-metal'
  },
  {
    number: 21,
    name: 'Scandium',
    symbol: 'Sc',
    mass: 44.955912,
    type: 'transition-metal'
  },
  {
    number: 22,
    name: 'Titanium',
    symbol: 'Ti',
    mass: 47.867,
    type: 'transition-metal'
  },
  {
    number: 23,
    name: 'Vanadium',
    symbol: 'V',
    mass: 50.9415,
    type: 'transition-metal'
  },
  {
    number: 24,
    name: 'Chromium',
    symbol: 'Cr',
    mass: 51.9961,
    type: 'transition-metal'
  },
  {
    number: 25,
    name: 'Manganese',
    symbol: 'Mn',
    mass: 54.938045,
    type: 'transition-metal'
  },
];;

function ElementCard({ element }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="m-2 w-28 sm:w-36 lg:w-40 cursor-pointer transition-transform transform hover:scale-105 shadow-lg rounded-lg hover:shadow-xl border border-gray-200 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
          <CardHeader className="p-2 rounded-t-lg">
            <CardTitle className="text-sm sm:text-base lg:text-lg text-center font-semibold">{element.symbol}</CardTitle>
            <p className="text-xs sm:text-sm text-center">{element.name}</p>
          </CardHeader>
          <CardContent className="text-center p-2">
            <p className="text-xs sm:text-sm lg:text-base">#{element.number}</p>
            <p className="text-xs sm:text-sm lg:text-base">Mass: {element.mass}</p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-lg p-6 bg-white rounded-lg shadow-2xl transition-all transform duration-300 ease-in-out scale-100 border border-gray-300">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle className="text-2xl font-bold text-indigo-700">{element.name} <span className="text-xl text-gray-500">({element.symbol})</span></DialogTitle>
        </DialogHeader>
        <div id="element-description" className="text-gray-600 mt-2">
          Detailed information about {element.name}.
        </div>
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
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
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
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-6">Periodic Table</h1>
      <Input 
        placeholder="Search for an element..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full sm:w-3/4 lg:w-1/2 mx-auto p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-center">
        {displayElements.map((element, idx) => (
          <ElementCard key={idx} element={element} />
        ))}
      </div>
    </div>
  );
}
