import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
//import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@/components/ui/modal";

const periodicTable = [
  { number: 1, name: "Hydrogen", symbol: "H", mass: 1.008, type: "Non-metal" },
  { number: 2, name: "Helium", symbol: "He", mass: 4.0026, type: "Noble Gas" },
  // Add more elements here or fetch from an API
];

function ElementCard({ element, onClick }) {
  return (
    <Card className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 cursor-pointer transition-transform transform hover:scale-105">
      <CardHeader className="p-2">
        <CardTitle>{element.name}</CardTitle>
        <p className="text-sm text-muted-foreground">#{element.number}</p>
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-3xl font-bold">{element.symbol}</div>
        <p>Mass: {element.mass}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onClick(element)}>View Details</Button>
      </CardFooter>
    </Card>
  );
}

function ElementModal({ element, onClose }) {
  return (
    <Modal open={!!element} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{element?.name}</ModalTitle>
          <ModalDescription>Detailed Information</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p><strong>Symbol:</strong> {element?.symbol}</p>
          <p><strong>Atomic Number:</strong> {element?.number}</p>
          <p><strong>Atomic Mass:</strong> {element?.mass}</p>
          <p><strong>Type:</strong> {element?.type}</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default function Response() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedElement, setSelectedElement] = useState(null);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Here you could fetch elements from an API if not hardcoded
    setElements(periodicTable);
  }, []);

  const filteredElements = elements.filter(element => 
    element.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <Input 
          placeholder="Search elements..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 w-full sm:w-1/2"
        />
        <div className="flex flex-wrap -m-2">
          {filteredElements.map(element => (
            <ElementCard key={element.number} element={element} onClick={setSelectedElement} />
          ))}
        </div>
      </div>
      <ElementModal element={selectedElement} onClose={() => setSelectedElement(null)} />
    </div>
  );
}