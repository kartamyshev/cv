const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const Handlebars = require('handlebars');
const utils = require('jsonresume-themeutils')
const markdown = require('markdown-it')({ 
    breaks: true 
}).use(require('markdown-it-abbr'));

const htmlFilePath = path.join(__dirname, 'index.html');
const htmlTemplate = fs.readFileSync(htmlFilePath, 'utf-8');
const template = Handlebars.compile(htmlTemplate);

function render(resume) {
    const addressAttrs = ['address', 'city', 'region', 'countryCode', 'postalCode'];
    const addressValues = addressAttrs.map(key => resume.basics.location[key]);
    const css = fs.readFileSync(__dirname + '/assets/css/theme.css', 'utf-8');
    
    resume.basics.picture = utils.getUrlForPicture(resume);
    resume.basics.summary = convertMarkdown(resume.basics.summary);
    resume.basics.computed_location = _.compact(addressValues).join(', ');

    _(resume.basics.profiles).forEach(p => {
        const label = p.network.toLowerCase();

        p.url = utils.getUrlForProfile(resume, label);
        p.label = label;
    });

    _(resume.work).forEach(work_info => {
        work_info.highlights = _(work_info.highlights)
        .map(convertMarkdown)
    });

    return template({ ...resume, css });
}

function convertMarkdown(str) {
    if (str != null) {
        return markdown.render(str);
    }
}

module.exports = { render };