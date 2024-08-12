import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { Home } from './Home'
import { Login } from './Login'
import { UserProfile } from './UserProfile'
import { Admin } from './Admin'
import { CreateAccount } from './CreateAccount'
import './App.css';
import { Layout } from './Layout';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/md-dark-indigo/theme.css"


function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Home' element={<Layout><Home/></Layout>} />
        <Route path='/UserProfile' element={<Layout><UserProfile/></Layout>} />
        <Route path='/Admin' element={<Layout><Admin/></Layout>} />
        <Route path='/CreateAccount' element={<CreateAccount />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
