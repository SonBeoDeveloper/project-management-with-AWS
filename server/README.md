bun rx prisma generate
bun r x prisma migrate dev --name init
bun r run seed

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