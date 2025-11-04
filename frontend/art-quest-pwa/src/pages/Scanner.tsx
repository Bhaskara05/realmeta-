import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Scanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
      }
    } catch (error) {
      toast.error("Camera access denied. Please allow camera permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      setIsScanning(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL("image/jpeg");
      setImage(imageData);
      stopCamera();

      toast.success("Artwork recognized!");
      setTimeout(() => {
        navigate("/journey"); // ✅ redirect to Journey page
      }, 1500);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        toast.success("Image uploaded! Analyzing...");
        setTimeout(() => {
          navigate("/journey"); // ✅ redirect to Journey page after upload
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 via-white to-amber-100">
      <div className="flex-1 relative">
        {!isScanning && !image && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <div className="space-y-6 animate-fade-in-up">
              <div className="h-24 w-24 mx-auto rounded-full bg-amber-100 flex items-center justify-center shadow-md">
                <Camera className="h-12 w-12 text-amber-700" />
              </div>
              <h1 className="text-3xl font-playfair text-amber-900">
                Scan Artwork
              </h1>
              <p className="text-amber-700/80 max-w-md mx-auto">
                Point your camera at any artwork to explore its story, or upload
                an image from your gallery.
              </p>
              <div className="flex flex-col gap-3 pt-4">
                <Button
                  onClick={startCamera}
                  size="lg"
                  className="bg-amber-700 hover:bg-amber-800 text-white rounded-xl shadow-lg"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Open Camera
                </Button>
                <label htmlFor="file-upload">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-amber-600 text-amber-700 hover:bg-amber-100 rounded-xl"
                    asChild
                  >
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

        {isScanning && (
          <div className="relative h-full">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="border-4 border-amber-600 w-64 h-64 rounded-lg animate-pulse" />
            </div>
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 px-4">
              <Button
                onClick={stopCamera}
                variant="outline"
                size="lg"
                className="bg-white/80 backdrop-blur-md text-amber-900 border-amber-400 hover:bg-amber-100"
              >
                <X className="mr-2 h-5 w-5" />
                Cancel
              </Button>
              <Button
                onClick={captureImage}
                size="lg"
                className="bg-amber-700 hover:bg-amber-800 text-white shadow-lg"
              >
                <Camera className="mr-2 h-5 w-5" />
                Capture
              </Button>
            </div>
          </div>
        )}

        {image && (
          <div className="relative h-full">
            <img
              src={image}
              alt="Captured"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-amber-900/60 flex items-center justify-center">
              <div className="text-center space-y-4 animate-scale-in">
                <div className="h-16 w-16 mx-auto rounded-full border-4 border-amber-300 border-t-transparent animate-spin" />
                <p className="text-white text-lg font-semibold">
                  Recognizing artwork...
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scanner;
