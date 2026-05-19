#!/usr/bin/env bash
# Optimize all hero images: resize to 1200px max, convert to WebP

IMAGE_DIR="./public/images"
TEMP_DIR="./public/images/temp"
mkdir -p "$TEMP_DIR"

echo "Optimizing images in $IMAGE_DIR..."

for file in "$IMAGE_DIR"/*.webp; do
  basename=$(basename "$file" .webp)
  echo "Processing: $basename"
  
  # Get original size
  original_size=$(du -h "$file" | cut -f1)
  echo "  Original: $original_size"
  
  # Step 1: Resize to max 1200px width/height using sips
  temp_jpeg="$TEMP_DIR/$basename.jpg"
  sips -Z 1200 "$file" --out "$temp_jpeg" > /dev/null 2>&1
  
  if [ $? -ne 0 ]; then
    # If sips fails, try converting to jpeg first
    sips -s format jpeg "$file" --out "$temp_jpeg" > /dev/null 2>&1
    sips -Z 1200 "$temp_jpeg" --out "$temp_jpeg" > /dev/null 2>&1
  fi
  
  # Step 2: Convert to WebP with good quality (80 is a good balance)
  output_webp="$IMAGE_DIR/$basename.webp"
  cwebp -q 80 "$temp_jpeg" -o "$output_webp" > /dev/null 2>&1
  
  # Get optimized size
  optimized_size=$(du -h "$output_webp" | cut -f1)
  echo "  Optimized: $optimized_size"
  
  # Cleanup temp file
  rm -f "$temp_jpeg"
done

# Cleanup temp directory
rm -rf "$TEMP_DIR"

echo "\nDone! All images optimized."
