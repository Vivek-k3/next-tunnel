
---


# NextTunnel 
`next-tunnel` is a CLI tool designed to streamline the process of exposing your local Next.js app to the internet using a secure tunnel. Perfect for local development, testing, or sharing your app with collaborators without deploying to a server.
## Features 

- Exposes your local Next.js app to a secure tunnel.

- Customizable subdomain for easy access.

- Simple CLI for starting and stopping the tunnel.
 
- Seamless integration with existing `package.json` scripts.

## Installation 
You can install `next-tunnel` globally using npm:

```Copy code
npm install -g next-tunnel
```

Alternatively, install it as a development dependency:


```Copy code
npm install next-tunnel --save-dev
```

## Usage 

### 1. Starting the Tunnel and Next.js App 
To start your local Next.js app and expose it via a tunnel, use the `dev` command. You can specify a custom port and subdomain if needed:

```Copy code
next-tunnel dev [options]
```

#### Options: 
 
- `-p, --port <port>`: Specify the port number for the Next.js app (default: `3000`).
 
- `-s, --subdomain <subdomain>`: Specify a custom subdomain for the tunnel.

- `--secure`: Start the tunnel in secure mode 🔒.

- `--lan`: Start the tunnel using Local Area Network Connection(i.e your internet router connected devices.) 🔌.

Example:


```Copy code
next-tunnel dev -p 4000 -s my-custom-subdomain
```

#### Secure Tunnel: 
This will create a secure authenticated tunnel for your local Next.js app. You'll need to provide a password to access the tunnel which is shared along with url.

```Copy code
next-tunnel dev --secure
```

#### LAN Tunnel: 
This will create a tunnel using your machines LocalIP and only accessible from your local network.

```Copy code
next-tunnel dev --lan   
```

### 2. Stopping the Tunnel 
To stop the local tunnel, use the `stop` command:

```Copy code
next-tunnel stop
```

### 3. Initializing NextTunnel in Your Project 
You can modify your `package.json` to include `next-tunnel` as part of your development process. The `init` command will update your `package.json` by changing the `dev` script to run `next-tunnel dev`.

```Copy code
next-tunnel init
```
Example `package.json` after running `init`:

```Copy code
{
  "scripts": {
    "dev": "next-tunnel dev"
  }
}
```

## Versioning 
This package follows [semantic versioning](https://semver.org/) . The version is managed using [Changesets](https://github.com/changesets/changesets).
### View Version 
You can check the current version of `next-tunnel` using either `-v` or `--version`:

```Copy code
next-tunnel -v
```

## Contributing 

Contributions are welcome! Please submit a pull request or open an issue if you have suggestions or find bugs.

## License 
This project is licensed under the MIT License. See the [MIT LICENSE](LICENSE)  file for details.

---
