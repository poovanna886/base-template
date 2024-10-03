import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
//import { useLocalStorage } from './hooks/useLocalStorage';

function ModelB() {
  const [words, setWords] = useLocalStorage('languageWords', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const addWord = (newWord) => {
    setWords([...words, { ...newWord, id: Date.now() }]);
    setIsOpen(false);
  };

  const deleteWord = (id) => {
    setWords(words.filter(word => word.id !== id));
  };

  const filteredWords = words.filter(word => 
    word.english.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Input 
          placeholder="Search English words..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-sm"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Word</Button>
          </DialogTrigger>
          <DialogContent>
            <AddWordForm onAdd={addWord} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredWords.map((word) => (
          <Card key={word.id} className="shadow-lg">
            <CardHeader>
              <CardTitle>{word.word}</CardTitle>
              <CardDescription>Pronunciation: {word.pronunciation}</CardDescription>
            </CardHeader>
            <CardContent>
              <p><strong>English:</strong> {word.english}</p>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" onClick={() => deleteWord(word.id)}>Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AddWordForm({ onAdd }) {
  const [formData, setFormData] = useState({ word: '', english: '', pronunciation: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.word && formData.english) {
      onAdd(formData);
      setFormData({ word: '', english: '', pronunciation: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Add New Word</DialogTitle>
      </DialogHeader>
      <Input 
        type="text" 
        placeholder="Foreign Word" 
        value={formData.word}
        onChange={(e) => setFormData({...formData, word: e.target.value})}
        required 
      />
      <Input 
        type="text" 
        placeholder="English Translation" 
        value={formData.english}
        onChange={(e) => setFormData({...formData, english: e.target.value})}
        required 
        className="my-2"
      />
      <Input 
        type="text" 
        placeholder="Pronunciation" 
        value={formData.pronunciation}
        onChange={(e) => setFormData({...formData, pronunciation: e.target.value})}
      />
      <Button type="submit" className="mt-4">Add</Button>
    </form>
  );
}

// Custom hook for handling local storage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default ModelB;