import React from 'react'
import { createRoot } from 'react-dom/client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import M1 from '@/rlhf-tasks/40917/ModelA/Response';
import M2 from '@/rlhf-tasks/40917/ModelB/Response';
import IR from '@/rlhf-tasks/40917/IdealResponse/Response';
const index = () => {
  const openM1 = () => {
         // Open a new tab (not window) in Chrome
         const newTab = window.open('', '_blank'); // Use _blank to open in a new tab

         if (newTab) {
             // Set the title for the new tab
             newTab.document.title = 'New Tab with React Component';
 
             // Create a container div for the React component
             const div = newTab.document.createElement('div');
             div.id = 'new-tab-root';
             newTab.document.body.appendChild(div);
 
             // Render the React component in the new tab using createRoot
             const root = createRoot(div);
             root.render(<M1 />);
 
             // Clean up the component when the tab is closed
             newTab.onbeforeunload = () => {
                 root.unmount();
             };
 
             // Close document to signal the end of loading
             newTab.document.close();
         }
};

const openM2 = () => {
 // Open a new tab (not window) in Chrome
 const newTab = window.open('', '_blank'); // Use _blank to open in a new tab

 if (newTab) {
     // Set the title for the new tab
     newTab.document.title = 'New Tab with React Component';

     // Create a container div for the React component
     const div = newTab.document.createElement('div');
     div.id = 'new-tab-root';
     newTab.document.body.appendChild(div);

     // Render the React component in the new tab using createRoot
     const root = createRoot(div);
     root.render(<M2 />);

     // Clean up the component when the tab is closed
     newTab.onbeforeunload = () => {
         root.unmount();
     };

     // Close document to signal the end of loading
     newTab.document.close();
 }
};
const openIR = () => {
  // Open a new tab (not window) in Chrome
  const newTab = window.open('', '_blank'); // Use _blank to open in a new tab

  if (newTab) {
      // Set the title for the new tab
      newTab.document.title = 'New Tab with React Component';

      // Create a container div for the React component
      const div = newTab.document.createElement('div');
      div.id = 'new-tab-root';
      newTab.document.body.appendChild(div);

      // Render the React component in the new tab using createRoot
      const root = createRoot(div);
      root.render(<IR />);

      // Clean up the component when the tab is closed
      newTab.onbeforeunload = () => {
          root.unmount();
      };

      // Close document to signal the end of loading
      newTab.document.close();
  }
};

  return (
    <div className="flex justify-center items-center h-screen">
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>#40917</CardTitle>
        </CardHeader>
      <CardContent>
      <Button onClick={openM1} className="m-2">Model A</Button>
      <Button onClick={openM2} className="m-2">Model B</Button>
      <Button onClick={openIR} className="m-2">Ideal Response</Button>

      
      </CardContent>
    </Card>
  </div>
   )
}

export default index