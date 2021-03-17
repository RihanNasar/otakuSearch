import ResponsiveDrawer from './components/Page'
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import ScrollToTop from './hooks/ScrollToTop'
import { GlobalProvider } from "./context/GlobalState";
function App() {
  return (
    <GlobalProvider>
      <Router>
        <ScrollToTop>
          <div >

            <ResponsiveDrawer />
          </div>
        </ScrollToTop>
      </Router>
    </GlobalProvider>
  );
}

export default App;
