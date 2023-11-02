import { Profile } from './Components/Profile';
import { Navbar } from './Components/Navbar';
import { TableUser } from './Components/users/TableUser'
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <div className='nav-scroller py-1 mb-3 border-bottom'>
          <Navbar></Navbar>
        </div>
      </div>
      <main className='container'>
        <div className="p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary">
          <div className='row'>
            <Profile/>
            <TableUser/>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
