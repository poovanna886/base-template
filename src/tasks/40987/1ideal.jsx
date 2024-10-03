import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

function IdealResponse() {
  const [words, setWords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newWord, setNewWord] = useState({ foreign: '', english: '', pronunciation: '' });

  // Load words from localStorage on component mount
  useEffect(() => {
    try {
      const storedWords = JSON.parse(localStorage.getItem('languageWords')) || [];
      setWords(storedWords);
    } catch (error) {
      console.error("Failed to load words from localStorage:", error);
      setWords([]);
    }
  }, []);

  // Save words to localStorage whenever words change
  useEffect(() => {
    try {
      if (words.length > 0) {
        localStorage.setItem('languageWords', JSON.stringify(words));
      }
    } catch (error) {
      console.error("Failed to save words to localStorage:", error);
    }
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
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-indigo-600">Language Learning Tracker</h1>

        {/* Search Bar */}
        <Input 
          type="text" 
          placeholder="Search English words..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="mb-6 p-3 text-lg border border-indigo-300 rounded-lg shadow-sm w-full"
        />

        {/* Add Word Button */}
        <Button onClick={() => setIsModalOpen(true)} className="mb-6 w-full sm:w-auto bg-indigo-500 text-white hover:bg-indigo-600">
          Add New Word
        </Button>

        {/* Word Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredWords.map(word => (
            <Card key={word.id} className="hover:shadow-xl transition-shadow border border-indigo-300 rounded-lg bg-white">
              <CardHeader className="bg-indigo-50 p-4">
                <CardTitle className="text-indigo-600 text-xl">{word.foreign}</CardTitle>
                <CardDescription className="text-gray-500 italic">{word.pronunciation}</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-lg font-medium text-gray-700">English: {word.english}</p>
              </CardContent>
              <CardFooter className="p-4 flex justify-end">
                <Button variant="destructive" onClick={() => handleDeleteWord(word.id)} className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Modal for adding new word */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[425px] bg-white shadow-xl rounded-lg p-6">
            <DialogHeader>
              <DialogTitle className="text-indigo-600 font-bold text-xl">Add New Word</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="foreign" className="text-gray-700">Foreign Word</Label>
                <Input 
                  id="foreign" 
                  value={newWord.foreign} 
                  onChange={(e) => setNewWord({...newWord, foreign: e.target.value})} 
                  className="border border-indigo-300 p-2 rounded-md"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="english" className="text-gray-700">English Translation</Label>
                <Input 
                  id="english" 
                  value={newWord.english} 
                  onChange={(e) => setNewWord({...newWord, english: e.target.value})} 
                  className="border border-indigo-300 p-2 rounded-md"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pronunciation" className="text-gray-700">Pronunciation</Label>
                <Input 
                  id="pronunciation" 
                  value={newWord.pronunciation} 
                  onChange={(e) => setNewWord({...newWord, pronunciation: e.target.value})} 
                  className="border border-indigo-300 p-2 rounded-md"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddWord} className="bg-indigo-500 text-white hover:bg-indigo-600">
                Add Word
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default IdealResponse;
