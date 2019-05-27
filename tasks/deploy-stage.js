"use strict";

const client = require('scp2');
const ftp = {
  host: 'ftp.my-appsolute-mobility.com',
  username: 'ftp',
  password: '865jZ9wT34vr09Zj804',
  port: 22
};
const remotePath = '/moio_showcase/dev-management';
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
