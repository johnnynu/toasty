import React from "react";
import { uploadVideo } from "@/firebase/functions";
import { useAtom } from "jotai";
import { isUploadingAtom } from "@/store";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export const Upload: React.FC = () => {
  const [isUploading, setIsUploading] = useAtom(isUploadingAtom);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Get the first file from the input
    const file = event.target.files?.item(0);

    if (file) {
      // Set uploading state to true when starting the upload
      setIsUploading(true);
      try {
        // Call the uploadVideo function with the selected file
        const res = await uploadVideo(file);
        // Alert the user of successful upload
        alert(`
          File uploaded successfully. Server responded with: ${JSON.stringify(
            res
          )}`
        );
      } catch (error) {
        // Alert the user if the upload fails
        alert(`Failed to upload file: ${error}`);
      } finally {
        // Reset the uploading state when the process is complete
        setIsUploading(false);
      }
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        id="upload"
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <Button
        className="mr-2"
        variant="ghost"
        size="sm"
        disabled={isUploading}
        onClick={handleUpload}
      >
        {isUploading ? "Uploading..." : "Upload"}
      </Button>
    </>
  );
};
