Getting Started
This guide will help you get Sveltia CMS up and running quickly. Follow the steps below to install, configure, test, and deploy Sveltia CMS.

Migrating from Netlify CMS, Decap CMS or Static CMS? Check out the Migration Guides for specific instructions.

Stable Version Not Yet Available

Sveltia CMS is still in beta. Although it’s already being used by various organizations and individuals in production, there might still be breaking changes before the stable 1.0 release. We recommend keeping an eye on the release information for any updates.

No Free Setup Support

Sveltia CMS is specifically designed as a replacement for Netlify/Decap CMS. We are happy to help you migrate, but we can’t help you set up Sveltia CMS from scratch through our free support channels. Questions about installation or initial configuration may go unanswered.

1. Install
You can use either a starter template or manually install Sveltia CMS into your existing project.

Starter Templates
While we don’t have official starter templates yet, the community has created several templates for popular frameworks. Here are some you can try:

Astro
Astros by zanhk
Astro i18n Starter by yacosta738
Eleventy
Eleventy starter template by danurbanowicz
ZeroPoint by MWDelaney
Sveleven by anydigital
Hugo
Hugo module by privatemaker
Hugolify by sebousan
Zola
Zola Sveltia Source by husenunicorn
Other Frameworks
The Netlify/Decap CMS website has more templates and examples. You can probably use one of them and replace the CMS script since they are largely compatible.

Disclaimer

These third-party resources are not necessarily reviewed by the Sveltia CMS team. We are not responsible for their maintenance or support. Please contact the respective authors for any issues or questions.

Manual Installation
Even without a starter template, you can easily add Sveltia CMS to your existing project. Follow the steps below to set it up.

Sveltia CMS requires a static files folder to serve the admin interface, configuration file, and media assets. First, you need to identify or create your static files folder. This folder is typically named public or static, depending on your framework or static site generator. If the static folder does not exist, create it in the root of your project.

Create a folder named admin (or any name you prefer) inside your site’s static files folder. Then, under the folder, create an index.html file and a config.yml file with the following content:


index.html

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex" />
    <title>Sveltia CMS</title>
  </head>
  <body>
    <script src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js"></script>
  </body>
</html>

config.yml

# yaml-language-server: $schema=https://unpkg.com/@sveltia/cms/schema/sveltia-cms.json

backend:
  name: github
  repo: user/repo

media_folder: /static/media
public_folder: /media

collections:
  - name: posts
    label: Posts
    folder: /content/posts
    fields:
      - { label: Title, name: title, widget: string }
      - { label: Body, name: body, widget: markdown }
The structure should look like this, if the static files folder is named static:


.
└─ static/           # Static files folder
   └─ admin/         # Admin folder
      ├─ index.html  # CMS interface
      └─ config.yml  # CMS configuration
Install YAML Extension for VS Code (Optional)
If you use VS Code as your code editor, it’s recommended to install the YAML extension. This extension provides syntax highlighting, validation, and autocompletion for YAML files, including the Sveltia CMS configuration file. The config.yml file includes a schema reference that the extension can use to provide better support.

Add llms.txt to AI Tools (Optional)
This documentation site provides llms.txt files that you can use with AI tools like GitHub Copilot, Claude and ChatGPT to help them understand Sveltia CMS better. See AI Tools Support for details.

2. Configure
Once you have the basic setup ready, you can customize the configuration file to suit your needs. It allows you to set up various aspects of Sveltia CMS, including backend, media storage, collections, and internationalization.

Backend
Choose one of the following Git-based backends for Sveltia CMS:

GitHub
GitLab
Gitea/Forgejo
In most cases, you will need to register an application with the service provider (e.g. GitHub, GitLab) to obtain OAuth credentials. Follow the instructions in your chosen backend’s guide for more details.

Media Storage
You should configure at least one media storage provider, either internal or external, to manage your media assets such as images and files. Follow the instructions in your chosen storage provider’s guide for more details.

Collections
You need to define at least one collection in the configuration file to manage your content. Collections represent different types of content, such as blog posts, pages, or products. Each collection can have its own folder, fields, and settings.

Before defining collections, you need to think about your content model and how you want to organize your content in the repository. Check out the Content Modeling Guide for tips on how to design your content model.

Also, consider how your framework or static site generator handles content files. Refer to the documentation of your framework for best practices on organizing content files. Some frameworks may have specific requirements or recommendations for content structure and file formats.

Now, you can define collections in the configuration file. Refer to the Collections Guide for more information on how to set up collections.

Internationalization (I18n)
If you build a multilingual site, you can configure Sveltia CMS to support multiple languages. Even if your site is monolingual at this moment, setting up i18n from the beginning can make it easier to add more languages in the future. Refer to the Internationalization Guide for instructions on how to set up i18n in Sveltia CMS.

Some frameworks and static site generators have built-in support for i18n, while others may require additional plugins or libraries. Check the documentation of your framework for guidance on how to implement i18n.

3. Develop
Before deploying Sveltia CMS to production, it’s a good idea to test it locally to ensure everything is working as expected.

Test with Local Workflow
Use the Local Workflow to test Sveltia CMS on your local machine before deploying it to production. You can update the configuration file, add contents and assets, see if the output is as expected, and troubleshoot any issues that arise.

Update Your Site Code
Depending on your framework, you may need to update your site to properly load and display the content managed by Sveltia CMS. Refer to your framework’s documentation for instructions on how to develop your site. We also provide some framework-specific guides to help you get started.

Set Up Content Security Policy
If your site uses a Content Security Policy (CSP), you need to update it to allow Sveltia CMS to function properly. See the CSP Guide for the required directives and values.

4. Deploy
Once you’re satisfied with your local setup, you can deploy your site along with Sveltia CMS to your preferred hosting provider.

Deploy to Production
Follow the deployment instructions for your chosen framework or static site generator to deploy your site to production. Ensure that the static files folder containing Sveltia CMS is included in the deployment process.

Access the Admin Interface
Access the Sveltia CMS admin user interface and log in using the authentication method provided by your chosen backend (e.g. GitHub, GitLab). You should now be able to manage your content through Sveltia CMS.

Invite Team Members
To collaborate with others, you need to invite them to your repository on the backend service you are using (e.g. GitHub, GitLab). Ensure that they have write permission to manage content through Sveltia CMS.

Then, share the admin interface URL with them so they can access Sveltia CMS.

Please note that Sveltia CMS does not officially support multi-user scenarios yet. Be cautious when multiple users are editing content simultaneously, as it may lead to merge conflicts or unintended overwrites. We recommend coordinating with your team to avoid concurrent edits on the same content.

Iterate and Improve
As you continue to develop your site, you can update the CMS configuration as needed. Use the Local Workflow to test changes before deploying them to production, so you can ensure a smooth content management experience for your team.