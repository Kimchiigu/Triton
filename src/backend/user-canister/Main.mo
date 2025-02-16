import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import TrieMap "mo:base/TrieMap";
import Result "mo:base/Result";
import Bool "mo:base/Bool";
import Array "mo:base/Array";
import Nat64 "mo:base/Nat64";
import Blob "mo:base/Blob";

actor {
   // Model
   type User = {
      internet_identity: Principal;
      name: Text;
      email: Text;
      dob: Text;
      timestamp: Time.Time;
      money: Nat;
      fishes: [Text];
   };

   let users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);

   // User 
   public query func getName(userId: Principal) : async Text {
      let user : ?User = users.get(userId);
      switch (user) {
         case (?user) {
            return user.name;
         };
         case (null) {
            return "Stranger";
         };
      };
   };

   public query func getEmail(userId: Principal) : async Text {
      let user : ?User = users.get(userId);
      switch (user) {
         case (?user) {
            return user.email;
         };
         case (null) {
            return "Stranger";
         };
      };
   };

   public query func getUserById(userId : Principal) : async Result.Result<User, Text> {
      let user = users.get(userId);
      switch (user) {
         case (?user) {
            return #ok(user);
         };
         case (null) {
            return #err("User not found!");
         };
      };
   };

   public shared func register(userId : Principal, name : Text, email : Text, dob : Text) : async Bool {
      let user_id = userId;

      if (users.get(user_id) != null) {
         return false;
      };

      let user : User = {
         internet_identity = user_id;
         name = name;
         email = email;
         dob = dob;
         timestamp = Time.now();
         money = 0;
         fishes = [];
      };

      users.put(user.internet_identity, user);
      return true;
   };

   public shared func updateUser(userId : Principal, name : Text, email : Text, dob : Text) : async Bool {
      let user = users.get(userId);

      switch (user) {
         case (?user) {
            let newUser : User = {
               internet_identity = userId;
               name = name;
               email = email;
               dob = dob;
               timestamp = user.timestamp;
               money = user.money;
               fishes = user.fishes;
            };
            users.put(userId, newUser);
            return true;
         };
         case (null) {
            return false;
         };
      };
   };

   // Fish
   public query func getFishCollections(userId : Principal) : async Result.Result<[Text], Text> {
      let user = users.get(userId);

      switch (user) {
         case (?user) {
            if (user.fishes.size() == 0){
               return #err("No Fish")
            } else {
               return #ok(user.fishes)
            }
         };
         case (null) {
            return #err("User not found");
         }
      }
   };

   public shared func addFishToUser(userId : Principal, fishId : Text) : async Result.Result<Text, Text> {
      let userOpt = users.get(userId);

      switch (userOpt) {
         case (?user) {
            let updatedUser : User = {
               internet_identity = user.internet_identity;
               name = user.name;
               email = user.email;
               dob = user.dob;
               timestamp = user.timestamp;
               money = user.money;
               fishes = Array.append(user.fishes, [fishId]);
            };

            users.put(userId, updatedUser);
            return #ok("Fish added successfully!");
         };
         case (null) {
            return #err("User not found!");
         };
      };
   };

   public shared func deleteFishFromUser(userId : Principal, fishId : Text) : async Result.Result<Text, Text> {
      let userOpt = users.get(userId);

      switch (userOpt) {
         case (?user) {
            let newFishes = Array.filter<Text>(user.fishes, func(f) { f != fishId });

            if (user.fishes.size() == newFishes.size()) {
               return #err("Fish not found in user's collection!");
            };

            let updatedUser : User = {
               internet_identity = user.internet_identity;
               name = user.name;
               email = user.email;
               dob = user.dob;
               timestamp = user.timestamp;
               money = user.money;
               fishes = newFishes;
            };

            users.put(userId, updatedUser);
            return #ok("Fish successfully removed!");
         };
         case (null) {
            return #err("User not found!");
         };
      };
   };

   // Debugging Purpose
   public func printHello() : async Text {
      "Hello";
   };

   public shared query (msg) func whoami() : async Principal {
      msg.caller
   };
}