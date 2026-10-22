import re
import os

data_path = r'c:\Margaret’s Homora\src\lib\data.ts'

with open(data_path, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    'prod-heart-cup': '/images/products/red-heart-cup-saucer.jpg',
    'prod-cherry-cup': '/images/products/cherry-cup-saucer.jpg',
    'prod-panda-cup': '/images/products/panda-cup-saucer.jpg',
    'prod-green-chinese-bowl': '/images/products/green-chinese-bowl.jpg',
    'prod-blue-chinese-bowl': '/images/products/blue-white-chinese-bowl.jpg',
    'prod-yellow-chinese-bowl': '/images/products/yellow-chinese-bowl.jpg',
    'prod-1': '/images/products/mughal-print-cup.jpg',
    'prod-2': '/images/products/red-floral-folk-mug.jpg',
    'prod-3': '/images/products/honey-bee-mug.jpg',
    'prod-4': '/images/products/kettle-mug-mini.jpg',
    'prod-5': '/images/products/kettle-mug-botanical.jpg',
    'prod-6': '/images/products/coffee-set-tray-790.jpg',
    'prod-7': '/images/products/coffee-set-deluxe-6pc.jpg',
    'prod-8': '/images/products/coffee-set-4cups-tray.jpg',
    'prod-9': '/images/products/ceramic-chai-set.jpg',
    'prod-10': '/images/products/flower-cups.jpg',
    'prod-11': '/images/products/deer-design-cups.jpg',
    'prod-12': '/images/products/traditional-ceramic-cups.jpg',
    'prod-13': '/images/products/tea-chai-cup.jpg',
    'prod-14': '/images/products/ceramic-cup-3inch.jpg',
    'prod-15': '/images/products/mini-ceramic-cup-2inch.jpg',
    'prod-16': '/images/products/dark-blue-slanted-cup.jpg',
    'prod-17': '/images/products/dark-blue-straight-cup.jpg',
    'prod-18': '/images/products/ceramic-coffee-closable-cap.jpg',
}

# In each product block, find the `images: [...]` and put the new image first
# For example:
# id: "prod-heart-cup",
# ...
# images: [
#   "/images/products/red-heart-cup-saucer.jpg",
#   ...

updated_content = content

for pid, img_path in replacements.items():
    # Regex to find the block for this product
    pattern = rf'(id:\s*"{re.escape(pid)}",[\s\S]*?images:\s*\[)([\s\S]*?)(\])'
    match = re.search(pattern, updated_content)
    if match:
        prefix = match.group(1)
        old_images_block = match.group(2)
        suffix = match.group(3)
        # Parse existing urls
        urls = re.findall(r'"(https?://[^"]+|/images/[^"]+)"', old_images_block)
        # remove img_path if already present
        urls = [u for u in urls if u != img_path]
        # new list has img_path first
        new_urls = [img_path] + urls[:1] # keep 1 secondary image if desired
        new_images_str = '\n      ' + ',\n      '.join([f'"{u}"' for u in new_urls]) + ',\n    '
        updated_content = updated_content[:match.start()] + prefix + new_images_str + suffix + updated_content[match.end():]
        print(f'Updated {pid} with {img_path}')
    else:
        print(f'Could not match block for {pid}')

with open(data_path, 'w', encoding='utf-8') as f:
    f.write(updated_content)

print('data.ts updated successfully!')
