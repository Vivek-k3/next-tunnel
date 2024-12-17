import localtunnel from 'localtunnel';

export async function getTunnelStatus() {
  const tunnel = await localtunnel({ port: 3000 }); // Replace 3000 with your local server port

  // Assuming the tunnel object provides status information
  return {
    url: tunnel.url, // The public URL of the tunnel
    port: tunnel.port, // The local port being tunneled
    connections: tunnel.connections || 0, // Number of active connections
    dataUsage: 'N/A' // Data usage might not be directly available
  };
}

