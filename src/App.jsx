import  { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from 'virtual:generated-pages-react';

const App = () => {
  const routing = useRoutes(routes);

  return (
    <div>
      <Suspense fallback={<div role="status" style={{ padding: 24 }}>Loading…</div>}>
        {routing}
      </Suspense>
    </div>
  );
};

export default App;
