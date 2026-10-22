# Threadbase - Upload Server

Authenticated image upload API for **Kalvium Assignment 4.11 - File Upload with multer**.

The existing `verifyToken` middleware protects uploads. Multer stores accepted images in `uploads/` using generated filenames, and Express serves those files at `/uploads`.

## Setup

```bash
cp .env.example .env
npm install
npm start        # http://localhost:3001
```

## Authenticate

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"ada","password":"password"}'
```

Send the returned token as `Authorization: Bearer <token>`.

## Upload an image

Send an authenticated `POST /api/upload` as `multipart/form-data` with a file field named `avatar`. JPEG, PNG, WebP, and GIF images up to 5 MB are accepted. Success returns HTTP 201:

```json
{ "url": "/uploads/<generated-filename>" }
```

Open `http://localhost:3001` followed by the returned URL to view the uploaded image. Requests without a valid token, unsupported file types, and files over 5 MB are rejected. Uploaded files are ignored by Git.

## Development

```bash
npm run dev
```
