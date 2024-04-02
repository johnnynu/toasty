import express from "express";
import { convertVideo, deleteProcessedVideo, deleteRawVideo, downloadRawVideo, setupLocalDirectories, uploadProcessedVideo } from "./gcpStorage";

setupLocalDirectories();

const app = express(); // Create a new Express application
app.use(express.json()); // Use the express.json() middleware to parse incoming requests with JSON payloads

app.post("/process-video", async (req, res) => {
  // Get the bucket and filename from the Cloud Pub/Sub message
  let data;
  try {
    const message = Buffer.from(req.body.message.data, 'base64').toString('utf8');
    data = JSON.parse(message);
    if (!data.name) {
      throw new Error("Invalid message payload received");
    }
  } catch (error) {
    console.error(`Error parsing request body: ${error}`);
    return res.status(400).send("Bad Request: missing filename.");
  }

  const inputFileName= data.name;
  const outputFileName = `processed-${inputFileName}`;

  console.log(`Received request to process video: ${inputFileName}`);

  // Download the raw video from GCP Storage

  // Convert the video to 1080p
  try {
    await downloadRawVideo(inputFileName);
    await convertVideo(inputFileName, outputFileName);
  } catch (error) {
    await Promise.all([
      deleteRawVideo(inputFileName),
      deleteProcessedVideo(outputFileName)
    ]);
    console.error(`Error converting video: ${error}`);
    return res.status(500).send("Internal Server Error: failed to convert video.");
  }

  // Upload the processed video to GCP Storage
  await uploadProcessedVideo(outputFileName);

  await Promise.all([
    deleteRawVideo(inputFileName),
    deleteProcessedVideo(outputFileName)
  ]);

  return res.status(200).send("Video processing completed successfully.");
});

const port = process.env.PORT || 3000; // Set the port for the server to listen on
app.listen(port, () => {
  // Start the server
  console.log(`Server running at http://localhost:${port}`); // Log a message to the console
});
