import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer bg-slate-800 text-white mt-8 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Social Media Links */}
        <div className="social-icons flex space-x-4 mb-4 md:mb-0">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook className="text-2xl transition duration-300 hover:text-blue-500" />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram className="text-2xl transition duration-300 hover:text-pink-500" />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="text-2xl transition duration-300 hover:text-blue-600" />
          </a>
          <a
            href="https://www.twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter className="text-2xl transition duration-300 hover:text-blue-400" />
          </a>
        </div>
        {/* C */}
        <div className="copyright text-center md:text-right">
          <p> &copy; {new Date().getFullYear()} </p>
        </div>
      </div>
    </footer>
  );
}
