
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Facebook, Github, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white font-bold">
                C
              </div>
              <span className="font-display font-bold text-xl">YuktiiCare</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Creating opportunities and community support for those who need it most.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter size={18} />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <Instagram size={18} />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Facebook">
                <Facebook size={18} />
              </Button>
              <Button variant="ghost" size="icon" aria-label="GitHub">
                <Github size={18} />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "Jobs", "Housing", "Events", "Donate", "About"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-6">Resources</h3>
            <ul className="space-y-3">
              {[
                { name: "Accessibility Guide", url: "/accessibility" },
                { name: "Partner Network", url: "/partners" },
                { name: "Support Center", url: "/support" },
                { name: "Privacy Policy", url: "/privacy" },
                { name: "Terms of Service", url: "/terms" }
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.url}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-6">Stay Connected</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for updates on events and opportunities.
            </p>
            <div className="flex space-x-2">
              <Input placeholder="Your email" className="bg-background" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} YuktiiCare. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground flex items-center transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Documentation</span>
              <ExternalLink size={14} className="ml-1" />
            </a>
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground flex items-center transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Contribute</span>
              <ExternalLink size={14} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
