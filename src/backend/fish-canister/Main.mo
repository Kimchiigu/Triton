import Text "mo:base/Text";
import Int "mo:base/Int";
import TrieMap "mo:base/TrieMap";

actor {
    type Fish = {
        id : Text;
        name : Text;
        value : Int;
        icon : Text;
    };

    let fishes = TrieMap.TrieMap<Text, Fish>(Text.equal, Text.hash);

    let fish1 = {
        id = "FS001";
        name = "Goldfish";
        value = 100;
        icon = "https://res.cloudinary.com/your-account/image/upload/v1628688553/goldfish.jpg";
    };

    let fish2 = {
        id = "FS002";
        name = "Angelfish";
        value = 150;
        icon = "https://res.cloudinary.com/your-account/image/upload/v1628688553/angelfish.jpg";
    };

    fishes.put(fish1.id, fish1);
    fishes.put(fish2.id, fish2);
}