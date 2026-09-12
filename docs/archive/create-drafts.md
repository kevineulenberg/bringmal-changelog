Content Editor
Sveltia CMS provides a powerful content editor that allows users to create and modify content entries stored in their Git repository. This document outlines the key features and functionalities of the content editor.

Features
The content editor includes the following features to enhance the content creation and editing experience:

Auto-Saving Drafts
When creating or editing content, Sveltia CMS automatically saves draft backups in the browser’s local storage. This ensures that your work is not lost in case of accidental navigation away from the page or browser crashes. Drafts are saved periodically as you make changes and can be restored when you return to the editing interface.

Auto-saving draft can be disabled in User Preferences.

Scroll Synchronization
When editing long entries, Sveltia CMS synchronizes the scroll position between the editor and the preview pane. This helps you see how your content will look as you write, without having to manually scroll both sections.

Click-to-Highlight
Clicking on a field in the Preview Pane highlights the corresponding field in the Edit Pane. If the field is collapsed in the Edit Pane, it will automatically expand when clicked in the Preview Pane. This feature makes it easy to locate and edit specific fields based on their appearance in the preview.

Revert Changes
The content editor includes Revert buttons that allow you to discard all unsaved changes or revert individual fields to their last saved state. This feature is useful if you want to undo changes made during the current editing session.

View on Live Site
The 3-dot menu in the content editor includes a View on Live Site option. This allows you to quickly open the live version of the entry you are editing, making it easy to check how the current content appears on the actual website.

View Source
When Developer Mode is enabled, the 3-dot menu in the content editor provides a View Source option. This allows you to quickly open the source file of the entry or asset in your Git repository, making it easy to review or edit the raw content.

I18n Support
If internationalization (i18n) is enabled in your Sveltia CMS configuration, the content editor provides support for managing translations of your content. You can switch between different language versions of the content you are editing, making it easy to create and maintain multilingual sites.

Language Switcher: A language switcher is available in the editor interface, allowing you to select the desired language for editing and preview. If there are any errors or missing translations, they will be indicated in the switcher.
Translate Button: A Translate button is provided to translate all or specific text-type fields using a third-party translation service. This feature can help speed up the process of creating translations for your content.
Copy Button: A Copy button is available to copy content from one language version to another, facilitating the translation process.
Keyboard Shortcuts
Sveltia CMS includes several keyboard shortcuts to enhance productivity while editing content.

Save an entry: Ctrl+S (Windows/Linux) or Command+S (macOS)
Cancel entry editing: Escape
Standard keyboard shortcuts are also available in the Markdown editor, including Ctrl+B/Command+B for bold text, Ctrl+I/Command+I for italics, and Tab to indent a list item.

Dynamic Default Values
Sveltia CMS supports dynamic default values passed with URL query parameters. This allows pre-filling certain fields when creating new entries in an entry collection.

The URL format for pre-filling fields is as follows:


https://YOUR_DOMAIN/admin/#/collections/COLLECTION_NAME/new?field1=value1&field2=value2
Where YOUR_DOMAIN is your CMS instance domain, and COLLECTION_NAME is the name of the collection you are adding an entry to, and field1, field2, etc. are the names of the fields you want to pre-fill with value1, value2, etc. Make sure to URL-encode the parameter values. Nested fields can be targeted using dot notation in the field names.

For example, given the following collection configuration:


collections:
  - name: posts
    label: Posts
    folder: /content/posts
    fields:
      - name: title
        label: Title
      - name: author
        label: Author
        widget: object
        fields:
          - name: name
            label: Name
      - name: body
        label: Body
        widget: markdown
The following URL will open the new entry editor with the title, author.name and body fields pre-filled:


https://example.com/admin/#/collections/posts/new?title=My%20First%20Post&author.name=John%20Doe&body=Hello%2C%20world!
Saving Behavior
Save and Publish Options
When the skip_ci backend option is enabled, the Save button in the content editor has a dropdown menu that allows you to choose between two saving options. See the Disabling Automatic Deployments section for more details.

Auto-Close Editor
When you save your changes, the content editor automatically closes the editing interface and returns you to the collection or file list. This streamlines the workflow by reducing the number of clicks needed to return to the main interface after saving. If you prefer to stay in the editor after saving, you can change this behavior in User Preferences.

Preview Pane
Developers can enhance the content editing experience by providing real-time previews of how the content will appear on the live site. Sveltia CMS offers several options for customizing and controlling the preview feature.

INFO

Please note that, due to the nature of framework-agnostic design, we don’t plan to support live site previews that fetch data from the actual website. If you need this feature, consider using a framework-specific CMS solution.

Disabling Previews
Previews are enabled by default. However, if you want to disable the preview feature entirely, you can do so at different levels:

Global
Add the following configuration to the top level of your config.yml file:


editor:
  preview: false
Collection-Level
Add the same editor option to a specific collection in your config.yml file:


collections:
  - name: blog
    label: Blog
    folder: /content/blog
    editor:
      preview: false
File-Level
Add the same editor option to a specific file in your config.yml file:


files:
  - name: about
    label: About Page
    file: /content/about.md
    editor:
      preview: false
Field-Level
Add the preview option to a specific field in your config.yml file:


fields:
  - name: body
    label: Body
    widget: markdown
    preview: false
Advanced Customization
Sveltia CMS allows developers to create custom preview templates and styles to provide a more accurate representation of how the content will appear on the live site.

Custom Preview Styles: Register custom CSS styles for the preview pane, allowing for better visual fidelity with the live site.
Custom Preview Templates: Create custom preview templates for specific collections or files, allowing for tailored preview experiences.
Live Preview
Sveltia CMS does not plan to support WYSIWYG live site previews that fetch data from the actual website, due to its framework-agnostic design. If you require this feature, consider using a framework-specific CMS solution.

User Settings
End-users can enable or disable the preview pane in the CMS UI using the menu located at the top-right corner of the editor interface. This preference is saved in the browser’s local storage, allowing users to maintain their preferred preview state across sessions.

Scroll syncing between the editor and preview panes is enabled by default. Users can toggle this feature on or off using the same editor menu.