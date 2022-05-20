module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/gfx");
    eleventyConfig.addPassthroughCopy("src/js");

    return  {
        dir: {
            input: "src",
            includes: "_includes",
            layouts: "_layouts"
        }
    }
};
