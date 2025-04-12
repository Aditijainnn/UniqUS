
import React from "react";
import VideoStream from "./VideoStream";
import VideoControls from "./VideoControls";
import ParticipantsList from "./ParticipantsList";
import ChatPanel from "./ChatPanel";
import { useVideoConference } from "@/hooks/useVideoConference";

const AccessibleVideoConference = () => {
  const {
    isMuted,
    isCameraOff,
    screenShareEnabled,
    captionsEnabled,
    fontSize,
    participants,
    messages,
    isScreenSharing,
    activeScreenShare,
    toggleMute,
    toggleCamera,
    toggleScreenShare,
    toggleCaptions,
    changeFontSize,
    sendMessage,
    startScreenShare,
    stopScreenShare
  } = useVideoConference();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Video Area */}
      <div className="md:col-span-2 relative">
        <VideoStream 
          isCameraOff={isCameraOff} 
          captionsEnabled={captionsEnabled}
          isScreenSharing={isScreenSharing}
          activeScreenShare={activeScreenShare}
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center justify-center gap-4">
          <VideoControls
            isMuted={isMuted}
            isCameraOff={isCameraOff}
            captionsEnabled={captionsEnabled}
            screenShareEnabled={screenShareEnabled}
            fontSize={fontSize}
            isScreenSharing={isScreenSharing}
            toggleMute={toggleMute}
            toggleCamera={toggleCamera}
            toggleCaptions={toggleCaptions}
            toggleScreenShare={toggleScreenShare}
            changeFontSize={changeFontSize}
            startScreenShare={startScreenShare}
            stopScreenShare={stopScreenShare}
          />
        </div>
      </div>

      {/* Sidebar */}
      <div>
        {/* Participants */}
        <ParticipantsList participants={participants} />
        
        {/* Chat */}
        <ChatPanel 
          initialMessages={messages} 
          onSendMessage={sendMessage} 
        />
      </div>
    </div>
  );
};

export default AccessibleVideoConference;
