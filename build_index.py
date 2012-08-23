import os

IGNORE_LIST = ['index.html', 'CNAME', 'build_index.py']

def sizeFormat(filesize):
    if filesize >= 1073741824:
         filesize = str(filesize / 1073741824) + ' Gb'
    else:
        if filesize >= 1048576:
            filesize = str(filesize / 1048576) + ' Mb'
        else:
            if filesize >= 1024:
                filesize = str(filesize / 1024) + ' Kb'
            else:
                filesize = str(filesize) + ' bytes'
    return filesize

def makeIndex(dir_name, folders, files):
    base = ''
    split_path = dir_name.replace(CWD, '').split('/')
    links = []
    for i, path in enumerate(split_path):
        print path, i
        if path == '':
            path = '/'
        links.append("<a href='%s/'>%s</a>" % ('/'.join(split_path[:i+1]), path))
    base += ' <span style="color: #ccc;">/</span> '.join(links)
    folder_list = '<table>'
    file_list = '<table>'
    for f in folders:
        if f[0] != '.':
            folder_list += """
                <tr>
                    <td>
                        <a href='%s/'>%s</a>
                    </td>
                </tr>
            """ % (f, f)
    for f in files:
        if f[0] != '.' and not f in IGNORE_LIST:
            size = os.path.getsize(os.path.join(dir_name, f))
            size = sizeFormat(size)
            file_list += """
                <tr>
                    <td>
                        <a href='%s'>%s</a>
                    </td>
                    <td style='text-align:right;'>
                        %s
                    </td>
                </tr>
            """ % (f, f, size)

    folder_list += '</table>'
    file_list += '</table>'
    index_file_contents = base + folder_list + '<hr>' + file_list
    file(os.path.join(dir_name, 'index.html'), 'w').write(index_file_contents)

CWD = os.getcwd()
for contents in os.walk(CWD):
    current_path = contents[0].replace(CWD, '')
    if not (len(current_path) > 1 and current_path[1] == '.'):
        makeIndex(*contents)
