// Import the http module
// const http = require('http');
// const express = require('express');
// const path = require('node:path');
// const url = require("url");
import * as http from "http";
import {express} from "express";
import * as path from "path";
import * as url from "url";

const hostname = '127.0.0.1'; // localhost
const port = 3000;

var app = express();

// Manually define __dirname for ES modules
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use the manually defined __dirname as before
app.use('/', express.static(path.join(__dirname, 'public')));
app.listen(port, hostname);