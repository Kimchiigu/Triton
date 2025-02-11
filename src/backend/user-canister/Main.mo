import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import TrieMap "mo:base/TrieMap";
import Result "mo:base/Result";

actor {
   type User = {
      internet_identity: Principal;
      name: Text;
      email: Text;
      dob: Text;
      timestamp: Time.Time;
      money: Nat;
   };

   let users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);

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
         money = 50000;
      };

      users.put(user.internet_identity, user);
      return true;
   };

   public func updateUser(userId : Principal, name : Text, email : Text, dob : Text) : async Bool {
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
            };
            users.put(userId, newUser);
            return true;
         };
         case (null) {
            return false;
         };
      };
   };

   public func printHello() : async Text {
      "Hello";
   };

   public shared query (msg) func whoami() : async Principal {
      msg.caller
   };
}