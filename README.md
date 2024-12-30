# Simple Logger

This is a simple Node.js application that logs every incoming GET and POST request, including the IP address and full URL (with parameters).

It is built with:
- **Express.js** for the server
- **Morgan** for logging HTTP requests

## Features
- Logs GET and POST requests with detailed information (IP and full URL with parameters).
- Configured to be easily deployed using Docker and Docker Compose.
- Will work with Coolify for automatic configuration and deployment.

## Requirements
- Node.js (version 18 or later)
- Docker (for containerization)

## Getting Started

### Clone the repository:

```bash
git clone https://github.com/your-username/logger-app.git
cd logger-app

