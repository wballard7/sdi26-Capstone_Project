import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { Login } from './Login';
import { UserProfile } from './UserProfile';
import { Admin } from './Admin';
import { CreateAccount } from './CreateAccount';
import { DynamicEntries } from './DynamicEntries';
import { EditAddDynamicEntries } from './EditAddDynamicEntries';
import { EditAddStaticEntries } from './EditAddStaticEntries';
import { StaticEntries } from './StaticEntries';
import { ReportGeneration } from './ReportGeneration';
import './App.css';
import { Layout } from './Layout';
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
