
# Make your self-signed certs!
via: https://msol.io/blog/tech/create-a-self-signed-ssl-certificate-with-openssl/

## First navigate to the `/config` directory
```sh
cd ~/magictracks-api/config
```

## Generate your self-signed keys
```sh
openssl genrsa -out key_magictracks.pem 2048
openssl req -new -sha256 -key key_magictracks.pem -out csr.csr
openssl req -x509 -sha256 -days 365 -key key_magictracks.pem -in csr.csr -out certificate_magictracks.pem
openssl req -in csr.csr -text -noout | grep -i "Signature.*SHA256" && echo "All is well" || echo "This certificate will stop working in 2017! You must update OpenSSL to generate a widely-compatible certificate"
```

Then:

1. Open up keychain access and add the ~/ssl/rootCA.pem to your keychain using file > import items
2. Go to your browser and 


NOTE: if you are having trouble with https issues during development
- FIRST: Follow along here: https://alexanderzeitler.com/articles/Fixing-Chrome-missing_subjectAltName-selfsigned-cert-openssl/
- THEN: in your browser add the security exceptions for the URLS:
https://localhost:3030
https://localhost:8080

To do this you can just navigate to those URLs and you'll get a prompt
asking you to confirm the security exception.

This should be sorted in production with an actual HTTPS certificate


***
***
***
<!-- IGNORE BELOW -->

<!-- 
via: https://github.com/webpack/webpack-dev-server/issues/854

openssl req \
    -newkey rsa:2048 \
    -x509 \
    -nodes \
    -keyout certificate.pem \
    -new \
    -out certificate.pem \
    -subj /CN=localhost \
    -reqexts SAN \
    -extensions SAN \
    -config <(cat /System/Library/OpenSSL/openssl.cnf \
        <(printf '[SAN]\nsubjectAltName=DNS:localhost')) \
    -sha256 \
    -days 3650


openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")


openssl genrsa -out localhost.pem 2048 
openssl req -new -sha256 -key localhost.pem -out csr.csr
openssl req -x509 -sha256 -days 365 -key localhost.pem -in csr.csr -out certificate.pem
openssl req -in csr.csr -text -noout | grep -i "Signature.*SHA256" && echo "All is well" || echo "This certificate will stop working in 2017! You must update OpenSSL to generate a widely-compatible certificate"
 -->


***

<!-- 
via: https://alexanderzeitler.com/articles/Fixing-Chrome-missing_subjectAltName-selfsigned-cert-openssl/

Open your terminal:

```
ssh createRootCA.sh

```

then

```
ssh createselfsignedcertificate.sh
```

Then:

1. Open up keychain access and add the ~/ssl/rootCA.pem to your keychain using file > import items
2. Go to your browser and 


NOTE: if you are having trouble with https issues during development
- FIRST: Follow along here: https://alexanderzeitler.com/articles/Fixing-Chrome-missing_subjectAltName-selfsigned-cert-openssl/
- THEN: in your browser add the security exceptions for the URLS:
https://localhost:3030
https://localhost:8080

To do this you can just navigate to those URLs and you'll get a prompt
asking you to confirm the security exception.

This should be sorted in production with an actual HTTPS certificate -->