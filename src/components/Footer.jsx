import './Footer.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {year} Dev Quiz Platform</p>
        <p>
          Made by <span className="footer-author">Mr. Siev E</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer
