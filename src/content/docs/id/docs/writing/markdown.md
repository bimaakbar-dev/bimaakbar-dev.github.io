---
title: Markdown
description: Preview semua elemen typography di markdown
---

# H1 - The Quick Brown Fox
Lorem ipsum dolor sit amet consectetur adipisicing elit.

## H2 - The Quick Brown Fox
Lorem ipsum dolor sit amet consectetur adipisicing elit.

### H3 - The Quick Brown Fox
Lorem ipsum dolor sit amet consectetur adipisicing elit.

#### H4 - The Quick Brown Fox
Lorem ipsum dolor sit amet consectetur adipisicing elit.

##### H5 - The Quick Brown Fox
Lorem ipsum dolor sit amet consectetur adipisicing elit.

###### H6 - The Quick Brown Fox
Lorem ipsum dolor sit amet consectetur adipisicing elit.

## Paragraph
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

## Links
```markdown
[internal link](#)

[external link](external-url)

[`code link`](#)

[![badge](url-icon)](url-badge)

[![alt name](url-avatar) name](url-profile) 

[![name](url-avatar)](url-profile)
```

- [internal link](#)
- [external link](external-url)
- [`code link`](#)
- [![badge](/.github/assets/images/logo.svg)](/)
- [![alt name](../../../../../assets/images/author/bimaakbar.svg) name](/) 
- [![alt name](../../../../../assets/images/author/bimaakbar.svg)](/)

## Text Formatting
```markdown
<b>Bold</b>

<strong>Bold</strong>

<i>Italic</i>

<em>Italic</em>

<b><i>Bold Italic</i></b>

<strong><em>Bold Italic</em></strong>

<s>strikethrough</s>

<del>strikethrough</del>

~~strikethrough~~

<ins>inserted</ins>

<u>inserted</u>

<mark>highlighted</mark>

<small>small</small>

<abbr title="HyperText Markup Language">HTML</abbr>
```

- **Bold**
  - <b>Bold</b>
- *Italic*
  - <i>Italic</i>
- ***Bold + Italic***
  - <b><i>Bold + Italic</i></b>
- <s>strikethrough</s>
  - <del>strikethrough</del>
    - ~~strikethrough~~
- <ins>inserted</ins>
  - <u>inserted</u>
- <mark>highlighted</mark>
- <small>small</small>

<abbr title="HyperText Markup Language">HTML</abbr>

> [!WARNING]
> `abbr` masih bug

## Inline Typography
```markdown
<kbd>Ctrl</kbd> + <kbd>C</kbd>

<samp>Hello, World!</samp>

<var>x</var> = <var>y</var> + 2

<dfn>API</dfn>

`inline code`

Dia berkata <q>ini adalah quote pendek</q> di dalam paragraf.
```

- <kbd>Ctrl</kbd> + <kbd>C</kbd>
- <samp>Hello, World!</samp>
- <var>x</var> = <var>y</var> + 2
- <dfn>API</dfn>
- `inline code`
- Dia berkata <q>ini adalah quote pendek</q> di dalam paragraf.

## Blockquote
```markdown
> Lorem ipsum dolor sit amet, consectetur adipiscing elit.

> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
>
> <cite>John Doe, Penulis</cite>
```

> Lorem ipsum dolor sit amet, consectetur adipiscing elit.

> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
>
> <cite>John Doe, Penulis</cite>

## Subscript & Superscript
```markdown
H<sub>2</sub>O dan CO<sub>2</sub>

x<sup>2</sup> + y<sup>2</sup> = z<sup>2</sup>
```

- H<sub>2</sub>O dan CO<sub>2</sub>
- x<sup>2</sup> + y<sup>2</sup> = z<sup>2</sup>

Footnote: footnote[^1] dan footnote[^2].

## Time & Address
```markdown
<time datetime="2026-05-13">13 May 2026</time>

<address>Jl. Sudirman No. 123, Jakarta</address>
```

- <time datetime="2026-09-12">12 September 2026</time>
- <address>Jl. Sudirman No. 123, Jakarta</address>
 
## Ruby
```markdown
<ruby>日本語<rt>にほんご</rt></ruby>
```

- <ruby>日本語<rt>にほんご</rt></ruby>

## Lists

### Unordered List
```markdown
- Item 1
- Item 2
    - Nested item 2.1
    - Nested item 2.2
      - Nested item 2.2.1
      - Nested item 2.2.2
- Item 3
```

- Item 1
- Item 2
    - Nested item 2.1
    - Nested item 2.2
      - Nested item 2.2.1
      - Nested item 2.2.2
- Item 3

### Ordered List
```markdown
1. First item
2. Second item
      1. Nested ordered 2.1
      2. Nested ordered 2.2
3. Third item
```

1. First item
2. Second item
      1. Nested ordered 2.1
      2. Nested ordered 2.2
3. Third item

### Task List
```markdown
- [x] Task yang sudah selesai
- [ ] Task yang belum selesai
- [ ] Task lain dengan **bold** dan `code`
- [x] Task dengan [link](#)
```

- [x] Task yang sudah selesai
- [ ] Task yang belum selesai
- [ ] Task lain dengan **bold** dan `code`
- [x] Task dengan [link](#)

### Definition List
```markdown
HTML
: HyperText Markup Language adalah bahasa markup untuk web

CSS
: Cascading Style Sheets untuk styling

API
: Application Programming Interface

`code-term`
: Definisi untuk istilah yang berupa `code`

// Atau

<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language adalah bahasa markup untuk web</dd>
  
  <dt>CSS</dt>
  <dd>Cascading Style Sheets untuk styling</dd>
  
  <dt>API</dt>
  <dd>Application Programming Interface</dd>
  
  <dt><code>code-term</code></dt>
  <dd>Definisi untuk istilah yang berupa <code>code</code></dd>
</dl>
```

<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language adalah bahasa markup untuk web</dd>
  
  <dt>CSS</dt>
  <dd>Cascading Style Sheets untuk styling</dd>
  
  <dt>API</dt>
  <dd>Application Programming Interface</dd>
  
  <dt><code>code-term</code></dt>
  <dd>Definisi untuk istilah yang berupa <code>code</code></dd>
</dl>

## Images & Media
```markdown
![Alt text image](/.github/assets/images/banner.jpg)

<figure>
  <img src="/.github/assets/banner.jpg" alt="Alt text figure" />
  <figcaption>Ini adalah figcaption untuk figure di atas.</figcaption>
</figure>

<video title="Video" poster="/.github/assets/images/banner.jpg" width={720} height={480} controls="true" muted="true" autoplay="true" loop="false" preload>
  <source src="/.github/assets/videos/video.mp4" />
</video>
```

![Alt text image](/.github/assets/images/banner.jpg)

<figure>
  <img src="/.github/assets/images/banner.jpg" alt="Alt text figure" />
  <figcaption>Ini adalah figcaption untuk figure di atas.</figcaption>
</figure>

<video title="Video" poster="/.github/assets/images/banner.jpg" width={720} height={480} controls="true" muted="true" autoplay="true" loop="false" preload>
  <source src="/.github/assets/videos/video.mp4" />
</video>

## Table

```markdown
| Column 1 | Column 2 | Column 3 |
| :---- | :----- | :----- |
| Data 1 | Data 2 | Data 3 |
| Data 1 | Data 2 | Data 3 |

// Atau

<table>
  <thead>
    <th>Column 1</th>
    <th>Column 2</th>
    <th>Column 3</th>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
      <td>Data 3</td>
    </tr>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
      <td>Data 3</td>
    </tr>
  </tbody>
</table>
```

<table>
  <thead>
    <th>Column 1</th>
    <th>Column 2</th>
    <th>Column 3</th>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
      <td>Data 3</td>
    </tr>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
      <td>Data 3</td>
    </tr>
  </tbody>
</table>

## Details & Summary

```markdown
<details>
<summary>Click untuk buka details</summary>

Ini adalah content di dalam details. Bisa ada **bold**, `code`, dan [link](#).

- List di dalam details
- Item 2

> Blockquote di dalam details

</details>
```

<details>
<summary>Click untuk buka details</summary>

Ini adalah content di dalam details. Bisa ada **bold**, `code`, dan [link](#).

- List di dalam details
- Item 2

> Blockquote di dalam details

</details>

## Horizontal Rule

```markdown
Di atas ada hr.

---

Di bawah ada hr.

---
```

Di atas ada hr.

---

Di bawah ada hr.

---

[^1]: Ini adalah footnote pertama dengan **bold** dan `code`.
[^2]: Footnote kedua dengan [link](https://example.com).