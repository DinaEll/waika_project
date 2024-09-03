import { BrowserRouterProvider } from './providers/router';
import { Layout } from '@/widgets/Layout';

function App() {
  return (
    <BrowserRouterProvider>
      <Layout />
    </BrowserRouterProvider>
  );
}

export default App;
