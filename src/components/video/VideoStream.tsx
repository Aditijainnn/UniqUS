
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface VideoStreamProps {
  isCameraOff: boolean;
  captionsEnabled: boolean;
  isScreenSharing?: boolean;
  activeScreenShare?: string | null;
}

const VideoStream: React.FC<VideoStreamProps> = ({ 
  isCameraOff, 
  captionsEnabled,
  isScreenSharing = false,
  activeScreenShare = null,
}) => {
  return (
    <Card className="shadow-md">
      <CardContent className="p-4">
        <div className="relative aspect-video bg-gray-100 rounded-md overflow-hidden">
          {isScreenSharing && activeScreenShare ? (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <img src={activeScreenShare} alt="Shared screen" className="max-w-full max-h-full" />
              </div>
              <div className="absolute top-2 right-2 text-xs bg-black text-white px-2 py-1 rounded">
                Screen Share Active
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xl">
              {isCameraOff ? "Camera Off" : "Video Stream"}
            </div>
          )}
        </div>
        {captionsEnabled && (
          <div className="mt-2 p-2 bg-gray-200 text-sm rounded-md">
            {isScreenSharing ? 
              "Presenter is sharing their screen. Describing [content on screen]..." : 
              "This is an example of closed captions. Captions will appear here in real-time."
            }
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoStream;
