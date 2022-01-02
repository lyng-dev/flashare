#!/bin/bash

set e
set x

if ! command -v deno &> /dev/null
then
    echo "Failed. Missing requirement 'deno' executable could not be found. Visit: https://deno.land/"
    exit
fi

declare -a architectures=("x86_64-unknown-linux-gnu" "x86_64-pc-windows-msvc" "x86_64-apple-darwin" "aarch64-apple-darwin")
for i in "${architectures[@]}"
do
   mkdir -p ../output/"$i"
   deno compile --allow-net --allow-read --allow-write --unstable --target "$i" --output ../output/"$i"/flashare main.ts
done


