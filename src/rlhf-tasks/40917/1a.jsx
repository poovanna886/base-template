import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for periodic table elements
const elements = [
  { number: 1, name: "Hydrogen", symbol: "H", mass: 1.008, type: "Nonmetal" },
  { number: 2, name: "Helium", symbol: "He", mass: 4.0026, type: "Noble Gas" },
  // ... Add more elements here for a complete table
];

function ElementCard({ element }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="m-2 w-24 sm:w-32 cursor-pointer transition-transform transform hover:scale-105">
          <CardHeader className="p-2">
            <CardTitle className="text-sm sm:text-base text-center">{element.symbol}</CardTitle>
            <p className="text-xs sm:text-sm text-center text-muted-foreground">{element.name}</p>
          </CardHeader>
          <CardContent className="text-center p-1">
            <p className="text-xs">#{element.number}</p>
            <p className="text-xs">Mass: {element.mass}</p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{element.name} - {element.symbol}</DialogTitle>
        </DialogHeader>
        <div className="p-4 space-y-2">
          <p>Number: {element.number}</p>
          <p>Mass: {element.mass}</p>
          <p>Type: {element.type}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Response() {
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
      <Input 
        placeholder="Search for an element..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full sm:w-1/2"
      />
      <div className="flex flex-wrap justify-center">
        {displayElements.map((element, idx) => (
          <ElementCard key={idx} element={element} />
        ))}
      </div>
    </div>
  );
}