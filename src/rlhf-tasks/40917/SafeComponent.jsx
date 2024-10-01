import React, { useState, useEffect, Suspense } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SafeComponent from './SafeComponent';

// Lazy load the components
const LazyM1 = React.lazy(() => import('@/rlhf-tasks/40917/ModelA/Response'));
const LazyM2 = React.lazy(() => import('@/rlhf-tasks/40917/ModelB/Response'));
const LazyIR = React.lazy(() => import('@/rlhf-tasks/40917/IdealResponse/Response'));

const Index = () => {
  const [currentComponent, setCurrentComponent] = useState(null);

  useEffect(() => {
    // Listen to popstate event when the user navigates using back/forward buttons
    window.onpopstate = (event) => {
      if (event.state && event.state.component) {
        setCurrentComponent(event.state.component);
      }
    };
  }, []);

  const openComponent = (componentName, component) => {
    // Use pushState to update the URL and store the current component in history state
    window.history.pushState({ component: componentName }, '', `/${componentName}`);

    // Wrap the component in SafeComponent and Suspense to handle loading and errors
    setCurrentComponent(
      <SafeComponent>
        <Suspense fallback={<div>Loading...</div>}>
          {component}
        </Suspense>
      </SafeComponent>
    );
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>#40917</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => openComponent('model-a', <LazyM1 />)}
            className="m-2 hover:bg-blue-700"
          >
            Model A
          </Button>
          <Button
            onClick={() => openComponent('model-b', <LazyM2 />)}
            className="m-2 hover:bg-blue-700"
          >
            Model B
          </Button>
          <Button
            onClick={() => openComponent('ideal-response', <LazyIR />)}
            className="m-2 hover:bg-blue-700"
          >
            Ideal Response
          </Button>
        </CardContent>
      </Card>

      {/* Render the component wrapped in SafeComponent and Suspense */}
      <div className="component-container">
        {currentComponent}
      </div>
    </div>
  );
};

export default Index;
