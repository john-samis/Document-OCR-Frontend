import { useState, useCallback } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle, Download, Settings as SettingsIcon, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../components/ui/collapsible";
import { Alert, AlertDescription } from "../components/ui/alert";

type ConversionStatus = "idle" | "uploading" | "processing" | "ready" | "error";

interface ConversionState {
  status: ConversionStatus;
  progress: number;
  fileName?: string;
  fileSize?: string;
  error?: string;
  processingStep?: string;
}

export function ConvertPage() {
  const [state, setState] = useState<ConversionState>({
    status: "idle",
    progress: 0,
  });
  const [settings, setSettings] = useState({
    quality: "balanced",
    language: "auto",
    preserveLayout: true,
    confirmRights: false,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && files[0].type === "application/pdf") {
      processFile(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, []);

  const processFile = async (file: File) => {
    const fileSizeKB = (file.size / 1024).toFixed(2);
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    const fileSize = file.size > 1024 * 1024 ? `${fileSizeMB} MB` : `${fileSizeKB} KB`;

    // Uploading phase
    setState({
      status: "uploading",
      progress: 0,
      fileName: file.name,
      fileSize,
    });

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setState((prev) => ({ ...prev, progress: i }));
    }

    // Processing phase
    setState((prev) => ({
      ...prev,
      status: "processing",
      progress: 0,
      processingStep: "Analyzing document structure...",
    }));

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setState((prev) => ({ ...prev, progress: 30, processingStep: "Running OCR on pages..." }));

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setState((prev) => ({ ...prev, progress: 60, processingStep: "Preserving layout and formatting..." }));

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setState((prev) => ({ ...prev, progress: 85, processingStep: "Generating DOCX file..." }));

    await new Promise((resolve) => setTimeout(resolve, 800));
    setState((prev) => ({ ...prev, progress: 100 }));

    // Ready phase
    setState((prev) => ({
      ...prev,
      status: "ready",
      progress: 100,
    }));
  };

  const handleDownload = () => {
    // Mock download
    const blob = new Blob(["Mock DOCX content"], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = state.fileName?.replace(".pdf", ".docx") || "converted.docx";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRetry = () => {
    setState({
      status: "idle",
      progress: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl mb-3">Convert PDF to DOCX</h1>
          <p className="text-gray-600">
            Upload your scanned PDF and get an editable Word document
          </p>
        </div>

        <div className="space-y-6">
          {/* Upload Card */}
          <Card>
            <CardHeader>
              <CardTitle>Upload your PDF</CardTitle>
              <CardDescription>
                Drag and drop your file or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  isDragging
                    ? "border-blue-500 bg-blue-50"
                    : state.status === "idle"
                    ? "border-gray-300 hover:border-gray-400"
                    : "border-gray-200 bg-gray-50"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                  disabled={state.status !== "idle"}
                />
                <label
                  htmlFor="file-upload"
                  className={`cursor-pointer ${state.status !== "idle" ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <Upload className="size-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg mb-2">Drop PDF here or browse</p>
                  <p className="text-sm text-gray-500">
                    Accepted formats: PDF • Max size: 50 MB
                  </p>
                </label>
              </div>

              {state.status !== "idle" && state.fileName && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-start gap-3">
                  <FileText className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{state.fileName}</p>
                    <p className="text-sm text-gray-500">{state.fileSize}</p>
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-start gap-2">
                <Checkbox
                  id="rights"
                  checked={settings.confirmRights}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({ ...prev, confirmRights: checked as boolean }))
                  }
                />
                <Label htmlFor="rights" className="text-sm leading-relaxed">
                  I confirm I have rights to this document and agree to processing
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Settings Card */}
          <Card>
            <Collapsible open={settingsOpen} onOpenChange={setSettingsOpen}>
              <CardHeader>
                <CollapsibleTrigger className="flex items-center justify-between w-full group">
                  <div className="flex items-center gap-2">
                    <SettingsIcon className="size-5" />
                    <CardTitle>Settings</CardTitle>
                  </div>
                  <span className="text-sm text-gray-500">
                    {settingsOpen ? "Hide" : "Show"} options
                  </span>
                </CollapsibleTrigger>
              </CardHeader>
              <CollapsibleContent>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="quality">Output quality</Label>
                    <Select
                      value={settings.quality}
                      onValueChange={(value) => setSettings((prev) => ({ ...prev, quality: value }))}
                    >
                      <SelectTrigger id="quality">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fast">Fast (lower accuracy)</SelectItem>
                        <SelectItem value="balanced">Balanced (recommended)</SelectItem>
                        <SelectItem value="best">Best (slower, most accurate)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Document language</Label>
                    <Select
                      value={settings.language}
                      onValueChange={(value) => setSettings((prev) => ({ ...prev, language: value }))}
                    >
                      <SelectTrigger id="language">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto-detect</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="layout"
                      checked={settings.preserveLayout}
                      onCheckedChange={(checked) =>
                        setSettings((prev) => ({ ...prev, preserveLayout: checked as boolean }))
                      }
                    />
                    <div>
                      <Label htmlFor="layout" className="leading-relaxed">
                        Preserve layout (experimental)
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">
                        Attempts to maintain original document formatting
                      </p>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Action Button */}
          {state.status === "idle" && (
            <Button
              size="lg"
              className="w-full"
              disabled={!settings.confirmRights || state.status !== "idle"}
            >
              Start conversion
            </Button>
          )}

          {/* Status Card */}
          {state.status !== "idle" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {state.status === "uploading" && (
                    <>
                      <Loader2 className="size-5 animate-spin text-blue-600" />
                      Uploading...
                    </>
                  )}
                  {state.status === "processing" && (
                    <>
                      <Loader2 className="size-5 animate-spin text-blue-600" />
                      Processing OCR
                    </>
                  )}
                  {state.status === "ready" && (
                    <>
                      <CheckCircle2 className="size-5 text-green-600" />
                      Ready to download
                    </>
                  )}
                  {state.status === "error" && (
                    <>
                      <AlertCircle className="size-5 text-red-600" />
                      Conversion failed
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(state.status === "uploading" || state.status === "processing") && (
                  <>
                    <Progress value={state.progress} className="w-full" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>
                        {state.status === "processing" && state.processingStep
                          ? state.processingStep
                          : "Uploading file..."}
                      </span>
                      <span>{state.progress}%</span>
                    </div>
                  </>
                )}

                {state.status === "ready" && (
                  <div className="space-y-4">
                    <Alert>
                      <CheckCircle2 className="size-4" />
                      <AlertDescription>
                        Your document has been successfully converted! File details: {state.fileName?.replace(".pdf", ".docx")}
                      </AlertDescription>
                    </Alert>
                    <Button size="lg" className="w-full" onClick={handleDownload}>
                      <Download className="size-5 mr-2" />
                      Download .docx
                    </Button>
                  </div>
                )}

                {state.status === "error" && (
                  <div className="space-y-4">
                    <Alert variant="destructive">
                      <AlertCircle className="size-4" />
                      <AlertDescription>
                        {state.error || "An error occurred during conversion. Please try again."}
                      </AlertDescription>
                    </Alert>
                    <Button size="lg" variant="outline" className="w-full" onClick={handleRetry}>
                      Try again
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Privacy Note */}
          <div className="text-center text-sm text-gray-500 pt-4">
            <p>
              🔒 Files are processed temporarily and automatically deleted after 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
