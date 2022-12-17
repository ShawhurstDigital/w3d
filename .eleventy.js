// * JS Refactor to config/11ty  * //
// * https://github.com/madrilene/eleventy-excellent * //

// * Require 11ty Plugins * //

// * Long DateTime Issue * //
const { DateTime } = require('luxon');

// * Navbar plugin * //
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');

// * Export Functions * //
module.exports = function (eleventyConfig) {

  // * Add Plugins Here * //

  // * Navbar plugin * //
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // * Add PassThroughCopy Here * //

  // * Assets - pass through existing, trigger new build on any change* //

  // allows css, assets, and CMS config files to be passed into /public
  eleventyConfig.addPassthroughCopy('./src/css/**/*.css');
  eleventyConfig.addPassthroughCopy('./src/assets');
  eleventyConfig.addPassthroughCopy('./src/admin');
  eleventyConfig.addPassthroughCopy('.src/_redirects');

  // Put robots.txt in root
  eleventyConfig.addPassthroughCopy({ 'src/robots.txt': '/robots.txt' });

  // watch CSS files for changes - doesn't trigger 11ty rebuild
  eleventyConfig.setBrowserSyncConfig({
    files: './public/css/**/*.css',
  });

  // * Shortcodes * //

  // * Filters * //

  // (https://moment.github.io/luxon/api-docs/index.html#datetime)
  // * Long DateTime Issue * //
  eleventyConfig.addFilter('postDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      output: 'public',
    },
    // allows .html files to contain nunjucks templating language
    htmlTemplateEngine: 'njk',
  };
};
