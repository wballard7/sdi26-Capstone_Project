import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/layout/Home';
import { Login } from './components/Login';
import { UserProfile } from './components/UserProfile';
import { Admin } from './components/Admin';
import { CreateAccount } from './components/CreateAccount';
import { DynamicEntries } from './components/DynamicEntries';
import { EditAddDynamicEntries } from './components/EditAddDynamicEntries';
import { EditAddStaticEntries } from './components/EditAddStaticEntries';
import { StaticEntries } from './components/StaticEntries';
import { ReportGeneration } from './components/ReportGeneration';
import './styles/App.css';
import { Layout } from './components/layout/Layout';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/md-dark-indigo/theme.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route
            path="/Home"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/UserProfile"
            element={
              <Layout>
                <UserProfile />
              </Layout>
            }
          />
          <Route
            path="/Admin"
            element={
              <Layout>
                <Admin />
              </Layout>
            }
          />
          <Route
            path="/CreateAccount"
            element={
              <Layout>
                <CreateAccount />
              </Layout>
            }
          />
          <Route
            path="/DynamicEntries"
            element={
              <Layout>
                <DynamicEntries />
              </Layout>
            }
          />
          <Route
            path="/EditAddDynamicEntries"
            element={
              <Layout>
                <EditAddDynamicEntries />
              </Layout>
            }
          />
          <Route
            path="/EditAddStaticEntries"
            element={
              <Layout>
                <EditAddStaticEntries />
              </Layout>
            }
          />
          <Route
            path="/StaticEntries"
            element={
              <Layout>
                <StaticEntries />
              </Layout>
            }
          />
          <Route
            path="/ReportGeneration"
            element={
              <Layout>
                <ReportGeneration />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
