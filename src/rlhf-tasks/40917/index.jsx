import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {Button} from '@/components/ui/button'
import M1 from '@/rlhf-tasks/40917/1a.jsx';
import M2 from '@/rlhf-tasks/40917/1b.jsx';
import Mideal from '@/rlhf-tasks/40917/1Ideal.jsx';

function Layout() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl mb-8 font-bold">Welcome to the Homepage</h1>
      <div className="space-y-4">
        <Link to="/M1">
          <Button className="hover:bg-blue-600">
            Model A
          </Button>
        </Link>
        <Link to="/M2">
          <Button className="hover:bg-blue-600">
            Model B
          </Button>
        </Link>
        <Link to="/Mideal">
          <Button className="hover:bg-blue-600">
            Ideal Response
          </Button>
        </Link>
      </div>
    </div>
  );
}

function Index() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-center">
        {/* Always render Layout, and below it display the active component */}
        <Layout />
        <div className="mt-8">
          <Routes>
            <Route path="/M1" element={<M1 />} />
            <Route path="/M2" element={<M2 />} />
            <Route path="/Mideal" element={<Mideal />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default Index;
