const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require('express');

//initialize instance of express
const app = express();

//port handler
const PORT = process.env.PORT || 3001;

//express middleware (urlencoded/url parser, json parser)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());