module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("gfx");
    eleventyConfig.addPassthroughCopy("js");

    return  {
        dir: {
            //input: "src",
            includes: "_includes",
            layouts: "_layouts"
        }
    }
};
