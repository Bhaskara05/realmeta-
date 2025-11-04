import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Upload, X, ArrowRight, Sparkles } from "lucide-react";

const ScannerWithJourney = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      setIsLoading(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
      }
    } catch (error) {
      alert("Camera access denied. Please allow camera permissions.");
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      setIsScanning(false);
    }
  };

  const analyzeImage = async (formData: FormData) => {
    try {
      setIsLoading(true);

      const res = await fetch("http://localhost:8000/search", {
        method: "POST",
        body: formData
      });

      setIsLoading(false);

      if (!res.ok) {
        alert("Server error while processing image.");
        return;
      }

      const data = await res.json();

      if (!data?.matches || data.matches.length === 0) {
        alert("No matching artwork found. Try again.");
        return;
      }

      setSearchResults(data.matches);
      setShowResults(true);

    } catch (error) {
      setIsLoading(false);
      alert("Failed to connect to the server. Ensure backend is running.");
    }
  };

  const captureImage = () => {
    try {
      if (!videoRef.current) {
        alert("Camera not ready.");
        return;
      }

      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const imageData = canvas.toDataURL("image/jpeg");
          setImage(imageData);
          stopCamera();

          const formData = new FormData();
          formData.append("file", blob, "capture.jpg");
          formData.append("top_k", "5");

          analyzeImage(formData);
        }
      }, "image/jpeg");

    } catch (error) {
      alert("Failed to capture image.");
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      alert("No file selected.");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("top_k", "5");

      analyzeImage(formData);

    } catch (error) {
      alert("Failed to upload image.");
    }
  };

  const resetScanner = () => {
    setImage(null);
    setSearchResults([]);
    setShowResults(false);
    setIsScanning(false);
    setIsLoading(false);
  };

  // Journey Page - Results Display
  if (showResults && searchResults.length > 0) {
    const [mainArtwork, ...recommended] = searchResults;

    return (
      <div className="min-h-screen pb-20 bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Matched Artworks</h1>
            <Button onClick={resetScanner} variant="outline">
              <Camera className="mr-2 h-4 w-4" />
              Scan Again
            </Button>
          </div>
        </div>

        {/* Scanned Image Preview */}
        {image && (
          <div className="max-w-screen-xl mx-auto px-4 py-8">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">Your scanned image:</p>
              <img 
                src={image} 
                alt="Scanned artwork" 
                className="w-48 h-48 object-cover rounded-lg shadow-lg mx-auto border-4 border-blue-500"
              />
            </div>
          </div>
        )}

        {/* Main Highlight */}
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <Card className="group relative overflow-hidden shadow-2xl rounded-3xl border border-[#d7c8a2]/40 bg-[#f5f0e6] transition-all duration-700">
            <div className="relative">
              <img
                src={`http://localhost:8000${mainArtwork.image_url}`}
                alt={mainArtwork.metadata?.title || "Artwork"}
                className="w-full h-[500px] object-cover rounded-3xl transform transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#2c1b0e]/70 via-[#4e3720]/40 to-transparent rounded-3xl transition-opacity duration-500 group-hover:opacity-80" />

              <div className="absolute bottom-10 left-10 text-[#fef7e3] space-y-3 max-w-md">
                <div className="flex items-center gap-2 text-[#f2cf77]">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-semibold tracking-wide">
                    Best Match • {(mainArtwork.score * 100).toFixed(1)}% similar
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                  {mainArtwork.metadata?.title || "Unknown Title"}
                </h2>
                {mainArtwork.metadata?.artist && (
                  <p className="text-sm md:text-base text-[#f3e9d2]">
                    by {mainArtwork.metadata.artist}
                  </p>
                )}
                {mainArtwork.metadata?.year && (
                  <p className="text-sm text-[#f3e9d2]">
                    {mainArtwork.metadata.year}
                  </p>
                )}
                <Button className="mt-3 bg-[#c5a25a] hover:bg-[#d4b060] text-black font-semibold shadow-md">
                  View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="absolute inset-0 rounded-3xl ring-2 ring-[#d7c8a2]/50 group-hover:ring-[#e2b76b] transition-all duration-700 pointer-events-none"></div>
          </Card>
        </div>

        {/* Other Matches */}
        {recommended.length > 0 && (
          <div className="max-w-screen-xl mx-auto px-4 py-8">
            <h3 className="text-3xl font-bold text-[#3e2b12] mb-8 text-center">
              Other Matches
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {recommended.map((art, i) => (
                <Card
                  key={art.id}
                  className="group relative overflow-hidden rounded-3xl bg-[#f5f0e6] border border-[#d7c8a2]/50 shadow-lg hover:shadow-xl transform hover:scale-[1.03] transition-all duration-500"
                >
                  <div className="relative">
                    <img
                      src={`http://localhost:8000${art.image_url}`}
                      alt={art.metadata?.title || "Artwork"}
                      className="w-full h-56 object-cover rounded-t-3xl group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {(art.score * 100).toFixed(1)}%
                    </div>
                  </div>

                  <div className="p-5 text-center">
                    <h4 className="text-xl font-semibold text-[#3e2b12] group-hover:text-[#c5a25a] transition-colors">
                      {art.metadata?.title || "Unknown"}
                    </h4>
                    {art.metadata?.artist && (
                      <p className="text-sm text-[#6b5b3e] mt-2">
                        {art.metadata.artist}
                      </p>
                    )}
                    <Button className="mt-4 bg-[#c5a25a] hover:bg-[#d4b060] text-black font-semibold shadow-md">
                      View <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  <div className="absolute inset-0 rounded-3xl ring-1 ring-[#d7c8a2]/40 group-hover:ring-[#e2b76b] transition-all duration-500 pointer-events-none"></div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Scanner Interface
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 relative bg-black">
        
        {/* Initial Screen */}
        {!isScanning && !image && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <div className="space-y-6">
              <div className="h-24 w-24 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center">
                <Camera className="h-12 w-12 text-blue-500" />
              </div>
              <h1 className="text-2xl font-bold text-white">Scan Artwork</h1>
              <p className="text-white/80 max-w-md">
                Point your camera at any artwork or upload an image to discover similar pieces
              </p>

              <div className="flex flex-col gap-3 pt-4">
                <Button onClick={startCamera} disabled={isLoading} size="lg" className="bg-blue-500 hover:bg-blue-600">
                  <Camera className="mr-2 h-5 w-5" />
                  Open Camera
                </Button>

                <label htmlFor="file-upload">
                  <Button variant="outline" size="lg" className="w-full" asChild disabled={isLoading}>
                    <span>
                      <Upload className="mr-2 h-5 w-5" />
                      Upload Image
                    </span>
                  </Button>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
          </div>
        )}

        {/* Camera Active */}
        {isScanning && (
          <div className="relative h-full">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="border-4 border-blue-500 w-64 h-64 rounded-lg animate-pulse" />
            </div>
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 px-4">
              <Button
                onClick={stopCamera}
                variant="outline"
                size="lg"
                className="bg-black/50 backdrop-blur-sm text-white border-white/30"
              >
                <X className="mr-2 h-5 w-5" />
                Cancel
              </Button>
              <Button onClick={captureImage} size="lg" className="bg-blue-500 hover:bg-blue-600">
                <Camera className="mr-2 h-5 w-5" />
                Capture
              </Button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
              <p className="text-white text-lg font-semibold">
                {image ? "Searching for matches..." : "Processing..."}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ScannerWithJourney;