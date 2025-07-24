#!/bin/bash

# Script to update print styling in all print utilities
FILES=(
    "printSPKUtils.js"
    "printPenerimaanBarangReport.js"
    "printSPBUtils.js"
    "printSuratJalanUtils.js"
    "printSPGKawat.js"
    "printSPGLain.js"
    "printMutasiBarangReport.js"
    "printStokBarangReport.js"
    "printPengeluaranBarangReport.js"
    "printReturPembelianReport.js"
    "printSTBUtils.js"
    "printSPGBawang.js"
    "printSPGImport.js"
)

cd src/utils

for FILE in "${FILES[@]}"; do
    if [ -f "$FILE" ]; then
        echo "Updating $FILE..."
        
        # Update page settings
        sed -i '' 's|margin: 15mm;|margin: 10mm;|g' "$FILE"
        sed -i '' 's|size: A4;|size: 9.5in 5.5in;|g' "$FILE"
        sed -i '' 's|size: A4 landscape;|size: 9.5in 5.5in;|g' "$FILE"
        
        # Update font family
        sed -i '' 's|font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;|font-family: '\''Courier New'\'', Courier, monospace;|g' "$FILE"
        
        # Add font-weight to body if not exists
        sed -i '' 's|color: black;|color: black;\n            font-weight: 400;|g' "$FILE"
        
        # Update borders
        sed -i '' 's|border-bottom: 2px solid black;|border-bottom: 0.5px solid black;|g' "$FILE"
        sed -i '' 's|border: 1.5px solid black;|border: 0.25px solid black;|g' "$FILE"
        sed -i '' 's|border: 1px solid black;|border: 0.25px solid black;|g' "$FILE"
        
        # Update font weights
        sed -i '' 's|font-weight: bold;|font-weight: 400;|g' "$FILE"
        sed -i '' 's|font-weight: normal;|font-weight: 400;|g' "$FILE"
        
        echo "Updated $FILE"
    else
        echo "File $FILE not found"
    fi
done

echo "All print style updates completed!"
