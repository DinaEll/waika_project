import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const keyPath: string = path.join(
  __dirname,
  '../docker/nginx/certs/default.key',
);
const certPath: string = path.join(
  __dirname,
  '../docker/nginx/certs/default.cert',
);

const command = `openssl`;
const args = [
  'req',
  '-x509',
  '-out',
  certPath,
  '-keyout',
  keyPath,
  '-newkey',
  'rsa:2048',
  '-nodes',
  '-sha256',
  '-days',
  '365',
  '-subj',
  '/CN=waika_mahjong',
  '-addext',
  'subjectAltName=DNS:localhost',
  '-addext',
  'extendedKeyUsage=serverAuth',
];

const generateCertificate = async (): Promise<void> => {
  console.log('Generating a self-signed SSL certificate...');

  const openssl = spawn(command, args);

  openssl.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  openssl.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  openssl.on('close', (code) => {
    if (code === 0) {
      console.log(`Certificate and key have been successfully generated!`);
      console.log(`Key: ${keyPath}`);
      console.log(`Certificate: ${certPath}`);
    } else {
      console.error(`OpenSSL process exited with code ${code}`);
    }
  });
};

generateCertificate();
