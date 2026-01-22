Custom Logo
You can customize the logo displayed in the Sveltia CMS admin interface by specifying a custom logo URL in the configuration file. This allows you to replace the default Sveltia CMS logo with your own branding.

The logo will appear in the header of the admin interface, login page, and the browser tab (favicon).

The logo configuration option, defined at the root level of the configuration file, accepts an object with the following properties:

src: The URL or path to the custom logo image. (Required)
show_in_header: A boolean indicating whether to display the logo in the header. (Optional, default: true)
Configuration example:


YAML

TOML

JSON

JavaScript

logo:
  src: /path/to/your/logo.png
  show_in_header: true
For backward compatibility, the logo_url configuration option is still supported but deprecated. It is recommended to use the logo object for better flexibility and future-proofing.


YAML

TOML

JSON

JavaScript

logo_url: /path/to/your/logo.png
Custom Mount Element
Sveltia CMS mounts the admin interface to the <body> element by default. However, you can specify a custom mount element by adding a <div> with a specific ID in your HTML. This way, you can embed the CMS admin interface within a specific section of your webpage, allowing to have a navigation bar or other content alongside the CMS.

The ID of the custom mount element is nc-root.


<div id="nc-root"></div>
Make sure to properly style the custom mount element to ensure the CMS interface displays correctly within your layout. You may need to set dimensions, overflow properties, or other CSS styles depending on your design requirements. Otherwise, the admin interface may not render as expected.

Sveltia CMS will automatically detect the presence of the nc-root element and mount the admin interface there instead of the default <body> element.

TIP

nc-root is short for “Netlify CMS Root,” a naming convention carried over from Netlify/Decap CMS to maintain familiarity for users transitioning between the two systems.

JavaScript API
Sveltia CMS offers a comprehensive API that enables developers to extend and customize its features. You can register custom field types, preview templates, editor components, and more to enhance the content management experience.

For detailed information on how to use the API, please refer to the JavaScript API guide.

Modifying Source Code
Sveltia CMS is an open-source project licensed under the MIT License, and its source code is available on GitHub. Advanced users and developers can modify the source code to implement custom features or changes that are not available through the standard customization options.

However, please note that our source code is under active development with significant refactoring and improvements happening regularly. Direct modifications to the source code may lead to compatibility issues with future updates.