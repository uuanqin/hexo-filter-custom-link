# hexo-filter-custom-link

Customize the rendered HTML of links. 
自定义链接渲染后的 HTML。

---

This plugin can unify the rendered HTML of Hexo links. 
By specifying special links, we can apply different templates.
If you want to customize [Obsidian](https://obsidian.md/) links,
try this plugin: [hexo-filter-titlebased-link](https://github.com/uuanqin/hexo-filter-titlebased-link).
For more on how to customize your HTML links, check out [my blog post](https://blog.uuanqin.top/p/8aa53d93/) (Written in Chinese).

插件可以统一 Hexo 链接渲染后的结果，还可以指定部分链接应用不同的 HTML 模板。
如果你想自定义 Obsidian 的双向连接，你可以试试这个插件： [hexo-filter-titlebased-link](https://github.com/uuanqin/hexo-filter-titlebased-link)。
更多自定义链接 HTML 的玩法可以参考我的博客文章 [自定义 Hexo 中的超链接样式](https://blog.uuanqin.top/p/8aa53d93/)。

## Installation

```shell
npm install hexo-filter-custom-link --save
```

Add this option in your `_config.yml`:

```yaml
# hexo-filter-custom-link
# https://github.com/uuanqin/hexo-filter-custom-link
custom_link:
  enable: true   # Enable this plugin
  general_template: ''
  custom_templates:
    - name: TEMP1
      template: '<a class="my-link-1" href="__URL__">__TEXT__</a>'
      spacing: 0
    - name: TEMP2
      template: '<a class="my-link-2" href="__URL__">__TEXT__</a>'
      spacing: 0
```

## Customize Your Links

The basic link rendering process in Hexo is:

```text
Markdown                     ====>      HTML
[name](https://example.com) ====>      <a href="https://example.com">name</a>
```

Plugins allow us to customize the rendered HTML of our links. 
By using placeholders like `__URL__` `__TEXT__`, we can design a custom template.

For example, if your option is:

```yaml
custom_link:
  enable: true   # Enable this plugin
  general_template: '<a class="my-link" href="__URL__">__TEXT__</a>'
```

Then the resultant HTML of the link will be:

```html
<a class="my-link" href="https://example.com">name</a>
```

## More Templates

You can add a template name to specify which template should be applied to the link.
The template name should be quoted by `%%` and is located in the start of link title.

For example, here is the Markdown text you wrote in the post: 

```markdown
[name](https://example.com "%%TEMP%%")
```

And your option is:

```yaml
custom_link:
  enable: true   # Enable this plugin
  general_template: '' # if yoy leave this option blank, generic links are not templated
  custom_templates:
    - name: TEMP
      template: '<a class="my-link-2" href="__URL__">__TEXT__</a>'
```

Then the resultant HTML of the link will be:

```html
<a class="my-link-2" href="https://example.com">name</a>
```

## Spacing

For complex templates, we can adjust the spacing to separate the HTML template from Markdown.

```yaml
custom_link:
  enable: true   # Enable this plugin
  general_template: '' # if you leave this option blank, generic links are not templated
  general_spacing: 0
  custom_templates:
    - name: TEMP
      template: ''
      spacing: 2
```

## Placeholders

A placeholder can be reused multiple times in a template.

Built-in placeholders:

- `__TEXT__` This is the link text.
- `__URL__` This is the target URL.
- `__TITLE__` This is the title of link.

We can add more custom placeholders whose name is quoted with `__`, 
and pass values to placeholders just as we do with URLs.

Here is an example:

```markdown
[name](url "%%TEMP%%PARAM1=val1&PARAM2=val2")
```

Your template can be:

```yaml
custom_link:
  enable: true   # Enable this plugin
  general_template: '' # if yoy leave this option blank, generic links are not templated
  general_spacing: 0
  custom_templates:
    - name: TEMP
      template: |
        <p>
          This is param1: __PARAM1__,
          This is param2: __PARAM2__.
        </p>
      spacing: 2
```

## Related Hexo Plugins

- [hexo-filter-titlebased-link](https://github.com/uuanqin/hexo-filter-titlebased-link): Transfer wiki links (based on the title) in Markdown files to permalink. 将基于标题的双向链接转换为 Hexo 设定的永久链接。
- [hexo-filter-link-post](https://github.com/tcatche/hexo-filter-link-post): Transfer relative post link in markdown file to post link. 将文件里的通过相对路径引用的 markdown 文件转为对应的文章的链接。

## License

[MIT](./LICENSE)

