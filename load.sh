#!/bin/bash

quasar build
mkdir /opt/lampp/htdocs/hfual/dist/spa/xeros/
cp -r /opt/lampp/htdocs/hflive/ /opt/lampp/htdocs/hfual/dist/spa/xeros/
cp -r /opt/lampp/htdocs/hfual/dist/spa/xeros/hflive/share/ /opt/lampp/htdocs/hfual/dist/spa/
cp -r /opt/lampp/htdocs/hfplay/ /opt/lampp/htdocs/hfual/dist/spa/hfplay/


