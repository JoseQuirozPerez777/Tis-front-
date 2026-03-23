import { AppRouter } from './core/router/AppRouter';
import { ToastProvider } from '@shared/context/ToastProvider';

function App() {
  return (
    <ToastProvider>
      <AppRouter />
    </ToastProvider>
  );
}

export default App;
