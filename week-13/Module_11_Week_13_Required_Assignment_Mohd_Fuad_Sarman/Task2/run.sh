#!/bin/bash

# MongoDB Atlas credentials and cluster info
CLUSTER_URI="mongodb+srv://cluster0.bbetfgt.mongodb.net/LibraryDB"
USERNAME="mohdfuadsarman"
SCRIPT="library_db.js"

read -sp "Enter MongoDB Atlas password for user $USERNAME: " PASSWORD
echo

# Run the mongosh command with the script
mongosh "$CLUSTER_URI" --username "$USERNAME" --password "$PASSWORD" --file "$SCRIPT"
