const dorksData = [
    {
        "category": "Documents & File Discovery",
        "items": [
            { "name": "PDF Documents", "query": "filetype:pdf", "desc": "Filters search to only PDF files." },
            { "name": "Word Documents", "query": "filetype:doc | filetype:docx | filetype:odt", "desc": "Finds Microsoft Word and OpenDocument text files." },
            { "name": "Spreadsheets", "query": "filetype:xls | filetype:xlsx | filetype:csv | filetype:ods", "desc": "Finds Excel sheets and CSV spreadsheets containing tables." },
            { "name": "Presentations", "query": "filetype:ppt | filetype:pptx | filetype:odp", "desc": "Finds presentation slides." },
            { "name": "Confidential", "query": "filetype:pdf intext:\"confidential\"", "desc": "Finds PDF documents marked as confidential." },
            { "name": "Internal use only", "query": "filetype:pdf intext:\"internal use only\"", "desc": "Finds PDF documents marked for internal use only." },
            { "name": "Not for distribution", "query": "filetype:pdf intext:\"not for distribution\"", "desc": "Finds PDF documents marked not for distribution." },
            { "name": "Text Files", "query": "filetype:txt", "desc": "Finds plain text documents." }
        ]
    },
    {
        "category": "Cloud & Backup Exposure",
        "items": [
            { "name": "AWS S3 Buckets", "query": "site:s3.amazonaws.com \"{target}\"", "desc": "Finds publicly readable Amazon S3 buckets." },
            { "name": "Azure Blob Storage", "query": "site:blob.core.windows.net \"{target}\"", "desc": "Finds Azure Blob files containing target data." },
            { "name": "Google Drive Files", "query": "site:drive.google.com/file/d/ \"{target}\"", "desc": "Finds publicly shared Google Drive files." },
            { "name": "Google Drive Folders", "query": "site:drive.google.com/drive/folders/ \"{target}\"", "desc": "Finds publicly shared Google Drive folders." },
            { "name": "Dropbox Shared Files", "query": "site:dropbox.com/s/ \"{target}\"", "desc": "Finds public Dropbox download files." },
            { "name": "Dropbox Shared Folders", "query": "site:dropbox.com/sh/ \"{target}\"", "desc": "Finds public Dropbox download folders." }
        ]
    },
    {
        "category": "Code & Pastebin",
        "items": [
            { "name": "GitHub Code", "query": "site:github.com \"{target}\"", "desc": "Finds public code repositories on GitHub." },
            { "name": "GitLab Projects", "query": "site:gitlab.com \"{target}\"", "desc": "Finds repositories on GitLab." },
            { "name": "Pastebin", "query": "site:pastebin.com \"{target}\"", "desc": "Finds plain text pastes on Pastebin." },
            { "name": "Gist Snippets", "query": "site:gist.github.com \"{target}\"", "desc": "Locates raw snippets shared on GitHub Gist." }
        ]
    },
    {
        "category": "Archives & Academic",
        "items": [
            { "name": "Wayback Machine", "query": "site:web.archive.org \"{target}\"", "desc": "Explores historical cached versions of the target." },
            { "name": "Ghost Archive", "query": "site:ghostarchive.org \"{target}\"", "desc": "Finds snapshots on alternative web archiving platforms." },
            { "name": "Google Scholar Articles", "query": "site:scholar.google.com \"{target}\"", "desc": "Locates scholarly articles and publications." },
            { "name": "Research Papers", "query": "site:researchgate.net \"{target}\"", "desc": "Finds papers uploaded by researchers and academics." },
            { "name": "WikiLeaks References", "query": "site:wikileaks.org \"{target}\"", "desc": "Searches for document leaks mentioning the target." }
        ]
    }
];
