const fs = require('fs')
const grpc = require('grpc')
process.env.GRPC_SSL_CIPHER_SUITES = 'HIGH+ECDSA'

// Import dotenv to set environment variables.
require('dotenv').load();

//1. Consume invoice.macaroon.
m = fs.readFileSync('../grpc/' + process.env.MACAROON)
macaroon = m.toString('hex')

//2. Create metadata using the macaroon.
metadata = new grpc.Metadata()
metadata.add('macaroon', macaroon)

//3. Create grpc credential from macaroon
macaroonCreds = grpc.credentials.createFromMetadataGenerator((_args, callback) => {
  callback(null, metadata)
})

//4. Build ssl credentials using the cert file for grpc 
// communication.
lndCert = fs.readFileSync("../grpc/tls.cert")
sslCreds = grpc.credentials.createSsl(lndCert)

//5. Combine the cert credentials and the macaroon auth credentials
// such that every call is properly encrypted and authenticated.
credentials = grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds)

//6. Create a gRPC client (address, credentials).
lnrpcDescriptor = grpc.load("../grpc/rpc.proto")
lnrpc = lnrpcDescriptor.lnrpc
client = new lnrpc.Lightning(process.env.LND_DOMAIN, credentials)

//7. Define the functions to communicate with LND via gRPC.
module.exports = {
  // Server facing function to request an invoice to be generated.
  GenerateInvoice: () => {
    // Create the invoice details.
    invoice = {value: 1000}

    // Return a promise for the invoice retrieved.
    return new Promise((resolve, _) => {
      client.AddInvoice(invoice, (err, res) => {  
        // Check for returned err.
        if (err) {
          resolve({result: null, err: err})
          return
        }

        // Resolve invoice response.
        resolve({result: res, err: null})
      })
    })
  },

}
