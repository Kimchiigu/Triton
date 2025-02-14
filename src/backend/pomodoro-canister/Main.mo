import Bool "mo:base/Bool";

actor Pomodoro {

  var isRunning : Bool = false;
  var isBreak : Bool = false;

  public query func startPomodoro() : async () {
    isRunning := true;
    isBreak := false;
  };

  public query func startBreak() : async () {
    isRunning := false;
    isBreak := true;
  };

  public query func stopPomodoro() : async () {
    isRunning := false;
    isBreak := false;
  };

  public query func getIsRunning() : async Bool {
    return isRunning;
  };

  public query func getIsBreak() : async Bool {
    return isBreak;
  };

};