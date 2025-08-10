const { BlobServiceClient } = require('@azure/storage-blob');

// Load environment variables (from .env file)
require('dotenv').config();

// Get Azure connection string from .env
const AZURE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const CONTAINER_NAME = process.env.AZURE_CONTAINER_NAME || 'uploads';

// Create BlobServiceClient
const blobServiceClient = BlobServiceClient.fromConnectionString(
  AZURE_CONNECTION_STRING
);
const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

module.exports = { containerClient };
