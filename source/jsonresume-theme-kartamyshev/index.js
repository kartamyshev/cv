const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const Handlebars = require('handlebars');
const utils = require('jsonresume-themeutils');
const moment = require('moment');
const markdown = require('markdown-it')({ 
    breaks: true 
}).use(require('markdown-it-abbr'));

const templatePath = path.join(__dirname, 'index.hbs');
const template = fs.readFileSync(templatePath, 'utf-8');
const subTemplates = [
    'about', 
    'work-experience', 
    'skills', 
    'education', 
    'interests', 
    'contact-details',
    'social-links',
    'floating-nav',
    'scripts',
];

require('./moment-precise-range.js');
utils.setConfig({ date_format: 'MMM, YYYY' });

const registerSubTemplate = (name) => {
    Handlebars.registerPartial(
        name,
        fs.readFileSync(path.join(path.join(__dirname, 'partials'), `${name}.hbs`), 'utf-8')
    );
};

subTemplates.forEach(registerSubTemplate);

function render(resume) {
    const addressAttrs = ['address', 'city', 'region', 'countryCode', 'postalCode'];
    const addressValues = addressAttrs.map(key => resume.basics.location[key]);
    const css = fs.readFileSync(__dirname + '/assets/css/theme.css', 'utf-8');
    
    resume.basics.picture = utils.getUrlForPicture(resume);
    resume.basics.summary = convertMarkdown(resume.basics.summary);
    resume.basics.computed_location = _.compact(addressValues).join(', ');

    _(resume.basics.profiles).forEach(profile => {
        const label = profile.network.toLowerCase();

        profile.url = utils.getUrlForProfile(resume, label);
        profile.title = profile.url.endsWith('.pdf') ? 'Download .pdf file' : `${resume.basics.name} on ${profile.network}`;
        profile.label = label;
    });

    _(resume.work).forEach(work_info => {
        const start_date = moment(work_info.startDate, 'YYYY-MM-DD');
        const end_date = moment(work_info.endDate, 'YYYY-MM-DD');
        const can_calculate_period = start_date.isValid() && end_date.isValid();

        if (can_calculate_period) {
            work_info.duration = work_info.endDate != null && end_date.isValid()
            ? moment.preciseDiff(start_date, end_date)
            : moment.preciseDiff(start_date, moment());
        }

        if (start_date.isValid()) {
            work_info.startDate = utils.getFormattedDate(start_date);
        }

        if (end_date.isValid()) {
            work_info.endDate = utils.getFormattedDate(end_date);
        }

        work_info.summary = convertMarkdown(work_info.summary);

        work_info.highlights = _(work_info.highlights).map(convertMarkdown)
    });

    _(resume.skills).forEach(skill_info => {
        const levels = ['Beginner', 'Intermediate', 'Advanced', 'Master'];
        skill_info.keywords = _(skill_info.keywords)
            .map(convertMarkdown);

        if (skill_info.level) {
            skill_info.skill_class = skill_info.level.toLowerCase();
        }
    });

    _(resume.education).forEach(education_info => {
        ['startDate', 'endDate'].forEach(type => {
            const date = education_info[type];

            if (date) {
                education_info[type] = utils.getFormattedDate(date);
            }
        });
    });

    return Handlebars.compile(template)({ ...resume, css })
}

function convertMarkdown(str) {
    if (str != null) {
        return markdown.render(str);
    }
}

module.exports = { render };