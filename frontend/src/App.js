import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Contacts from './components/Contacts';
import Messages from './components/Messages';
import Compose from './components/Compose';
import Import from './components/Import';

function App() {
  //Three routes based on functions - contacts, messages, import  under parent route navigation bar
  return (
   <>
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/message" element={<Messages />} />
        <Route path="/message/:id" element={<Compose />} />
        <Route path="/import" element={<Import />} />
      </Route>
    </Routes>
   </>
  );
}

export default App;
