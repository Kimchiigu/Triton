# How to Run the Project

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

5. Set up **Frontend**:
   ```sh
   dfx canister create frontend
   dfx generate frontend
   ```

6. Once everything is set up, deploy the application:
   ```sh
   dfx deploy
   ```

7. You can bypass all of the setups with the command:
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

**Note:** No need to run `npm run backend`.

