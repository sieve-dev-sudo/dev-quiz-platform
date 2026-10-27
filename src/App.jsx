function App() {
  return (
    <main className="app">
      <div>
        <h1>Dev Quiz Platform</h1>
        <p className="text-muted">Test your coding knowledge, fully offline.</p>
      </div>

      <div className="card preview-card">
        <div className="preview-row">
          <span className="badge">JavaScript</span>
          <span className="badge badge-success">Easy</span>
          <span className="badge badge-warning">Medium</span>
          <span className="badge badge-error">Hard</span>
        </div>

        <h3>What does this code log?</h3>

        <pre>
          <code>{`console.log(typeof null);`}</code>
        </pre>

        <p className="text-muted">
          Hint: <code>typeof</code> has a famous bug.
        </p>

        <div className="preview-row">
          <button className="btn btn-primary">Start Quiz</button>
          <button className="btn btn-outline">View History</button>
        </div>
      </div>
    </main>
  )
}

export default App
