import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigate = useNavigate();
  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    await signInWithEmailAndPassword(auth, email, password);

    // redirection directe vers dashboard
   navigate("/dashboard");

  } catch (error) {
    alert("Erreur : " + error.message);
  }
};

  return (
    <div className="login-page">

      <form className="login-form" onSubmit={handleLogin}>

        <h1>Rodappli</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Connexion
        </button>

      </form>

    </div>
  );
}