#!/bin/bash

TARGET_DIR="src/assets/sprites"

mkdir -p "TARGET_DIR"

# loop through pokemon 1 to 50
for i in $(seq 51 151); do
    URL="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/$i.png"
    OUTPUT="$TARGET_DIR/$i.png"

    echo "Downloading Pokémon #$i..."
    curl -s -o "$OUTPUT" "$URL"
done

echo "✅ All sprites downloaded to $TARGET_DIR"