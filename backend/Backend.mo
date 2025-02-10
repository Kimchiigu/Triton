import Principal "mo:base/Principal";

actor class Backend() {

  public shared (msg) func whoami() : async Principal {
    msg.caller
  };

  public shared func printHello() : async Text {
    "Hello from Backend"
  };
  
};
