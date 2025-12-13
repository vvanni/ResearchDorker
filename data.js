const dorksData = [
    // ==================== SENSITIVE DATA & EXPOSURE ====================
    {
        "category": "Documents",
        "items": [
            { "name": "PDF Files", "query": "ext:pdf", "desc": "Finds PDF documents." },
            { "name": "Word Documents", "query": "ext:doc | ext:docx | ext:odt", "desc": "Finds Word documents." },
            { "name": "Spreadsheets", "query": "ext:xls | ext:xlsx | ext:csv", "desc": "Finds spreadsheets." },
            { "name": "Presentations", "query": "ext:ppt | ext:pptx", "desc": "Finds presentations." },
            { "name": "Confidential Docs", "query": "filetype:pdf intitle:\"Confidential\"", "desc": "Documents marked confidential." },
            { "name": "Sensitive Keywords", "query": "intext:\"confidential\" | intext:\"internal use only\"", "desc": "Documents with sensitive markings." }
        ]
    },
    {
        "category": "Configuration & Secrets",
        "items": [
            { "name": "Config Files", "query": "ext:conf | ext:cfg | ext:ini", "desc": "Finds config files." },
            { "name": "Environment Files", "query": "ext:env", "desc": "Finds .env files." },
            { "name": "Backup Files", "query": "ext:bak | ext:backup | ext:old", "desc": "Finds backups." },
            { "name": "Git Leaks", "query": "inurl:.git", "desc": "Finds exposed git repos." },
            { "name": "SSH Keys", "query": "intitle:\"index of\" id_rsa", "desc": "Finds SSH private keys." },
            { "name": "Password Files", "query": "ext:htpasswd | ext:passwd", "desc": "Finds password files." }
        ]
    },
    {
        "category": "Database Exposure",
        "items": [
            { "name": "SQL Dumps", "query": "ext:sql", "desc": "Finds SQL dumps." },
            { "name": "Access Databases", "query": "ext:mdb | ext:accdb", "desc": "Finds Access DBs." },
            { "name": "Log Files", "query": "ext:log", "desc": "Finds log files." }
        ]
    },
    {
        "category": "Directory Listings",
        "items": [
            { "name": "Open Directories", "query": "intitle:index.of", "desc": "Finds directory listings." },
            { "name": "Admin Directories", "query": "intitle:\"Index of\" inurl:/admin", "desc": "Finds admin directories." },
            { "name": "Backup Directories", "query": "intitle:\"Index of\" inurl:/backup", "desc": "Finds backup directories." },
            { "name": "Config Directories", "query": "intitle:\"Index of\" inurl:/config", "desc": "Finds config directories." }
        ]
    },
    // ==================== CLOUD & EXTERNAL ====================
    {
        "category": "Cloud Storage",
        "items": [
            { "name": "AWS S3", "query": "site:s3.amazonaws.com \"{domain}\"", "desc": "Finds AWS S3 mentions." },
            { "name": "Azure Blob", "query": "site:blob.core.windows.net \"{domain}\"", "desc": "Finds Azure Blob mentions." },
            { "name": "Google Drive", "query": "site:drive.google.com \"{domain}\"", "desc": "Finds Google Drive mentions." },
            { "name": "Firebase", "query": "site:firebasestorage.googleapis.com \"{domain}\"", "desc": "Finds Firebase mentions." },
            { "name": "Dropbox", "query": "site:dropbox.com/s \"{domain}\"", "desc": "Finds Dropbox files." }
        ]
    },
    {
        "category": "Code Repositories",
        "items": [
            { "name": "GitHub", "query": "site:github.com \"{domain}\"", "desc": "Finds code on GitHub." },
            { "name": "GitLab", "query": "site:gitlab.com \"{domain}\"", "desc": "Finds code on GitLab." },
            { "name": "Pastebin", "query": "site:pastebin.com \"{domain}\"", "desc": "Finds pastes on Pastebin." }
        ]
    },
    {
        "category": "Bug Bounty",
        "items": [
            { "name": "HackerOne", "query": "site:hackerone.com intext:\"{domain}\"", "desc": "Finds HackerOne reports." },
            { "name": "Bugcrowd", "query": "site:bugcrowd.com intext:\"{domain}\"", "desc": "Finds Bugcrowd reports." }
        ]
    },
    // ==================== ATTACK SURFACE ====================
    {
        "category": "Login & Admin",
        "items": [
            { "name": "Admin Login", "query": "inurl:admin | intitle:\"Admin Login\"", "desc": "Finds admin logins." },
            { "name": "User Login", "query": "intitle:login | inurl:login", "desc": "Finds login pages." },
            { "name": "cPanel", "query": "inurl:cpanel", "desc": "Finds cPanel logins." },
            { "name": "Webmail", "query": "inurl:webmail", "desc": "Finds webmail logins." },
            { "name": "Upload Forms", "query": "inurl:upload", "desc": "Finds file upload forms." }
        ]
    },
    {
        "category": "APIs & Dev",
        "items": [
            { "name": "REST APIs", "query": "inurl:api | inurl:v1 | inurl:v2", "desc": "Finds API endpoints." },
            { "name": "GraphQL", "query": "inurl:graphql", "desc": "Finds GraphQL endpoints." },
            { "name": "Swagger", "query": "intitle:\"Swagger UI\"", "desc": "Finds Swagger docs." },
            { "name": "Dev/Staging", "query": "inurl:dev | inurl:staging | inurl:test", "desc": "Finds dev environments." }
        ]
    },
    // ==================== WORDPRESS ====================
    {
        "category": "WordPress",
        "items": [
            { "name": "WP Sites", "query": "intext:\"Powered by WordPress\"", "desc": "Finds WordPress sites." },
            { "name": "WP Login", "query": "inurl:wp-login.php", "desc": "Finds WP login pages." },
            { "name": "WP Plugins", "query": "inurl:wp-content/plugins/", "desc": "Finds WP plugins." },
            { "name": "WP Uploads", "query": "inurl:wp-content/uploads", "desc": "Finds WP uploads." }
        ]
    },

    // ==================== VULNERABILITY HUNTING ====================
    {
        "category": "SQL Injection",
        "items": [
            { "name": "ID Parameters", "query": "inurl:id= | inurl:page= | inurl:cat=", "desc": "Common SQLi params." },
            { "name": "Search Parameters", "query": "inurl:search= | inurl:query=", "desc": "Search params for SQLi." },
            { "name": "MySQL Errors", "query": "intext:\"sql syntax near\" | intext:\"Warning: mysql_\"", "desc": "Finds MySQL errors." },
            { "name": "PHP Errors", "query": "\"PHP Parse error\" | \"PHP Warning\"", "desc": "Finds PHP errors." }
        ]
    },
    {
        "category": "RCE & LFI",
        "items": [
            { "name": "Command Params", "query": "inurl:cmd= | inurl:exec= | inurl:command=", "desc": "Command execution params." },
            { "name": "File Params", "query": "inurl:file= | inurl:path= | inurl:include=", "desc": "File inclusion params." }
        ]
    },
    {
        "category": "XSS & Redirect",
        "items": [
            { "name": "Input Params", "query": "inurl:q= | inurl:search= | inurl:name=", "desc": "User input params." },
            { "name": "Redirect Params", "query": "inurl:redirect= | inurl:url= | inurl:next=", "desc": "Redirect params." }
        ]
    }
];
