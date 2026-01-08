#!/usr/bin/env node
/**
 * optimize-images.js
 * 
 * Automated image optimization script for Premium Home Design.
 * Complies with Agentrules v2.0.0 Regla #1:
 *   - Converts all PNG/JPG images to WebP
 *   - Resizes to max 1920px width (maintains aspect ratio)
 *   - Generates blurDataURL (base64) for placeholder="blur"
 *   - Outputs manifest JSON with before/after sizes
 * 
 * Usage:
 *   npm install sharp --save-dev   # if not installed
 *   node scripts/optimize-images.js
 * 
 * Output:
 *   - WebP files alongside originals in public/images/
 *   - scripts/image-manifest.json with blurDataURL + sizes
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  inputDir: path.join(__dirname, '..', 'public', 'images'),
  outputManifest: path.join(__dirname, 'image-manifest.json'),
  
  // Max width for resized images (Agentrules: 1920px max)
  maxWidth: 1920,
  
  // WebP quality (Agentrules: 85 for hero/above-fold)
  quality: 85,
  
  // Blur placeholder settings
  blurWidth: 10, // Very small for tiny base64
  blurHeight: 10,
  
  // File extensions to process
  extensions: ['.png', '.jpg', '.jpeg'],
};

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Recursively find all image files in a directory
 */
function findImages(dir, images = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      findImages(fullPath, images);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (CONFIG.extensions.includes(ext)) {
        images.push(fullPath);
      }
    }
  }
  
  return images;
}

/**
 * Generate a blurDataURL (base64) for an image
 * Used for next/image placeholder="blur"
 */
async function generateBlurDataURL(inputPath) {
  const buffer = await sharp(inputPath)
    .resize(CONFIG.blurWidth, CONFIG.blurHeight, { fit: 'inside' })
    .webp({ quality: 20 })
    .toBuffer();
  
  return `data:image/webp;base64,${buffer.toString('base64')}`;
}

/**
 * Get image dimensions
 */
async function getImageDimensions(inputPath) {
  const metadata = await sharp(inputPath).metadata();
  return { width: metadata.width, height: metadata.height };
}

/**
 * Format bytes to human-readable KB/MB
 */
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// ============================================================================
// MAIN OPTIMIZATION FUNCTION
// ============================================================================

async function optimizeImage(inputPath) {
  const dir = path.dirname(inputPath);
  const baseName = path.basename(inputPath, path.extname(inputPath));
  const outputPath = path.join(dir, `${baseName}.webp`);
  
  // Get original file size
  const originalStats = fs.statSync(inputPath);
  const originalSize = originalStats.size;
  
  // Get original dimensions
  const originalDims = await getImageDimensions(inputPath);
  
  // Calculate new dimensions (max 1920px width, maintain aspect ratio)
  let newWidth = originalDims.width;
  let newHeight = originalDims.height;
  
  if (originalDims.width > CONFIG.maxWidth) {
    const ratio = CONFIG.maxWidth / originalDims.width;
    newWidth = CONFIG.maxWidth;
    newHeight = Math.round(originalDims.height * ratio);
  }
  
  // Convert and resize to WebP
  await sharp(inputPath)
    .resize(newWidth, newHeight, {
      fit: 'inside',
      withoutEnlargement: true, // Don't upscale small images
    })
    .webp({
      quality: CONFIG.quality,
      effort: 6, // Higher = smaller file, slower encode
    })
    .toFile(outputPath);
  
  // Get new file size
  const newStats = fs.statSync(outputPath);
  const newSize = newStats.size;
  
  // Generate blurDataURL
  const blurDataURL = await generateBlurDataURL(inputPath);
  
  // Calculate relative path for manifest (from public/)
  const relativePath = path.relative(
    path.join(__dirname, '..', 'public'),
    outputPath
  ).replace(/\\/g, '/'); // Normalize to forward slashes
  
  const relativeOriginal = path.relative(
    path.join(__dirname, '..', 'public'),
    inputPath
  ).replace(/\\/g, '/');
  
  return {
    original: {
      path: relativeOriginal,
      size: originalSize,
      sizeFormatted: formatBytes(originalSize),
      width: originalDims.width,
      height: originalDims.height,
    },
    optimized: {
      path: relativePath,
      // Public path for use in Next.js Image src
      publicPath: `/${relativePath}`,
      size: newSize,
      sizeFormatted: formatBytes(newSize),
      width: newWidth,
      height: newHeight,
    },
    blurDataURL,
    savings: {
      bytes: originalSize - newSize,
      percent: ((1 - newSize / originalSize) * 100).toFixed(1),
    },
  };
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('🖼️  Image Optimization Script');
  console.log('   Agentrules v2.0.0 Regla #1 Compliance\n');
  console.log(`   Input directory: ${CONFIG.inputDir}`);
  console.log(`   Max width: ${CONFIG.maxWidth}px`);
  console.log(`   WebP quality: ${CONFIG.quality}\n`);
  
  // Find all images
  const images = findImages(CONFIG.inputDir);
  console.log(`📁 Found ${images.length} images to process\n`);
  
  if (images.length === 0) {
    console.log('   No images found. Exiting.');
    return;
  }
  
  const manifest = {
    generatedAt: new Date().toISOString(),
    config: {
      maxWidth: CONFIG.maxWidth,
      quality: CONFIG.quality,
    },
    images: {},
    summary: {
      totalOriginalSize: 0,
      totalOptimizedSize: 0,
      totalSavings: 0,
    },
  };
  
  // Process each image
  for (const imagePath of images) {
    const relativeName = path.relative(CONFIG.inputDir, imagePath);
    process.stdout.write(`   Processing: ${relativeName}... `);
    
    try {
      const result = await optimizeImage(imagePath);
      
      // Use the public path (without extension change) as key for easy lookup
      const key = result.optimized.publicPath;
      manifest.images[key] = result;
      
      // Update summary
      manifest.summary.totalOriginalSize += result.original.size;
      manifest.summary.totalOptimizedSize += result.optimized.size;
      manifest.summary.totalSavings += result.savings.bytes;
      
      console.log(
        `✅ ${result.original.sizeFormatted} → ${result.optimized.sizeFormatted} ` +
        `(${result.savings.percent}% saved)`
      );
    } catch (err) {
      console.log(`❌ Error: ${err.message}`);
    }
  }
  
  // Finalize summary
  manifest.summary.totalOriginalSizeFormatted = formatBytes(manifest.summary.totalOriginalSize);
  manifest.summary.totalOptimizedSizeFormatted = formatBytes(manifest.summary.totalOptimizedSize);
  manifest.summary.totalSavingsFormatted = formatBytes(manifest.summary.totalSavings);
  manifest.summary.totalSavingsPercent = (
    (1 - manifest.summary.totalOptimizedSize / manifest.summary.totalOriginalSize) * 100
  ).toFixed(1);
  
  // Write manifest
  fs.writeFileSync(CONFIG.outputManifest, JSON.stringify(manifest, null, 2));
  
  console.log('\n' + '═'.repeat(60));
  console.log('📊 SUMMARY');
  console.log('═'.repeat(60));
  console.log(`   Total original:  ${manifest.summary.totalOriginalSizeFormatted}`);
  console.log(`   Total optimized: ${manifest.summary.totalOptimizedSizeFormatted}`);
  console.log(`   Total savings:   ${manifest.summary.totalSavingsFormatted} (${manifest.summary.totalSavingsPercent}%)`);
  console.log(`\n   Manifest written to: ${CONFIG.outputManifest}`);
  console.log('\n✅ Done! Update your Image components to use .webp files and blurDataURL from manifest.');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
