---
title: 'Sintak Markdown'
description: 'Pelajari kode sintak markdown untuk tipe teks di Stradocs'
---

Berikut beberapa cara penulisan kode sintak didalam markdown untuk model `teks` atau `inline`.

## Heading  
H1
: `# Teks`  

H2
: `## Teks`  

H3
: `### Teks`  

H4
: `#### Teks`  

H5
: `##### Teks`  

H6
: `###### Teks`  

## Paragraf
Penulisan paragraf tidak sintak khusus.

## Link
Teks Link
: `[Label](link-tujuan)`  

Code link
: <code>
    [`Label`](link-tujuan)
  </code>

Link otomatis
: `<link-tujuan>`
  
  Tambahkan pembuka `<` diawal link dan tutup dengan `>` di akhir link.
  
Wiki Link
: `[[link-tujuan]]`, `[[link-tujuan|Label]]`

> [!NOTE]
> Untuk penulisan **Link otomatis** dan **Wiki link** hasil nya sama.

### Advance link

Badge
: `[![badge nama-badge](link-ikon-badge)](link-tujuan)` 

  Di `alt` atau `[badge nama-badge]` harus di awali dengan kalimat **badge**.
  
Pengguna
: `[![avatar nama-pengguna](link-avatar) Nama Pengguna](link-tujuan)`  
  
  Di dalam `alt` atau `[avatar nama-pengguna]` harus di awali dengan kalimat **avatar**.
  
Tanpa label
: `[![avatar nama-pengguna](link-avatar)](link-tujuan)`  
  
Status Badge
: `[![status i](link-status-icon) Nama status](link-tujuan)`  

  Dalam `alt` atau `[status i]` harus diawali dengan kalimat **status**, untuk type status tersedia:  
  - `online`
  - `offline`

Tech Stack
: `[![icon nama](link-icon) Nama Tech](link-tujuan)`  
  
  Dalam `alt` atau `[icon nama]` harus diawali dengan **icon**.
  
Stack Pengguna
: Cukup bungkus `Pengguna Tanpa label` dengan `<div class="avatar-stack">`

## Teks  
Teks Tebal
: `**Tebal** | <b>Tebal</b> | <strong>Tebal</strong>`

Teks Miring
: `*Miring* | _Miring_ | <i>Miring</i> | <em>Miring</em>`

Teka Tebal Miring
: `***Tebal Miring*** | _**Tebal Miring**_ | <b><i>Tebal Miring</i></b> | <strong><em>Tebal Miring</em></strong>`

Teks Dihapus
: `~~Dihapus~~ | <s>Dihapus</s> | <del>Dihapus</del>`

Teks Ditambah
: `<u>Ditambah</u> | <ins>Ditambah</ins>`

Teks Sorotan
: `<mark>Sorotan</mark>`

Teks Abbr
: `<abbr title="Penjelasan">Singkatan</abbr>`

Teks Kecil
: `<small>Kecil</small>`

Teks Kode
: <code>\`Kode\`</code>

Teks Keyboard
: `<kbd>Keyboard</kbd> + <kbd>Keyboard</kbd>`

Teks Variable
: `<var>Variable</var> = <var>Variable</var> + 2`

Teks Defenisi
: `<dfn>Defenisi</dfn>`

Teks Quote
: `<q>Quote</q>`

Teks Samp
: `<samp>Hello, World!</samp>`

Teks Subscript
: `^Subscript^ | <sub>Subscript</sub>`

Teks Superscript
: `~Superscript~ | <sup>Superscript</sup>`

Teks Waktu
: `<time datetime="Format Waktu">Waktu</time>`  
  
  Format waktu:  
  - `yyyy-mm-dd`
  - `dd-mm-yyyy`

Teks Alamat
: `<address>Alamat</address>`

Teka Ruby
: `<ruby>Teks</ruby>`  
  Menambahkan rotasi teks cukup tambahkan `<rt>Teks</rt>` kedalam `<ruby>`.  

  Sebagai contoh:  
  `<ruby>日本語<rt>にほんご</rt></ruby>`
  
Teks Entitas
: `&copy; | &reg; | &trade; | &amp; | &lt; | &gt; | &nbsp; | &mdash; | &ndash; | &hellip; | &laquo; | &raquo; | &times; | &divide;`

## Teks Escape
Untuk membuat hasil render teks menjadi teks biasa, tambahkan `\` sebelum simbol.  
Sebagai contoh:  

```markdown
\*Tebal\*

\_Miring\_

\`Kode\`

\# Heading

\[Link\]

\\backslash
```

## Block Sintak
Untuk kode sintak yang model `block` / `paragraf`, bisa dilihat disini: [Block Sintak](/id/docs/reference/block-syntax/)

