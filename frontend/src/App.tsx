import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';

function App(): React.ReactElement {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          {/* Criar e modificar o componente da rota main */}
          <Route path="/main" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
