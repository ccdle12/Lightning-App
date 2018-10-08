# Lightning App

## Setup
### Install dependencies

``` npm i```

### Add LND Domain
Add LND Domain to `.env`. 
Rename the file `.env.example` to `.env`. 

```$ cd ./src```

```LND_DOMAIN=<DOMAIN>:<RPC-PORT>```

### Add GRPC files
Add macaroon and tls files to `./grpc` to enable encrypted and authenticated
communication with the LND node.

Update the Macaroon type in `.env` to match the macaroon file name in `./grpc`

```
In ./src/.env

MACAROON=invoice.macaroon
```

### Run
#### Create the dev server
```make dev```

#### Open the server in the browser
```make open```