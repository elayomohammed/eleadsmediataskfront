import Login from './resources/components/Login';
import UsersDetailForm from './resources/components/UsersDetailForm';
import './App.css';
import AuthLogout from './resources/components/AuthLogout';

function App() {
  return (
    <div className="App">
      <Login />
      <AuthLogout />
      <UsersDetailForm />
    </div>
  );
}

export default App;
