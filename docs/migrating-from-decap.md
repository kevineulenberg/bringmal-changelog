Migrating from Netlify CMS or Decap CMS
Sveltia CMS is designed as a modern successor to Netlify CMS (now Decap CMS). If you are currently using Netlify/Decap CMS, you can migrate to Sveltia CMS to take advantage of its hundreds of improvements across the board, including better performance, a more intuitive user interface, enhanced asset management, improved i18n support, and more.

Stable Version Not Yet Available

Sveltia CMS is still in beta. Although it’s already being used by various organizations and individuals in production, there might still be breaking changes before the stable 1.0 release. We recommend keeping an eye on the release information for any updates.

Limited Feature Parity

Some features from Netlify/Decap CMS, including Editorial Workflow and Git Gateway, are not yet implemented or will not be implemented in Sveltia CMS. Please check the compatibility section below to see if your use case is supported.

Compatibility
We are working to make Sveltia CMS compatible with Netlify/Decap CMS wherever possible so that more users can seamlessly switch to our modern successor. In some casual use cases, Sveltia CMS can be used as a drop-in replacement for Netlify/Decap CMS with just a one-line code update.

However, 100% feature parity is never planned, and some features are still missing or will not be added due to deprecation and other factors. Look at the compatibility info below to see if you can migrate now or in the near future.

Current Limitations
We are working hard to implement several missing features from Netlify/Decap CMS. Check our release notes and Bluesky for updates.

The following features are not yet implemented and will be added before the 1.0 release:

