---
title: "Markdown"
description: "Pelajari cara menulis konten Markdown di Stradocs."
---

Berikut adalah contoh beberapa sintaks dasar Markdown yang dapat digunakan saat menulis konten Markdown di Astro.

## Headings

Elemen HTML `<h1>` hingga `<h6>` berikut merepresentasikan enam tingkat judul bagian. `<h1>` merupakan tingkat bagian tertinggi, sedangkan `<h6>` adalah yang terendah.

# H1

## H2

### H3

#### H4

##### H5

###### H6

## Paragraph

Xerum, quo qui aut unt expliquam qui dolut labo. Aque venitatiusda cum, voluptionse latur sitiae dolessi aut parist aut dollo enim qui voluptate ma dolestendit peritin re plis aut quas inctum laceat est volestemque commosa as cus endigna tectur, offic to cor sequas etum rerum idem sintibus eiur? Quianimin porecus evelectur, cum que nis nust voloribus ratem aut omnimi, sitatur? Quiatem. Nam, omnis sum am facea corem alique molestrunt et eos evelece arcillit ut aut eos eos nus, sin conecerem erum fuga. Ri oditatquam, ad quibus unda veliamenimin cusam et facea ipsamus es exerum sitate dolores editium rerore eost, temped molorro ratiae volorro te reribus dolorer sperchicium faceata tiustia prat.

Itatur? Quiatae cullecum rem ent aut odis in re eossequodi nonsequ idebis ne sapicia is sinveli squiatum, core et que aut hariosam ex eat.

## Images

### Syntax

```markdown
![Alt text](./full/or/relative/path/of/image)
```

### Output

![blog placeholder](../../../../../assets/images/blog/blog-placeholder-about.jpg)

## Blockquotes

Elemen `blockquote` merepresentasikan konten yang dikutip dari sumber lain, yang dapat disertai dengan kutipan sumber (yang wajib berada di dalam elemen `footer` atau `cite`) serta perubahan sebaris seperti anotasi dan singkatan.

### Blockquote without attribution

#### Syntax

```markdown
> Tiam, ad mint andaepu dandae nostion secatur sequo quae.  
> **Perhatikan** bahwa Anda dapat menggunakan _sintaks Markdown_ di dalam blockquote.
```

#### Output

> Tiam, ad mint andaepu dandae nostion secatur sequo quae.  
> **Perhatikan** bahwa Anda dapat menggunakan _sintaks Markdown_ di dalam blockquote.

### Blockquote with attribution

#### Syntax

```markdown
> Jangan berkomunikasi dengan berbagi memori, berbagilah memori dengan berkomunikasi.<br>
> — <cite>Rob Pike[^1]</cite>
```

#### Output

> Jangan berkomunikasi dengan berbagi memori, berbagilah memori dengan berkomunikasi.<br>
> — <cite>Rob Pike[^1]</cite>

[^1]: Kutipan di atas diambil dari [ceramah](https://www.youtube.com/watch?v=PAAkCSZUG1c) Rob Pike pada acara Gopherfest, 18 November 2015.

## Tables

### Syntax

```markdown
| Italics   | Bold     | Code   |
| --------- | -------- | ------ |
| _italics_ | **bold** | `code` |
```

### Output

| Italics   | Bold     | Code   |
| --------- | -------- | ------ |
| _italics_ | **bold** | `code` |

## Code Blocks

### Syntax

Kita bisa menggunakan tiga tanda backtick (```) pada baris baru, menuliskan potongan kode (snippet), lalu menutupnya dengan tiga tanda backtick lagi di baris baru; untuk menyoroti sintaks bahasa tertentu, tuliskan nama bahasa tersebut (satu kata) setelah tiga tanda backtick yang pertama, misalnya: html, javascript, css, markdown, typescript, txt, atau bash.

````markdown
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Contoh Dokumen HTML5</title>
  </head>
  <body>
    <p>Test</p>
  </body>
</html>
```
````

### Output

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Contoh Dokumen HTML5</title>
  </head>
  <body>
    <p>Test</p>
  </body>
</html>
```

## List Types

### Ordered List

#### Syntax

```markdown
1. Butir pertama
2. Butir kedua
3. Butir ketiga
```

#### Output

1. Butir pertama
2. Butir kedua
3. Butir ketiga

### Unordered List

#### Syntax

```markdown
- Butir daftar
- Butir lainnya
- Dan butir lainnya
```

#### Output

- Butir daftar
- Butir lainnya
- Dan butir lainnya

### Nested list

#### Syntax

```markdown
- Fruit
  - Apple
  - Orange
  - Banana
- Dairy
  - Milk
  - Cheese
```

#### Output

- Fruit
  - Apple
  - Orange
  - Banana
- Dairy
  - Milk
  - Cheese

## Elemen Lainnya — abbr, sub, sup, kbd, mark

### Syntax

```markdown
<abbr title="Graphics Interchange Format">GIF</abbr> adalah format gambar bitmap..

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Press <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>Delete</kbd> to end the session.

Most <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and other small creatures.
```

### Output

<abbr title="Graphics Interchange Format">GIF</abbr> adalah format gambar bitmap..

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Press <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>Delete</kbd> to end the session.

Most <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and other small creatures.
