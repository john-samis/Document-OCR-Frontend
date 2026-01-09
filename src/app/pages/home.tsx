import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { FileUp, Zap, Download, Shield, Check, AlertCircle, FileText } from "lucide-react";

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
              Convert scanned PDFs into editable Word docs
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              Powerful OCR technology transforms your scanned documents into fully editable DOCX files. Fast, accurate, and privacy-focused.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/convert">Upload PDF</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/convert?sample=true">View sample</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center shadow-xl">
              <FileText className="size-32 text-blue-600" />
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4">How it works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Three simple steps to convert your scanned PDFs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="relative overflow-hidden">
            <CardContent className="pt-12 pb-8 px-6">
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <FileUp className="size-12 text-blue-600 mb-6" />
              <h3 className="text-xl mb-3">Upload PDF</h3>
              <p className="text-gray-600">
                Drag and drop your scanned PDF file or browse to select it from your device.
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardContent className="pt-12 pb-8 px-6">
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xl">2</span>
              </div>
              <Zap className="size-12 text-blue-600 mb-6" />
              <h3 className="text-xl mb-3">OCR Processing</h3>
              <p className="text-gray-600">
                Our advanced OCR engine analyzes and extracts text while preserving formatting and layout.
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardContent className="pt-12 pb-8 px-6">
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xl">3</span>
              </div>
              <Download className="size-12 text-blue-600 mb-6" />
              <h3 className="text-xl mb-3">Download DOCX</h3>
              <p className="text-gray-600">
                Get your fully editable Word document ready to edit, share, or archive.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4">What you get</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enterprise-grade features without the complexity
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-8 pb-6 px-6">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <Check className="size-6 text-green-600" />
              </div>
              <h3 className="text-lg mb-2">Layout-friendly output</h3>
              <p className="text-sm text-gray-600">
                Preserves original document structure, formatting, and layout for accurate conversion.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-8 pb-6 px-6">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <Zap className="size-6 text-blue-600" />
              </div>
              <h3 className="text-lg mb-2">Fast processing</h3>
              <p className="text-sm text-gray-600">
                Most documents processed in under 30 seconds with our optimized OCR pipeline.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-8 pb-6 px-6">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <FileUp className="size-6 text-purple-600" />
              </div>
              <h3 className="text-lg mb-2">No account required</h3>
              <p className="text-sm text-gray-600">
                Start converting immediately without sign-up, registration, or personal information.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-8 pb-6 px-6">
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                <Shield className="size-6 text-orange-600" />
              </div>
              <h3 className="text-lg mb-2">Secure temporary storage</h3>
              <p className="text-sm text-gray-600">
                Files automatically deleted after processing for maximum privacy and security.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Privacy & Limitations */}
      <section id="privacy" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="border-2 border-gray-200">
          <CardContent className="pt-8 pb-8 px-8">
            <div className="flex items-start gap-4 mb-6">
              <AlertCircle className="size-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl mb-2">Privacy & limitations</h2>
                <p className="text-gray-600 mb-6">
                  Important information about how we handle your files and what to expect
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      <strong>Uploads expire:</strong> Files are automatically deleted 24 hours after upload
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      <strong>Scans work best:</strong> Optimized for printed or typed documents with clear text
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <AlertCircle className="size-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      <strong>Handwriting not guaranteed:</strong> OCR accuracy varies with handwritten content
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertCircle className="size-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      <strong>Large PDFs may take longer:</strong> Files over 50 pages require additional processing time
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-900">Terms</a>
            <a href="#" className="hover:text-gray-900">Privacy</a>
            <a href="#" className="hover:text-gray-900">GitHub</a>
            <a href="#" className="hover:text-gray-900">Contact</a>
          </div>
          <div className="text-center text-sm text-gray-500 mt-6">
            © 2026 PDF → DOCX OCR. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}