Preview for custom editor components (CMS.registerEditorComponent)
Custom field types (CMS.registerWidget)
Custom preview templates (CMS.registerPreviewTemplate) (#51)
Comprehensive CMS config validation
Localization of the admin UI
Due to the complexity, we have decided to defer the following features to the 1.x or 2.0 release expected by mid-2026. Netlify/Decap CMS has dozens of open issues with these collaboration and beta features — we want to implement them the right way.

Editorial workflow
Open authoring
Nested collections (beta)
Features Not To Be Implemented
The following Netlify/Decap CMS features will not be added to Sveltia CMS, primarily due to considerations relating to their deprecation.

Git Gateway backend: Git Gateway is now officially deprecated by Netlify. Due to its performance limitations, we don’t plan to support it anyway. However, we plan to develop a GraphQL-based high-performance alternative in the future to provide a migration path for existing Git Gateway users.
Netlify Identity Widget: It’s not useful without Git Gateway, and the Netlify Identity service itself has been deprecated. We plan to develop an alternative solution with role support in the future.
Azure DevOps and Bitbucket backends: For performance reasons. We’ll support these platforms if their APIs improve to allow the CMS to fetch multiple entries at once. Consider migrating to GitHub, GitLab, Gitea or Forgejo if you’d like to use Sveltia CMS now.
Gatsby plugin: In light of Gatsby’s uncertainty, we won’t be investing time in developing a plugin for it. Gatsby users can still create index.html themselves. Note: We don’t support Netlify Identity Widget; the favicon can be specified with the logo.src option.
The deprecated client-side implicit grant for the GitLab backend: It has already been removed from GitLab 15.0. Use the client-side PKCE authorization instead.
The deprecated Netlify Large Media service: Consider other media storage providers.
Deprecated camel case configuration options: Use snake case instead, according to the current Decap CMS document.
Entry Collection: sortableFields
DateTime widget: dateFormat, timeFormat, pickerUtc
Markdown widget: editorComponents
Number widget: valueType
Relation widget: displayFields, searchFields, valueField
Note: Some other camel case options, including Color widget options, are not deprecated and will continue to work.
The deprecated Date widget: It was removed from Decap CMS 3.0 and Sveltia CMS 0.10. Use the DateTime widget with the time_format: false option instead.
The allow_multiple option for the File and Image widgets: It’s a confusing option that defaults to true, and there is a separate option called media_library.config.multiple. We have added the new multiple option instead, which is more intuitive and works with all media storage providers.
The theme and keymap inline settings for the Code widget, along with support for some languages. Instead of CodeMirror, we use Lexical’s code block functionality powered by Prism, which is slated to be replaced by Shiki.
Remark plugins for the Markdown widget: Not compatible with our Lexical-based rich text editor.
The use_secure_url option for the Cloudinary media storage: Insecure URLs should never be used.
The deprecated Uploadcare jQuery File Uploader: Sveltia CMS uses the Uploadcare API to integrate the service to solve some issues. Users are prompted to enter their secret key to use the integration. This means the features found in the pre-built widget are currently unavailable. We plan to support some third-party upload sources, camera access and image editing in the future.
An absolute URL in the public_folder option: Such configuration is not recommended, as stated in the Netlify/Decap CMS document.
Performance-related options: Sveltia CMS has drastically improved performance with GraphQL enabled by default, so these are no longer relevant:
Global: search
Backend: use_graphql
Relation widget: options_length
Local proxy server: Our local repository workflow eliminates the need for a proxy server. For security and performance reasons, we don’t support netlify-cms-proxy-server or decap-server. The local_backend option is ignored.
The global locale option and CMS.registerLocale() method: Sveltia CMS automatically detects the user’s preferred language and changes the UI locale.
Undocumented methods exposed on the CMS object: This includes custom backends and custom media storage providers, if any. We may support these features in the future, but our implementation would likely be incompatible with Netlify/Decap CMS.
Any other undocumented features and options. Exceptions apply.
Other Breaking Changes
There are some differences in behavior between Sveltia CMS and Netlify/Decap CMS that may affect your existing configuration or content.

Decap CMS 3.1.1 replaced Moment.js with Day.js for date handling, and In Sveltia CMS followed suit. Since Day.js tokens are not 100% compatible with Moment.js tokens, this could be a breaking change in certain cases. Check your format, date_format and time_format options for DateTime fields, as well as any date formatting in string transformations.
By default, Sveltia CMS does not slugify uploaded filenames, as mentioned in the asset management section. If your site generator expects hyphenated filenames, you can enable the slugify_filename internal media storage option.
In some cases, the data output of Sveltia CMS may differ from that of Netlify/Decap CMS. Notably, Sveltia CMS does not omit empty optional fields by default. If you have data validation in your site generator, this could cause issues. Use the omit_empty_optional_fields output option if needed.
Sveltia CMS requires a secure context, meaning it only works with HTTPS, localhost or 127.0.0.1 URLs. If you’re running your own remote server and serving content over HTTP, the CMS will not work. We recommend obtaining a TLS certificate from Let’s Encrypt.
In Sveltia CMS, the sanitize_preview option for the Markdown widget is set to true by default to prevent potential XSS attacks via entry previews. We recommend keeping this option enabled unless disabling it fixes a broken preview and you fully trust all users of your CMS.
In Sveltia CMS, the create option for folder collections defaults to true because, in 99.99% of cases, users want to create new entries and adding create: true to every collection is redundant. To disable entry creation, set create: false explicitly.
We provide only one npm package, @sveltia/cms, which includes all necessary code, while Netlify/Decap CMS provides many packages. This means import statement migration is not always straightforward. See the migration steps for details.
There may be other minor differences in behavior that are not listed here.

Sveltia CMS is also adding various config validation checks to help users identify potential issues, so you may see errors that were not present in Netlify/Decap CMS before. For example, Sveltia CMS raises an error if the slug collection option contains slashes (/), which is supposed to be invalid.

Let us know if you have encounter any compatibility issues not mentioned above. We want to make the migration process as smooth as possible for our users.

Migration Steps
Preparation
Check the compatibility info above to see if your site can be migrated now or in the near future. If there are no blockers, let’s move on to the migration steps.

Updating Configuration
Make necessary changes if needed, such as updating your configuration file.

Dealing with Unsupported Features
If you’re using any features listed in the current limitations section, you’ll need to wait until they are implemented in Sveltia CMS. We’re working hard to add these features in the coming months.

If you’re using any features that are not going to be implemented, you’ll need to find a workaround. For example, if you’re on Azure DevOps or Bitbucket, consider migrating to GitHub, GitLab, Gitea or Forgejo. See the next section if you’re a Git Gateway user.

Migrating from Git Gateway Backend
Sveltia CMS does not support the deprecated Git Gateway backend. If you don’t care about user management with Netlify Identity, you can use the GitHub or GitLab backend instead.

To allow other people to edit content, simply invite them to your GitHub repository with the write role assigned. Please note, however, that Sveltia CMS hasn’t implemented any mechanisms to prevent conflicts in multi-user scenarios.

Once you have migrated from the Git Gateway and Netlify Identity combo, you can remove the Netlify Identity Widget script tag from your HTML:


-<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
If you want to stay with Git Gateway and Netlify Identity, unfortunately you can’t migrate to Sveltia CMS right now. We plan to develop an alternative solution in the future.

Switching to Sveltia CMS
Now, it’s time to switch to Sveltia CMS. Depending on how you included Netlify/Decap CMS in your project, follow the appropriate instructions below.

Using CDN
Update the Sveltia CMS script URL in your index.html file:

From Netlify CMS:


-<script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
+<script src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js"></script>
From Decap CMS:


-<script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
+<script src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js"></script>
Next, let’s test Sveltia CMS on your local machine. If everything looks good, push the change to your repository.

You can now open https://[hostname]/admin/ as usual to start editing. There is even no authentication process if you’re already signed in with a backend on Netlify/Decap CMS because Sveltia CMS uses your auth token stored in the browser. Simple enough!

Using Package Manager
Install Sveltia CMS:


npm

yarn

pnpm

bun

npm install @sveltia/cms
Then, update your import statements accordingly.

From Netlify CMS:


-import CMS from 'netlify-cms-app'; // or 'netlify-cms'
+import CMS from '@sveltia/cms';
From Decap CMS:


-import CMS from 'decap-cms-app'; // or 'decap-cms'
+import CMS from '@sveltia/cms';
That’s it! You have successfully migrated to Sveltia CMS. Enjoy the improved performance and features.

Cleaning Up
You can uninstall the old Netlify/Decap CMS packages from your project to keep it clean. The packages vary depending on your setup, so uninstall all relevant ones.

A few notable changes to be aware of:

The netlify-cms-locales/decap-cms-locales package and the CMS.registerLocale method are no longer needed, as Sveltia CMS automatically detects the user’s preferred language and changes the UI locale accordingly.
If you were using netlify-cms-proxy-server/decap-server, you can stop using it and remove it from your setup. Sveltia CMS’s local workflow eliminates the need for a proxy server for improved security, performance and productivity. The local_backend option in your configuration file is no longer needed and can be removed. If you had configured a custom port number with the .env file, you can remove it as well.
Sveltia CMS only publishes a single package called @sveltia/cms, which includes all necessary code, while Netlify/Decap CMS provides many packages. If you were using any other Netlify/Decap CMS packages, you may need to find alternatives or implement the functionality yourself.
JSON Schema Setup
For a better DX, we recommend setting up the JSON schema for the CMS configuration file in your code editor. If you have the YAML extension installed, VS Code may automatically apply the outdated Netlify CMS config schema to config.yml. To use the latest Sveltia CMS config schema instead, you need to specify its URL.

AI Tools Support
This documentation site provides llms.txt files that you can use with AI tools like GitHub Copilot, Claude and ChatGPT to help them understand Sveltia CMS better. See AI Tools Support for details.

Authentication
No changes are needed for authentication if you are using the GitHub, GitLab or Gitea/Forgejo backend. Sveltia CMS will use the existing auth tokens stored in the browser.

If you have set up an OAuth application for Netlify/Decap CMS, you can continue using it with Sveltia CMS. There is no need to create a new OAuth app.

Note for Netlify Customers

If you currently use Netlify to sign in with GitHub or GitLab and stay on Netlify, no changes are needed. Sveltia CMS works seamlessly with Netlify’s authentication system. However, if you’re moving to a different hosting service, you will need to use a different authentication method. See the GitHub backend or GitLab backend documentation for more details.

Content Security Policy (CSP)
Unlike Netlify/Decap CMS, Sveltia CMS does not require the unsafe-eval and unsafe-inline keywords in the script-src CSP directive. However, new CSP rules may be needed depending on your configuration, such as the media storage providers you use. See setting up Content Security Policy for more information.

Other Notable Differences
Some differences between Sveltia CMS and Netlify/Decap CMS may affect your existing configuration or content. Here are some notable ones to be aware of:

Terminology
Some features have different names in Sveltia CMS compared to Netlify/Decap CMS. These differences are mostly cosmetic, and the underlying concepts remain the same. There are no changes in functionality.

Netlify/Decap CMS	Sveltia CMS
Media library	Media storage provider
Folder collection	Entry collection
Widget	Field type
Summary string transformation	String transformation
Content Editing Experience
Sveltia CMS marks required fields for efficient data entry. This is the opposite of Netlify/Decap CMS, which marks optional fields. This change aims to reduce visual clutter and help users focus on the essential fields that must be filled out.

When i18n support is enabled, Sveltia CMS requires all locales to have values for required fields. In contrast, Netlify/Decap CMS only enforces this for the default locale. This change ensures that content is complete across all locales. If you rely on the previous behavior, you can set the required field-level configuration to include only specific locales.

Data Output
The data output conventions of Sveltia CMS may differ from that of Netlify/Decap CMS in some cases. See the data output documentation for details.

You don’t need to manually update your existing content — the CMS automatically handles these differences when loading existing content. However, there are two notable differences to be aware of:

Sveltia CMS does not omit empty optional fields by default. If you have data validation in your framework, this could cause issues. Use the omit_empty_optional_fields output option if needed.
Markdown uses soft line breaks (single line breaks) instead of hard line breaks (escaped line breaks \). In your framework, you may need to enable the appropriate option to render soft line breaks as hard line breaks.
Preview Styles
Sveltia CMS comes with a minimum default preview style to ensure better readability. If you have custom preview styles for Netlify/Decap CMS, you could remove them or adapt them to Sveltia CMS, which shows field labels in the preview by default.