const dorksData = [
    {
        "category": "Sensitive Data & Exposure",
        "items": [
            { "name": "Public Documents", "query": "ext:doc | ext:docx | ext:odt | ext:pdf | ext:rtf | ext:sxw | ext:psw | ext:ppt | ext:pptx | ext:pps | ext:csv | ext:txt | ext:xls | ext:xlsx", "desc": "Finds publicly available documents." },
            { "name": "Sensitive Keywords", "query": "intext:\"confidential\" | intext:\"Not for Public Release\" | intext:\"internal use only\" | intext:\"do not distribute\"", "desc": "Documents containing sensitive markings." },
            { "name": "Directory Listings", "query": "intitle:index.of", "desc": "Finds exposed directory listings." },
            { "name": "Configuration & Secrets", "query": "ext:xml | ext:conf | ext:cnf | ext:reg | ext:inf | ext:rdp | ext:cfg | ext:txt | ext:ora | ext:ini | ext:env | ext:sh | ext:bak | ext:backup | ext:swp | ext:old | ext:~ | ext:git | ext:svn | ext:htpasswd | ext:htaccess | ext:json | filetype:ini \"[WS_FTP]\" | intitle:\"index of\" id_rsa", "desc": "Finds config files, keys, and secrets." },
            { "name": "Database Files", "query": "ext:sql | ext:dbf | ext:mdb", "desc": "Finds exposed database files." },
            { "name": "Log Files", "query": "ext:log", "desc": "Finds exposed log files." },
            { "name": "Cloud Storage Leaks", "query": "site:s3.amazonaws.com \"{domain}\" | site:blob.core.windows.net \"{domain}\" | site:googleapis.com \"{domain}\" | site:drive.google.com \"{domain}\" | site:dev.azure.com \"{domain}\" | site:onedrive.live.com \"{domain}\" | site:digitaloceanspaces.com \"{domain}\" | site:sharepoint.com \"{domain}\" | site:s3-external-1.amazonaws.com \"{domain}\" | site:s3.dualstack.us-east-1.amazonaws.com \"{domain}\" | site:firebasestorage.googleapis.com \"{domain}\" | site:dropbox.com/s \"{domain}\" | site:docs.google.com inurl:\"/d/\" \"{domain}\"", "desc": "Searches for domain mentions on public cloud storage." },
            { "name": "Code Repos & Pastes", "query": "site:pastebin.com \"{domain}\" | site:jsfiddle.net \"{domain}\" | site:codebeautify.org \"{domain}\" | site:codepen.io \"{domain}\" | site:github.com \"{domain}\" | site:gitlab.com \"{domain}\" | site:bitbucket.org \"{domain}\"", "desc": "Searches for code leaks on sharing sites." },
            {
                "name": "Bug Bounty Reports", "query": "(site:bugcrowd.com OR site:hackerone.com) (inurl:disclosure OR inurl:vulnerability OR inurl:report) intext:\"{domain}\"", "desc": "Searches major bug bounty platforms for disclosed reports."
            }

        ]
    },
    {
        "category": "Attack Surface",
        "items": [
            { "name": "Login Portals", "query": "inurl:admin | inurl:login | inurl:adminlogin | inurl:cpanel | inurl:webmail | inurl:signin | intitle:login | intitle:signin | inurl:secure", "desc": "Finds administrative and user login pages." },
            { "name": "API Endpoints", "query": "inurl:api | inurl:rest | inurl:v1 | inurl:v2 | inurl:v3 | inurl:graphql", "desc": "Finds potential API endpoints." },
            { "name": "API Documentation", "query": "inurl:apidocs | inurl:api-docs | inurl:swagger | inurl:api-explorer | inurl:redoc | inurl:openapi | intitle:\"Swagger UI\"", "desc": "Finds exposed API documentation." },
            { "name": "File Uploads", "query": "intext:\"choose file\" | inurl:upload", "desc": "Finds file upload functionalities." },
            { "name": "Development Environments", "query": "inurl:test | inurl:env | inurl:dev | inurl:staging | inurl:sandbox | inurl:debug | inurl:temp | inurl:internal | inurl:demo | inurl:private | inurl:beta", "desc": "Finds test and staging environments." },
            { "name": "WordPress", "query": "inurl:wp- | inurl:wp-content | inurl:plugins | inurl:uploads | inurl:themes | inurl:download", "desc": "Finds WordPress specific paths." }
        ]
    },
    {
        "category": "Vulnerability Hunting",
        "items": [
            { "name": "SQL Injection", "query": "inurl:id= | inurl:page= | inurl:dir= | inurl:search= | inurl:category= | inurl:file= | inurl:class= | inurl:url= | inurl:news= | inurl:item= | inurl:menu= | inurl:lang= | inurl:name= | inurl:ref= | inurl:title= | inurl:view= | inurl:topic= | inurl:thread= | inurl:type= | inurl:date= | inurl:form= | inurl:join= | inurl:main= | inurl:nav= | inurl:region= | inurl:pid= | inurl:cat= | inurl:sid=", "desc": "Parameters potentially vulnerable to SQLi." },
            { "name": "SQL Errors", "query": "intext:\"sql syntax near\" | intext:\"syntax error has occurred\" | intext:\"incorrect syntax near\" | intext:\"unexpected end of SQL command\" | intext:\"Warning: mysql_connect()\" | intext:\"Warning: mysql_query()\" | intext:\"truly a mysql result set\" | \"database error\" | \"SQL syntax\" | \"undefined index\" | \"unhandled exception\" | \"stack trace\"", "desc": "Finds pages displaying SQL errors." },
            { "name": "RCE Parameters", "query": "inurl:cmd= | inurl:exec= | inurl:command= | inurl:execute= | inurl:ping= | inurl:query= | inurl:jump= | inurl:code= | inurl:reg= | inurl:do= | inurl:func= | inurl:arg= | inurl:option= | inurl:load= | inurl:process= | inurl:step= | inurl:read= | inurl:function= | inurl:req= | inurl:feature= | inurl:exe= | inurl:module= | inurl:payload= | inurl:run= | inurl:print=", "desc": "Parameters potentially vulnerable to RCE." },
            { "name": "LFI Parameters", "query": "inurl:cat= | inurl:dir= | inurl:action= | inurl:board= | inurl:date= | inurl:detail= | inurl:file= | inurl:download= | inurl:path= | inurl:folder= | inurl:prefix= | inurl:include= | inurl:page= | inurl:inc= | inurl:locate= | inurl:show= | inurl:doc= | inurl:site= | inurl:type= | inurl:view= | inurl:content= | inurl:document= | inurl:layout= | inurl:mod= | inurl:conf=", "desc": "Parameters potentially vulnerable to LFI." },
            { "name": "XSS Parameters", "query": "inurl:q= | inurl:s= | inurl:search= | inurl:id= | inurl:lang= | inurl:keyword= | inurl:query= | inurl:page= | inurl:keywords= | inurl:year= | inurl:view= | inurl:email= | inurl:type= | inurl:name= | inurl:p= | inurl:month= | inurl:image= | inurl:list_type= | inurl:url= | inurl:terms= | inurl:categoryid= | inurl:key= | inurl:login= | inurl:begindate= | inurl:enddate=", "desc": "Parameters potentially vulnerable to XSS." },
            { "name": "Open Redirect / SSRF", "query": "inurl:dest= | inurl:redirect= | inurl:uri= | inurl:path= | inurl:continue= | inurl:url= | inurl:window= | inurl:next= | inurl:data= | inurl:reference= | inurl:site= | inurl:html= | inurl:val= | inurl:validate= | inurl:domain= | inurl:callback= | inurl:return= | inurl:page= | inurl:feed= | inurl:host= | inurl:port= | inurl:to= | inurl:out= | inurl:view= | inurl:dir= | inurl:target= | inurl:rurl= | inurl:destination= | inurl:redir= | inurl:redirect_url= | inurl:redirect_uri= | inurl:cgi-bin/redirect.cgi | inurl:login?to= | inurl:image_url= | inurl:go= | inurl:return_to= | inurl:checkout_url=", "desc": "Parameters potentially vulnerable to Open Redirect or SSRF." },
            { "name": "PHP Errors", "query": "\"PHP Parse error\" | \"PHP Warning\" | \"PHP Error\"", "desc": "Finds pages displaying PHP errors." },
            { "name": "Server Errors", "query": "inurl:\"error\" | intitle:\"exception\" | intitle:\"failure\" | intitle:\"server at\" | inurl:exception", "desc": "Finds generic server error pages." }
        ]
    }
];
