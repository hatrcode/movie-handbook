export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bottom page-container">
        <p className="footer-brand">Movie Handbook</p>
        <p>
          &copy;{new Date().getFullYear()} Movie Handbook. Made by{" "}
          <a href="https://hannahwood.netlify.app/" target="_blank" rel="noopener noreferrer">
            Hannah Wood
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
