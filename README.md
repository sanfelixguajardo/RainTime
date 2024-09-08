# RainTime

<br>
  <a href="#-overview"><kbd> <br> Overview <br> </kbd></a>&ensp;&ensp;
  <a href="#%EF%B8%8F-hardware-setup"><kbd> <br> Hardware Setup <br> </kbd></a>&ensp;&ensp;
  <a href="#-installation"><kbd> <br> Installation <br> </kbd></a>&ensp;&ensp;
  <a href="#-expose-services-through-cloudflare-tunnels"><kbd> <br> Tunnel setup <br> </kbd></a>&ensp;&ensp;
  <a href="#-usage"><kbd> <br> Usage <br> </kbd></a>&ensp;&ensp;
  <a href="#-resources"><kbd> <br> Resources <br> </kbd></a>&ensp;&ensp;
</div><br><br>

RainTime is an automated plant watering system that allows users to configure irrigation schedules through an app. Users can specify the days of the week and the exact time to water their plants. The system ensures that plants receive the right amount of water at the right time, providing convenience and helping to maintain healthy plant growth.

<p align="left">
    <a href="https://github.com/sanfelixguajardo/RainTime/blob/main/LICENSE"> 
      <img alt="License" src="https://img.shields.io/github/license/sanfelixguajardo/RainTime?style=for-the-badge&logo=starship&color=ee999f&logoColor=D9E0EE&labelColor=302D41" />
    </a>
    <a href="https://github.com/sanfelixguajardo/RainTime/stargazers">
      <img alt="Stars" src="https://img.shields.io/github/stars/sanfelixguajardo/RainTime?style=for-the-badge&logo=starship&color=c69ff5&logoColor=D9E0EE&labelColor=302D41" />
    </a>
    <a href="https://github.com/sanfelixguajardo/RainTime/issues">
      <img alt="Issues" src="https://img.shields.io/github/issues/sanfelixguajardo/RainTime?style=for-the-badge&logo=bilibili&color=F5E0DC&logoColor=D9E0EE&labelColor=302D41" />
    </a>
    <a href="https://github.com/sanfelixguajardo/RainTime">
      <img alt="Repo Size" src="https://img.shields.io/github/repo-size/sanfelixguajardo/RainTime?color=%23DDB6F2&label=SIZE&logo=codesandbox&style=for-the-badge&logoColor=D9E0EE&labelColor=302D41" />
    </a>
</p>

## 🎯 Overview

RainTime is composed of several modules, as shown in the image below. The complete system is designed to support remote access to the application using Cloudflare Tunnels, as well as automated deployment using Ansible and containerization with Docker.

> [!NOTE] 
> If you want to run the project locally and allow access only to devices on the same local network, certain modules and steps can be omitted.


