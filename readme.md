# Image Upload to S3 Using Pre-Signed URL

This repository demonstrates a simple implementation of uploading an image from the browser to an Amazon S3 bucket using a pre-signed URL. The project consists of a frontend client (HTML, CSS, and JavaScript) for file upload and an Express.js backend server that generates a pre-signed URL using AWS SDK.

## Overview

In this implementation:
1. The user uploads an image file via a simple HTML form.
2. The frontend sends a request to the Express server to fetch a pre-signed URL for the upload.
3. The server generates a unique filename and requests a pre-signed URL from S3 using AWS SDK.
4. The frontend then uses the pre-signed URL to upload the image directly to the S3 bucket.

This approach is secure as the pre-signed URL provides temporary access to upload the image directly to S3 without exposing AWS credentials.

## Features

- **Secure image upload**: The backend server generates a pre-signed URL, allowing temporary upload access without exposing sensitive credentials.
- **Frontend upload**: Once the pre-signed URL is obtained, the image is uploaded directly from the browser.
- **S3 integration**: The backend uses AWS SDK to interact with Amazon S3.

## Technologies

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Cloud Storage**: Amazon S3 (using AWS SDK)

## Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **AWS Credentials**:
   Set up your AWS credentials either via environment variables or using an `~/.aws/credentials` file. The IAM user should have permission to generate pre-signed URLs for the S3 bucket.

4. **Environment Variables**:
   Create a `.env` file in the root of the project with the following variables:
   ```plaintext
   AWS_ACCESS_KEY_ID=<your-access-key>
   AWS_SECRET_ACCESS_KEY=<your-secret-key>
   AWS_REGION=<your-region>
   S3_BUCKET_NAME=<your-bucket-name>
   ```

## How to Run

1. **Start the server**:
   ```bash
   npm start
   ```

2. **Access the frontend**:
   Open `index.html` in your browser, which includes the form to upload an image file.

## Folder Structure

```plaintext
├── client
│   ├── index.html       # Frontend HTML with upload form
│   ├── styles.css       # Basic styles
│   └── script.js        # JavaScript for handling image upload
├── server
│   ├── app.js           # Express server code for pre-signed URL generation
│   └── .env             # Environment variables (not included, must be created)
├── package.json
└── README.md
```

## Usage

1. **Upload an image**:
   - Select an image file using the HTML form in `index.html`.
   - Click "Upload" to start the upload process.

2. **Process flow**:
   - **Frontend** sends a request to the backend for a pre-signed URL.
   - **Backend** generates a unique filename, requests a pre-signed URL from S3, and returns it to the frontend.
   - **Frontend** performs a `PUT` request directly to S3 using the pre-signed URL, uploading the image.

3. **Success/Error messages**:
   - On successful upload, a success message is displayed.
   - If an error occurs, it will be shown to the user.

## Code Explanation

### Frontend (`client/index.js`)

- JavaScript code handles the file selection and sends an FETCH request to the server for a pre-signed URL.
- When the URL is received, it performs a `PUT` request directly to S3 to upload the image.

### Backend (`server/index.js`)

- The Express server has a route for handling the pre-signed URL request.
- It generates a unique filename for the image, and uses the AWS SDK to get a pre-signed URL from S3.
- The server sends the URL back to the frontend.

## AWS S3 Bucket Configuration

Ensure your S3 bucket has appropriate CORS settings to allow the upload from the browser. Configure CORS with the following policy:

```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["PUT"],
        "AllowedOrigins": ["*"], // Use specific origins in production
        "ExposeHeaders": ["ETag"],
        "MaxAgeSeconds": 3000
    }
]
```