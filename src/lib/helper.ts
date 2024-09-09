import { get } from 'http';
import { networkInterfaces } from 'os';

// Function to get local IP address
export function getLocalIpAddress() {
  const nets = networkInterfaces();
  let localIp = '127.0.0.1'; // Fallback to localhost

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]!) {
      if (net.family === 'IPv4' && !net.internal) {
        localIp = net.address;
      }
    }
  }
  return localIp;
}
