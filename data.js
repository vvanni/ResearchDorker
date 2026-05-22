const dorksData = [
    {
        "category": "Documents & File Discovery",
        "items": [
            { "name": "PDF Documents", "query": "filetype:pdf", "desc": "Filters search to only PDF files." },
            { "name": "Word Documents", "query": "filetype:doc | filetype:docx | filetype:odt", "desc": "Finds Microsoft Word and OpenDocument text files." },
            { "name": "Spreadsheets", "query": "filetype:xls | filetype:xlsx | filetype:csv | filetype:ods", "desc": "Finds Excel sheets and CSV spreadsheets containing tables." },
            { "name": "Presentations", "query": "filetype:ppt | filetype:pptx | filetype:odp", "desc": "Finds presentation slides." },
            { "name": "Confidential Markings", "query": "filetype:pdf (intext:\"confidential\" | intext:\"internal use only\" | intext:\"not for distribution\")", "desc": "Finds PDF documents marked as confidential." },
            { "name": "Text Files", "query": "filetype:txt", "desc": "Finds plain text documents." }
        ]
    },
    {
        "category": "Cloud & Backup Exposure",
        "items": [
            { "name": "AWS S3 Buckets", "query": "site:s3.amazonaws.com \"{domain}\"", "desc": "Finds publicly readable Amazon S3 buckets." },
            { "name": "Azure Blob Storage", "query": "site:blob.core.windows.net \"{domain}\"", "desc": "Finds Azure Blob files containing target data." },
            { "name": "Google Drive Shares", "query": "site:drive.google.com/file/d/ OR site:drive.google.com/drive/folders/ \"{topic}\"", "desc": "Finds publicly shared Google Drive files or folders." },
            { "name": "Dropbox Shared Links", "query": "site:dropbox.com/s/ OR site:dropbox.com/sh/ \"{topic}\"", "desc": "Finds public Dropbox download folders/files." }
        ]
    },
    {
        "category": "Code & Paste Leaks",
        "items": [
            { "name": "GitHub Code", "query": "site:github.com \"{domain}\"", "desc": "Finds public code repositories on GitHub." },
            { "name": "GitLab Projects", "query": "site:gitlab.com \"{domain}\"", "desc": "Finds repositories on GitLab." },
            { "name": "Pastebin Leaks", "query": "site:pastebin.com \"{domain}\"", "desc": "Looks up plain text pastes on Pastebin." },
            { "name": "Gist Snippets", "query": "site:gist.github.com \"{topic}\"", "desc": "Locates raw snippets shared on GitHub Gist." }
        ]
    },
    {
        "category": "Archives & Academic",
        "items": [
            { "name": "Wayback Machine", "query": "site:web.archive.org/web/*/ \"{domain}\"", "desc": "Explores historical cached versions of the target domain." },
            { "name": "Archive.today Cache", "query": "site:archive.today OR site:archive.ph \"{domain}\"", "desc": "Finds snapshots on alternative web archiving platforms." },
            { "name": "Google Scholar Articles", "query": "site:scholar.google.com \"{topic}\"", "desc": "Locates scholarly articles and publications." },
            { "name": "Research Papers", "query": "site:researchgate.net OR site:academia.edu \"{topic}\"", "desc": "Finds papers uploaded by researchers and academics." },
            { "name": "WikiLeaks References", "query": "site:wikileaks.org \"{domain}\" OR site:wikileaks.org \"{topic}\"", "desc": "Searches for document leaks mentioning the target." }
        ]
    }
];
