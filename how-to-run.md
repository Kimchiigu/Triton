# How to run the code
### 1. Use WSL terminal to run dfx package manager
```bash
wsl
```

### 2. Initialize motoko
```bash
dfx start --clean --background
```

### 3. Deploy the motoko canister and frontend to your local internet first
```bash
npm run setup
```

### 4. Deploy the website
```bash
npm run start
```

## Notes
### if you want to use HMR (Hot Module Reload), run npm run frontend in powershell terminal (not WSL) 
```powershell
npm run frontend
```