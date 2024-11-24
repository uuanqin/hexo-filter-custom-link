# hexo-filter-custom-link

Customize the rendered HTML of Links. 自定义链接渲染后的 HTML。

If you want to customize [Obsidian](https://obsidian.md/) links,
try this plugin: [hexo-filter-titlebased-link](https://github.com/uuanqin/hexo-filter-titlebased-link).

## Installation

```shell
npm install hexo-filter-custom-link --save
```

Add this option in your `_config.yml`:

```yaml
# hexo-filter-custom-link
# https://github.com/uuanqin/hexo-filter-custom-link
custom_link:
  enable: true   # enable this plugin
  custom_html:
    link_attributes: ''
    before_tag: ''
    after_tag: ''
    before_text: ''
    after_text: ''
```

## Customize Your Links

The basic link rendering process in Hexo is:

```text
Markdown                     ====>      HTML
[title](https://example.com) ====>      <a href="https://example.com">title</a>
```

The plugin reserves several slots for the custom HTML of the links.

```js
`
${config.custom_html.before_tag}
<a ${config.custom_html.link_attributes} href="https://example.com">
    ${config.custom_html.before_text}
    title
    ${config.custom_html.after_text}
</a>
${config.custom_html.after_tag}
`
```

For example, if your option is:

```yaml
custom_link:
  enable: true   # enable this plugin
  custom_html:
    link_attributes: 'class="my-link" title="example"'
    before_tag: '<p class="my-p"> Before the link '
    after_tag: ' After the link </p>'
    before_text: ''
    after_text: ''
```

Then the resultant HTML will be:

```html
<p class="my-p"> 
    Before the link
    <a class="my-link" title="example" href="https://example.com">title</a>
    After the link 
</p>
```

## Related Hexo Plugins

- [hexo-filter-titlebased-link](https://github.com/uuanqin/hexo-filter-titlebased-link): Transfer wiki links (based on the title) in Markdown files to permalink. 将基于标题的双向链接转换为 Hexo 设定的永久链接。
- [hexo-filter-link-post](https://github.com/tcatche/hexo-filter-link-post): Transfer relative post link in markdown file to post link. 将文件里的通过相对路径引用的 markdown 文件转为对应的文章的链接。

更多自定义链接 HTML 的玩法可以参考我的博客文章 [自定义 Hexo 中的超链接样式](https://blog.uuanqin.top/p/8aa53d93/)。

## License

[MIT](./LICENSE)

