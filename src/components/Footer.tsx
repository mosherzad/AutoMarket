import Link from "next/link";
import { FaFacebook, FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-10">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-white">AutoMarket</h2>
            <p className="mt-4 text-sm leading-relaxed">
              A modern marketplace to buy and sell cars easily, securely, and
              with confidence.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-red-500 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/explore?pageNumber=1"
                  className="hover:text-red-500 transition"
                >
                  Exolore Cars
                </Link>
              </li>
              <li></li>
              <li>
                <Link href="/" className="hover:text-red-500 transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-red-500 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-red-500 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-red-500 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-red-500 transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/mohamad.goran.165?mibextid=wwXIfr&rdid=jqnOGXwI8tG7e339&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CgUtQfEHH%2F%3Fmibextid%3DwwXIfr#"
                className="hover:text-red-500 transition"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/mohammedsherzad11/?igsh=bXJxMWd0MnRpYmdm&utm_source=qr#"
                className="hover:text-red-500 transition"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://wa.me/9647511242885"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500 transition"
              >
                <FaWhatsapp size={20} />
              </a>
              <a
                href="https://github.com/mosherzad"
                className="hover:text-red-500 transition"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="my-10 h-px bg-slate-700" />
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
          <p>© {new Date().getFullYear()} AutoMarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
