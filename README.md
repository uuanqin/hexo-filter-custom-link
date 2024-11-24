# hexo-filter-custom-link

Customize the rendered HTML of Links. 自定义链接渲染后的 HTML。

## Customize Your Links

The plugin reserves several slots for custom HTML.

```js
`
${config.custom_html.before_tag}
    <a ${config.custom_html.link_attributes} href="/p/2024/04/12/14/18/50/">
        ${config.custom_html.before_text}
        my_post_1
        ${config.custom_html.after_text}
    </a>
${config.custom_html.after_tag}
`
```

For example, if your option is:

```yaml
titlebased_link:
  enable: true   # enable this plugin
  custom_html:
    link_attributes: 'class="my-link" title="example"'
    before_tag: '<p class="my-p"> Before the link '
    after_tag: ' After the link </p>'
    before_text: ''
    after_text: ''
```

Then the resultant HTML will be (the code below was formatted for ease of review):

```html
<p class="my-p"> 
    Before the link
    <a class="my-link" title="example" href="/p/2024/04/12/14/18/50/">this link</a>
    After the link 
</p>
```

## Related Hexo Plugins

- []()

## License

[MIT](./LICENSE)

