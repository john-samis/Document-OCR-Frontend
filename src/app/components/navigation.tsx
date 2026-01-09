import { Link, useLocation } from "react-router-dom";
import { FileText } from "lucide-react";
import { Button } from "./ui/button";

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <FileText className="size-6" />
            <span className="font-semibold text-lg">PDF → DOCX OCR</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900">
              How it works
            </a>
            <a href="#privacy" className="text-sm text-gray-600 hover:text-gray-900">
              Privacy
            </a>
          </div>

          <Button asChild>
            <Link to="/convert">Try it</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
