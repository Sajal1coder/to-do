import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';

import LoginPage from './pages/login';
import RegisterPage from './pages/Register';
import Todo from './pages/Todo';
import { AuthProvider ,ProtectedRoute,PublicRoute} from './context/AuthContext';
function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<PublicRoute><LoginPage/></PublicRoute>}/>
          <Route path='/Register' element={<PublicRoute><RegisterPage/></PublicRoute>}/>
          <Route path='/todo' element={<ProtectedRoute><Todo/></ProtectedRoute>}/>
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
      </Router>
      </AuthProvider>
     
    </div>
  );
}

export default App;
