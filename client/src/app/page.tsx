"use client";
import styles from "./page.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormEvent, useState } from 'react';

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [claudeResponse, setClaudeResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch("http://localhost:3001/api/claude", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      setClaudeResponse(data.response);
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API :", error);
      setError("Erreur lors de la communication avec le serveur.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className="mb-4">
        {isLoading && <p>Chargement en cours...</p>}
        {error && <p className="text-danger">{error}</p>}
        {claudeResponse && (
          <div className="border p-3 rounded">
            <p>Réponse de Claude : {claudeResponse}</p>
          </div>
        )}
      </div>

      <footer className={styles.footer}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-8">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Que voulez-vous dire ?" 
                value={userInput} 
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div className="col-4">
              <button 
                type="submit" 
                className="btn btn-primary w-100"
                disabled={isLoading || !userInput.trim()}
              >
                {isLoading ? 'Envoi...' : 'Envoyer'}
              </button>
            </div>
          </div>
        </form>
      </footer>
    </div>
  );
}