
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="container max-w-lg">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <div className="relative mx-auto w-24 h-24">
              <motion.div 
                className="absolute inset-0 bg-primary opacity-20 rounded-full"
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
              <div className="relative flex items-center justify-center w-full h-full">
                <span className="text-6xl font-bold text-primary">404</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>
          
          <p className="text-muted-foreground mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          
          <Link to="/">
            <Button className="mx-auto" size="lg">
              <Home className="mr-2 h-4 w-4" /> Return to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
