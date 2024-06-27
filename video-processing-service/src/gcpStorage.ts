import {Storage} from '@google-cloud/storage';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';

const storage = new Storage();

const rawVideoBucketName = 'toasty-raw-videos';
const processedVideoBucketName = 'toasty-processed-videos';

const localRawVideoPath = './raw-videos';
const localProcessedVideoPath = './processed-videos';

// Create local directory for raw and processed vids
export function setupLocalDirectories() {
    ensureDirectoryExists(localRawVideoPath);
    ensureDirectoryExists(localProcessedVideoPath);
} 

/**
* @param rawVideoName - The name of the file to concvert from {@link localRawVideoPath}.
* @param processedVideoName - The name of the file to save the converted video to {@link localProcessedVideoPath}.
* @returns A promise that resolves when the video has been converted.
**/
export function convertVideo(rawVideoName: string, processedVideoName: string) {
    return new Promise<void>((resolve, reject) => {
        ensureDirectoryExists(path.dirname(`${localProcessedVideoPath}/${processedVideoName}`));
        console.log(`Saving processed video to: ${localProcessedVideoPath}/${processedVideoName}`);

        ffmpeg(`${localRawVideoPath}/${rawVideoName}`) // Use fluent-ffmpeg to process the video
        .outputOptions("-vf", "scale=1920:1080") // Scale the video to 1080p
        .on("end", () => {
          // When the processing is done
          console.log("Video processed successfully to 1080p"); // Log success message
          resolve(); // Resolve the promise
        })
        .on("error", (err) => {
          // If an error occurs during processing
          console.log("An error occurred: " + err.message); // Log the error message
          reject(err); // Reject the promise
        })
        .save(`${localProcessedVideoPath}/${processedVideoName}`); // Save the processed video to the output file path
    });
}

/**
* @param fileName - The name of the file to download from the {@link rawVideoBucketName} bucket into the {@link localRawVideoPath} directory.
* @returns A promise that resolves when the video has been downloaded.
**/
export async function downloadRawVideo(fileName: string) {
    try {
      await storage.bucket(rawVideoBucketName).file(fileName).download({destination: `${localRawVideoPath}/${fileName}`});
      console.log(`Downloaded ${fileName} from ${rawVideoBucketName} to ${localRawVideoPath}`);
    } catch (error) {
      console.error(`Error downloading ${fileName} from ${rawVideoBucketName}:`, error);
      throw error;
    }
  }

/**
* @param fileName - The name of the file to upload to the {@link processedVideoBucketName} bucket from the {@link localProcessedVideoPath} directory.
* @returns A promise that resolves when the video has been uploaded.
**/
export async function uploadProcessedVideo(fileName: string) {
    const bucket = storage.bucket(processedVideoBucketName);
    await bucket.upload(`${localProcessedVideoPath}/${fileName}`, {
        destination: fileName
    });

    console.log(`${localProcessedVideoPath}/${fileName} Uploaded to gs://${processedVideoBucketName}/${fileName}`);

    await bucket.file(fileName).makePublic();
}

/**
* @param fileName - The name of the file to delete from the {@link localRawVideoPath} directory.
* @returns A promise that resolves when the file has been deleted.
**/
export function deleteRawVideo(fileName: string) {
    return deleteFile(`${localRawVideoPath}/${fileName}`);
}

/**
* @param fileName - The name of the file to delete from the {@link localProcessedVideoPath} directory.
* @returns A promise that resolves when the file has been deleted.
**/
export function deleteProcessedVideo(fileName: string) {
    return deleteFile(`${localProcessedVideoPath}/${fileName}`);
}

/**
* @param filePath - The path of the file to delete.
* @returns A promise that resolves when the video has been deleted.
**/

function deleteFile(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(`Error deleting ${filePath}: ${err}`);
                    reject(err);
                } else {
                    console.log(`Deleted ${filePath}`);
                    resolve();
                }
            });
        } else {
            console.log(`${filePath} does not exist`);
            resolve();
        }
    });
}

/**
* Ensures a directory exists, creating it if necessary.
* @param {string} directoryPath - The path of the directory to ensure exists.
**/
export function ensureDirectoryExists(directoryPath: string) {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, {recursive: true}); // recursive: true enables creation of nested directories
        console.log(`Created directory ${directoryPath}`);
    }
}
