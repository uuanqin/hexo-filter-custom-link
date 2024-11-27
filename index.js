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
        const re = /(?<!\!)\[([^\[\]]*?)\]\(([^\(\)\s]*?)(?:\s+(['"])([^'"\n]*?)\3)?\s*\)/g;
        post.content = post.content.replace(re, function (match, p1, p2, _, p4) {
            const replacements = {
                __TEXT__: p1,
                __URL__: p2,
                __TITLE__: p4 || ""
            };

            const template_name_re = /^\%\%([^\%\%]*)\%\%(.*)/g
            let temp_match = template_name_re.exec(replacements["__TITLE__"]);
            const template_name = (temp_match && temp_match[1]) || null;
            // log.info(replacements["__TITLE__"], template_name)

            if (!template_map[template_name]) {
                // Unrecognized keys are hidden in the link text
                return config.general_template === '' ?
                    match :
                    "\n".repeat(config.general_spacing) +
                    config.general_template.replace(/__\w+__/g, match => replacements[match] || match) +
                    "\n".repeat(config.general_spacing);
            }
            const path = temp_match[2];
            const params_re = /([^&=]+)=([^&]*)/g;
            let params_match;
            // log.info("Debug: ", template_name, path)
            while (params_match = params_re.exec(path)) {
                replacements["__" + params_match[1] + "__"] = params_match[2];
            }
            const spacingNum = template_map[template_name]["spacing"];
            return "\n".repeat(spacingNum) +
                template_map[template_name]["temp"].replace(/__\w+__/g, match => replacements[match] || match) +
                "\n".repeat(spacingNum);
        });
        return post;
    });
}
