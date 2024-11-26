'use strict';

const config = hexo.config.custom_link = Object.assign({
    enable: false,
    general_template: "",
    general_spacing: 0,
    custom_templates: []
}, hexo.config.custom_link);

const log = require('hexo-log').default({
    debug: false,
    silent: false
});

if (config.enable) {
    // Constructing a map
    const template_map = {}
    if (config.custom_templates) {
        var t
        for (t of config.custom_templates) {
            template_map[t.name] = {
                "temp": t.template,
                "spacing": t.spacing || 0
            }
        }
    }

    hexo.extend.filter.register("before_post_render", (post) => {
        const re = /(?<!\!)\[(?:\%\%([^\%\%]*)\%\%)?([^\[\]]*?)\]\(([^\(\)\s]*?)(?:\s+\"([^\"\n]*)?\"\s*)?\)/g;
        post.content = post.content.replace(re, function (match, p1, p2, p3,p4) {
            const replacements = {
                __NAME__: p1,
                __TEXT__: p2,
                __URL__: p3,
                __TITLE__: p4 || ""
            };
            const template_name = p1 || null;
            if (!template_map[template_name]) {
                // Unrecognized keys are hidden in the link text
                return config.general_template === '' ?
                    match :
                    "\n".repeat(config.general_spacing) +
                    config.general_template.replace(/__\w+__/g, match => replacements[match] || match) +
                    "\n".repeat(config.general_spacing);
            }
            const spacingNum = template_map[template_name]["spacing"];
            return "\n".repeat(spacingNum) +
                template_map[template_name]["temp"].replace(/__\w+__/g, match => replacements[match] || match) +
                "\n".repeat(spacingNum);
        });
        return post;
    });
}
