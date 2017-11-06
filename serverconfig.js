var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
const data = fs.readFileSync(path.join(process.env.PWD, '/dist/index.html'), 'utf8');

const resources = data.match(/assets\/([^\'\"]+)/g)

var webConfigSettings = 
`<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
   <urlCompression doStaticCompression="false" doDynamicCompression="false" dynamicCompressionBeforeCache="false" />
  </system.webServer>
`;


fs.writeFileSync(path.join(process.env.PWD, '/dist/Web.config'), webConfigSettings);

resources.forEach(resourcePath => {
	var resourceConfig = 
`	<location path="${resourcePath}">
	  <system.webServer>
	    <httpProtocol>
	       <customHeaders>
	          <add name="content-encoding" value="gzip" />
	       </customHeaders>
	    </httpProtocol>
	  </system.webServer>
	</location>`;
	fs.appendFileSync(path.join(process.env.PWD, '/dist/Web.config'), resourceConfig);
});

var closeConfiguration = 
`
</configuration>
`;

fs.appendFileSync(path.join(process.env.PWD, '/dist/Web.config'), closeConfiguration);

console.log(chalk.green('Web.Config has been successfully created.'));
