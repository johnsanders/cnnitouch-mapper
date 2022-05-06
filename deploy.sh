#!/bin/bash

/usr/bin/tar -czvf deploy.tar.gz ./dist/
/usr/bin/scp deploy.tar.gz cnnitouch@cnnitouch:/home/cnnitouch
/bin/rm ./deploy.tar.gz
/usr/bin/ssh -tt cnnitouch@cnnitouch << EOF

cd /tmp
cd /home/cnnitouch
rm -rf www/apps/mapper
tar -xzvf deploy.tar.gz
mv dist www/apps/mapper
rm deploy.tar.gz
exit
EOF
