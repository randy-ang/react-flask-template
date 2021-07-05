import json
import subprocess
from pathlib import Path

def render_sw_html(url):
    return render_ssr(url=url,shell=True)

def render_ssr(url, **args):
    args["url"] = url
    props = json.dumps(args)
    p = subprocess.Popen(['node', Path(__file__).parent / "build/App.js"], stdout=subprocess.PIPE, stdin=subprocess.PIPE)
    stdout_data = p.communicate(input=str.encode(props))[0]
    return json.loads(stdout_data.decode())