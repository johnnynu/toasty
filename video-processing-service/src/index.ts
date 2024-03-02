import express from "express";
import ffmpeg from "fluent-ffmpeg";

const app = express(); // Create a new Express application
app.use(express.json()); // Use the express.json() middleware to parse incoming requests with JSON payloads

app.post("/process-video", (req, res) => {
  // Define a route for POST requests to "/process-video"
  // Get path of input video file from request body
  const inputFilePath = req.body.inputFilePath; // Get the input file path from the request body
  const outputFilePath = req.body.outputFilePath; // Get the output file path from the request body

  // Check if input file path and output file path are defined
  if (!inputFilePath || !outputFilePath) {
    // If the input or output file path is not defined
    res.status(400).send("Input and output file paths are required"); // Send a 400 status code with a message
  }

  // Process video
  ffmpeg(inputFilePath) // Use fluent-ffmpeg to process the video
    .outputOptions("-vf", "scale=1920:1080") // Scale the video to 1080p
    .on("end", () => {
      // When the processing is done
      res.status(200).send("Video processed successfully to 1080p"); // Send a 200 status code with a success message
    })
    .on("error", (err) => {
      // If an error occurs during processing
      console.log("An error occured: " + err.message); // Log the error message
      res.status(500).send("Error processing video"); // Send a 500 status code with an error message
    })
    .save(outputFilePath); // Save the processed video to the output file path
});

const port = process.env.PORT || 3000; // Set the port for the server to listen on
app.listen(port, () => {
  // Start the server
  console.log(`Server running at http://localhost:${port}`); // Log a message to the console
});
