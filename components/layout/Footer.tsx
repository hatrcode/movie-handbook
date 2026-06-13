import SocialLinks from "@/components/layout/SocialLinks";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bottom">
        <SocialLinks styleClass="footer-links" />
        <p>
          &copy;{new Date().getFullYear()} Movie Handbook. Made by
          <span>
            <a href="https://www.hatruong.dev/"> Ha Truong</a>{" "}
          </span>
        </p>
      </div>
    </footer>
  );
}
