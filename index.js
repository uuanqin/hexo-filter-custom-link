'use strict';

const config = hexo.config.custom_link = Object.assign({
    enable: false,
    general_template: "",
    custom_templates: []
}, hexo.config.custom_link);

const log = require('hexo-log').default({
    debug: false,
    silent: false
});

if (config.enable) {
    // Constructing a map
    var t
    const template_map = {}
    for (t of config.custom_templates) {
        template_map[t.name] = t.template
    }

    hexo.extend.filter.register("before_post_render", (post) => {
        const re = /(?<!\!)\[(?:\%\%([^\%\%]*)\%\%)?([^\[\]]*?)\]\(([^\(\)]*?)\)/g;
        post.content = post.content.replace(re, function (match, p1, p2, p3) {
            const replacements = {
                __NAME__: p1,
                __TEXT__: p2,
                __URL__: p3
            };
            const template_name = p1 || null;
            if (!template_map[template_name]) {
                // Unrecognized keys are hidden in the link text
                return config.general_template === '' ? match : config.general_template.replace(/__\w+__/g, match => replacements[match] || match);
            }
            return template_map[template_name].replace(/__\w+__/g, match => replacements[match] || match);
        });
        return post;
    });
}