![RainTime-Infrastructure](https://github.com/sanfelixguajardo/RainTime/assets/RainTime-Infrastructure)

### 🧲 Components

| Component               | Description                                                                                                                                                                                                                                                                               |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **CloudFlare**          | For remote access to the application from outside the local network, _Cloudflare Tunnels_ are used, with Cloudflare acting as a _reverse proxy server_.                                                                                                                                   |
| **Host Computer**       | The _host computer_ running the three main modules must be connected to the _local network_ and equipped with a _USB serial connection_ to interface with an _Arduino board_. A Raspberry Pi 5 is used as the host device.                                                               |
| &emsp;&emsp;- Frontend    | The _frontend_, built with _React_, provides a graphical user interface (GUI) for user login and watering program configuration.                                                                                                                                                          |
| &emsp;&emsp;- Server      | The backend of the application is powered by a _Node.js_ and _Express_ server. This server communicates with the _frontend_ via a _RESTful API_, connects to a _MongoDB_ database hosted on Atlas, and interfaces with the irrigation controller through a _RabbitMQ_ queue.               |
| &emsp;&emsp;- Irrigation  | This Python program monitors the RabbitMQ queue to schedule watering programs. It sends commands to the Arduino board at the specified date and time for each watering event.                                                                                                             |
| **Arduino Board**       | An _Arduino UNO_ board is used to control the water pump. The relay is connected to `pinPumpV0` (defaults to pin 5) and is used to activate the pump for watering the plants.                                                                                                              |
| **Ansible Control Node**| From a computer connected to the same local network as the host computer, you can run an Ansible playbook to automate the entire deployment of the application once it has been containerized and uploaded to a Docker Hub repository.                                                     |

## 🧰 Languages and Tools

<p align="left">
  <img alt="Git" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" />
  <img alt="Linux" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" />
  <img alt="HTML" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg" />
  <img alt="CSS" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg" />
  <img alt="JavaScript" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" />
  <img alt="React" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
  <img alt="Python" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-plain.svg" />
  <img alt="Docker" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" />
  <img alt="Arduino" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg" />
  <img alt="RabbitMQ" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg" />
  <img alt="Ansible" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ansible/ansible-original.svg" />
  <img alt="CloudFlare" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg" />
  <img alt="MongoDB" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" />
  <img alt="NodeJS" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
  <img alt="ExpressJS" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" />
</p>

<br>

## ⚙️ Hardware Setup

This section guides you through the assembly of the water pump with the Arduino board and provides the necessary steps to upload the code to the Arduino.

**Components Needed:**
- Arduino UNO board
- Water pump
- Relay module
- Jumper wires
- USB cable (to connect the Arduino to the host machine)

**Wiring Instructions**
- Connect the Relay Module to Arduino:
    - Relay IN pin to Arduino digital pin 5 (or the pin defined in your code as `pinPumpV0`).
    - Relay VCC pin to Arduino 5V.
    - Relay GND pin to Arduino GND.
- Connect the Water Pump to Relay:
    - Water Pump positive wire to NO (Normally Open) terminal of the relay.
    - Water Pump negative wire to common ground or GND of the power source.
    - Make sure the power source for the water pump matches its specifications (typically 12V or 5V).

**Uploading Code to Arduino**
<br>
File Location:
`/src/arduino/water_pump_control.ino`

**Steps to Upload the Code:**
Download the .ino file from the repository or clone the entire repository to your local machine:
````
git clone https://github.com/yourusername/raintime.git
````
Open the Arduino IDE on your computer.

Open the .ino file from the arduino directory:
    Go to File > Open and navigate to ./arduino/water_pump_control.ino.

Connect your Arduino UNO board to your computer using the USB cable.
Select the correct board and port in the Arduino IDE:
    - Go to Tools > Board > Arduino UNO.
    - Go to Tools > Port > select the port your Arduino is connected to.

Click the Upload button (right-arrow icon) in the Arduino IDE to upload the code to the board.

<br>

## 🚀 Installation

This guide provides step-by-step instructions to install and deploy the project using Ansible automation and Docker containers from Docker Hub. The deployment can be done locally within your network or exposed to the internet via Cloudflare Tunnels.

### Prerequisites

Before starting, ensure you have the following prerequisites:

- **Ansible Control Machine**:
  - A separate machine (not the application host) with Ansible installed.
  - This can be a native Linux system or a Windows system with WSL enabled.
  - Git (to clone the repository).
  - SSH access to the Application Host Machine.

- **Application Host Machine**:
  - A Linux-based system connected to the local network where the application will be deployed. In this case, a Raspberry Pi 5 running Raspberry Pi OS Lite (64-bit) was used.
  - Ensure the SSH server is enabled and accessible from the Ansible Control Machine.
  - A fresh Linux installation is recommended to avoid conflicts with pre-installed packages
    
> [!NOTE]
> If you do not have a fresh system installation, refer to the [GeerlingGuy documentation](https://github.com/geerlingguy/ansible-role-docker). His role for installing Docker will be used in this project, and he provides details on which programs need to be uninstalled to avoid conflicts.

- **MongoDB Atlas Account**:
  - To host the database in the cloud.

- **Node.js**:
  - Required on the Ansible control machine to run database initialization scripts.
  - Especially important for initializing the users as there is no registration option in the frontend app for security reasons.

- **Hardware Components**:
  - Arduino UNO board.
  - Water pump connected to the Arduino in pin 5.
  - USB connection between the Arduino and the Application Host Machine.

### Installation Steps in the Ansible Control Machine

The installation steps are oriented for an Arch-based system, but you can adapt the installation commands for your package manager.

1. **Install Ansible**
```
sudo pacman -S ansible
````

2. **Clone the repository**
```
git clone https://github.com/sanfelixguajardo/raintime.git
cd raintime
````

4. **Configure ansible**
- Edit inventory file and specify host ssh user and port
```
nano ./src/server_automation/inventory
````
> [!NOTE] 
> SSH uses port 22 by default


3. **Set up MongoDB Atlas**
- Go to your MongoDB Atlas account and create a new cluster.
- Copy the database URI as it will be needed to connect to it via the app.

4. **Initialize data base**
- Edit and run the `initializeUser.js` to register a new user by changing the `username` and `pwd` variables, the script will automatically encript the password. It is also necesary to copy de data base URI.
  - Install node dependencies.
  ```
  cd ./src/server/
  npm install
  ````
  - Edit the script.
  ```
  nano ./src/server/controllers/initializeUser.js
  ````
  - Run the script.
  ```
  npm ./src/server/controllers/initializeUser.js
  ````

Alternatively, it is posible to create a new users collection and a user manually through Atlas GUI.

6. **Configure the environment variables**
```
nano ./src/server_automation/docker_compose/.env
````

 Component                        | Description                                                                                                                                                                                                                                                                                                |  
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | 
| `SERVER_PORT`, `SERVER_LOCAL_IP`, `SERVER_PUBLIC_DOMAIN`                   | Configure server variables, `SERVER_LOCAL_IP` must be the local ip of the host machine in your network, if you dont intend to expose the service using Clodflare tunnels set the `SERVER_PUBLIC_DOMAIN` to the local IP                                                     |  
| `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`                    | Create two different token keys by generating a random hex array of 64 characters, you can use tools like openssl rand -hex 64  |   
| `DATABASE_URI`                    | Copy the data base URI that you have copied from your Atlas database when creating a cluster                                                                                                                    |     
| `RABBITMQ_PORT`, `RABBITMQ_USER`, `RABBITMQ_PASSWORD`                   | Variables to confgure the rabbitMQ service, it is useful to know this data for debugging purposes                                                                   | 
| `FRONTEND_PORT`, `FRONTEND_LOCAL_IP`, `FRONTEND_PUBLIC_DOMAIN`                   | Configure frontend variables, `FRONTEND_LOCAL_IP` must be the local ip of the host machine in your network,  If not exposing the service using Cloudflare tunnels, set `FRONTEND_PUBLIC_DOMAIN` to the local IP                              | 
<br>

6. Run ansible playbook `main.yml`
```
cd ./src/server_automation/
ansible-playbook main.yml
````
The playbook will automatically install Docker Engine and use the `compose.yml` file to pull the necessary images from Docker Hub and start the services.

> [!CAUTION] 
> When running the playbook, it performs several changes on the host machine to enhance security against potential attacks, such as changing the default SSH port. This means that for future executions of the playbook, you may need to adjust the Ansible port settings accordingly in the `inventory` file.
> It is highly recommended to review the contents of the playbook thoroughly, as it makes alterations to the host system. Ideally, this should be run on a freshly installed system.

> [!TIP]
> If the playbook hangs or fails, try re-running it, as this can often resolve the issue.

7. Check if services are running locally
- Verify the status of the services by running the sudo `docker-compose ps` command on the host machine.
- Access the frontend application by navigating to `http://hostlocalip:3000` in a web browser connected to the local network. For the backend server, use `http://hostlocalip:3500`.

<br>
All services should now be up and running!

## 🚇 Expose services through Cloudflare tunnels
> [!CAUTION] 
> While Cloudflare provides some level of protection against threats, exposing a service to the internet still carries risks.
> It is strongly recommended to implement additional security measures and consider isolating the host within a dedicated segment of your local network to protect it from other home devices. Proceed with caution and at your own risk.
> I am not responsible for any issues that may arise.

Cloudflare Tunnels is a powerful tool that allows you to expose a service to the internet without needing to open router ports or have a static public IP address. 
However, you must own a public domain registered with Cloudflare to use this feature. To register your domain with Cloudflare, go to your Cloudflare dashboard, navigate to the `Websites` tab, click `Add a domain`, and follow the instructions provided. 
Once Cloudflare has successfully registered and validated your domain, follow the setup guide below.

1. Open the `.env` file on the Ansible Control Machine and update the `SERVER_PUBLIC_DOMAIN` and `FRONTEND_PUBLIC_DOMAIN` values to follow the format `subdomain.domain.TLD`. You can choose any subdomain name you prefer, but the domain must match the one you registered with Cloudflare.
After updating the `.env` file, restart the host machine and rerun the Ansible playbook.
2. In your Cloudflare dashboard, go to `Zero Trust` > `Networks` > `Tunnels` and select `Create a tunnel`. Follow the steps provided.
3. When you reach the `Install and run connectors` step, select the `Docker` environment tab. This is because the `main.yml` Ansible playbook has already installed Docker Engine on the host machine, making this the easiest setup option.
Execute the command provided on your host machine; it will look something like this: `docker run cloudflare/cloudflared:latest tunnel --no-autoupdate run --token TOKEN`. Here, TOKEN is the unique token provided by Cloudflare.
4. When you get to the Route tunnel step, you need to expose two services for the application to function correctly. Create two different subdomains, one for the frontend service at `http://localip:3000` and another for the backend service at `http://localip:3500`.
The complete domain name should match those specified in the `.env` file.

<br>
You should now be able to acces your RainTime app from anywhere!

## 🔫 Usage
Access your Frontend application from any browser. After logging in with your account, navigate to the Gardening tab 🌱 to manage your watering programs. 
Click the `+` icon to create a new program. You can specify the days of the week, the time of day, and the duration for watering. Once saved, the program will automatically activate the water pump connected to the Arduino board at the scheduled times.

See GIF demonstration for more details.

## 📚 Resources
- [Node.js series by Dave Gray](https://www.youtube.com/watch?v=JZXQ455OT3A&list=PL0Zuz27SZ-6PFkIxaJ6Xx_X46avTM1aYw)
- [React.js series by Dave Gray](https://www.youtube.com/watch?v=TeeAp5zkYnI&list=PL0Zuz27SZ-6PrE9srvEn8nbhOOyxnWXfp)
- [Docker Security Essentials by HackerSploit](https://www.youtube.com/watch?v=KINjI1tlo2w&list=PLBf0hzazHTGNv0-GVWZoveC49pIDHEHbn)
- [Ansible 101 by jeff geerling](https://www.youtube.com/watch?v=goclfp6a2IQ&list=PL2_OBreMn7FqZkvMYt6ATmgC0KAGGJNAN)
- To setup a tunnel follow the [Cloudflare documentation](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/).

<div align="right">
  <br>
  <a href="#raintime"><kbd> <br> 🡅 <br> </kbd></a>
</div>
