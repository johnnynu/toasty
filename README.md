# Toasty Video Platform

Toasty is a simple video hosting and sharing platform, inspired by popular video-sharing websites. This project demonstrates the use of modern web technologies and cloud services to create a scalable video platform.

## Features

- User authentication with Google Sign-In
- Video upload functionality
- Automatic video transcoding to multiple formats
- Video playback
- Responsive design for various screen sizes

## Technologies Used

- Frontend: React with Vite.js
- Backend: Firebase Functions, Cloud Run
- Database: Firestore
- Storage: Google Cloud Storage
- Authentication: Firebase Auth
- Message Queue: Cloud Pub/Sub
- Video Processing: FFmpeg on Cloud Run

## Getting Started

To use the Toasty Video Platform, simply visit our deployed website at [URL].](https://client-bic7zx632q-uc.a.run.app/)

### As a User

1. Visit the website
2. Sign in with your Google account
3. Upload videos or browse existing content
4. Watch videos shared by the community

## Architecture

Toasty uses a microservices architecture to ensure scalability and maintainability:

1. User authentication is handled by Firebase Auth
2. Videos are uploaded to Google Cloud Storage
3. Upload events trigger messages in Cloud Pub/Sub
4. Video processing workers on Cloud Run handle transcoding
5. Processed videos are stored back in Cloud Storage
6. Video metadata is stored in Firestore
7. The web client, built with Vite.js, is hosted on Cloud Run

## Limitations and Future Work

While Toasty provides basic video hosting functionality, there are some limitations and areas for improvement:

- Long-running video processing tasks may timeout
- Basic video streaming capabilities
- No content moderation system in place

Future improvements could include:

- Implementing a more robust video processing pipeline
- Adding a CDN for improved video delivery
- Introducing user channels and subscriptions
- Implementing content moderation features

## License

MIT

---

Thank you for your interest in the Toasty Video Platform! We hope you enjoy using our service.
