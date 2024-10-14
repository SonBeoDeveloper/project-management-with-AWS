# how to install in EC2
sudo su -
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

. ~/.nvm/nvm.sh
nvm install node
sudo yum update -y
sudo yum install git -y

git --version
git clone https://github.com/SonBeoDeveloper/project-management-with-AWS.git
ls
cd project-management-with-AWS
cd server
curl -fsSL https://bun.sh/install | bash # for macOS, Linux, and WSL
# to install a specific version
curl -fsSL https://bun.sh/install | bash -s "bun-v1.0.0"
bun i
bun run dev
echo "PORT=80" > .env
bun install pm2 -g
nano ecosystem.config.js
sudo env PATH=$PATH:$(which node) $(which pm2) startup systemd -u $USER --hp $(eval echo ~$USER)
pm2 start ecosystem.config.js
pm2 status
pm2 monit // check time controller
pm2 stop all // if y want stop 
pm2 delete all // if y want delete -> did y want start again:  pm2 start ecosystem.config.js
nano .env
bunx prisma generate
bunx prisma migrate dev --name init
bun run seed
pm2 start ecosystem.config.js


# s3
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::pm-s3-images-son/*"
        }
    ]
}


# lambda-trigger.
import https from "node.https";

export const handler = async (event) => {
  const postData = JSON.stringify({
    username: event.request.userAttributes['preferrd_username'] || event.userName,
    cognitoId: event.userName,
    profilePictureUrl:"i1.png",
    teamId:1
  });
  const options={
    hostname:"n4wr92l014.execute-api.us-east-1.amazonaws.com",
    port: 443,
    path: '/create-user',
    method: "POST",
    header:{
      "Content-Type":"application/json",
      "Content-length": Buffer.byteLength(postData)
    }
  };
  
  return new Promise((resolve,reject) =>{
    const req = https.request(options, (res) =>{
      res.setEncoding("utf8");
      let responseBody = "";
      res.on("data", (chunk)=> responseBody +=chunk);
      res.on("end", ()=> resolve(responseBody))
    });
    req.on("error", (error)=>reject(error));
    req.write(postData);
    req.end()
  });
  return event
};
