export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bottom page-container">
        <p className="footer-brand">Movie Handbook</p>
        <p>&copy;{new Date().getFullYear()} Movie Handbook. Made by Hannah Wood.</p>
      </div>
    </footer>
  );
}
