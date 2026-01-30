# Folder Gambar Komponen PC

Taruh gambar komponen di folder sesuai kategori:

## Struktur Folder:

- `cpu/` - Gambar processor
- `gpu/` - Gambar graphics card
- `motherboard/` - Gambar motherboard
- `ram/` - Gambar RAM
- `storage/` - Gambar SSD/HDD
- `psu/` - Gambar power supply
- `case/` - Gambar casing PC
- `cooling/` - Gambar cooler

## Format Gambar:

- Format: JPG, PNG, atau WebP
- Resolusi: Minimal 500x500px
- Nama file: sesuai dengan ID komponen (contoh: `cpu1.jpg`, `gpu2.png`)

## Cara Menambahkan Gambar:

1. Taruh gambar di folder yang sesuai
2. Update `image` property di `src/data/components.ts`
3. Contoh: `image: '/images/components/cpu/cpu1.jpg'`
