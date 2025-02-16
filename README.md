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
   dfx deps init
   dfx generate internet_identity
   ```

   If there exist a `deps` folder after git clone, make sure to delete the folder to create a new one with the commands above due to a different download hash

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
   npm run build
   dfx canister create frontend
   dfx generate frontend
   ```
   You need to run `npm run build` to generate a dist folder that will be used when `dfx deploy`

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

## ICRC-1 Ledger Setup

#### Link : https://internetcomputer.org/docs/current/tutorials/developer-liftoff/level-4/4.2-icrc-tokens

1. Add canister setup in dfx.json

   ```sh
   "icrc1_ledger_canister": {
      "type": "custom",
      "candid": "https://raw.githubusercontent.com/dfinity/ic/aba60ffbc46acfc8990bf4d5685c1360bd7026b9/rs/ledger_suite/icrc1/ledger/ledger.did",
      "wasm": "https://download.dfinity.systems/ic/aba60ffbc46acfc8990bf4d5685c1360bd7026b9/canisters/ic-icrc1-ledger.wasm.gz"
   }
   ```

2. Create minter account (miner for ICP coin in blockchain)

   ```sh
   dfx identity new minter
   dfx identity use minter
   export MINTER_ACCOUNT_ID=$(dfx identity get-principal)
   ```

3. Make your own Internet Token

   ```sh
   export TOKEN_NAME="Triton Token"
   export TOKEN_SYMBOL="TRTK"
   ```

4. Export your default account (can be your developer account)

   ```sh
   dfx identity new <your_account_name>
   dfx identity use <your_account_name>
   export DEPLOY_ID=$(dfx identity get-principal)
   ```

5. Predetermined minted tokens and transfer fee (for testing)

   ```sh
   export PRE_MINTED_TOKENS=10_000_000_000
   export TRANSFER_FEE=10_000
   ```

   ### **Explanation**

   - `PRE_MINTED_TOKENS`: The number of tokens minted during the ledger's initial deployment.

   - `TRANSFER_FEE`: The fee that users will pay whenever they make a transfer using the ledger.

6. Set the values for the ledger's archiving options

   ```sh
   dfx identity new archive_controller
   dfx identity use archive_controller
   export ARCHIVE_CONTROLLER=$(dfx identity get-principal)
   export TRIGGER_THRESHOLD=2000
   export NUM_OF_BLOCK_TO_ARCHIVE=1000
   export CYCLE_FOR_ARCHIVE_CREATION=10000000000000
   ```

   ### **Explanation**

   - `ARCHIVE_CONTROLLER`: Principal of the archive canister's controller.

   - `TRIGGER_THRESHOLD`: The number of blocks to archive once the trigger threshold is exceeded.

   - `NUM_OF_BLOCK_TO_ARCHIVE`: The amount of blocks to be archived.

   - `CYCLE_FOR_ARCHIVE_CREATION`: The amount of cycles to be sent to the archive canister when it is deployed.

7. Enable ICRC-2 and ICRC-3 Support

   ```sh
   export FEATURE_FLAGS=true
   ```

   `FEATURE_FLAGS`: Used to enable or disable certain ICRC-1 standard extensions. If you want to support the ICRC-2 standard extension, then set this flag to true

8. Deploy the icp-ledger canister

   ```sh
   dfx deploy icrc1_ledger_canister --specified-id mxzaz-hqaaa-aaaar-qaada-cai --argument "
   (variant {Init = record {
      token_symbol = \"${TOKEN_SYMBOL}\";
      token_name = \"${TOKEN_NAME}\";
      minting_account = record { owner = principal \"${MINTER_ACCOUNT_ID}\" };
      transfer_fee = ${TRANSFER_FEE};
      metadata = vec {};
      feature_flags = opt record { icrc2 = ${FEATURE_FLAGS} };
      initial_balances = vec {
         record { record { owner = principal \"${DEPLOY_ID}\" }; ${PRE_MINTED_TOKENS}; };
      };
      archive_options = record {
         num_blocks_to_archive = ${NUM_OF_BLOCK_TO_ARCHIVE};
         trigger_threshold = ${TRIGGER_THRESHOLD};
         controller_id = principal \"${ARCHIVE_CONTROLLER}\";
      };
      cycles_for_archive_creation = opt ${CYCLE_FOR_ARCHIVE_CREATION};
   }})"

   ```

9. Check the current available token

   ```sh
   dfx canister call icrc1_ledger_canister icrc1_metadata '()'
   ```

   It should returned:

   ```sh
   (
      vec {
         record { "icrc1:decimals"; variant { Nat = 8 : nat } };
         record { "icrc1:name"; variant { Text = "Triton Token" } };
         record { "icrc1:symbol"; variant { Text = "TRTK" } };
         record { "icrc1:fee"; variant { Nat = 10_000 : nat } };
         record { "icrc1:max_memo_length"; variant { Nat = 32 : nat } };
      },
   )
   ```

10. Check balance of an account

    ```sh
    dfx canister call icrc1_ledger_canister icrc1_balance_of "(record {owner = principal \"${DEPLOY_ID}\"; })"
    ```

    - Change the `DEPLOY_ID` with any principal id that you want to check
    - To check a principal id :
      ```sh
      dfx identity use <your_account_name>
      dfx identity get-principal
      ```

11. Transfer token with ICRC-1

```sh
   dfx identity use <your_account_name>
   dfx canister call icrc1_ledger_canister icrc1_transfer "(record { to = record { owner = principal \"sckqo-e2vyl-4rqqu-5g4wf-pqskh-iynjm-46ixm-awluw-ucnqa-4sl6j-mqe\";};  amount = 10_000;})"
```

- If you run this command, then the sender will be the current identity that is used!
- If success then it should return

```sh
(variant { Ok = 1 : nat })
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
