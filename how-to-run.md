# First Setup
#### 1. Use WSL terminal to run dfx package manager
```bash
wsl
```

#### 2. Install all packages from npm first
```bash
npm i
```

#### 3. Initialize motoko
```bash
dfx start --clean --background
```

#### 4. Deploy the motoko canister and frontend to your local internet first
```bash
npm run setup
```

#### 5. Deploy the website
```bash
npm run start
```
---
# How to Run
#### 1. Start the DFX Service
```bash
dfx start --clean --background
```

#### 2. Create canister for internet_identity
```bash
dfx deps deploy internet_identity
```
##### You need to do this because it doesn't combined with the npm run setup command

#### 3. Generate canister for backend_user, internet_identity
```bash
dfx generate internet_identity && dfx generate backend_user
```
##### It needs to be generated so the frontend can access the backend canister. You can see the canister in the declarations folder

##### !!!! Also generate for the frontend when you are ready to deploy it to the ICP

#### 4. Deploy the canister to your local network
```bash
dfx deploy
```

## Notes
#### if you want to use HMR (Hot Module Reload), run npm run frontend in powershell terminal (not WSL) 
```powershell
npm run frontend
```