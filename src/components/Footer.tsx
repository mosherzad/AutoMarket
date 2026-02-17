"use client";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { FaFacebook, FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const t = useTranslations("footer");
  return (
    <footer className="bg-slate-900 text-slate-300 mt-10">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-white">AutoMarket</h2>
            <p className="mt-4 text-sm leading-relaxed">
              {t("brandDescription")}
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t("explore")}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-red-500 transition">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/explore?pageNumber=1"
                  className="hover:text-red-500 transition"
                >
                  {t("exploreCars")}
                </Link>
              </li>
              <li></li>
              <li>
                <Link href="/" className="hover:text-red-500 transition">
                  {t("faq")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t("company")}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-red-500 transition">
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-red-500 transition">
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-red-500 transition">
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-red-500 transition">
                  {t("termsOfService")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t("followUs")}</h3>
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
          <p>
            © {new Date().getFullYear()} {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
