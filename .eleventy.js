module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/gfx");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/swf");
    eleventyConfig.addPassthroughCopy("src/games/deserted-space")
    eleventyConfig.addPassthroughCopy("src/games/goldbergborous")

    return  {
        dir: {
            input: "src",
            includes: "_includes",
            layouts: "_layouts"
        }
    }
};
