"use strict";

const client = require('scp2');
const ftp = {
  host: '94.130.33.37',
  username: 'moiofairuser',
  password: 'm0i0fairus3r',
  port: 22
};
const remotePath = '/var/www/html/fair-management';
/**
 * sftp://ftp@ftp.my-appsolute-mobility.com:2222/moio_showcase/dev-management
 */
const connectString = `${ftp.username}:${ftp.password}@${ftp.host}:${ftp.port}:${remotePath}`;
const appPath = __dirname + '/../dist/';

console.log('starting to upload files from: ' + appPath);

client.scp(appPath, connectString, function (err) {
  if (err) {
    console.error('error uploading files');
    throw err
  }
});

console.log('please wait until the upload process has finished');
