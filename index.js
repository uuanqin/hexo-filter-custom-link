'use strict';

const config = hexo.config.custom_link = Object.assign({
    enable: false,
    custom_html: {
        link_attributes: "",
        before_tag: "",
        after_tag: "",
        before_text: "",
        after_text: ""
    }
}, hexo.config.custom_link);

const log = require('hexo-log').default({
    debug: false,
    silent: false
});

if (config.enable) {

    hexo.extend.filter.register("before_post_render", (post) => {
        const re = /(?<!\!)\[([^\[\]]*?)\]\(([^\(\)]*?)\)/g;
        post.content = post.content.replace(re, function (match, p1, p2) {
            const text = p1;
            const url = p2;
            // log.info("hexo-custom-link: ", p1,p2);
            return `${config.custom_html.before_tag}<a ${config.custom_html.link_attributes} href="${url}">${config.custom_html.before_text}${text}${config.custom_html.after_text}</a>${config.custom_html.after_tag}`;
        });
        return post;
    });
}
