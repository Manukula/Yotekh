from flask import Flask, request, send_from_directory, Response
import subprocess
import sys

app = Flask(__name__, static_folder='.', static_url_path='')


@app.route('/')
def index():
    return send_from_directory('.', 'index.html')


@app.route('/run')
def run():
    action = request.args.get('action', '')
    # map actions to separate scripts and run them
    scripts = {
        'members': 'chat.py',
        'skills': 'skills.py',
        'started': 'started.py',
        'experience': 'experience.py',
        'background': 'background.py'
    }

    key = action.lower()
    if key in scripts:
        script = scripts[key]
        try:
            completed = subprocess.run([sys.executable, script], capture_output=True, text=True, check=True)
            out = completed.stdout.strip()
        except subprocess.CalledProcessError as e:
            out = (e.stdout or '') + (e.stderr or '')
        return Response(out or '(no output)', mimetype='text/plain')

    return Response(f'No script for action: {action}', status=404, mimetype='text/plain')


if __name__ == '__main__':
    app.run(debug=True)
