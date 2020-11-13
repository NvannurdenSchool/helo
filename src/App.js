import './App.css';
import Nav from './Components/Nav/Nav'
import routes from './routes';

function App() {
  return (
    <div className="App">
      <Nav/>
      {routes}
    </div>
  );
}

export default App;