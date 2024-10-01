import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Task40917 from '@/rlhf-tasks/40917/index'
const App = () => {
  const tasks = ['']

  return (
    <div className="flex justify-center items-center h-screen">
    
        <Task40917 />
      
    </div>
  )
}

export default App