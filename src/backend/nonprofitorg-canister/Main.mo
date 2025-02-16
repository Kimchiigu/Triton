import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";

actor {
    type NonProfitOrg = {
        id : Principal;
        name : Text;
        icon : Text;
        description : Text;
        coin : Nat;
    };

    

}