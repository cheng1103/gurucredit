import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imagesDir = './public/images';
const outputDir = './public/images/optimized';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Image optimization settings
const settings = {
  // Hero and CTA backgrounds - larger images, more compression
  large: {
    maxWidth: 1920,
    jpegQuality: 85,  // High quality, visually lossless
    webpQuality: 85,
  },
  // Service cards and team photos - medium images
  medium: {
    maxWidth: 800,
    jpegQuality: 85,
    webpQuality: 85,
  },
  // Customer avatars - small images
  small: {
    maxWidth: 200,
    jpegQuality: 90,
    webpQuality: 90,
  }
};

// Categorize images
const imageCategories = {
  'hero-bg.jpg': 'large',
  'cta-bg.jpg': 'large',
  'team.jpg': 'medium',
  'personal-loan.jpg': 'medium',
  'car-loan.jpg': 'medium',
  'home-loan.jpg': 'medium',
  'business-loan.jpg': 'medium',
  'customer-1.jpg': 'small',
  'customer-2.jpg': 'small',
  'customer-3.jpg': 'small',
};

async function optimizeImage(filename) {
  const inputPath = path.join(imagesDir, filename);
  const category = imageCategories[filename] || 'medium';
  const config = settings[category];

  const nameWithoutExt = path.parse(filename).name;

  try {
    const metadata = await sharp(inputPath).metadata();
    const originalSize = fs.statSync(inputPath).size;

    // Calculate new dimensions maintaining aspect ratio
    const newWidth = Math.min(metadata.width, config.maxWidth);

    // Optimize as JPEG (for backward compatibility)
    const jpegOutput = path.join(outputDir, `${nameWithoutExt}.jpg`);
    await sharp(inputPath)
      .resize(newWidth, null, { withoutEnlargement: true })
      .jpeg({
        quality: config.jpegQuality,
        mozjpeg: true,  // Use mozjpeg for better compression
      })
      .toFile(jpegOutput);

    const jpegSize = fs.statSync(jpegOutput).size;

    // Also create WebP version (better compression, same quality)
    const webpOutput = path.join(outputDir, `${nameWithoutExt}.webp`);
    await sharp(inputPath)
      .resize(newWidth, null, { withoutEnlargement: true })
      .webp({
        quality: config.webpQuality,
        effort: 6,  // Higher effort = better compression
      })
      .toFile(webpOutput);

    const webpSize = fs.statSync(webpOutput).size;

    const jpegSavings = ((1 - jpegSize / originalSize) * 100).toFixed(1);
    const webpSavings = ((1 - webpSize / originalSize) * 100).toFixed(1);

    console.log(`✓ ${filename}`);
    console.log(`  Original: ${(originalSize / 1024).toFixed(1)}KB`);
    console.log(`  JPEG:     ${(jpegSize / 1024).toFixed(1)}KB (${jpegSavings}% smaller)`);
    console.log(`  WebP:     ${(webpSize / 1024).toFixed(1)}KB (${webpSavings}% smaller)`);
    console.log('');

    return { filename, originalSize, jpegSize, webpSize };
  } catch (error) {
    console.error(`✗ Error processing ${filename}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🖼️  Image Optimization Script');
  console.log('============================\n');
  console.log('Settings: Quality 85-90% (visually lossless)\n');

  const files = Object.keys(imageCategories);
  const results = [];

  for (const file of files) {
    const result = await optimizeImage(file);
    if (result) results.push(result);
  }

  // Summary
  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalJpeg = results.reduce((sum, r) => sum + r.jpegSize, 0);
  const totalWebp = results.reduce((sum, r) => sum + r.webpSize, 0);

  console.log('============================');
  console.log('📊 Summary');
  console.log(`Total Original: ${(totalOriginal / 1024).toFixed(1)}KB`);
  console.log(`Total JPEG:     ${(totalJpeg / 1024).toFixed(1)}KB (${((1 - totalJpeg / totalOriginal) * 100).toFixed(1)}% saved)`);
  console.log(`Total WebP:     ${(totalWebp / 1024).toFixed(1)}KB (${((1 - totalWebp / totalOriginal) * 100).toFixed(1)}% saved)`);
  console.log('\n✅ Optimized images saved to: public/images/optimized/');
  console.log('\nNext steps:');
  console.log('1. Review optimized images to ensure quality');
  console.log('2. Copy them back to public/images/ to replace originals');
  console.log('   cp public/images/optimized/*.jpg public/images/');
}

main().catch(console.error);
