import SocialLinks from "@/components/layout/SocialLinks";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bottom page-container">
        <div>
          <p className="footer-brand">Movie Handbook</p>
          <p>
            &copy;{new Date().getFullYear()} Movie Handbook. Made by
            <span>
              <a href="https://www.hatruong.dev/"> Ha Truong</a>{" "}
            </span>
          </p>
        </div>
        <SocialLinks styleClass="footer-links" />
      </div>
    </footer>
  );
}
