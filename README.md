# Clone this Project
1. Run this command to clone the repository
   ```sh
   git clone https://github.com/Kimchiigu/Triton.git
   ```
   
2. Open your IDE in the Triton folder
   ```sh
   cd Triton
   ```
   If you use Visual Studio Code
   ```sh
   code .
   ```
---

# How to Run the Project

## **IMPORTANT** for Windows User (WSL Setup)
DFX command can only be run in a linux environment, so Windows user needs to use WSL (Windows Subsystem Linux)
1. Install WSL (if you don't have) / Run WSL (if you already have installed)
   ```sh
   wsl
   ```
   For user who use WSL for the first time, just wait for the installation to be completed
2. If WSL is success, then it will show you a Linux terminal
   ```sh
   <username>@<device_name>:~$
   ```
3. Update package lists
   ```sh
   sudo apt update
   ```
   Usually the package is out of date so you need to update it manually
4. Install node.js and npm (Node Package Manager)
   ```sh
   sudo apt install nodejs npm
   ```
5. Check the version for both
   ```sh
   node -v
   npm -v
   ```
   Best to update the node and npm to the latest!
6. Install the IC SDK
   ```sh
   sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
   ```
7. Check if DFX is successfully installed (DFX is the package manager installer for ICP)
   ```sh
   dfx --version
   ```
8. Make a Developer Identity
   ```sh
   dfx identity list
   dfx identity new IDENTITY_NAME
   dfx identity use IDENTITY_NAME
   ```
   When creating new identity, it will ask you to make a passphrase (password) for everytime you deploy a canister to the ICP

## Always Run This First
To ensure the DFX environment is active, run the following command:

```sh
 dfx start --clean --background
```

## First Setup (If Cloning the Repository for the First Time)

1. Install the required dependencies:
   ```sh
   npm i
   ```

2. Set up **Internet Identity**:
   ```sh
   dfx deps pull
   dfx generate internet_identity
   ```

3. Set up **Backend User**:
   ```sh
   dfx canister create backend_user
   dfx generate backend_user
   ```

4. Set up **Backend Pomodoro**:
   ```sh
   dfx canister create backend_pomodoro
   dfx generate backend_pomodoro
   ```

5. Set up **Backend Fish**:
   ```sh
   dfx canister create backend_fish
   dfx generate backend_fish
   ```

6. Set up **Frontend**:
   ```sh
   dfx canister create frontend
   dfx generate frontend
   ```

7. Copy `dist` folder to `src/frontend`
   Apparently it's not copied "automatically" in the setup, so just do the copy manually

8. Once everything is set up, deploy the application:
   ```sh
   dfx deploy
   ```

9. **(COMING SOON)** You can bypass all of the setups with the command:
   ```sh
   npm run finsetup
   ```
   See the detail command of "finsetup" in file package.json (root directory)

---

## If Already Set Up Previously

1. Deploy **Internet Identity**:
   ```sh
   dfx deps deploy internet_identity
   ```

2. Deploy the entire application:
   ```sh
   dfx deploy
   ```

3. Run the **Frontend** (use **PowerShell**, not WSL, to enable **Hot Module Reload (HMR)**):
   ```sh
   npm run frontend
   ```

**Note:** 
- No need to run `npm run backend` because it's already deployed to the internet.
- If there are changes in the backend (mainly the Motoko file `Main.mo`) then run `dfx deploy` again.
- If you want to create a new canister, then you need to run:
  - `dfx canister create <canister_name>`
  - `dfx generate <canister_name>`
  - Add the canister configuration in `dfx.json` with the format: <br>
     `"<backend_name>": {
         "type": "motoko",
         "main": "your_directory/main.mo"
       },`
  - Then deploy with `dfx deploy`
- The motoko file name doesn't have to be `Main.mo`, it can be anything like `User.mo`, `Fish.mo`, etc
