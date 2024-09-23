# URL Shortner

## Description

A simple URL shortener API that allows users to shorten long URLs. The API should provide endpoints to create, retrieve, update, and delete short URLs. It should also provide statistics on the number of times a short URL has been accessed.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- TypeScript
- ESLint

## Installation

1. Clone the repository
2. Install dependencies using `pnpm install`
3. Create a `.env` file in the root directory and add the following variables:

```
MONGO_URI=mongodb://localhost:27017/mydatabase
PORT=5000
```

4. Run the server using `pnpm start`

## Usage

### Endpoints

- `POST /shorten`: Create a new short URL
- `GET /shorten/:shortCode`: Retrieve the original URL from a short URL
- `PUT /shorten/:shortCode`: Update an existing short URL
- `DELETE /shorten/:shortCode`: Delete an existing short URL

### Example Requests

#### Create Short URL

```
POST /shorten
{
  "url": "https://www.example.com/some/long/url"
}
```

```
Response:
{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "accessCount": 0,
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```

#### Retrieve Original URL

```
GET /shorten/m7bmci
```

```
Response:
{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "m7bmci",
  "accessCount": 1,
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```

#### Update Short URL

```
PUT /shorten/m7bmci
{
  "url": "https://www.example.com/some/updated/url"
}

```

```
Response:
{
  "id": "1",
  "url": "https://www.example.com/some/updated/url",
  "shortCode": "m7bmci",
  "accessCount": 0,
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:30:00Z"
}
```

#### Delete Short URL

```
DELETE /shorten/m7bmci
```

```
Response:
{
  "id": "1",
  "url": "https://www.example.com/some/updated/url",
  "shortCode": "m7bmci",
  "accessCount": 0,
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:30:00Z"
}
```

### This Project is following [roadmap.sh](https://roadmap.sh/projects/url-shortening-service)
