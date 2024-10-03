import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

function ModelA() {
  const [words, setWords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newWord, setNewWord] = useState({ foreign: '', english: '', pronunciation: '' });

  useEffect(() => {
    const storedWords = JSON.parse(localStorage.getItem('languageWords') || '[]');
    setWords(storedWords);
  }, []);

  useEffect(() => {
    localStorage.setItem('languageWords', JSON.stringify(words));
  }, [words]);

  const handleAddWord = () => {
    if (newWord.foreign && newWord.english) {
      setWords([...words, { ...newWord, id: Date.now() }]);
      setNewWord({ foreign: '', english: '', pronunciation: '' });
      setIsModalOpen(false);
    }
  };

  const handleDeleteWord = (id) => {
    setWords(words.filter(word => word.id !== id));
  };

  const filteredWords = words.filter(word => 
    word.english.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Language Learning Tracker</h1>

        {/* Search Bar */}
        <Input 
          type="text" 
          placeholder="Search English words..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="mb-4 w-full"
        />

        {/* Add Word Button */}
        <Button onClick={() => setIsModalOpen(true)} className="mb-4 w-full sm:w-auto">
          Add New Word
        </Button>

        {/* Word Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredWords.map(word => (
            <Card key={word.id}>
              <CardHeader>
                <CardTitle>{word.foreign}</CardTitle>
                <CardDescription>{word.pronunciation}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>English: {word.english}</p>
              </CardContent>
              <CardFooter>
                <Button variant="destructive" onClick={() => handleDeleteWord(word.id)}>Delete</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Modal for adding new word */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Word</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="foreign">Foreign Word</Label>
                <Input 
                  id="foreign" 
                  value={newWord.foreign} 
                  onChange={(e) => setNewWord({...newWord, foreign: e.target.value})} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="english">English Translation</Label>
                <Input 
                  id="english" 
                  value={newWord.english} 
                  onChange={(e) => setNewWord({...newWord, english: e.target.value})} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pronunciation">Pronunciation</Label>
                <Input 
                  id="pronunciation" 
                  value={newWord.pronunciation} 
                  onChange={(e) => setNewWord({...newWord, pronunciation: e.target.value})} 
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddWord}>Add Word</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default ModelA;