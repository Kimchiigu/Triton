import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import TrieMap "mo:base/TrieMap";

actor {
    type User = {
        internet_identity: Principal;
        name: Text;
        email: Text;
        timestamp: Time.Time;
        money: Nat;
    };

    let users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);

    public query func getUser(uid: Principal) : async ?User {
        let user : ?User = users.get(uid);

        switch(user) {
            case(user) { user };
        };
    }
}